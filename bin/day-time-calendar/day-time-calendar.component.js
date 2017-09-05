"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var utils_service_1 = require("../common/services/utils/utils.service");
var day_calendar_service_1 = require("../day-calendar/day-calendar.service");
var time_select_service_1 = require("../time-select/time-select.service");
var day_time_calendar_service_1 = require("./day-time-calendar.service");
var DayTimeCalendarComponent = (function () {
    function DayTimeCalendarComponent(dayTimeCalendarService, utilsService) {
        this.dayTimeCalendarService = dayTimeCalendarService;
        this.utilsService = utilsService;
        this.onChange = new core_1.EventEmitter();
        this.isInited = false;
    }
    Object.defineProperty(DayTimeCalendarComponent.prototype, "selected", {
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
    DayTimeCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    DayTimeCalendarComponent.prototype.init = function () {
        this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    DayTimeCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    DayTimeCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, false)[0];
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, false);
        }
        else {
            this.selected = null;
        }
    };
    DayTimeCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DayTimeCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    DayTimeCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    DayTimeCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    DayTimeCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, [value], this.inputValueType);
    };
    DayTimeCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate
        }, undefined, 'daytime');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    DayTimeCalendarComponent.prototype.dateSelected = function (day) {
        console.log(day);
        this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date);
        this.emitChange();
    };
    DayTimeCalendarComponent.prototype.timeChange = function (time) {
        this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
        this.emitChange();
    };
    DayTimeCalendarComponent.prototype.emitChange = function () {
        this.onChange.emit({ date: this.selected, selected: false });
    };
    DayTimeCalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dp-day-time-calendar',
                    template: '<dp-day-calendar #dayCalendar                  [config]="componentConfig"                  [ngModel]="_selected"                  [displayDate]="displayDate"                  (onSelect)="dateSelected($event)"                  [theme]="theme"> </dp-day-calendar> <dp-time-select #timeSelect                 [config]="componentConfig"                 [ngModel]="_selected"                 (onChange)="timeChange($event)"                 [theme]="theme"> </dp-time-select> ',
                    styles: [':host {  display: inline-block;}dp-time-select {  display: block;  border-top: 0;}:host.dp-material dp-time-select {  border-top: 0;}'],
                    providers: [
                        day_time_calendar_service_1.DayTimeCalendarService,
                        day_calendar_service_1.DayCalendarService,
                        time_select_service_1.TimeSelectService,
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return DayTimeCalendarComponent; }),
                            multi: true
                        },
                        {
                            provide: forms_1.NG_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return DayTimeCalendarComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    DayTimeCalendarComponent.ctorParameters = function () { return [
        { type: day_time_calendar_service_1.DayTimeCalendarService, },
        { type: utils_service_1.UtilsService, },
    ]; };
    DayTimeCalendarComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'displayDate': [{ type: core_1.Input },],
        'minDate': [{ type: core_1.Input },],
        'maxDate': [{ type: core_1.Input },],
        'theme': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
        'onChange': [{ type: core_1.Output },],
    };
    return DayTimeCalendarComponent;
}());
exports.DayTimeCalendarComponent = DayTimeCalendarComponent;
//# sourceMappingURL=day-time-calendar.component.js.map