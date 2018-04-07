import React from 'react'
import {PasswordPromptObject} from './PromptObjects'

export default class PromptInput extends React.Component {
  constructor (props) {
    super(props)
    const {initialValue, placeholder} = props.prompt
    this.state = {
      value: initialValue,
      initialValue, placeholder
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({value: this.state.initialValue || ''})
  }

  get value () {
    return this.state.value
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit && this.props.onSubmit()
    return false
  }

  render () {
    const {prompt} = this.props
    const {value, placeholder} = this.state
    const type = (prompt instanceof PasswordPromptObject) ? 'password' : 'text'
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type={type}
          className='form-control'
          value={value}
          placeholder={placeholder}
          onChange={(e) => this.setState({value: e.target.value})}
          autoFocus
        />
      </form>
    )
  }
}
