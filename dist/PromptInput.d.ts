import React from 'react';
import { DialogPrompt } from './Prompts';
interface Props {
    prompt: DialogPrompt;
    onSubmit: () => void;
}
interface State {
    value: string;
    initialValue?: string;
    placeholder?: string;
}
export default class PromptInput extends React.Component<Props, State> {
    formElement: HTMLFormElement | null;
    inputElement: HTMLInputElement | null;
    constructor(props: Props);
    componentDidMount(): void;
    readonly value: string;
    checkValidity(): boolean;
    onSubmit(e: React.FormEvent<HTMLFormElement>): boolean;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=PromptInput.d.ts.map