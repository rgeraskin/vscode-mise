// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
	* Creates a child process and calls the AAPI CLI
	* @param misePath The path to the mise executable
	* @param command The string CLI command to execute the AAPI
	* @param args The arguments passed to the CLI
*/
function executeMiseCommand(misePath, command, args) {
	const cp = require('child_process');

	const cmd = misePath + ' ' + command + ' ' + args;

	const proc = cp.spawnSync(cmd, {
		shell: true,
		encoding: 'utf8',
		cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
	});

	let procData = proc.stdout.toString();

	if (proc !== null) {
		if (proc.stdout !== null && proc.stdout.toString() !== '') {
			procData = proc.stdout.toString();
		}
		if (proc.stderr !== null && proc.stderr.toString() !== '') {
			const procErr = proc.stderr.toString();
			const errMsg = "Exec '" + cmd + "' failed: " + procErr;
			console.error(errMsg);
			vscode.window.showErrorMessage(errMsg);
			procData = procErr;
		}
	}

	return procData;
}

/**
 * Executes a command in the mise terminal
 * @param command The string to execute in the terminal
 */
function runTerminal(command) {
	// check that mise terminal exists and create it if it doesn't
	const terminal = vscode.window.terminals.find(t => t.name === 'mise') || vscode.window.createTerminal('mise');
	terminal.show();
	// run the command `mise install` in the terminal
	terminal.sendText(command);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// These lines of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mise" is now active!');

	// Retrieve the misePath from the configuration settings
	const misePath = vscode.workspace.getConfiguration('mise').get('misePath');
	// Retrieve the tasks from mise
	const tasks = JSON.parse(executeMiseCommand(misePath, 'tasks', '--json'));
	// console.log the number of tasks in list
	console.log('Tasks loaded: ' + tasks.length);

	// find the maximum width of the task name
	// to try to make the task list look nice
	// but it's still ugly :(
	const fixedWidth = tasks.reduce((max, task) => Math.max(max, task.name.length), 0);

	// add tasks command
	const miseTasks = vscode.commands.registerCommand('mise.tasks', function () {
		// show the tasks in command palette
		vscode.window.showQuickPick(tasks.map(
			task => {
				const paddedName = task.name.padEnd(fixedWidth);
				return `${paddedName} ${task.description}`;
			})).then(selected => {
				if (selected) {
					// Extract the task name from the selected item
					const taskName = selected.split(' ')[0];

					// run the command `mise run <taskName>` in the terminal
					runTerminal('mise run ' + taskName);
				}
			});
	});

	// add install command
	const miseInstall = vscode.commands.registerCommand('mise.install', function () {
		// run the command `mise install` in the terminal
		runTerminal('mise install');
	});

	context.subscriptions.push(miseInstall, miseTasks);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
};
