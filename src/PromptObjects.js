
/**
 * The class to represent prompt options
 */
export class PromptObject {
  constructor (options) {
    const {initialValue, placeholder} = options
    this.initialValue = initialValue
    this.placeholder = placeholder
  }
}

/**
 * The class to represent text prompt options
 */
export class TextPromptObject extends PromptObject {
}

/**
 * The class to represent passowrd prompt options
 */
export class PasswordPromptObject extends PromptObject {
}
