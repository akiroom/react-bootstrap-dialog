import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowWarningDialog extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.dialog.show({
      body: 'Sample for dangerous operation (this sample does nothing).',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction(
          'Remove',
          () => {
            action('Remove button was clicked!')()
          },
          'btn-danger'
        )
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button onClick={this.onClick}>Show warning dialog</Button>
        </p>
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
