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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Prompts_1 = require("./Prompts");
var PromptInput = /** @class */ (function (_super) {
    __extends(PromptInput, _super);
    function PromptInput(props) {
        var _this = _super.call(this, props) || this;
        _this.formElement = null;
        _this.inputElement = null;
        var _a = props.prompt, initialValue = _a.initialValue, placeholder = _a.placeholder;
        _this.state = {
            value: initialValue || '',
            initialValue: initialValue,
            placeholder: placeholder
        };
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }
    PromptInput.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ value: this.state.initialValue || '' }, function () {
            _this.inputElement && _this.inputElement.select();
        });
    };
    Object.defineProperty(PromptInput.prototype, "value", {
        get: function () {
            return this.state.value;
        },
        enumerable: true,
        configurable: true
    });
    PromptInput.prototype.checkValidity = function () {
        var formElement = this.formElement;
        if (formElement) {
            if (!formElement.checkValidity()) {
                formElement.reportValidity();
                return false;
            }
        }
        return true;
    };
    PromptInput.prototype.onSubmit = function (e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            return false;
        }
        this.props.onSubmit && this.props.onSubmit();
        return false;
    };
    PromptInput.prototype.render = function () {
        var _this = this;
        var prompt = this.props.prompt;
        var _a = this.state, value = _a.value, placeholder = _a.placeholder;
        var type = (prompt instanceof Prompts_1.PasswordPrompt) ? 'password' : 'text';
        return (react_1.default.createElement("form", { ref: function (el) { _this.formElement = el; }, onSubmit: this.onSubmit },
            react_1.default.createElement("input", { ref: function (el) { _this.inputElement = el; }, type: type, className: 'form-control', value: value, placeholder: placeholder, onChange: function (e) { return _this.setState({ value: e.target.value }); }, required: prompt.required, autoFocus: true })));
    };
    return PromptInput;
}(react_1.default.Component));
exports.default = PromptInput;
//# sourceMappingURL=PromptInput.js.map