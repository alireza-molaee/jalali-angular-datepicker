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
var MonthCalendarService = (function () {
    function MonthCalendarService(utilsService) {
        this.utilsService = utilsService;
        this.GREGORIAN_DEFAULT_CONFIG = {
            allowMultiSelect: false,
            yearFormat: 'YYYY',
            format: 'MM-YYYY',
            isNavHeaderBtnClickable: false,
            monthBtnFormat: 'MMM',
            locale: 'en',
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false
        };
        this.JALALI_DEFAULT_CONFIG = {
            yearFormat: 'jYYYY',
            format: 'jMMMM-jYYYY',
            monthBtnFormat: 'jMMMM',
            locale: 'fa'
        };
        this.DEFAULT_CONFIG = __assign({}, this.GREGORIAN_DEFAULT_CONFIG, this.JALALI_DEFAULT_CONFIG);
    }
    MonthCalendarService.prototype.getMomentMonthFormat = function (config) {
        if (config === void 0) { config = this.DEFAULT_CONFIG; }
        return (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian) ? 'jMonth' : 'month';
    };
    MonthCalendarService.prototype.getMomentYearFormat = function (config) {
        if (config === void 0) { config = this.DEFAULT_CONFIG; }
        return (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian) ? 'jYear' : 'year';
    };
    MonthCalendarService.prototype.getConfig = function (config) {
        this.DEFAULT_CONFIG = (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian) ?
            this.JALALI_DEFAULT_CONFIG : this.GREGORIAN_DEFAULT_CONFIG;
        moment.locale(this.DEFAULT_CONFIG.locale);
        return __assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config));
    };
    MonthCalendarService.prototype.increaseYear = function (year) {
        year.add(1, this.getMomentYearFormat());
    };
    MonthCalendarService.prototype.decreaseYear = function (year) {
        year.subtract(1, this.getMomentYearFormat());
    };
    MonthCalendarService.prototype.generateYear = function (year, selected) {
        var _this = this;
        if (selected === void 0) { selected = null; }
        var index = year.clone().startOf(this.getMomentYearFormat());
        var momentMonthFormat = this.getMomentMonthFormat();
        return this.utilsService.createArray(3).map(function () {
            return _this.utilsService.createArray(4).map(function () {
                var month = {
                    date: index.clone(),
                    selected: !!selected.find(function (s) { return index.isSame(s, momentMonthFormat); }),
                    currentMonth: index.isSame(moment(), momentMonthFormat)
                };
                index.add(1, momentMonthFormat);
                return month;
            });
        });
    };
    MonthCalendarService.prototype.isMonthDisabled = function (month, config) {
        if (config.min && month.date.isBefore(config.min, this.getMomentMonthFormat(config))) {
            return true;
        }
        return !!(config.max && month.date.isAfter(config.max, this.getMomentMonthFormat(config)));
    };
    MonthCalendarService.prototype.shouldShowLeft = function (min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, this.getMomentYearFormat()) : true;
    };
    MonthCalendarService.prototype.shouldShowRight = function (max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, this.getMomentYearFormat()) : true;
    };
    MonthCalendarService.prototype.getHeaderLabel = function (config, year) {
        if (config.yearFormatter) {
            return config.yearFormatter(year);
        }
        year.locale(config.locale);
        return year.format(config.yearFormat);
    };
    MonthCalendarService.prototype.getMonthBtnText = function (config, month) {
        if (config.monthBtnFormatter) {
            return config.monthBtnFormatter(month);
        }
        return month.format(config.monthBtnFormat);
    };
    MonthCalendarService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MonthCalendarService.ctorParameters = function () { return [
        { type: utils_service_1.UtilsService, },
    ]; };
    return MonthCalendarService;
}());
exports.MonthCalendarService = MonthCalendarService;
//# sourceMappingURL=month-calendar.service.js.map