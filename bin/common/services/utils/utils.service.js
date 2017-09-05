"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calendar_value_enum_1 = require("../../types/calendar-value-enum");
var core_1 = require("@angular/core");
var moment = require("jalali-moment");
var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.debounce = function (func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            timeout = clearTimeout(timeout);
            setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    };
    ;
    UtilsService.prototype.createArray = function (size) {
        return new Array(size).fill(1);
    };
    UtilsService.prototype.convertToMoment = function (date, format) {
        var retVal;
        if (!date) {
            return null;
        }
        else if (typeof date === 'string') {
            retVal = moment(date, format);
        }
        else {
            retVal = date;
        }
        return retVal;
    };
    UtilsService.prototype.isDateValid = function (date, format) {
        if (date === '') {
            return true;
        }
        return moment(date, format, true).isValid();
    };
    // todo:: add unit test
    UtilsService.prototype.getDefaultDisplayDate = function (def, selected, allowMultiSelect) {
        if (def) {
            return def;
        }
        else if (allowMultiSelect) {
            if (selected && selected[selected.length]) {
                return selected[selected.length];
            }
        }
        else if (selected && selected[0]) {
            return selected[0];
        }
        return moment();
    };
    // todo:: add unit test
    UtilsService.prototype.getInputType = function (value, allowMultiSelect) {
        if (Array.isArray(value)) {
            if (!value.length) {
                return calendar_value_enum_1.ECalendarValue.MomentArr;
            }
            else if (typeof value[0] === 'string') {
                return calendar_value_enum_1.ECalendarValue.StringArr;
            }
            else if (moment.isMoment(value[0])) {
                return calendar_value_enum_1.ECalendarValue.MomentArr;
            }
        }
        else {
            if (typeof value === 'string') {
                return calendar_value_enum_1.ECalendarValue.String;
            }
            else if (moment.isMoment(value)) {
                return calendar_value_enum_1.ECalendarValue.Moment;
            }
        }
        return allowMultiSelect ? calendar_value_enum_1.ECalendarValue.MomentArr : calendar_value_enum_1.ECalendarValue.Moment;
    };
    // todo:: add unit test
    UtilsService.prototype.convertToMomentArray = function (value, format, allowMultiSelect) {
        switch (this.getInputType(value, allowMultiSelect)) {
            case (calendar_value_enum_1.ECalendarValue.String):
                return value ? [moment(value, format)] : [];
            case (calendar_value_enum_1.ECalendarValue.StringArr):
                return value.map(function (v) { return v ? moment(v, format) : null; }).filter(Boolean);
            case (calendar_value_enum_1.ECalendarValue.Moment):
                return [value];
            case (calendar_value_enum_1.ECalendarValue.MomentArr):
                return [].concat(value);
            default:
                return [];
        }
    };
    // todo:: add unit test
    UtilsService.prototype.convertFromMomentArray = function (format, value, inputValueType) {
        switch (inputValueType) {
            case (calendar_value_enum_1.ECalendarValue.String):
                return value[0].format(format);
            case (calendar_value_enum_1.ECalendarValue.StringArr):
                return value.map(function (v) { return v.format(format); });
            case (calendar_value_enum_1.ECalendarValue.Moment):
                return value[0];
            case (calendar_value_enum_1.ECalendarValue.MomentArr):
                return value;
            default:
                return value;
        }
    };
    // todo:: add unit test
    UtilsService.prototype.clearUndefined = function (obj) {
        if (!obj) {
            return obj;
        }
        Object.keys(obj).forEach(function (key) { return (obj[key] === undefined) && delete obj[key]; });
        return obj;
    };
    // todo:: add unit test
    UtilsService.prototype.compareMomentArrays = function (arr1, arr2, granularity) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        var sortArr1 = arr1.sort(function (a, b) { return a.diff(b); });
        var sortArr2 = arr1.sort(function (a, b) { return a.diff(b); });
        for (var i = 0; i < sortArr1.length; i++) {
            if (!sortArr1[i].isSame(sortArr2[i], granularity)) {
                return false;
            }
        }
        return true;
    };
    UtilsService.prototype.updateSelected = function (isMultiple, currentlySelected, date, granularity) {
        if (granularity === void 0) { granularity = 'day'; }
        var isSelected = !date.selected;
        if (isMultiple) {
            return isSelected
                ? currentlySelected.concat([date.date])
                : currentlySelected.filter(function (d) { return !d.isSame(date.date, granularity); });
        }
        else {
            return isSelected ? [date.date] : [];
        }
    };
    UtilsService.prototype.closestParent = function (element, selector) {
        if (!element) {
            return undefined;
        }
        var match = element.querySelector(selector);
        return match || this.closestParent(element.parentElement, selector);
    };
    UtilsService.prototype.onlyTime = function (m) {
        return m && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
    };
    UtilsService.prototype.granularityFromType = function (calendarType) {
        switch (calendarType) {
            case 'time':
                return 'second';
            case 'daytime':
                return 'second';
            default:
                return calendarType;
        }
    };
    UtilsService.prototype.createValidator = function (_a, format, calendarType) {
        var _this = this;
        var minDate = _a.minDate, maxDate = _a.maxDate, minTime = _a.minTime, maxTime = _a.maxTime;
        var isValid;
        var value;
        var validators = [];
        var granularity = this.granularityFromType(calendarType);
        if (minDate) {
            var md_1 = this.convertToMoment(minDate, format);
            validators.push({
                key: 'minDate',
                isValid: function () {
                    var _isValid = value.every(function (val) { return val.isSameOrAfter(md_1, granularity); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxDate) {
            var md_2 = this.convertToMoment(maxDate, format);
            validators.push({
                key: 'maxDate',
                isValid: function () {
                    var _isValid = value.every(function (val) { return val.isSameOrBefore(md_2, granularity); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (minTime) {
            var md_3 = this.onlyTime(this.convertToMoment(minTime, format));
            validators.push({
                key: 'minTime',
                isValid: function () {
                    var _isValid = value.every(function (val) { return _this.onlyTime(val).isSameOrAfter(md_3); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxTime) {
            var md_4 = this.onlyTime(this.convertToMoment(maxTime, format));
            validators.push({
                key: 'maxTime',
                isValid: function () {
                    var _isValid = value.every(function (val) { return _this.onlyTime(val).isSameOrBefore(md_4); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        return function (inputVal) {
            isValid = true;
            value = _this.convertToMomentArray(inputVal, format, true).filter(Boolean);
            if (!value.every(function (val) { return val.isValid(); })) {
                return {
                    format: {
                        given: inputVal
                    }
                };
            }
            var errors = validators.reduce(function (map, err) {
                if (!err.isValid()) {
                    map[err.key] = {
                        given: value
                    };
                }
                return map;
            }, {});
            return !isValid ? errors : null;
        };
    };
    UtilsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    UtilsService.ctorParameters = function () { return []; };
    return UtilsService;
}());
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map