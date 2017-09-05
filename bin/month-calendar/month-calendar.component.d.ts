import { ECalendarValue } from '../common/types/calendar-value-enum';
import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMonth } from './month.model';
import { MonthCalendarService } from './month-calendar.service';
import { Moment } from 'jalali-moment';
import { IMonthCalendarConfig } from './month-calendar-config';
import { ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';
import { CalendarValue } from '../common/types/calendar-value';
import { UtilsService } from '../common/services/utils/utils.service';
export declare class MonthCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    monthCalendarService: MonthCalendarService;
    utilsService: UtilsService;
    config: IMonthCalendarConfig;
    displayDate: Moment;
    minDate: Moment;
    maxDate: Moment;
    theme: string;
    onSelect: EventEmitter<IMonth>;
    onNavHeaderBtnClick: EventEmitter<null>;
    isInited: boolean;
    componentConfig: IMonthCalendarConfig;
    _selected: Moment[];
    yearMonths: IMonth[][];
    currentDateView: Moment;
    inputValue: CalendarValue;
    inputValueType: ECalendarValue;
    validateFn: (inputVal: CalendarValue) => {
        [key: string]: any;
    };
    selected: Moment[];
    constructor(monthCalendarService: MonthCalendarService, utilsService: UtilsService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    init(): void;
    writeValue(value: CalendarValue): void;
    registerOnChange(fn: any): void;
    onChangeCallback(_: any): void;
    registerOnTouched(fn: any): void;
    validate(formControl: FormControl): ValidationErrors | any;
    isJalali(): boolean;
    processOnChangeCallback(value: Moment[]): CalendarValue;
    initValidators(): void;
    isDisabledMonth(month: IMonth): boolean;
    monthClicked(month: IMonth): void;
    getNavLabel(): string;
    onLeftNav(): void;
    onLeftSecondaryNav(): void;
    onRightNav(): void;
    onRightSecondaryNav(): void;
    shouldShowLeftNav(): boolean;
    shouldShowLeftSecondaryNav(): boolean;
    shouldShowRightNav(): boolean;
    shouldShowRightSecondaryNav(): boolean;
    isNavHeaderBtnClickable(): boolean;
    toggleCalendar(): void;
    getMonthBtnText(month: IMonth): string;
}