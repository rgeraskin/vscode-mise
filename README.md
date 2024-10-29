# mise

This is a simple extension for [Mise](https://mise.jdx.dev/favicon.ico) that enables you to run `mise install` and `mise run` directly within your workspace directory in VSCode. The extension leverages an existing Mise binary on your system.

**CAUTION**: I have no experience with JavaScript or creating VSCode extensions and developed this using [GitHub Copilot](https://github.com/features/copilot). Nevertheless, it works! 😊

[Contributions](https://github.com/rgeraskin/vscode-mise/pulls) are welcome.

## Requirements

A [Mise](https://mise.jdx.dev/favicon.ico) binary is required for this extension.

You can install it using:

`brew install mise` or use [or use alternative installation methods.](https://mise.jdx.dev/getting-started.html#alternate-installation-methods)

## How to use

1. Open the VSCode command palette:
   - macOS: `Cmd` + `Shift` + `P`
   - Windows/Linux: `Ctrl` + `Shift` + `P`
1. Run `mise install` to install tools.
1. Run `mise tasks` to execute tasks managed by Mise.

Tools and tasks are automatically gathered using [Mise’s logic](https://mise.jdx.dev/configuration.html#configuration).

For additional guidance, check the [official documentation](https://mise.jdx.dev) or see [my blog post](https://rgeraskin.hashnode.dev/dev-env-with-mise).

## Keyboard shortcuts

You can set a custom shortcut to open the command palette with mise tasks. Add the following to your VSCode `keybindings.json` file:

```json
{
    "key": "ctrl+cmd+u",
    "command": "mise.tasks"
}
```

## Extension Settings

This extension contributes the following settings:

* `mise.misePath`: Specifies the path to the Mise executable (default: `/opt/homebrew/bin/mise`)

## Release Notes

### 0.0.1

Initial release

---

Let me know if you need more adjustments or additions. **Enjoy!**
