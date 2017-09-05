"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_appender_service_1 = require("../common/services/dom-appender/dom-appender.service");
var utils_service_1 = require("../common/services/utils/utils.service");
var calendar_mode_enum_1 = require("../common/types/calendar-mode-enum");
var calendar_value_enum_1 = require("../common/types/calendar-value-enum");
var day_calendar_service_1 = require("../day-calendar/day-calendar.service");
var day_time_calendar_service_1 = require("../day-time-calendar/day-time-calendar.service");
var time_select_service_1 = require("../time-select/time-select.service");
var date_picker_service_1 = require("./date-picker.service");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("jalali-moment");
var DatePickerComponent = (function () {
    function DatePickerComponent(dayPickerService, domHelper, elemRef, renderer, utilsService) {
        this.dayPickerService = dayPickerService;
        this.domHelper = domHelper;
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.utilsService = utilsService;
        this.isInited = false;
        this.mode = 'day';
        this.placeholder = '';
        this.disabled = false;
        this._areCalendarsShown = false;
        this.hideStateHelper = false;
        this._selected = [];
        this.isFocusedTrigger = false;
        this.handleInnerElementClickUnlisteners = [];
        this.globalListnersUnlisteners = [];
        this.api = {
            open: this.showCalendars.bind(this),
            close: this.hideCalendar.bind(this)
        };
    }
    Object.defineProperty(DatePickerComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.inputElementValue = this.utilsService
                .convertFromMomentArray(this.componentConfig.format, selected, calendar_value_enum_1.ECalendarValue.StringArr)
                .join(', ');
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "areCalendarsShown", {
        get: function () {
            return this._areCalendarsShown;
        },
        set: function (value) {
            if (value) {
                this.startGlobalListeners();
                this.domHelper.appendElementToPosition({
                    container: this.appendToElement,
                    element: this.calendarWrapper,
                    anchor: this.inputElementContainer,
                    dimElem: this.popupElem,
                    drops: this.componentConfig.drops,
                    opens: this.componentConfig.opens
                });
            }
            else {
                this.stopGlobalListeners();
                this.dayPickerService.pickerClosed();
            }
            this._areCalendarsShown = value;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.onClick = function () {
        if (!this.isFocusedTrigger && !this.disabled) {
            this.hideStateHelper = true;
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
        }
    };
    DatePickerComponent.prototype.onBodyClick = function () {
        if (!this.hideStateHelper) {
            this.hideCalendar();
        }
        this.hideStateHelper = false;
    };
    DatePickerComponent.prototype.onScroll = function () {
        if (this.areCalendarsShown) {
            this.domHelper.setElementPosition({
                container: this.appendToElement,
                element: this.calendarWrapper,
                anchor: this.inputElementContainer,
                dimElem: this.popupElem,
                drops: this.componentConfig.drops,
                opens: this.componentConfig.opens
            });
        }
    };
    DatePickerComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.currentDateView = this.selected.length
                ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect)
                : this.currentDateView;
            this.init();
        }
        else {
            this.selected = [];
        }
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DatePickerComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
    };
    DatePickerComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    DatePickerComponent.prototype.processOnChangeCallback = function (selected) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.inputValueType);
    };
    DatePickerComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, this.componentConfig.format, this.mode);
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        this.setElementPositionInDom();
    };
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    DatePickerComponent.prototype.setElementPositionInDom = function () {
        this.calendarWrapper = this.calendarContainer.nativeElement;
        this.setInputElementContainer();
        this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
        this.handleInnerElementClick(this.popupElem);
        var appendTo = this.componentConfig.appendTo;
        if (appendTo) {
            if (typeof appendTo === 'string') {
                this.appendToElement = document.querySelector(appendTo);
            }
            else {
                this.appendToElement = appendTo;
            }
        }
        else {
            this.appendToElement = this.elemRef.nativeElement;
        }
        this.appendToElement.appendChild(this.calendarWrapper);
    };
    DatePickerComponent.prototype.setInputElementContainer = function () {
        this.inputElementContainer = this.componentConfig.inputElementContainer
            || this.elemRef.nativeElement.querySelector('.dp-input-container')
            || document.body;
    };
    DatePickerComponent.prototype.handleInnerElementClick = function (element) {
        var _this = this;
        this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', function () {
            _this.hideStateHelper = true;
        }));
    };
    DatePickerComponent.prototype.init = function () {
        this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
        this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
        this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    };
    DatePickerComponent.prototype.inputFocused = function () {
        var _this = this;
        this.isFocusedTrigger = true;
        setTimeout(function () {
            _this.hideStateHelper = false;
            if (!_this.areCalendarsShown) {
                _this.areCalendarsShown = true;
                if (_this.timeSelectRef) {
                    _this.timeSelectRef.api.triggerChange();
                }
            }
            _this.isFocusedTrigger = false;
        }, this.componentConfig.onOpenDelay);
    };
    DatePickerComponent.prototype.showCalendars = function () {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
        if (this.timeSelectRef) {
            this.timeSelectRef.api.triggerChange();
        }
    };
    DatePickerComponent.prototype.hideCalendar = function () {
        this.areCalendarsShown = false;
        if (this.dayCalendarRef) {
            this.dayCalendarRef.api.toggleCalendar(calendar_mode_enum_1.ECalendarMode.Day);
        }
    };
    DatePickerComponent.prototype.onViewDateChange = function (value) {
        if (this.dayPickerService.isValidInputDateValue(value, this.componentConfig)) {
            this.selected = this.dayPickerService.convertInputValueToMomentArray(value, this.componentConfig);
            this.currentDateView = this.selected.length
                ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect)
                : this.currentDateView;
        }
    };
    DatePickerComponent.prototype.shouldShowGoToCurrent = function () {
        return this.componentConfig.showGoToCurrent && this.mode !== 'time';
    };
    DatePickerComponent.prototype.moveToCurrent = function () {
        this.currentDateView = moment();
    };
    DatePickerComponent.prototype.dateSelected = function (date, granularity, ignoreClose) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
        if (!ignoreClose) {
            this.onDateClick();
        }
    };
    DatePickerComponent.prototype.onDateClick = function () {
        if (this.componentConfig.closeOnSelect) {
            setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
        }
    };
    DatePickerComponent.prototype.onKeyPress = function (event) {
        switch (event.keyCode) {
            case (9):
            case (27):
                this.hideCalendar();
                break;
        }
    };
    DatePickerComponent.prototype.startGlobalListeners = function () {
        var _this = this;
        this.globalListnersUnlisteners.push(this.renderer.listen(document, 'keydown', function (e) {
            _this.onKeyPress(e);
        }));
    };
    DatePickerComponent.prototype.stopGlobalListeners = function () {
        this.globalListnersUnlisteners.forEach(function (ul) { return ul(); });
        this.globalListnersUnlisteners = [];
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this.handleInnerElementClickUnlisteners.forEach(function (ul) { return ul(); });
        this.appendToElement.removeChild(this.calendarWrapper);
    };
    DatePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dp-date-picker',
                    template: '<div>   <div *ngIf="!componentConfig.hideInputContainer" class="dp-input-container">     <div class="input-group">     <input type="text"            class="dp-picker-input form-control"            [placeholder]="placeholder"            [ngModel]="inputElementValue"            (ngModelChange)="onViewDateChange($event)"            (focus)="inputFocused()"            [readonly]="componentConfig.disableKeypress"            [disabled]="disabled"/>       <span class="input-group-addon input-group-addon-primary" (click)="moveToCurrent()">           <i class="ion-calendar"></i>       </span>               </div>   </div>   <div #container>     <div class="dp-popup {{theme}}"          [ngSwitch]="mode"          [hidden]="!_areCalendarsShown">       <dp-day-calendar #dayCalendar                        *ngSwitchCase="\'day\'"                        [config]="dayCalendarConfig"                        [ngModel]="_selected"                        [displayDate]="currentDateView"                        (onSelect)="dateSelected($event, \'day\')"                        [theme]="theme">       </dp-day-calendar>        <dp-month-calendar #monthCalendar                          *ngSwitchCase="\'month\'"                          [config]="dayCalendarConfig"                          [ngModel]="_selected"                          [displayDate]="currentDateView"                          (onSelect)="dateSelected($event, \'month\')"                          [theme]="theme">       </dp-month-calendar>        <dp-time-select #timeSelect                       *ngSwitchCase="\'time\'"                       [config]="timeSelectConfig"                       [ngModel]="_selected && _selected[0]"                       (onChange)="dateSelected($event, \'second\', true)"                       [theme]="theme">       </dp-time-select>        <dp-day-time-calendar #daytimeCalendar                             *ngSwitchCase="\'daytime\'"                             [config]="dayTimeCalendarConfig"                             [displayDate]="currentDateView"                             [ngModel]="_selected && _selected[0]"                             (onChange)="dateSelected($event, \'second\', true)"                             [theme]="theme">       </dp-day-time-calendar>     </div>   </div> </div> ',
                    styles: [':host {  display: inline-block;}:host.dp-material .dp-picker-input {  box-sizing: border-box;  height: 30px;  width: 252px;  font-size: 13px;  outline: none;}:host.dp-material .dp-current-location-btn {  top: calc(50% - 9px);  right: 5px;  height: 18px;  width: 18px;  border: 2px solid rgba(0, 0, 0, 0.6);}:host[dir=\'rtl\'] .dp-current-location-btn {  right: initial;  left: 5px;}.dp-input-container {  position: relative;}.dp-popup {  position: relative;  background: #FFFFFF;  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);  border-left: 1px solid rgba(0, 0, 0, 0.1);  border-right: 1px solid rgba(0, 0, 0, 0.1);  border-bottom: 1px solid rgba(0, 0, 0, 0.1);  z-index: 9999;  white-space: nowrap;}.dp-selected {  background: rgba(16, 108, 200, 0.5);  color: #FFFFFF;}.dp-current-location-btn {  position: absolute;  top: calc(50% - 7px);  right: 5px;  height: 14px;  width: 13px;  background: rgba(0, 0, 0, 0.6);  border: 1px solid rgba(0, 0, 0, 0.6);  outline: none;  border-radius: 50%;  box-shadow: inset 0 0 0 3px #FFFFFF;  cursor: pointer;}.dp-current-location-btn:hover {  background: #000000;}'],
                    providers: [
                        date_picker_service_1.DatePickerService,
                        day_time_calendar_service_1.DayTimeCalendarService,
                        day_calendar_service_1.DayCalendarService,
                        time_select_service_1.TimeSelectService,
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return DatePickerComponent; }),
                            multi: true
                        },
                        {
                            provide: forms_1.NG_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return DatePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: date_picker_service_1.DatePickerService, },
        { type: dom_appender_service_1.DomHelper, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: utils_service_1.UtilsService, },
    ]; };
    DatePickerComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'mode': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'displayDate': [{ type: core_1.Input },],
        'theme': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
        'minDate': [{ type: core_1.Input },],
        'maxDate': [{ type: core_1.Input },],
        'minTime': [{ type: core_1.Input },],
        'maxTime': [{ type: core_1.Input },],
        'calendarContainer': [{ type: core_1.ViewChild, args: ['container',] },],
        'dayCalendarRef': [{ type: core_1.ViewChild, args: ['dayCalendar',] },],
        'monthCalendarRef': [{ type: core_1.ViewChild, args: ['monthCalendar',] },],
        'timeSelectRef': [{ type: core_1.ViewChild, args: ['timeSelect',] },],
        'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        'onBodyClick': [{ type: core_1.HostListener, args: ['document:click',] },],
        'onScroll': [{ type: core_1.HostListener, args: ['document:scroll',] }, { type: core_1.HostListener, args: ['window:resize',] },],
    };
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=date-picker.component.js.map