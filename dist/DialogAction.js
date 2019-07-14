"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
/**
 * The class to construct a choice for Dialog.
 * Use `Dialog.Action(options)`.
 */
var DialogAction = /** @class */ (function () {
    /**
       * Constructor
       * @param label The text or node for button. Default is `OK`.
       * @param func The function to execute when button is clicked. Default is null.
       * @param className The class name for button. Default is ''.
       */
    function DialogAction(label, func, className, key) {
        this.label = label || index_1.default.options.defaultOkLabel;
        this._func = func;
        this.className = className || index_1.default.options.defaultButtonClassName || index_1.default.DEFAULT_OPTIONS.defaultButtonClassName;
        this.key = key;
    }
    DialogAction.prototype.func = function (dialog) {
        dialog.hide();
        this._func && this._func(dialog);
    };
    return DialogAction;
}());
exports.default = DialogAction;
//# sourceMappingURL=DialogAction.js.map