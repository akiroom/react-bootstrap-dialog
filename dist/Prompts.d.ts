export interface DialogPromptOptions {
    initialValue?: string;
    placeholder?: string;
}
/**
 * The class to represent prompt options
 */
export declare class DialogPrompt {
    initialValue?: string;
    placeholder?: string;
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