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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class to represent prompt options
 */
var DialogPrompt = /** @class */ (function () {
    function DialogPrompt(options) {
        if (options === void 0) { options = {}; }
        var initialValue = options.initialValue, placeholder = options.placeholder, required = options.required;
        this.initialValue = initialValue;
        this.placeholder = placeholder;
        this.required = required;
    }
    return DialogPrompt;
}());
exports.DialogPrompt = DialogPrompt;
/**
 * The class to represent text prompt options
 */
var TextPrompt = /** @class */ (function (_super) {
    __extends(TextPrompt, _super);
    function TextPrompt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextPrompt;
}(DialogPrompt));
exports.TextPrompt = TextPrompt;
/**
 * The class to represent passowrd prompt options
 */
var PasswordPrompt = /** @class */ (function (_super) {
    __extends(PasswordPrompt, _super);
    function PasswordPrompt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PasswordPrompt;
}(DialogPrompt));
exports.PasswordPrompt = PasswordPrompt;
//# sourceMappingURL=Prompts.js.map