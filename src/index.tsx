import React from 'react'
import {Modal} from 'react-bootstrap'
import {TextPrompt, PasswordPrompt, DialogPrompt, DialogPromptOptions} from './Prompts'
import PromptInput from './PromptInput'
import DialogAction, {DialogActionCallback, DialogActionLabel, DialogActionKey} from './DialogAction'

// XXX: Check current ReactBootstrap v4 later, or not.

const isLaterV4: boolean = function () {
  const anyModal: any = Modal  // eslint-disable-line @typescript-eslint/no-explicit-any
  return !(anyModal.childContextTypes)
}()

type DialogTitle = React.ReactNode
type DialogBody = React.ReactNode
type DialogOnHideClalback = ((dialog: Dialog) => void)
interface DialogKeyBinds {[id: string]: Function}
/**
 * DialogBsSize has any type.
 * Because react-bootstrap has different types between v3 and v4.
 *
 * e.g.
 * v3 earlier has "small"
 * v4 later has "sm"
 */
type DialogBsSize = any // eslint-disable-line @typescript-eslint/no-explicit-any

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
/*
   * @param options.title The title of dialog.
   * @param options.body The body of message.
   * @param options.actions {DialogAction} The choices for presenting to user.
   * @param options.bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
   * @param options.onHide {function} The method to call when the dialog was closed by clicking background.
   * @param options.prompt {[null, Prompt]} Use prompt for text input or password input.

 */
interface Props {
  centered?: boolean;
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
export default class Dialog extends React.Component <Props, State> {
  static readonly DEFAULT_OPTIONS = {
    defaultOkLabel: 'OK',
    defaultCancelLabel: 'Cancel',
    primaryClassName: 'btn-primary',
    defaultButtonClassName: 'btn-default btn-outline-secondary'
  }
  static options: DialogGlobalOptions = Dialog.DEFAULT_OPTIONS
  promptInput: PromptInput | null = null
  keyBinds: DialogKeyBinds |  null = {}

  static Action = (label?: DialogActionLabel | null, func?: DialogActionCallback | null, className?: string | null, key?: DialogActionKey | null) => new DialogAction(label, func, className, key)
  static DefaultAction = (label?: DialogActionLabel | null, func?: DialogActionCallback | null, className?: string | null) => new DialogAction(label, func, className && className.length > 0 ? className : Dialog.options.primaryClassName, 'enter')
  static OKAction = (func?: DialogActionCallback | null) => new DialogAction(Dialog.options.defaultOkLabel, (dialog) => { dialog.hide(); func && func(dialog) }, Dialog.options.primaryClassName, 'enter')
  static CancelAction = (func?: DialogActionCallback | null) => new DialogAction(Dialog.options.defaultCancelLabel, (dialog) => { dialog.hide(); func && func(dialog) }, null, 'esc')
  static SingleOKAction = () => new DialogAction(Dialog.options.defaultOkLabel, (dialog) => { dialog.hide() }, Dialog.options.primaryClassName, 'enter,esc')

  static TextPrompt = (options: DialogPromptOptions) => new TextPrompt(options)
  static PasswordPrompt = (options: DialogPromptOptions) => new PasswordPrompt(options)

  static displayName = 'Dialog'

  /**
   * Set default options for applying to all dialogs.
   * @param options
   */
  static setOptions (options: DialogGlobalOptions) {
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
  public show (options: DialogOptions = {}) {
    const keyBinds: DialogKeyBinds = {}
    const newOptions = Object.assign({}, options)
    const { actions, prompt } = newOptions

    // If has prompt and click button assigned enter key,
    // Execute validation at first.
    if (actions && prompt) {
      newOptions.actions = actions.map((action) => {
        const { key } = action
        if (!(key && key.includes('enter'))) {
          // Not enter button, so return
          return action
        }

        // It's enter button, let's validate
        const newAction = Object.assign({}, action)
        newAction.func = (dialog: Dialog) => {
          if (!(dialog.promptInput && dialog.promptInput.checkValidity())) {
            return false
          }
          action.func(this)
        }
        return newAction
      })
    }

    // Setup key binds
    newOptions.actions && newOptions.actions.forEach((action) => {
      if (action.key) {
        action.key.split(',').forEach((key) => {
          keyBinds[key] = () => { action.func(this) }
        })
      }
    })
    // TODO: Add keybinds
    this.keyBinds = keyBinds
    this.setState(
      Object.assign(
        {},
        Dialog.initialState(),
        newOptions,
        { showModal: true }
      )
    )
  }

  /**
   * Show message dialog This is similar to `window.alert`.
   * @param body The body of message.
   * @param bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
   */
  public showAlert (body: DialogBody, bsSize = undefined) {
    const options = {
      body: body,
      actions: [
        Dialog.SingleOKAction()
      ],
      bsSize: bsSize
    }
    this.show(options)
  }

  private onHide () {
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
  public hide () {
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

  private onSubmitPrompt () {
    const action = this.keyBinds && this.keyBinds['enter']
    action && action()
  }

  private getSize (defaultSize?: DialogBsSize | null) {
    return (typeof this.state.bsSize) === 'undefined' ? defaultSize : (this.state.bsSize === 'medium' ? null : this.state.bsSize)
  }

  render () {
    const additionalProps = (
      isLaterV4 ? {
        size: this.getSize('sm')
      } : {
        bsSize: this.getSize('small')
      }
    )
    return (
      <Modal show={this.state.showModal} onHide={this.onHide} centered={this.props.centered} {...additionalProps}>
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
