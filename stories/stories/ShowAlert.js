import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowAlert extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
    this.onClickWithEventHandler = this.onClickWithEventHandler.bind(this)
  }

  onClick () {
    this.dialog.showAlert('Hello Dialog!')
  }

  onClickWithEventHandler () {
    this.dialog.show({
      body: 'Take it easy.',
      actions: [
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
          <Button onClick={this.onClick}>Show alert</Button>
        </p>
        <p>
          <Button onClick={this.onClickWithEventHandler}>Show alert with event handler</Button>
        </p>

        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
