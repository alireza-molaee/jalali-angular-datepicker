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
var DayCalendarService = (function () {
    function DayCalendarService(utilsService) {
        this.utilsService = utilsService;
        this.DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.GREGORIAN_DEFAULT_CONFIG = {
            showNearMonthDays: true,
            showWeekNumbers: false,
            firstDayOfWeek: 'su',
            weekDayFormat: 'ddd',
            format: 'DD-MM-YYYY',
            allowMultiSelect: false,
            monthFormat: 'MMM, YYYY',
            enableMonthSelector: true,
            locale: 'en',
            dayBtnFormat: 'DD'
        };
        this.JALALI_CONFIG_EXTENTION = {
            firstDayOfWeek: 'sa',
            weekDayFormat: 'dd',
            format: 'jYYYY/jM/jD',
            monthFormat: 'jMMMM jYY',
            locale: 'fa',
            dayBtnFormat: 'jD'
        };
        this.DEFAULT_CONFIG = __assign({}, this.GREGORIAN_DEFAULT_CONFIG, this.JALALI_CONFIG_EXTENTION);
    }
    DayCalendarService.prototype.getMonthFormat = function (config) {
        if (config === void 0) { config = this.DEFAULT_CONFIG; }
        return (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian) ? 'jMonth' : 'month';
    };
    DayCalendarService.prototype.removeNearMonthWeeks = function (currentMonth, monthArray) {
        var _this = this;
        if (monthArray[monthArray.length - 1].find(function (day) { return day.date.isSame(currentMonth, _this.getMonthFormat()); })) {
            return monthArray;
        }
        else {
            return monthArray.slice(0, -1);
        }
    };
    DayCalendarService.prototype.getConfig = function (config) {
        if (!config || (config.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian)) {
            this.DEFAULT_CONFIG = __assign({}, this.GREGORIAN_DEFAULT_CONFIG, this.JALALI_CONFIG_EXTENTION);
        }
        else {
            this.DEFAULT_CONFIG = this.GREGORIAN_DEFAULT_CONFIG;
        }
        moment.locale(this.DEFAULT_CONFIG.locale);
        return __assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config));
    };
    DayCalendarService.prototype.generateDaysMap = function (firstDayOfWeek) {
        var firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[day] = index;
            return map;
        }, {});
    };
    DayCalendarService.prototype.generateMonthArray = function (config, month, selected) {
        var monthArray = [];
        var firstDayOfMonth = month.clone().startOf(this.getMonthFormat(config));
        var firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
        var firstDayOfBoard = firstDayOfMonth;
        while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
            firstDayOfBoard.subtract(1, 'day');
        }
        var current = firstDayOfBoard.clone();
        var actionMonthFormat = this.getMonthFormat(config);
        var daysOfCalendar = this.utilsService.createArray(42).reduce(function (array) {
            array.push({
                date: current.clone(),
                selected: !!selected.find(function (selectedDay) { return current.isSame(selectedDay, 'day'); }),
                currentMonth: current.isSame(month, actionMonthFormat),
                prevMonth: current.isSame(month.clone().subtract(1, actionMonthFormat), actionMonthFormat),
                nextMonth: current.isSame(month.clone().add(1, actionMonthFormat), actionMonthFormat),
                currentDay: current.isSame(moment(), 'day')
            });
            current.add(1, 'd');
            return array;
        }, []);
        daysOfCalendar.forEach(function (day, index) {
            var weekIndex = Math.floor(index / 7);
            if (!monthArray[weekIndex]) {
                monthArray.push([]);
            }
            monthArray[weekIndex].push(day);
        });
        if (!config.showNearMonthDays) {
            monthArray = this.removeNearMonthWeeks(month, monthArray);
        }
        return monthArray;
    };
    DayCalendarService.prototype.generateWeekdays = function (firstDayOfWeek) {
        var weekdayNames = {
            su: moment().day(0),
            mo: moment().day(1),
            tu: moment().day(2),
            we: moment().day(3),
            th: moment().day(4),
            fr: moment().day(5),
            sa: moment().day(6)
        };
        var weekdays = [];
        var daysMap = this.generateDaysMap(firstDayOfWeek);
        for (var dayKey in daysMap) {
            if (daysMap.hasOwnProperty(dayKey)) {
                weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
            }
        }
        return weekdays;
    };
    DayCalendarService.prototype.isDateDisabled = function (day, config) {
        if (config.isDayDisabledCallback) {
            return config.isDayDisabledCallback(day.date);
        }
        if (config.min && day.date.isBefore(config.min, 'day')) {
            return true;
        }
        return !!(config.max && day.date.isAfter(config.max, 'day'));
    };
    // todo:: add unit tests
    DayCalendarService.prototype.getHeaderLabel = function (config, month) {
        if (config.monthFormatter) {
            return config.monthFormatter(month);
        }
        month.locale(config.locale);
        return month.format(config.monthFormat);
    };
    // todo:: add unit tests
    DayCalendarService.prototype.shouldShowLeft = function (min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, this.getMonthFormat()) : true;
    };
    // todo:: add unit tests
    DayCalendarService.prototype.shouldShowRight = function (max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, this.getMonthFormat()) : true;
    };
    DayCalendarService.prototype.generateDaysIndexMap = function (firstDayOfWeek) {
        var firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[index] = day;
            return map;
        }, {});
    };
    // todo:: add unit tests
    DayCalendarService.prototype.getMonthCalendarConfig = function (componentConfig) {
        return this.utilsService.clearUndefined({
            min: componentConfig.min,
            max: componentConfig.max,
            format: componentConfig.format,
            calendarSystem: componentConfig.calendarSystem,
            isNavHeaderBtnClickable: true,
            allowMultiSelect: false,
            yearFormat: componentConfig.yearFormat,
            yearFormatter: componentConfig.yearFormatter,
            monthBtnFormat: componentConfig.monthBtnFormat,
            monthBtnFormatter: componentConfig.monthBtnFormatter,
            multipleYearsNavigateBy: componentConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: componentConfig.showMultipleYearsNavigation
        });
    };
    DayCalendarService.prototype.getDayBtnText = function (config, day) {
        if (config.dayBtnFormatter) {
            return config.dayBtnFormatter(day);
        }
        return day.format(config.dayBtnFormat);
    };
    DayCalendarService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DayCalendarService.ctorParameters = function () { return [
        { type: utils_service_1.UtilsService, },
    ]; };
    return DayCalendarService;
}());
exports.DayCalendarService = DayCalendarService;
//# sourceMappingURL=day-calendar.service.js.map