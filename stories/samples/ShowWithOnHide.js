import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowWithOnHide extends React.Component {
  constructor () {
    super()
    this.onClickWithOnHide = this.onClickWithOnHide.bind(this)
    this.onClickWithPreventBackground = this.onClickWithPreventBackground.bind(this)
  }

  onClickWithOnHide () {
    this.dialog.show({
      body: 'Hello.',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction()
      ],
      onHide: (dialog) => {
        dialog.hide()
        action('The dialog was closed by clicking background.')()
      }
    })
  }

  onClickWithPreventBackground () {
    this.dialog.show({
      body: 'Hello.',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction()
      ],
      onHide: (dialog) => {
        action('The dialog prevented closing by clicking background.')()
      }
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button onClick={this.onClickWithOnHide}>Show dialog with onHide</Button>
        </p>
        <p>
          <Button onClick={this.onClickWithPreventBackground}>Show dialog with preventing closing by clicking background</Button>
        </p>

        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
