import React from 'react'
import {DialogPrompt, PasswordPrompt} from './Prompts'

interface Props {
  prompt: DialogPrompt;
  onSubmit: () => void;
}
interface State {
  value: string;
  initialValue?: string;
  placeholder?: string;
}

export default class PromptInput extends React.Component <Props, State> {
  formElement: HTMLFormElement | null = null
  inputElement: HTMLInputElement | null = null

  constructor (props: Props) {
    super(props)
    const {initialValue, placeholder} = props.prompt
    this.state = {
      value: initialValue || '',
      initialValue,
      placeholder
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({value: this.state.initialValue || ''}, () => {
      this.inputElement && this.inputElement.select()
    })
  }

  get value () {
    return this.state.value
  }

  onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (this.formElement) {
      if (!this.formElement.checkValidity()) {
        return false
      }
    }
    this.props.onSubmit && this.props.onSubmit()
    return false
  }

  render () {
    const {prompt} = this.props
    const {value, placeholder} = this.state
    const type = (prompt instanceof PasswordPrompt) ? 'password' : 'text'
    return (
      <form ref={(el) =>{ this.formElement = el }} onSubmit={this.onSubmit}>
        <input
          ref={(el) => { this.inputElement = el }}
          type={type}
          className='form-control'
          value={value}
          placeholder={placeholder}
          onChange={(e) => this.setState({value: e.target.value})}
          required={prompt.required}
          autoFocus
        />
      </form>
    )
  }
}
