import { ECalendarValue } from '../../types/calendar-value-enum';
import { SingleCalendarValue } from '../../types/single-calendar-value';
import * as moment from 'jalali-moment';
import { Moment, unitOfTime } from 'jalali-moment';
import { CalendarValue } from '../../types/calendar-value';
import { IDate } from '../../models/date.model';
import { CalendarMode } from '../../types/calendar-mode';
export declare type DateValidatorFn = (inputVal: CalendarValue) => {
    [key: string]: any;
};
export interface DateLimits {
    minDate?: SingleCalendarValue;
    maxDate?: SingleCalendarValue;
    minTime?: SingleCalendarValue;
    maxTime?: SingleCalendarValue;
}
export declare class UtilsService {
    static debounce(func: Function, wait: number): () => void;
    createArray(size: number): number[];
    convertToMoment(date: SingleCalendarValue, format: string): Moment | null;
    isDateValid(date: string, format: string): boolean;
    getDefaultDisplayDate(def: Moment, selected: Moment[], allowMultiSelect: boolean): Moment;
    getInputType(value: CalendarValue, allowMultiSelect: boolean): ECalendarValue;
    convertToMomentArray(value: CalendarValue, format: string, allowMultiSelect: boolean): Moment[];
    convertFromMomentArray(format: string, value: moment.Moment[], inputValueType: ECalendarValue): CalendarValue;
    clearUndefined<T>(obj: T): T;
    compareMomentArrays(arr1: Moment[], arr2: Moment[], granularity: unitOfTime.Base): boolean;
    updateSelected(isMultiple: boolean, currentlySelected: Moment[], date: IDate, granularity?: unitOfTime.Base): Moment[];
    closestParent(element: HTMLElement, selector: string): HTMLElement;
    onlyTime(m: Moment): Moment;
    granularityFromType(calendarType: CalendarMode): unitOfTime.Base;
    createValidator({minDate, maxDate, minTime, maxTime}: DateLimits, format: string, calendarType: CalendarMode): DateValidatorFn;
}
