"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_service_1 = require("../common/services/utils/utils.service");
var core_1 = require("@angular/core");
var DatePickerDirectiveService = (function () {
    function DatePickerDirectiveService(utilsService) {
        this.utilsService = utilsService;
    }
    DatePickerDirectiveService.prototype.convertToHTMLElement = function (attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    };
    DatePickerDirectiveService.prototype.getConfig = function (config, baseElement, attachTo) {
        if (config === void 0) { config = {}; }
        var _config = __assign({}, config);
        _config.hideInputContainer = true;
        if (baseElement) {
            _config.inputElementContainer = attachTo
                ? this.convertToHTMLElement(attachTo, baseElement.nativeElement)
                : baseElement.nativeElement;
        }
        return _config;
    };
    DatePickerDirectiveService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DatePickerDirectiveService.ctorParameters = function () { return [
        { type: utils_service_1.UtilsService, },
    ]; };
    return DatePickerDirectiveService;
}());
exports.DatePickerDirectiveService = DatePickerDirectiveService;
//# sourceMappingURL=date-picker-directive.service.js.map