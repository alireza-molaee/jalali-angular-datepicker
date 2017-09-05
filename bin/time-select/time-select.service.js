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
var core_1 = require("@angular/core");
var moment = require("jalali-moment");
var utils_service_1 = require("../common/services/utils/utils.service");
var calendar_type_enum_1 = require("../common/types/calendar-type-enum");
exports.FIRST_PM_HOUR = 12;
var TimeSelectService = (function () {
    function TimeSelectService(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = {
            hours12Format: 'hh',
            hours24Format: 'HH',
            meridiemFormat: 'A',
            minutesFormat: 'mm',
            minutesInterval: 1,
            secondsFormat: 'ss',
            secondsInterval: 1,
            showSeconds: false,
            showTwentyFourHours: false,
            timeSeparator: ':',
            locale: 'en'
        };
    }
    TimeSelectService.prototype.getConfig = function (config) {
        var timeConfigs = {
            maxTime: this.utilsService.onlyTime((config && config.maxTime)),
            minTime: this.utilsService.onlyTime((config && config.minTime))
        };
        if (!config || (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian)) {
            this.DEFAULT_CONFIG.locale = 'fa';
        }
        var _config = __assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config), timeConfigs);
        moment.locale(_config.locale);
        return _config;
    };
    TimeSelectService.prototype.getTimeFormat = function (config) {
        return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
            + config.timeSeparator + config.minutesFormat
            + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
            + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
    };
    TimeSelectService.prototype.getHours = function (config, t) {
        var time = t || moment();
        return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
    };
    TimeSelectService.prototype.getMinutes = function (config, t) {
        var time = t || moment();
        return time && time.format(config.minutesFormat);
    };
    TimeSelectService.prototype.getSeconds = function (config, t) {
        var time = t || moment();
        return time && time.format(config.secondsFormat);
    };
    TimeSelectService.prototype.getMeridiem = function (config, time) {
        if (config.locale) {
            time.locale(config.locale);
        }
        return time && time.format(config.meridiemFormat);
    };
    TimeSelectService.prototype.decrease = function (config, time, unit) {
        var amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().subtract(amount, unit);
    };
    TimeSelectService.prototype.increase = function (config, time, unit) {
        var amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().add(amount, unit);
    };
    TimeSelectService.prototype.toggleMeridiem = function (time) {
        if (time.hours() < exports.FIRST_PM_HOUR) {
            return time.clone().add(12, 'hour');
        }
        else {
            return time.clone().subtract(12, 'hour');
        }
    };
    TimeSelectService.prototype.shouldShowDecrease = function (config, time, unit) {
        if (!config.min && !config.minTime) {
            return true;
        }
        var newTime = this.decrease(config, time, unit);
        return (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    };
    TimeSelectService.prototype.shouldShowIncrease = function (config, time, unit) {
        if (!config.max && !config.maxTime) {
            return true;
        }
        var newTime = this.increase(config, time, unit);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)));
    };
    TimeSelectService.prototype.shouldShowToggleMeridiem = function (config, time) {
        if (!config.min && !config.max && !config.minTime && !config.maxTime) {
            return true;
        }
        var newTime = this.toggleMeridiem(time);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    };
    TimeSelectService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TimeSelectService.ctorParameters = function () { return [
        { type: utils_service_1.UtilsService, },
    ]; };
    return TimeSelectService;
}());
exports.TimeSelectService = TimeSelectService;
//# sourceMappingURL=time-select.service.js.map