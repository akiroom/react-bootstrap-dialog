import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowPrompt extends React.Component {
  constructor () {
    super()
    this.showTextInput = this.showTextInput.bind(this)
    this.showTextInputWithOptions = this.showTextInputWithOptions.bind(this)
    this.showPasswordInput = this.showPasswordInput.bind(this)
    this.showPasswordInputWithOptions = this.showPasswordInputWithOptions.bind(this)
  }

  showTextInput () {
    this.dialog.show({
      body: 'Input your message.',
      prompt: Dialog.TextPrompt(),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          action(`okay! result is "${result}".`)()
        })
      ]
    })
  }

  showTextInputWithOptions () {
    this.dialog.show({
      body: 'Input your message.',
      prompt: Dialog.TextPrompt({placeholder: 'name', initialValue: 'John Smith'}),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          action(`okay! result is "${result}".`)()
        })
      ]
    })
  }

  showPasswordInput () {
    this.dialog.show({
      body: 'Input your password.',
      prompt: Dialog.PasswordPrompt(),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          action(`okay! result is "${result}".`)()
        })
      ]
    })
  }

  showPasswordInputWithOptions () {
    this.dialog.show({
      body: 'Input your password.',
      prompt: Dialog.PasswordPrompt({placeholder: 'secret', initialValue: 'abcd'}),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          action(`okay! result is "${result}".`)()
        })
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button onClick={this.showTextInput}>Text input</Button>
        </p>
        <p>
          <Button onClick={this.showTextInputWithOptions}>Text input with options</Button>
        </p>
        <hr />
        <p>
          <Button onClick={this.showPasswordInput}>Password input</Button>
        </p>
        <p>
          <Button onClick={this.showPasswordInputWithOptions}>Password input with options</Button>
        </p>

        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
