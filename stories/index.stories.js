import React from 'react'
import { storiesOf } from '@storybook/react'
import 'bootstrap/dist/css/bootstrap.css'
import ShowAlert from './stories/ShowAlert'
import ShowOkCancelDialog from './stories/ShowOkCancelDialog'
import ShowWithOnHide from './stories/ShowWithOnHide'
import ShowWarningDialog from './stories/ShowWarningDialog'
import ShowCustomDialog from './stories/ShowCustomDialog'
import ShowDialogWithChangedOptions from './stories/ShowDialogWithChangedOptions'
import ShowPrompt from './stories/ShowPrompt'

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
  .add('Prompt', () => (<ShowPrompt />))
