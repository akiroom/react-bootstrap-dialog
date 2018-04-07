import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../index'

export default class ShowWithTextInput extends React.Component {
  constructor () {
    super()
    this.showTextInput = this.showTextInput.bind(this)
    this.showPasswordInput = this.showPasswordInput.bind(this)
  }

  showTextInput () {
    this.dialog.show({
      body: 'Input the message.',
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

  showPasswordInput () {
    this.dialog.show({
      body: 'Input the password.',
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

  render () {
    return (
      <div>
        <p>
          <Button onClick={this.showTextInput}>Show dialog with text input</Button>
        </p>
        <p>
          <Button onClick={this.showPasswordInput}>Show dialog with password input</Button>
        </p>

        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
