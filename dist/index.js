"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var Prompts_1 = require("./Prompts");
var PromptInput_1 = __importDefault(require("./PromptInput"));
var DialogAction_1 = __importDefault(require("./DialogAction"));
// XXX: Check current ReactBootstrap v4 later, or not.
var isLaterV4 = function () {
    var anyModal = react_bootstrap_1.Modal; // eslint-disable-line @typescript-eslint/no-explicit-any
    return !(anyModal.childContextTypes);
}();
/**
 * The modal dialog which can be altenative to `window.confirm` and `window.alert`.
 * @example <Dialog ref={(el) => {this.dialog = el} />
 * @example this.dialog.show({body: 'Hello!', actions: [Dialog.Action('do', () => console.log('ok'))]})
 * @example this.dialog.showAlert('Hello!')
 */
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.promptInput = null;
        _this.keyBinds = {};
        _this.state = Dialog.initialState();
        _this.onHide = _this.onHide.bind(_this);
        _this.onSubmitPrompt = _this.onSubmitPrompt.bind(_this);
        return _this;
    }
    /**
     * Set default options for applying to all dialogs.
     * @param options
     */
    Dialog.setOptions = function (options) {
        Dialog.options = Object.assign({}, Dialog.DEFAULT_OPTIONS, options);
    };
    /**
     * Reset default options to presets.
     */
    Dialog.resetOptions = function () {
        Dialog.options = Dialog.DEFAULT_OPTIONS;
    };
    Dialog.initialState = function () {
        return {
            title: null,
            body: null,
            showModal: false,
            actions: [],
            bsSize: undefined,
            onHide: null,
            prompt: null
        };
    };
    Dialog.prototype.componentWillUnmount = function () {
        if (this.state.showModal) {
            this.hide();
        }
    };
    /**
     * Show dialog with choices. This is similar to `window.confirm`.
     * @param options Object for dialog options.
     * @param options.title The title of dialog.
     * @param options.body The body of message.
     * @param options.actions {DialogAction} The choices for presenting to user.
     * @param options.bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
     * @param options.onHide {function} The method to call when the dialog was closed by clicking background.
     * @param options.prompt {[null, Prompt]} Use prompt for text input or password input.
     */
    Dialog.prototype.show = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var keyBinds = {};
        var newOptions = Object.assign({}, options);
        var actions = newOptions.actions, prompt = newOptions.prompt;
        // If has prompt and click button assigned enter key,
        // Execute validation at first.
        if (actions && prompt) {
            newOptions.actions = actions.map(function (action) {
                var key = action.key;
                if (!(key && key.includes('enter'))) {
                    // Not enter button, so return
                    return action;
                }
                // It's enter button, let's validate
                var newAction = Object.assign({}, action);
                newAction.func = function (dialog) {
                    if (!(dialog.promptInput && dialog.promptInput.checkValidity())) {
                        return false;
                    }
                    action.func(_this);
                };
                return newAction;
            });
        }
        // Setup key binds
        newOptions.actions && newOptions.actions.forEach(function (action) {
            if (action.key) {
                action.key.split(',').forEach(function (key) {
                    keyBinds[key] = function () { action.func(_this); };
                });
            }
        });
        // TODO: Add keybinds
        this.keyBinds = keyBinds;
        this.setState(Object.assign({}, Dialog.initialState(), newOptions, { showModal: true }));
    };
    /**
     * Show message dialog This is similar to `window.alert`.
     * @param body The body of message.
     * @param bsSize {[null, 'medium', 'large', 'small']} The width size for dialog.
     */
    Dialog.prototype.showAlert = function (body, bsSize) {
        if (bsSize === void 0) { bsSize = undefined; }
        var options = {
            body: body,
            actions: [
                Dialog.SingleOKAction()
            ],
            bsSize: bsSize
        };
        this.show(options);
    };
    Dialog.prototype.onHide = function () {
        var onHide = this.state.onHide;
        if (typeof onHide === 'function') {
            onHide(this);
        }
        else {
            this.hide();
        }
    };
    /**
     * Hide this dialog.
     */
    Dialog.prototype.hide = function () {
        if (!this.state.showModal)
            return;
        // TODO: Remove keybinds
        this.setState({ showModal: false });
    };
    Object.defineProperty(Dialog.prototype, "value", {
        /**
         * Get the value in prompt.
         * @return {string, null}
         */
        get: function () {
            if (this.promptInput) {
                return this.promptInput.value;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.onSubmitPrompt = function () {
        var action = this.keyBinds && this.keyBinds['enter'];
        action && action();
    };
    Dialog.prototype.getSize = function (defaultSize) {
        return (typeof this.state.bsSize) === 'undefined' ? defaultSize : (this.state.bsSize === 'medium' ? null : this.state.bsSize);
    };
    Dialog.prototype.render = function () {
        var _this = this;
        var additionalProps = (isLaterV4 ? {
            size: this.getSize('sm')
        } : {
            bsSize: this.getSize('small')
        });
        return (react_1.default.createElement(react_bootstrap_1.Modal, __assign({ show: this.state.showModal, onHide: this.onHide }, additionalProps),
            this.state.title && (react_1.default.createElement(react_bootstrap_1.Modal.Header, null,
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, this.state.title))),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                typeof this.state.body === 'string'
                    ? (react_1.default.createElement("p", null, this.state.body))
                    : this.state.body,
                this.state.prompt && (react_1.default.createElement(PromptInput_1.default, { ref: function (el) { _this.promptInput = el; }, prompt: this.state.prompt, onSubmit: this.onSubmitPrompt }))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null, this.state.actions && this.state.actions.map(function (action, index) {
                return (react_1.default.createElement("button", { key: index, type: 'button', className: "btn btn-sm " + action.className, onClick: function () { action.func && action.func(_this); }, style: { minWidth: 82 } }, action.label));
            }))));
    };
    Dialog.DEFAULT_OPTIONS = {
        defaultOkLabel: 'OK',
        defaultCancelLabel: 'Cancel',
        primaryClassName: 'btn-primary',
        defaultButtonClassName: 'btn-default btn-outline-secondary'
    };
    Dialog.options = Dialog.DEFAULT_OPTIONS;
    Dialog.Action = function (label, func, className, key) { return new DialogAction_1.default(label, func, className, key); };
    Dialog.DefaultAction = function (label, func, className) { return new DialogAction_1.default(label, func, className && className.length > 0 ? className : Dialog.options.primaryClassName, 'enter'); };
    Dialog.OKAction = function (func) { return new DialogAction_1.default(Dialog.options.defaultOkLabel, function (dialog) { dialog.hide(); func && func(dialog); }, Dialog.options.primaryClassName, 'enter'); };
    Dialog.CancelAction = function (func) { return new DialogAction_1.default(Dialog.options.defaultCancelLabel, function (dialog) { dialog.hide(); func && func(dialog); }, null, 'esc'); };
    Dialog.SingleOKAction = function () { return new DialogAction_1.default(Dialog.options.defaultOkLabel, function (dialog) { dialog.hide(); }, Dialog.options.primaryClassName, 'enter,esc'); };
    Dialog.TextPrompt = function (options) { return new Prompts_1.TextPrompt(options); };
    Dialog.PasswordPrompt = function (options) { return new Prompts_1.PasswordPrompt(options); };
    Dialog.displayName = 'Dialog';
    return Dialog;
}(react_1.default.Component));
exports.default = Dialog;
//# sourceMappingURL=index.js.map