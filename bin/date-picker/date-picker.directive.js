"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_picker_directive_service_1 = require("./date-picker-directive.service");
var date_picker_component_1 = require("./date-picker.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DatePickerDirective = (function () {
    function DatePickerDirective(viewContainerRef, componentFactoryResolver, formControl, service) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.formControl = formControl;
        this.service = service;
        this._mode = 'day';
        this.firstChange = true;
    }
    Object.defineProperty(DatePickerDirective.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "attachTo", {
        get: function () {
            return this._attachTo;
        },
        set: function (attachTo) {
            this._attachTo = attachTo;
            this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "theme", {
        get: function () {
            return this._theme;
        },
        set: function (theme) {
            this._theme = theme;
            if (this.datePicker) {
                this.datePicker.theme = theme;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            this._mode = mode;
            if (this.datePicker) {
                this.datePicker.mode = mode;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (minDate) {
            this._minDate = minDate;
            if (this.datePicker) {
                this.datePicker.minDate = minDate;
                this.datePicker.ngOnInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (maxDate) {
            this._maxDate = maxDate;
            if (this.datePicker) {
                this.datePicker.maxDate = maxDate;
                this.datePicker.ngOnInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minTime", {
        get: function () {
            return this._minTime;
        },
        set: function (minTime) {
            this._minTime = minTime;
            if (this.datePicker) {
                this.datePicker.minTime = minTime;
                this.datePicker.ngOnInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxTime", {
        get: function () {
            return this._maxTime;
        },
        set: function (maxTime) {
            this._maxTime = maxTime;
            if (this.datePicker) {
                this.datePicker.maxTime = maxTime;
                this.datePicker.ngOnInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerDirective.prototype.ngOnInit = function () {
        this.datePicker = this.createDatePicker();
        this.api = this.datePicker.api;
        this.updateDatepickerConfig();
        this.attachModelToDatePicker();
        this.datePicker.theme = this.theme;
    };
    DatePickerDirective.prototype.createDatePicker = function () {
        var factory = this.componentFactoryResolver.resolveComponentFactory(date_picker_component_1.DatePickerComponent);
        return this.viewContainerRef.createComponent(factory).instance;
    };
    DatePickerDirective.prototype.attachModelToDatePicker = function () {
        var _this = this;
        if (!this.formControl) {
            return;
        }
        this.datePicker.onViewDateChange(this.formControl.value);
        this.formControl.valueChanges.subscribe(function (value) {
            if (value !== _this.datePicker.inputElementValue) {
                _this.datePicker.onViewDateChange(value);
            }
        });
        var setup = true;
        this.datePicker.registerOnChange(function (value) {
            if (value) {
                var isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                if (!isMultiselectEmpty) {
                    _this.formControl.control.setValue(_this.datePicker.inputElementValue);
                }
            }
            var errors = _this.datePicker.validateFn(value);
            if (!setup) {
                _this.formControl.control.markAsDirty({ onlySelf: true });
            }
            else {
                setup = false;
            }
            if (errors) {
                _this.formControl.control.setErrors(errors);
            }
        });
    };
    DatePickerDirective.prototype.onClick = function () {
        this.datePicker.onClick();
    };
    DatePickerDirective.prototype.onFocus = function () {
        this.datePicker.inputFocused();
    };
    DatePickerDirective.prototype.updateDatepickerConfig = function () {
        if (this.datePicker) {
            this.datePicker.minDate = this.minDate;
            this.datePicker.maxDate = this.maxDate;
            this.datePicker.minTime = this.minTime;
            this.datePicker.maxTime = this.maxTime;
            this.datePicker.mode = this.mode || 'day';
            this.datePicker.config = this.config;
            this.datePicker.init();
        }
    };
    DatePickerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    exportAs: 'dpDayPicker',
                    providers: [date_picker_directive_service_1.DatePickerDirectiveService],
                    selector: '[dpDayPicker]'
                },] },
    ];
    /** @nocollapse */
    DatePickerDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: forms_1.NgControl, decorators: [{ type: core_1.Optional },] },
        { type: date_picker_directive_service_1.DatePickerDirectiveService, },
    ]; };
    DatePickerDirective.propDecorators = {
        'config': [{ type: core_1.Input, args: ['dpDayPicker',] },],
        'attachTo': [{ type: core_1.Input },],
        'theme': [{ type: core_1.Input },],
        'mode': [{ type: core_1.Input },],
        'minDate': [{ type: core_1.Input },],
        'maxDate': [{ type: core_1.Input },],
        'minTime': [{ type: core_1.Input },],
        'maxTime': [{ type: core_1.Input },],
        'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        'onFocus': [{ type: core_1.HostListener, args: ['focus',] },],
    };
    return DatePickerDirective;
}());
exports.DatePickerDirective = DatePickerDirective;
//# sourceMappingURL=date-picker.directive.js.map