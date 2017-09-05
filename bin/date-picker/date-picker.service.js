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
var time_select_service_1 = require("../time-select/time-select.service");
var day_time_calendar_service_1 = require("../day-time-calendar/day-time-calendar.service");
var DatePickerService = (function () {
    function DatePickerService(utilsService, timeSelectService, daytimeCalendarService) {
        this.utilsService = utilsService;
        this.timeSelectService = timeSelectService;
        this.daytimeCalendarService = daytimeCalendarService;
        this.onPickerClosed = new core_1.EventEmitter();
        this.gregorianDefaultConfig = {
            closeOnSelect: true,
            closeOnSelectDelay: 100,
            format: 'DD-MM-YYYY',
            onOpenDelay: 0,
            disableKeypress: false,
            showNearMonthDays: true,
            drops: 'down',
            opens: 'right',
            showWeekNumbers: false,
            enableMonthSelector: true,
            showGoToCurrent: true,
            locale: 'en'
        };
        this.jalaliExtensionConfig = {
            format: 'jYYYY-jMM-jD',
            locale: 'fa'
        };
        this.defaultConfig = __assign({}, this.gregorianDefaultConfig, this.jalaliExtensionConfig);
    }
    // todo:: add unit tests
    DatePickerService.prototype.getConfig = function (config, mode) {
        if (mode === void 0) { mode = 'daytime'; }
        if (!config || (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian)) {
            this.defaultConfig = __assign({}, this.gregorianDefaultConfig, this.jalaliExtensionConfig);
        }
        else {
            this.defaultConfig = __assign({}, this.gregorianDefaultConfig);
        }
        var _config = __assign({}, this.defaultConfig, { format: this.getDefaultFormatByMode(mode, config) }, this.utilsService.clearUndefined(config));
        var min = _config.min, max = _config.max, format = _config.format;
        if (min) {
            _config.min = this.utilsService.convertToMoment(min, format);
        }
        if (max) {
            _config.max = this.utilsService.convertToMoment(max, format);
        }
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        moment.locale(_config.locale);
        return _config;
    };
    DatePickerService.prototype.getDayConfigService = function (pickerConfig) {
        return {
            min: pickerConfig.min,
            max: pickerConfig.max,
            isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
            weekDayFormat: pickerConfig.weekDayFormat,
            showNearMonthDays: pickerConfig.showNearMonthDays,
            showWeekNumbers: pickerConfig.showWeekNumbers,
            firstDayOfWeek: pickerConfig.firstDayOfWeek,
            format: pickerConfig.format,
            calendarSystem: pickerConfig.calendarSystem,
            allowMultiSelect: pickerConfig.allowMultiSelect,
            monthFormat: pickerConfig.monthFormat,
            monthFormatter: pickerConfig.monthFormatter,
            enableMonthSelector: pickerConfig.enableMonthSelector,
            yearFormat: pickerConfig.yearFormat,
            yearFormatter: pickerConfig.yearFormatter,
            dayBtnFormat: pickerConfig.dayBtnFormat,
            dayBtnFormatter: pickerConfig.dayBtnFormatter,
            monthBtnFormat: pickerConfig.monthBtnFormat,
            monthBtnFormatter: pickerConfig.monthBtnFormatter,
            multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
            locale: pickerConfig.locale
        };
    };
    DatePickerService.prototype.getDayTimeConfigService = function (pickerConfig) {
        return this.daytimeCalendarService.getConfig(pickerConfig);
    };
    DatePickerService.prototype.getTimeConfigService = function (pickerConfig) {
        return this.timeSelectService.getConfig(pickerConfig);
    };
    DatePickerService.prototype.pickerClosed = function () {
        this.onPickerClosed.emit();
    };
    // todo:: add unit tests
    DatePickerService.prototype.isValidInputDateValue = function (value, config) {
        var _this = this;
        value = value ? value : '';
        var datesStrArr;
        if (config.allowMultiSelect) {
            datesStrArr = value.split(',');
        }
        else {
            datesStrArr = [value];
        }
        return datesStrArr.every(function (date) { return _this.utilsService.isDateValid(date, config.format); });
    };
    // todo:: add unit tests
    DatePickerService.prototype.convertInputValueToMomentArray = function (value, config) {
        value = value ? value : '';
        var datesStrArr;
        if (config.allowMultiSelect) {
            datesStrArr = value.split(',');
        }
        else {
            datesStrArr = [value];
        }
        return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect);
    };
    DatePickerService.prototype.getDefaultFormatByMode = function (mode, config) {
        var dateFormat = 'DD-MM-YYYY';
        var monthFormat = 'MMM, YYYY';
        var timeFormat = 'HH:mm:ss';
        if (!config || (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian)) {
            dateFormat = 'jYYYY-jMM-jDD';
            monthFormat = 'jMMMM jYY';
        }
        switch (mode) {
            case 'day':
                return dateFormat;
            case 'daytime':
                return dateFormat + ' ' + timeFormat;
            case 'time':
                return timeFormat;
            case 'month':
                return monthFormat;
        }
    };
    DatePickerService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DatePickerService.ctorParameters = function () { return [
        { type: utils_service_1.UtilsService, },
        { type: time_select_service_1.TimeSelectService, },
        { type: day_time_calendar_service_1.DayTimeCalendarService, },
    ]; };
    return DatePickerService;
}());
exports.DatePickerService = DatePickerService;
//# sourceMappingURL=date-picker.service.js.map