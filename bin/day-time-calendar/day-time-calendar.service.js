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
var day_calendar_service_1 = require("../day-calendar/day-calendar.service");
var time_select_service_1 = require("../time-select/time-select.service");
var DAY_FORMAT = 'YYYYMMDD';
var TIME_FORMAT = 'HH:mm:ss';
var COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
var DayTimeCalendarService = (function () {
    function DayTimeCalendarService(utilsService, dayCalendarService, timeSelectService) {
        this.utilsService = utilsService;
        this.dayCalendarService = dayCalendarService;
        this.timeSelectService = timeSelectService;
        this.DEFAULT_CONFIG = {
            locale: 'fa'
        };
    }
    DayTimeCalendarService.prototype.getConfig = function (config) {
        var _config = __assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
        moment.locale(config.locale);
        return _config;
    };
    DayTimeCalendarService.prototype.updateDay = function (current, day) {
        var time = current ? current : moment();
        return moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
    };
    DayTimeCalendarService.prototype.updateTime = function (current, time) {
        var day = current ? current : moment();
        return moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
    };
    DayTimeCalendarService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DayTimeCalendarService.ctorParameters = function () { return [
        { type: utils_service_1.UtilsService, },
        { type: day_calendar_service_1.DayCalendarService, },
        { type: time_select_service_1.TimeSelectService, },
    ]; };
    return DayTimeCalendarService;
}());
exports.DayTimeCalendarService = DayTimeCalendarService;
//# sourceMappingURL=day-time-calendar.service.js.map