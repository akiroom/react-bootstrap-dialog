
/**
 * The class to represent prompt options
 */
export class Prompt {
  constructor (options = {}) {
    const {initialValue, placeholder} = options
    this.initialValue = initialValue
    this.placeholder = placeholder
  }
}

/**
 * The class to represent text prompt options
 */
export class TextPrompt extends Prompt {
}

/**
 * The class to represent passowrd prompt options
 */
export class PasswordPrompt extends Prompt {
}
