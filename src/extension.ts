// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.secrets.onDidChange(data => {
        vscode.window.showInformationMessage('Password changed: ' + data.key);
    });
	const setPassword = vscode.commands.registerCommand('extension.setPassword', () => {
        context.secrets.store('key', 'value');
    });
    
    const getPassword = vscode.commands.registerCommand('extension.getPassword', async () => {
        const key = await context.secrets.get('key');
		vscode.window.showInformationMessage('Password received: ' + key);
    });
    const deletePassword = vscode.commands.registerCommand('extension.deletePassword', async () => {
        const key = await context.secrets.delete('key');
	});

    context.subscriptions.push(setPassword);
    context.subscriptions.push(getPassword);
    context.subscriptions.push(deletePassword);
}
