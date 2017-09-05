"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calendar_mode_enum_1 = require("../common/types/calendar-mode-enum");
var core_1 = require("@angular/core");
var time_select_service_1 = require("./time-select.service");
var moment = require("jalali-moment");
var forms_1 = require("@angular/forms");
var utils_service_1 = require("../common/services/utils/utils.service");
var TimeSelectComponent = (function () {
    function TimeSelectComponent(timeSelectService, utilsService) {
        this.timeSelectService = timeSelectService;
        this.utilsService = utilsService;
        this.onChange = new core_1.EventEmitter();
        this.CalendarType = calendar_mode_enum_1.ECalendarMode;
        this.isInited = false;
        this.api = {
            triggerChange: this.emitChange.bind(this)
        };
    }
    Object.defineProperty(TimeSelectComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.calculateTimeParts(this.selected);
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    TimeSelectComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    TimeSelectComponent.prototype.init = function () {
        this.componentConfig = this.timeSelectService.getConfig(this.config);
        this.selected = this.selected || moment();
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    TimeSelectComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    TimeSelectComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            var momentValue = this.utilsService
                .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
            if (momentValue.isValid()) {
                this.selected = momentValue;
                this.inputValueType = this.utilsService
                    .getInputType(this.inputValue, false);
            }
        }
    };
    TimeSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TimeSelectComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    TimeSelectComponent.prototype.registerOnTouched = function (fn) {
    };
    TimeSelectComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    TimeSelectComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.inputValueType);
    };
    TimeSelectComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, undefined, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    TimeSelectComponent.prototype.decrease = function (unit) {
        this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    TimeSelectComponent.prototype.increase = function (unit) {
        this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    TimeSelectComponent.prototype.toggleMeridiem = function () {
        this.selected = this.timeSelectService.toggleMeridiem(this.selected);
        this.emitChange();
    };
    TimeSelectComponent.prototype.emitChange = function () {
        this.onChange.emit({ date: this.selected, selected: false });
    };
    TimeSelectComponent.prototype.calculateTimeParts = function (time) {
        this.hours = this.timeSelectService.getHours(this.componentConfig, time);
        this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
        this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
        this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
    };
    TimeSelectComponent.prototype.shouldShowDecrease = function (unit) {
        return this.timeSelectService.shouldShowDecrease(this.componentConfig, this.selected, unit);
    };
    TimeSelectComponent.prototype.shouldShowIncrease = function (unit) {
        return this.timeSelectService.shouldShowIncrease(this.componentConfig, this.selected, unit);
    };
    TimeSelectComponent.prototype.shouldShowToggleMeridiem = function () {
        return this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this.selected);
    };
    TimeSelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dp-time-select',
                    template: '<ul class="dp-time-select-controls">   <li class="dp-time-select-control dp-time-select-control-hours">     <button type="button"             [disabled]="!shouldShowIncrease(\'hour\')"             class="dp-time-select-control-up"             (click)="increase(\'hour\')">     </button>     <span class="dp-time-select-display-hours">{{hours}}</span>     <button type="button"             [disabled]="!shouldShowDecrease(\'hour\')"             class="dp-time-select-control-down"             (click)="decrease(\'hour\')"></button>   </li>   <li class="dp-time-select-control dp-time-select-separator">{{componentConfig.timeSeparator}}</li>   <li class="dp-time-select-control dp-time-select-control-minutes">     <button type="button"             [disabled]="!shouldShowIncrease(\'minute\')" class="dp-time-select-control-up"             (click)="increase(\'minute\')"></button>     <span class="dp-time-select-display-minutes">{{minutes}}</span>     <button type="button"             [disabled]="!shouldShowDecrease(\'minute\')" class="dp-time-select-control-down"             (click)="decrease(\'minute\')"></button>   </li>   <ng-container *ngIf="componentConfig.showSeconds">     <li class="dp-time-select-control dp-time-select-separator">{{componentConfig.timeSeparator}}</li>     <li class="dp-time-select-control dp-time-select-control-seconds">       <button type="button"               [disabled]="!shouldShowIncrease(\'second\')"               class="dp-time-select-control-up"               (click)="increase(\'second\')"></button>       <span class="dp-time-select-display-seconds">{{seconds}}</span>       <button type="button"               [disabled]="!shouldShowDecrease(\'second\')" class="dp-time-select-control-down"               (click)="decrease(\'second\')"></button>     </li>   </ng-container>   <li class="dp-time-select-control dp-time-select-control-meridiem" *ngIf="!componentConfig.showTwentyFourHours">     <button type="button"             [disabled]="!shouldShowToggleMeridiem()"             class="dp-time-select-control-up"             (click)="toggleMeridiem()"></button>     <span class="dp-time-select-display-meridiem">{{meridiem}}</span>     <button type="button"             [disabled]="!shouldShowToggleMeridiem()"             class="dp-time-select-control-down"             (click)="toggleMeridiem()"></button>   </li> </ul> ',
                    styles: [':host {  display: inline-block;}.dp-time-select-controls {  margin: 0;  padding: 0;  text-align: center;  line-height: normal;  background: #FFFFFF;}.dp-time-select-control {  display: inline-block;  margin: 0 auto;  vertical-align: middle;  font-size: inherit;  letter-spacing: 1px;}.dp-time-select-control-up,.dp-time-select-control-down {  position: relative;  display: block;  width: 24px;  height: 24px;  margin: 3px auto;  cursor: pointer;  color: #E0E0E0;}.dp-time-select-control-up::before,.dp-time-select-control-down::before {  position: relative;  content: \'\';  display: inline-block;  height: 8px;  width: 8px;  vertical-align: baseline;  border-style: solid;  border-width: 2px 2px 0 0;  transform: rotate(0deg);}.dp-time-select-control-up::before {  transform: rotate(-45deg);  top: 4px;}.dp-time-select-control-down::before {  transform: rotate(135deg);}.dp-time-select-separator {  width: 5px;}:host.dp-material .dp-time-select-control-up,:host.dp-material .dp-time-select-control-down {  box-sizing: border-box;  background: transparent;  border: none;  outline: none;  border-radius: 50%;}:host.dp-material .dp-time-select-control-up::before,:host.dp-material .dp-time-select-control-down::before {  left: 0;}:host.dp-material .dp-time-select-control-up:hover,:host.dp-material .dp-time-select-control-down:hover {  background: #E0E0E0;  color: #FFFFFF;}'],
                    providers: [
                        time_select_service_1.TimeSelectService,
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return TimeSelectComponent; }),
                            multi: true
                        },
                        {
                            provide: forms_1.NG_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return TimeSelectComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TimeSelectComponent.ctorParameters = function () { return [
        { type: time_select_service_1.TimeSelectService, },
        { type: utils_service_1.UtilsService, },
    ]; };
    TimeSelectComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'displayDate': [{ type: core_1.Input },],
        'minDate': [{ type: core_1.Input },],
        'maxDate': [{ type: core_1.Input },],
        'minTime': [{ type: core_1.Input },],
        'maxTime': [{ type: core_1.Input },],
        'theme': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
        'onChange': [{ type: core_1.Output },],
    };
    return TimeSelectComponent;
}());
exports.TimeSelectComponent = TimeSelectComponent;
//# sourceMappingURL=time-select.component.js.map