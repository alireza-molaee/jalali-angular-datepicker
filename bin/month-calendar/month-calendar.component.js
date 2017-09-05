"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var month_calendar_service_1 = require("./month-calendar.service");
var forms_1 = require("@angular/forms");
var utils_service_1 = require("../common/services/utils/utils.service");
var calendar_type_enum_1 = require("../common/types/calendar-type-enum");
var MonthCalendarComponent = (function () {
    function MonthCalendarComponent(monthCalendarService, utilsService) {
        this.monthCalendarService = monthCalendarService;
        this.utilsService = utilsService;
        this.onSelect = new core_1.EventEmitter();
        this.onNavHeaderBtnClick = new core_1.EventEmitter();
        this.isInited = false;
    }
    Object.defineProperty(MonthCalendarComponent.prototype, "selected", {
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
    MonthCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    MonthCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    MonthCalendarComponent.prototype.init = function () {
        this.componentConfig = this.monthCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
        this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    };
    MonthCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
            this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
    };
    MonthCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    MonthCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    MonthCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    MonthCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    MonthCalendarComponent.prototype.isJalali = function () {
        return this.componentConfig.calendarSystem !== calendar_type_enum_1.ECalendarSystem.gregorian;
    };
    MonthCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.inputValueType);
    };
    MonthCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    MonthCalendarComponent.prototype.isDisabledMonth = function (month) {
        return this.monthCalendarService.isMonthDisabled(month, this.componentConfig);
    };
    MonthCalendarComponent.prototype.monthClicked = function (month) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
        this.yearMonths = this.monthCalendarService
            .generateYear(this.currentDateView, this.selected);
        this.onSelect.emit(month);
    };
    MonthCalendarComponent.prototype.getNavLabel = function () {
        return this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
    };
    MonthCalendarComponent.prototype.onLeftNav = function () {
        this.monthCalendarService.decreaseYear(this.currentDateView);
        this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
    };
    MonthCalendarComponent.prototype.onLeftSecondaryNav = function () {
        var navigateBy = this.componentConfig.multipleYearsNavigateBy;
        var isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        this.currentDateView = this.currentDateView.subtract(navigateBy, 'year');
        this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
    };
    MonthCalendarComponent.prototype.onRightNav = function () {
        this.monthCalendarService.increaseYear(this.currentDateView);
        this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
    };
    MonthCalendarComponent.prototype.onRightSecondaryNav = function () {
        var navigateBy = this.componentConfig.multipleYearsNavigateBy;
        var isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        this.currentDateView.add(navigateBy, 'year');
        this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
    };
    MonthCalendarComponent.prototype.shouldShowLeftNav = function () {
        return this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
    };
    MonthCalendarComponent.prototype.shouldShowLeftSecondaryNav = function () {
        return this.componentConfig.showMultipleYearsNavigation && this.shouldShowLeftNav();
    };
    MonthCalendarComponent.prototype.shouldShowRightNav = function () {
        return this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    };
    MonthCalendarComponent.prototype.shouldShowRightSecondaryNav = function () {
        return this.componentConfig.showMultipleYearsNavigation && this.shouldShowRightNav();
    };
    MonthCalendarComponent.prototype.isNavHeaderBtnClickable = function () {
        return this.componentConfig.isNavHeaderBtnClickable;
    };
    MonthCalendarComponent.prototype.toggleCalendar = function () {
        this.onNavHeaderBtnClick.emit();
    };
    MonthCalendarComponent.prototype.getMonthBtnText = function (month) {
        return this.monthCalendarService.getMonthBtnText(this.componentConfig, month.date);
    };
    MonthCalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dp-month-calendar',
                    template: '<div class="dp-month-calendar-container">   <dp-calendar-nav       [label]="getNavLabel()"       [showLeftNav]="shouldShowLeftNav()"       [showLeftSecondaryNav]="shouldShowLeftSecondaryNav()"       [showRightNav]="shouldShowRightNav()"       [showRightSecondaryNav]="shouldShowRightSecondaryNav()"       [isLabelClickable]="isNavHeaderBtnClickable()"       [theme]="theme"       (onLeftNav)="onLeftNav()"       (onLeftSecondaryNav)="onLeftSecondaryNav()"       (onRightNav)="onRightNav()"       (onRightSecondaryNav)="onRightSecondaryNav()"       (onLabelClick)="toggleCalendar()">   </dp-calendar-nav>    <div class="dp-calendar-wrapper" [ngClass]="{\'rtl\':isJalali()}">     <div class="dp-months-row" *ngFor="let monthRow of yearMonths">       <button type="button"               class="dp-calendar-month"               *ngFor="let month of monthRow"               [disabled]="isDisabledMonth(month)"               [ngClass]="{\'dp-selected\': month.selected,\'dp-current-month\': month.currentMonth}"               (click)="monthClicked(month)">         {{getMonthBtnText(month)}}       </button>     </div>   </div> </div> ',
                    styles: [':host {  display: inline-block;}.dp-month-calendar-container {  background: #FFFFFF;}.dp-calendar-wrapper.rtl {  direction: rtl;}.dp-calendar-month {  box-sizing: border-box;  width: 55px;  height: 55px;  cursor: pointer;}.dp-calendar-month.dp-selected {  background: rgba(16, 108, 200, 0.5);  color: #FFFFFF;}:host.dp-material .dp-calendar-weekday {  height: 25px;  width: 30px;  line-height: 25px;  background: #E0E0E0;  border: 1px solid #E0E0E0;}:host.dp-material .dp-calendar-wrapper {  padding: 15px;}:host.dp-material .dp-calendar-month {  box-sizing: border-box;  background: #FFFFFF;  border-radius: 0;  transition: border-radius 0.1s ease;  border: none;  outline: none;  font-size: 0.7rem;}:host.dp-material .dp-calendar-month:hover {  border-radius: 50%;  background: #E0E0E0;}:host.dp-material .dp-selected {  background: rgba(16, 108, 200, 0.5);  color: #FFFFFF;  border-radius: 50%;}:host.dp-material .dp-selected:hover {  background: rgba(16, 108, 200, 0.5);}:host.dp-material .dp-current-month {  border-radius: 50%;  border: 1px solid rgba(16, 108, 200, 0.5);  padding: 0;}'],
                    providers: [
                        month_calendar_service_1.MonthCalendarService,
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return MonthCalendarComponent; }),
                            multi: true
                        },
                        {
                            provide: forms_1.NG_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return MonthCalendarComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    MonthCalendarComponent.ctorParameters = function () { return [
        { type: month_calendar_service_1.MonthCalendarService, },
        { type: utils_service_1.UtilsService, },
    ]; };
    MonthCalendarComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'displayDate': [{ type: core_1.Input },],
        'minDate': [{ type: core_1.Input },],
        'maxDate': [{ type: core_1.Input },],
        'theme': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
        'onSelect': [{ type: core_1.Output },],
        'onNavHeaderBtnClick': [{ type: core_1.Output },],
    };
    return MonthCalendarComponent;
}());
exports.MonthCalendarComponent = MonthCalendarComponent;
//# sourceMappingURL=month-calendar.component.js.map