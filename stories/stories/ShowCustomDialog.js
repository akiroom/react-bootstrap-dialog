import { action } from '@storybook/addon-actions'
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from '../../src/index'

export default class ShowCustomDialog extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const customBody = (
      <p>
        <span className='text-primary'>This custom sample</span> for
        dialog and labels.
      </p>
    )

    this.dialog.show({
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
          <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>Success</span>,
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
        <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    )
  }
}
