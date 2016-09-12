import React from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import Dialog from '../../index'
import { action } from '@kadira/storybook'

export default class ShowCustomDialog extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const customBody = (
      <p>
        <Glyphicon glyph='flag' />
        &nbsp;
        <span className='text-primary'>This custom sample</span> for
        dialog and labels.
      </p>
    )

    this.refs.dialog.show({
      body: customBody,
      bsSize: 'medium',
      actions: [
        Dialog.CancelAction(),
        Dialog.Action(
          'Normal',
          () => action('Normal button was clicked!')()
        ),
        Dialog.Action(
          'Warning',
          () => action('Warning button was clicked!')(),
          'btn-warning'
        ),
        Dialog.Action(
          'Info',
          () => action('Info button was clicked!')(),
          'btn-info'
        ),
        Dialog.Action(
          <span><Glyphicon glyph='star' />&nbsp;Success</span>,
          () => action('Success button was clicked!')(),
          'btn-success'
        )
      ]
    })
  }

  render () {
    return (
      <div>
        <p>
          <Button onClick={this.onClick}>Show custom dialog</Button>
        </p>
        <Dialog ref='dialog' />
      </div>
    )
  }
}
