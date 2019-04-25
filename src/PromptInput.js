import React from 'react'
import {PasswordPrompt} from './Prompts'

export default class PromptInput extends React.Component {
  constructor (props) {
    super(props)
    const {initialValue, placeholder, required} = props.prompt
    this.state = {
      value: initialValue || '',
      initialValue,
      placeholder,
	  required
    }
    this.inputElement = null
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({value: this.state.initialValue || ''}, () => {
      this.inputElement.select()
    })
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
    const {value, placeholder,required} = this.state
    const type = (prompt instanceof PasswordPrompt) ? 'password' : 'text'
    return (
      <form onSubmit={this.onSubmit}>
        <input
          ref={(el) => { this.inputElement = el }}
          type={type}
          className='form-control'
          value={value}
          placeholder={placeholder}
          onChange={(e) => this.setState({value: e.target.value})}
          autoFocus
		  required={required}
        />
      </form>
    )
  }
}
