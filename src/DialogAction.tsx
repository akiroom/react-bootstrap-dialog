import Dialog from "./index";
import React from "react";

export type DialogActionLabel = React.ReactNode
export type DialogActionCallback = (dialog: Dialog) => void
export type DialogActionKey = string

/**
 * The class to construct a choice for Dialog.
 * Use `Dialog.Action(options)`.
 */
export default class DialogAction {
  _func?: DialogActionCallback | null
  label: DialogActionLabel
  className: string
  key?: string | null
  /**
     * Constructor
     * @param label The text or node for button. Default is `OK`.
     * @param func The function to execute when button is clicked. Default is null.
     * @param className The class name for button. Default is ''.
     */
  constructor (label: DialogActionLabel | null | undefined, func: DialogActionCallback | null | undefined, className: string | null |undefined, key: DialogActionKey | null | undefined) {
    this.label = label || Dialog.options.defaultOkLabel
    this._func = func
    this.className = className || Dialog.options.defaultButtonClassName || Dialog.DEFAULT_OPTIONS.defaultButtonClassName
    this.key = key
  }

  func (dialog: Dialog) {
    dialog.hide()
    this._func && this._func(dialog)
  }
}
