"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dom_appender_service_1 = require("./common/services/dom-appender/dom-appender.service");
var utils_service_1 = require("./common/services/utils/utils.service");
var date_picker_component_1 = require("./date-picker/date-picker.component");
var date_picker_directive_1 = require("./date-picker/date-picker.directive");
var day_calendar_component_1 = require("./day-calendar/day-calendar.component");
var month_calendar_component_1 = require("./month-calendar/month-calendar.component");
var time_select_component_1 = require("./time-select/time-select.component");
var calendar_nav_component_1 = require("./calendar-nav/calendar-nav.component");
var day_time_calendar_component_1 = require("./day-time-calendar/day-time-calendar.component");
var date_picker_component_2 = require("./date-picker/date-picker.component");
exports.DatePickerComponent = date_picker_component_2.DatePickerComponent;
var date_picker_directive_2 = require("./date-picker/date-picker.directive");
exports.DatePickerDirective = date_picker_directive_2.DatePickerDirective;
var day_calendar_component_2 = require("./day-calendar/day-calendar.component");
exports.DayCalendarComponent = day_calendar_component_2.DayCalendarComponent;
var day_time_calendar_component_2 = require("./day-time-calendar/day-time-calendar.component");
exports.DayTimeCalendarComponent = day_time_calendar_component_2.DayTimeCalendarComponent;
var time_select_component_2 = require("./time-select/time-select.component");
exports.TimeSelectComponent = time_select_component_2.TimeSelectComponent;
var month_calendar_component_2 = require("./month-calendar/month-calendar.component");
exports.MonthCalendarComponent = month_calendar_component_2.MonthCalendarComponent;
var DpDatePickerModule = (function () {
    function DpDatePickerModule() {
    }
    DpDatePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        dom_appender_service_1.DomHelper,
                        utils_service_1.UtilsService
                    ],
                    declarations: [
                        date_picker_component_1.DatePickerComponent,
                        date_picker_directive_1.DatePickerDirective,
                        day_calendar_component_1.DayCalendarComponent,
                        month_calendar_component_1.MonthCalendarComponent,
                        calendar_nav_component_1.CalendarNavComponent,
                        time_select_component_1.TimeSelectComponent,
                        day_time_calendar_component_1.DayTimeCalendarComponent
                    ],
                    entryComponents: [
                        date_picker_component_1.DatePickerComponent
                    ],
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule
                    ],
                    exports: [
                        date_picker_component_1.DatePickerComponent,
                        date_picker_directive_1.DatePickerDirective,
                        month_calendar_component_1.MonthCalendarComponent,
                        day_calendar_component_1.DayCalendarComponent,
                        time_select_component_1.TimeSelectComponent,
                        day_time_calendar_component_1.DayTimeCalendarComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    DpDatePickerModule.ctorParameters = function () { return []; };
    return DpDatePickerModule;
}());
exports.DpDatePickerModule = DpDatePickerModule;
//# sourceMappingURL=date-picker.module.js.map