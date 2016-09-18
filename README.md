# React Bootstrap Dialog Component

[![Build Status](https://travis-ci.org/akiroom/react-bootstrap-dialog.svg?branch=master)](https://travis-ci.org/akiroom/react-bootstrap-dialog)

It's a dialog component for react-bootstrap. It's a configurable and easy in your React application.


## Screenshots

| Default Alert | Default Dialog | Custom Dialog |
|---------------|----------------|---------------|
| Instead of `window.alert` | Instead of `window.confirm` | Full customized |
| [![https://gyazo.com/84e315aca42ac4dbe39e51ce3451bb53](https://i.gyazo.com/84e315aca42ac4dbe39e51ce3451bb53.gif)](https://gyazo.com/84e315aca42ac4dbe39e51ce3451bb53) | [![https://gyazo.com/f8e8bfd41d9c652a55ed06a0828dc57e](https://i.gyazo.com/f8e8bfd41d9c652a55ed06a0828dc57e.gif)](https://gyazo.com/f8e8bfd41d9c652a55ed06a0828dc57e) | [![https://gyazo.com/d9c073c6c7d66c05e5398f386345f452](https://i.gyazo.com/d9c073c6c7d66c05e5398f386345f452.gif)](https://gyazo.com/d9c073c6c7d66c05e5398f386345f452) |

## Example

- See [Demos on storybook](https://akiroom.github.io/react-bootstrap-dialog/)
- The example codes are in [/src/stories/samples](https://github.com/akiroom/react-bootstrap-dialog/tree/master/src/stories/samples)

## Install 
```sh
npm i react-bootstrap-dialog --save
```

### Quick start

Step 1. Import package.

```js
import Dialog from 'react-bootstrap-dialog'
```

Step 2. Write jsx in `render` method.

```html
<Dialog ref="dialog" />
```

Step 3. Call `showAlert` method or `show` method.

```js
this.refs.dialog.showAlert('Hello Dialog!')
```

This code is full code for these steps.

```js
import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'

export default class SampleCode extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.refs.dialog.showAlert('Hello Dialog!')
  }

  render () {
    return (
      <div>
        <Button onClick={this.onClick}>Show alert</Button>
        <Dialog ref='dialog' />
      </div>
    )
  }
}

```

## Documents

### Atrributes on `<Dialog />`

You need to use only `ref` attribute, to call a dialog function.

### Functions on `<Dialog />`

