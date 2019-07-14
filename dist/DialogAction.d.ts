import Dialog from "./index";
import React from "react";
export declare type DialogActionLabel = React.ReactNode;
export declare type DialogActionCallback = (dialog: Dialog) => void;
export declare type DialogActionKey = string;
/**
 * The class to construct a choice for Dialog.
 * Use `Dialog.Action(options)`.
 */
export default class DialogAction {
    _func?: DialogActionCallback | null;
    label: DialogActionLabel;
    className: string;
    key?: string | null;
    /**
       * Constructor
       * @param label The text or node for button. Default is `OK`.
       * @param func The function to execute when button is clicked. Default is null.
       * @param className The class name for button. Default is ''.
       */
    constructor(label: DialogActionLabel | null | undefined, func: DialogActionCallback | null | undefined, className: string | null | undefined, key: DialogActionKey | null | undefined);
    func(dialog: Dialog): void;
}
//# sourceMappingURL=DialogAction.d.ts.map