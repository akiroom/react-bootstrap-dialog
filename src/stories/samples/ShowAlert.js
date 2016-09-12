import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../index'
import { action } from '@kadira/storybook'

export default class ShowAlert extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
    this.onClickWithHandler = this.onClickWithHandler.bind(this)
  }

  onClick () {
    this.refs.dialog.showAlert('Hello Dialog!')
  }

  onClickWithHandler () {
    this.refs.dialog.show({
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
          <Button onClick={this.onClickWithHandler}>Show alert with handler</Button>
        </p>

        <Dialog ref='dialog' />
      </div>
    )
  }
}
