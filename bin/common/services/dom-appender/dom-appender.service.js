"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DomHelper = (function () {
    function DomHelper() {
    }
    DomHelper.setYAxisPosition = function (element, container, anchor, drops) {
        var anchorRect = anchor.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        var bottom = anchorRect.bottom - containerRect.top;
        var top = anchorRect.top - containerRect.top;
        if (drops === 'down') {
            element.style.top = (bottom - 1 + 'px');
        }
        else {
            element.style.top = (top + 1 - element.scrollHeight) + 'px';
        }
    };
    DomHelper.setXAxisPosition = function (element, container, anchor, dimElem, opens) {
        var anchorRect = anchor.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        var left = anchorRect.left - containerRect.left;
        if (opens === 'right') {
            element.style.left = left + 'px';
        }
        else {
            element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
        }
    };
    DomHelper.isTopInView = function (el) {
        var top = el.getBoundingClientRect().top;
        return (top >= 0);
    };
    DomHelper.isBottomInView = function (el) {
        var bottom = el.getBoundingClientRect().bottom;
        return (bottom <= window.innerHeight);
    };
    DomHelper.isLeftInView = function (el) {
        var left = el.getBoundingClientRect().left;
        return (left >= 0);
    };
    DomHelper.isRightInView = function (el) {
        var right = el.getBoundingClientRect().right;
        return (right <= window.innerWidth);
    };
    DomHelper.prototype.appendElementToPosition = function (config) {
        var _this = this;
        var container = config.container, element = config.element;
        if (!container.style.position || container.style.position === 'static') {
            container.style.position = 'relative';
        }
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
        }
        element.style.visibility = 'hidden';
        setTimeout(function () {
            _this.setElementPosition(config);
            element.style.visibility = 'visible';
        });
    };
    DomHelper.prototype.setElementPosition = function (_a) {
        var element = _a.element, container = _a.container, anchor = _a.anchor, dimElem = _a.dimElem, drops = _a.drops, opens = _a.opens;
        DomHelper.setYAxisPosition(element, container, anchor, drops);
        DomHelper.setXAxisPosition(element, container, anchor, dimElem, opens);
        if (drops === 'down' && !DomHelper.isBottomInView(dimElem)) {
            DomHelper.setYAxisPosition(element, container, anchor, 'up');
        }
        if (drops === 'up' && !DomHelper.isTopInView(dimElem)) {
            DomHelper.setYAxisPosition(element, container, anchor, 'down');
        }
        if (opens === 'right' && !DomHelper.isRightInView(dimElem)) {
            DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'left');
        }
        if (opens === 'left' && !DomHelper.isLeftInView(dimElem)) {
            DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
        }
    };
    DomHelper.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DomHelper.ctorParameters = function () { return []; };
    return DomHelper;
}());
exports.DomHelper = DomHelper;
//# sourceMappingURL=dom-appender.service.js.map