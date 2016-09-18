# React Bootstrap Dialog Component

[![Build Status](https://travis-ci.org/akiroom/react-bootstrap-dialog.svg?branch=master)](https://travis-ci.org/akiroom/react-bootstrap-dialog)

It's a dialog component for react-bootstrap. It's a configurable and easy in your React application.

See [Demo storybook](https://akiroom.github.io/react-bootstrap-dialog/)

## Screenshots

### Default alert

Instead of `window.alert`

[![https://gyazo.com/84e315aca42ac4dbe39e51ce3451bb53](https://i.gyazo.com/84e315aca42ac4dbe39e51ce3451bb53.gif)](https://gyazo.com/84e315aca42ac4dbe39e51ce3451bb53)

### Default dialog

Instead of `window.confirm`

[![https://gyazo.com/f8e8bfd41d9c652a55ed06a0828dc57e](https://i.gyazo.com/f8e8bfd41d9c652a55ed06a0828dc57e.gif)](https://gyazo.com/f8e8bfd41d9c652a55ed06a0828dc57e)

### Customized dialog

[![https://gyazo.com/3d327dc72e415088c942b4c28b5ff315](https://i.gyazo.com/3d327dc72e415088c942b4c28b5ff315.gif)](https://gyazo.com/3d327dc72e415088c942b4c28b5ff315)

## Install

```sh
npm i --save react-bootstrap-dialog
```

## Usage

### Quick start


(1) Import package.

```js
import Dialog from 'react-bootstrap-dialog'
```

(2) Write jsx in `render` method.

```html
<Dialog ref="dialog" />
```

(3) Call `showAlert` method or `show` method.

```js
this.refs.dialog.showAlert('Hello Dialog!')
```

This codes is full codes for (1), (2), (3).

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

### Full sample

See [stories/samples](https://github.com/akiroom/react-bootstrap-dialog/tree/master/src/stories/samples)
