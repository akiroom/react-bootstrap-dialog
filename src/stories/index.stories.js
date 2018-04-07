import React from 'react'
import { storiesOf } from '@storybook/react'
import 'bootstrap/dist/css/bootstrap.css'
import ShowAlert from './samples/ShowAlert'
import ShowOkCancelDialog from './samples/ShowOkCancelDialog'
import ShowWithOnHide from './samples/ShowWithOnHide'
import ShowWarningDialog from './samples/ShowWarningDialog'
import ShowCustomDialog from './samples/ShowCustomDialog'
import ShowDialogWithChangedOptions from './samples/ShowDialogWithChangedOptions'
import ShowWithTextInput from './samples/ShowWithTextInput'

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <div style={{margin: '20px'}}>
      {story()}
    </div>
  ))
  .add('Alert', () => (<ShowAlert />))
  .add('OK/Cancel', () => (<ShowOkCancelDialog />))
  .add('onHide event', () => (<ShowWithOnHide />))
  .add('Warning dialog', () => (<ShowWarningDialog />))
  .add('Custom dialog', () => (<ShowCustomDialog />))
  .add('Global options', () => (<ShowDialogWithChangedOptions />))
  .add('Text input', () => (<ShowWithTextInput />))
