# React Bootstrap Dialog Component

[![Build Status](https://travis-ci.org/akiroom/react-bootstrap-dialog.svg?branch=master)](https://travis-ci.org/akiroom/react-bootstrap-dialog)

It's a dialog component for react-bootstrap. It's a configurable and easy in your React application.

See [Demo storybook](https://akiroom.github.io/react-bootstrap-dialog/)


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

### Full sample

See [stories/samples](https://github.com/akiroom/react-bootstrap-dialog/tree/master/src/stories/samples)
