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

[![https://gyazo.com/692770a97d1181e7c11cfe3687ad1bbf](https://i.gyazo.com/692770a97d1181e7c11cfe3687ad1bbf.gif)](https://gyazo.com/692770a97d1181e7c11cfe3687ad1bbf)

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

### Full sample

See [stories/samples](https://github.com/akiroom/react-bootstrap-dialog/tree/master/src/stories/samples)
