import React from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import {TextPrompt, PasswordPrompt, DialogPrompt, DialogPromptOptions} from './Prompts'
import PromptInput from './PromptInput'

type DialogTitle = React.ReactNode
type DialogBody = React.ReactNode
type DialogActionLabel = React.ReactNode
type DialogActionCallback = (dialog: Dialog) => void
type DialogKey = string
type DialogKeyBinds = {[id: string]: Function}
/**
 * DialogBsSize has any type.
 * Because react-bootstrap has different types between v3 and v4.
 *
 * e.g.
 * v3 earlier has "small"
 * v4 later has "sm"
 */
type DialogBsSize = any


export type DialogOptions = {
  showModal?: boolean,
  actions?: Array<DialogAction>,
  defaultOkLabel?: string,
  defaultCancelLabel?: string,
  primaryClassName?: string
  defaultButtonClassName?: string,
}

interface Props {

}
interface State {
  title?: DialogTitle | null,
  body?: DialogBody | null,
  showModal?: boolean,
  actions?: Array<DialogAction>,
  bsSize?: DialogBsSize,
  onHide?: ((dialog: Dialog) => void) | null,
  prompt?: DialogPrompt | null
}

/**
 * The modal dialog which can be altenative to `window.confirm` and `window.alert`.
 * @example <Dialog ref={(el) => {this.dialog = el} />
 * @example this.dialog.show({body: 'Hello!', actions: [Dialog.Action('do', () => console.log('ok'))]})
 * @example this.dialog.showAlert('Hello!')
 */
export default class Dialog extends React.Component <Props, State> {
  static readonly DEFAULT_OPTIONS = {
    defaultOkLabel: 'OK',
    defaultCancelLabel: 'Cancel',
    primaryClassName: 'btn-primary',
    defaultButtonClassName: 'btn-default btn-outline-secondary'
  }
  static options: DialogOptions = Dialog.DEFAULT_OPTIONS
  promptInput: PromptInput | null = null
  keyBinds: DialogKeyBinds |  null = {}

  static Action = (label: DialogActionLabel | null | undefined, func: DialogActionCallback | null | undefined, className: string | null | undefined, key: DialogKey) => new DialogAction(label, func, className, key)
  static DefaultAction = (label: DialogActionLabel | null | undefined, func: DialogActionCallback | null | undefined, className: string | null | undefined) => new DialogAction(label, func, className && className.length > 0 ? className : Dialog.options.primaryClassName, 'enter')
  static OKAction = (func: DialogActionCallback | null | undefined) => new DialogAction(Dialog.options.defaultOkLabel, (dialog) => { dialog.hide(); func && func(dialog) }, Dialog.options.primaryClassName, 'enter')
  static CancelAction = (func: DialogActionCallback | null | undefined) => new DialogAction(Dialog.options.defaultCancelLabel, (dialog) => { dialog.hide(); func && func(dialog) }, null, 'esc')
  static SingleOKAction = () => new DialogAction(Dialog.options.defaultOkLabel, (dialog) => { dialog.hide() }, Dialog.options.primaryClassName, 'enter,esc')

  static TextPrompt = (options: DialogPromptOptions) => new TextPrompt(options)
  static PasswordPrompt = (options: DialogPromptOptions) => new PasswordPrompt(options)

  static displayName = 'Dialog'

  /**
   * Set default options for applying to all dialogs.
   * @param options
   */
  static setOptions (options: DialogOptions) {
    Dialog.options = Object.assign({}, Dialog.DEFAULT_OPTIONS, options)
  }

  /**
   * Reset default options to presets.
   */
  static resetOptions () {
    Dialog.options = Dialog.DEFAULT_OPTIONS
  }

  static initialState (): State {
    return {
      title: null,
      body: null,
      showModal: false,
      actions: [],
      bsSize: undefined,
      onHide: null,
      prompt: null
    }
  }

  constructor (props: Props) {
    super(props)
    this.state = Dialog.initialState()
    this.onHide = this.onHide.bind(this)
    this.onSubmitPrompt = this.onSubmitPrompt.bind(this)
  }

  componentWillUnmount () {
    if (this.state.showModal) {
      this.hide()
    }
  }

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
  show (options: DialogOptions = {}) {
    let keyBinds: DialogKeyBinds = {}
    let { actions = [] } = options
    actions.forEach((action) => {
      if (action.key) {
        action.key.split(',').forEach((key) => {
          keyBinds[key] = () => { action.func && action.func(this) }
        })
      }
    })
    // TODO: Add keybinds
    this.keyBinds = keyBinds
    options['showModal'] = true
    this.setState(Dialog.initialState())
    this.setState(options)
  }

  /**
   * Show message dialog This is similar to `window.alert`.
   * @param body The body of message.
   * @param bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
   */
  showAlert (body: DialogBody, bsSize = undefined) {
    const options = {
      body: body,
      actions: [
        Dialog.SingleOKAction()
      ],
      bsSize: bsSize
    }
    this.show(options)
  }

  onHide () {
    const onHide = this.state.onHide
    if (typeof onHide === 'function') {
      onHide(this)
    } else {
      this.hide()
    }
  }

  /**
   * Hide this dialog.
   */
  hide () {
    if (!this.state.showModal) return
    // TODO: Remove keybinds
    this.setState({showModal: false})
  }

  /**
   * Get the value in prompt.
   * @return {string, null}
   */
  get value () {
    if (this.promptInput) {
      return this.promptInput.value
    }
    return null
  }

  onSubmitPrompt () {
    const action = this.keyBinds && this.keyBinds['enter']
    action && action()
  }

  getSize (defaultSize?: DialogBsSize | null) {
    return (typeof this.state.bsSize) === 'undefined' ? defaultSize : (this.state.bsSize === 'medium' ? null : this.state.bsSize)
  }

  render () {
    // XXX: Check current ReactBootstrap v4, or not.
    const isLaterV4 = !!ReactBootstrap['Card']
    const additionalProps = (
      isLaterV4 ? {
        size: this.getSize('sm')
      } : {
        bsSize: this.getSize('small')
      }
    )
    return (
      <Modal show={this.state.showModal} onHide={this.onHide} {...additionalProps}>
        {
          this.state.title && (
            <Modal.Header>
              <Modal.Title>
                {this.state.title}
              </Modal.Title>
            </Modal.Header>
          )
        }
        <Modal.Body>
          {
            typeof this.state.body === 'string'
              ? (<p>{this.state.body}</p>)
              : this.state.body
          }
          {
            this.state.prompt && (
              <PromptInput
                ref={(el) => { this.promptInput = el }}
                prompt={this.state.prompt}
                onSubmit={this.onSubmitPrompt}
              />
            )
          }
        </Modal.Body>
        <Modal.Footer>
          {
            this.state.actions && this.state.actions.map((action, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  className={`btn btn-sm ${action.className}`}
                  onClick={() => { action.func && action.func(this) }}
                  style={{minWidth: 82}}>
                  {action.label}
                </button>
              )
            })
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

/**
 * The class to construct a choice for Dialog.
 * Use `Dialog.Action(options)`.
 */
export class DialogAction {
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
  constructor (label: DialogActionLabel | null | undefined, func: DialogActionCallback | null | undefined, className: string | null |undefined, key: DialogKey | null | undefined) {
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
