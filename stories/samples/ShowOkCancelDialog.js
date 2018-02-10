import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowOkCancelDialog extends React.Component {
  constructor () {
    super()
    this.onClickOkCancel = this.onClickOkCancel.bind(this)
    this.onClickOkCancelWithHandler = this.onClickOkCancelWithHandler.bind(this)
  }

  onClickOkCancel () {
    this.dialog.show({
      body: 'Ok button has handler.',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          action('ok button was clicked!')()
        })
      ]
    })
  }

  onClickOkCancelWithHandler () {
    this.dialog.show({
      body: 'Ok button and cancel button have handlers',
      actions: [
        Dialog.CancelAction(() => {
          action('cancel button was clicked!')()
        }),
        Dialog.OKAction(() => {
          action('ok button was clicked!')()
        })
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button onClick={this.onClickOkCancel}>Show ok cancel dialog</Button>
        </p>
        <p>
          <Button onClick={this.onClickOkCancelWithHandler}>Show ok cancel dialog with cancel handler</Button>
        </p>

        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
