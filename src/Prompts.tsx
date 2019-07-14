export interface DialogPromptOptions {
  initialValue?: string;
  placeholder?: string;
}

/**
 * The class to represent prompt options
 */
export class DialogPrompt {
  initialValue?: string
  placeholder?: string

  constructor (options: DialogPromptOptions = {}) {
    const {initialValue, placeholder} = options
    this.initialValue = initialValue
    this.placeholder = placeholder
  }
}

/**
 * The class to represent text prompt options
 */
export class TextPrompt extends DialogPrompt {
}

/**
 * The class to represent passowrd prompt options
 */
export class PasswordPrompt extends DialogPrompt {
}
