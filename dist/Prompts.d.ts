export interface DialogPromptOptions {
    initialValue?: string;
    placeholder?: string;
    required?: boolean;
}
/**
 * The class to represent prompt options
 */
export declare class DialogPrompt {
    initialValue?: string;
    placeholder?: string;
    required?: boolean;
    constructor(options?: DialogPromptOptions);
}
/**
 * The class to represent text prompt options
 */
export declare class TextPrompt extends DialogPrompt {
}
/**
 * The class to represent passowrd prompt options
 */
export declare class PasswordPrompt extends DialogPrompt {
}
//# sourceMappingURL=Prompts.d.ts.map