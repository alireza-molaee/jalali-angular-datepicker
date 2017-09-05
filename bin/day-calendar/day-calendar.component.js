"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calendar_mode_enum_1 = require("../common/types/calendar-mode-enum");
var core_1 = require("@angular/core");
var day_calendar_service_1 = require("./day-calendar.service");
var forms_1 = require("@angular/forms");
var utils_service_1 = require("../common/services/utils/utils.service");
var calendar_type_enum_1 = require("../common/types/calendar-type-enum");
var DayCalendarComponent = (function () {
    function DayCalendarComponent(dayCalendarService, utilsService) {
        this.dayCalendarService = dayCalendarService;
        this.utilsService = utilsService;
        this.onSelect = new core_1.EventEmitter();
        this.onMonthSelect = new core_1.EventEmitter();
        this.onNavHeaderBtnClick = new core_1.EventEmitter();
        this.CalendarMode = calendar_mode_enum_1.ECalendarMode;
        this.isInited = false;
        this.currentCalendarMode = calendar_mode_enum_1.ECalendarMode.Day;
        this.api = {
            moveCalendarsBy: this.moveCalendarsBy.bind(this),
            toggleCalendar: this.toggleCalendar.bind(this)
        };
    }
    Object.defineProperty(DayCalendarComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    DayCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    DayCalendarComponent.prototype.init = function () {
        this.componentConfig = this.dayCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.weekdays = this.dayCalendarService
            .generateWeekdays(this.componentConfig.firstDayOfWeek);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
    };
    DayCalendarComponent.prototype.isJalali = function () {
        return this.componentConfig.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian;
    };
    DayCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    DayCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.weeks = this.dayCalendarService
                .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        else {
            this.selected = [];
            this.weeks = this.dayCalendarService
                .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        }
    };
    DayCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DayCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    DayCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    DayCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    DayCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.inputValueType);
    };
    DayCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    DayCalendarComponent.prototype.isDisabledDay = function (day) {
        return this.dayCalendarService.isDateDisabled(day, this.componentConfig);
    };
    DayCalendarComponent.prototype.dayClicked = function (day) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(day);
    };
    DayCalendarComponent.prototype.getNavLabel = function () {
        return this.dayCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
    };
    DayCalendarComponent.prototype.getDayBtnText = function (day) {
        return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
    };
    DayCalendarComponent.prototype.onLeftNav = function () {
        this.currentDateView.subtract(1, 'month');
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    };
    DayCalendarComponent.prototype.onRightNav = function () {
        this.currentDateView.add(1, 'month');
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    };
    DayCalendarComponent.prototype.shouldShowLeftNav = function () {
        return this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
    };
    DayCalendarComponent.prototype.shouldShowRightNav = function () {
        return this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    };
    DayCalendarComponent.prototype.isNavHeaderBtnClickable = function () {
        return this.componentConfig.enableMonthSelector;
    };
    DayCalendarComponent.prototype.toggleCalendar = function (mode) {
        if (this.currentCalendarMode !== mode) {
            this.currentCalendarMode = mode;
            this.onNavHeaderBtnClick.emit(mode);
        }
    };
    DayCalendarComponent.prototype.monthSelected = function (month) {
        this.currentDateView = month.date.clone();
        this.currentCalendarMode = calendar_mode_enum_1.ECalendarMode.Day;
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onMonthSelect.emit(month);
    };
    DayCalendarComponent.prototype.moveCalendarsBy = function (current, amount, granularity) {
        if (granularity === void 0) { granularity = 'month'; }
        var to = current.add(amount, granularity);
        this.currentDateView = to;
        this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, to, this.selected);
    };
    DayCalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dp-day-calendar',
                    template: '<div class="dp-day-calendar-container" [hidden]="currentCalendarMode !==  CalendarMode.Day">   <dp-calendar-nav       [label]="getNavLabel()"       [showLeftNav]="shouldShowLeftNav()"       [showRightNav]="shouldShowRightNav()"       [isLabelClickable]="isNavHeaderBtnClickable()"       [theme]="theme"       (onLeftNav)="onLeftNav()"       (onRightNav)="onRightNav()"       (onLabelClick)="toggleCalendar(CalendarMode.Month)">   </dp-calendar-nav>    <div class="dp-calendar-wrapper"        [ngClass]="{\'dp-hide-near-month\': !componentConfig.showNearMonthDays,\'rtl\':isJalali()}">     <div class="dp-weekdays">       <span class="dp-calendar-weekday"             *ngFor="let weekday of weekdays">             {{weekday.format(componentConfig.weekDayFormat)}}       </span>     </div>     <div class="dp-calendar-week" *ngFor="let week of weeks">       <span *ngIf="componentConfig.showWeekNumbers" class="dp-week-number">{{week[0].date.isoWeek()}}</span>       <button type="button"               class="dp-calendar-day"               *ngFor="let day of week"               (click)="dayClicked(day)"               [disabled]="isDisabledDay(day)"               [ngClass]="{               \'dp-selected\': day.selected,               \'dp-current-month\': day.currentMonth,               \'dp-prev-month\': day.prevMonth,               \'dp-next-month\': day.nextMonth,               \'dp-current-day\': day.currentDay             }">         {{getDayBtnText(day)}}       </button>     </div>   </div>  </div>  <dp-month-calendar     *ngIf="currentCalendarMode ===  CalendarMode.Month"     [config]="monthCalendarConfig"     [displayDate]="currentDateView"     [theme]="theme"     (onSelect)="monthSelected($event)"     (onNavHeaderBtnClick)="toggleCalendar(CalendarMode.Day)"> </dp-month-calendar> ',
                    styles: [':host {  display: inline-block;}.dp-day-calendar-container {  background: #FFFFFF;}.dp-calendar-wrapper {  box-sizing: border-box;}.dp-calendar-wrapper .dp-calendar-weekday:first-child {  border-left: none;}.dp-weekdays {  font-size: 15px;  margin-bottom: 5px;}.dp-calendar-weekday {  box-sizing: border-box;  display: inline-block;  width: 30px;  text-align: center;  border-left: 1px solid #000000;  border-bottom: 1px solid #000000;}.dp-calendar-day {  box-sizing: border-box;  width: 30px;  height: 30px;  cursor: pointer;}.dp-selected {  background: rgba(16, 108, 200, 0.5);  color: #FFFFFF;}.dp-prev-month,.dp-next-month {  opacity: 0.5;}.dp-hide-near-month .dp-prev-month,.dp-hide-near-month .dp-next-month {  visibility: hidden;}.dp-week-number {  position: absolute;  font-size: 9px;}:host.dp-material .dp-calendar-weekday {  height: 25px;  width: 30px;  line-height: 25px;  color: rgba(16, 108, 200, 0.5);  border: none;  font-size: 0.75rem;  opacity: 0.6;}:host.dp-material .dp-calendar-weekday:last-child {  color: red;}:host.dp-material .dp-calendar-wrapper {  padding: 20px;}:host.dp-material .dp-calendar-wrapper.rtl {  direction: rtl;}:host.dp-material .dp-calendar-month,:host.dp-material .dp-calendar-day {  box-sizing: border-box;  background: #FFFFFF;  border-radius: 0%;  transition: border-radius 0.1s ease;  border: none;  outline: none;  padding: 0;}:host.dp-material .dp-calendar-month:hover,:host.dp-material .dp-calendar-day:hover {  background: #E0E0E0;  border-radius: 50%;}:host.dp-material .dp-selected {  border-radius: 50%;  background: rgba(16, 108, 200, 0.5);  color: #FFFFFF;}:host.dp-material .dp-selected:hover {  background: rgba(16, 108, 200, 0.5);}:host.dp-material .dp-current-day {  border-radius: 50%;  border: 1px solid rgba(16, 108, 200, 0.5);}'],
                    providers: [
                        day_calendar_service_1.DayCalendarService,
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return DayCalendarComponent; }),
                            multi: true
                        },
                        {
                            provide: forms_1.NG_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return DayCalendarComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    DayCalendarComponent.ctorParameters = function () { return [
        { type: day_calendar_service_1.DayCalendarService, },
        { type: utils_service_1.UtilsService, },
    ]; };
    DayCalendarComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'displayDate': [{ type: core_1.Input },],
        'minDate': [{ type: core_1.Input },],
        'maxDate': [{ type: core_1.Input },],
        'theme': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
        'onSelect': [{ type: core_1.Output },],
        'onMonthSelect': [{ type: core_1.Output },],
        'onNavHeaderBtnClick': [{ type: core_1.Output },],
    };
    return DayCalendarComponent;
}());
exports.DayCalendarComponent = DayCalendarComponent;
//# sourceMappingURL=day-calendar.component.js.map