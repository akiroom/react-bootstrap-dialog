import React from 'react';
import { TextPrompt, PasswordPrompt, DialogPrompt, DialogPromptOptions } from './Prompts';
import PromptInput from './PromptInput';
import DialogAction, { DialogActionCallback, DialogActionLabel } from './DialogAction';
declare type DialogTitle = React.ReactNode;
declare type DialogBody = React.ReactNode;
declare type DialogOnHideClalback = ((dialog: Dialog) => void);
interface DialogKeyBinds {
    [id: string]: Function;
}
/**
 * DialogBsSize has any type.
 * Because react-bootstrap has different types between v3 and v4.
 *
 * e.g.
 * v3 earlier has "small"
 * v4 later has "sm"
 */
declare type DialogBsSize = any;
export interface DialogGlobalOptions {
    defaultOkLabel?: DialogActionLabel;
    defaultCancelLabel?: DialogActionLabel;
    primaryClassName?: string;
    defaultButtonClassName?: string;
}
export interface DialogOptions {
    title?: DialogTitle | null;
    body?: DialogBody | null;
    actions?: DialogAction[] | null;
    bsSize?: DialogBsSize | null;
    onHide?: DialogOnHideClalback | null;
    prompt?: DialogPrompt | null;
}
interface Props {
}
interface State {
    title?: DialogTitle | null;
    body?: DialogBody | null;
    showModal?: boolean;
    actions?: DialogAction[] | null;
    bsSize?: DialogBsSize | null;
    onHide?: DialogOnHideClalback | null;
    prompt?: DialogPrompt | null;
}
/**
 * The modal dialog which can be altenative to `window.confirm` and `window.alert`.
 * @example <Dialog ref={(el) => {this.dialog = el} />
 * @example this.dialog.show({body: 'Hello!', actions: [Dialog.Action('do', () => console.log('ok'))]})
 * @example this.dialog.showAlert('Hello!')
 */
export default class Dialog extends React.Component<Props, State> {
    static readonly DEFAULT_OPTIONS: {
        defaultOkLabel: string;
        defaultCancelLabel: string;
        primaryClassName: string;
        defaultButtonClassName: string;
    };
    static options: DialogGlobalOptions;
    promptInput: PromptInput | null;
    keyBinds: DialogKeyBinds | null;
    static Action: (label?: React.ReactNode, func?: DialogActionCallback | null | undefined, className?: string | null | undefined, key?: string | null | undefined) => DialogAction;
    static DefaultAction: (label?: React.ReactNode, func?: DialogActionCallback | null | undefined, className?: string | null | undefined) => DialogAction;
    static OKAction: (func?: DialogActionCallback | null | undefined) => DialogAction;
    static CancelAction: (func?: DialogActionCallback | null | undefined) => DialogAction;
    static SingleOKAction: () => DialogAction;
    static TextPrompt: (options: DialogPromptOptions) => TextPrompt;
    static PasswordPrompt: (options: DialogPromptOptions) => PasswordPrompt;
    static displayName: string;
    /**
     * Set default options for applying to all dialogs.
     * @param options
     */
    static setOptions(options: DialogGlobalOptions): void;
    /**
     * Reset default options to presets.
     */
    static resetOptions(): void;
    static initialState(): State;
    constructor(props: Props);
    componentWillUnmount(): void;
    /**
     * Show dialog with choices. This is similar to `window.confirm`.
     * @param options Object for dialog options.
     * @param options.title The title of dialog.
     * @param options.body The body of message.
     * @param options.actions {DialogAction} The choices for presenting to user.
     * @param options.bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
     * @param options.onHide {function} The method to call when the dialog was closed by clicking background.
     * @param options.prompt {[null, Prompt]} Use prompt for text input or password input.
     */
    show(options?: DialogOptions): void;
    /**
     * Show message dialog This is similar to `window.alert`.
     * @param body The body of message.
     * @param bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
     */
    showAlert(body: DialogBody, bsSize?: undefined): void;
    private onHide;
    /**
     * Hide this dialog.
     */
    hide(): void;
    /**
     * Get the value in prompt.
     * @return {string, null}
     */
    readonly value: string | null;
    private onSubmitPrompt;
    private getSize;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map