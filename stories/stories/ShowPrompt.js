import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowPrompt extends React.Component {
  showTextInput = () => {
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

  showTextInputWithOptions = () => {
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

  showTextInputWithRequiredOption = () => {
    this.dialog.show({
      body: 'Try enter with empty. The input field shows validation error.',
      prompt: Dialog.TextPrompt({placeholder: 'name', initialValue: '', required: true}),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction((dialog) => {
          const result = dialog.value
          action(`okay! result is "${result}".`)()
        })
      ]
    })
  }

  showPasswordInput = () => {
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

  showPasswordInputWithOptions = () => {
    this.dialog.show({
      body: 'Input your password.',
      prompt: Dialog.PasswordPrompt({placeholder: 'secret', initialValue: 'abcd', required: true}),
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
        <p>
          <Button onClick={this.showTextInputWithRequiredOption}>Text input with required option</Button>
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
