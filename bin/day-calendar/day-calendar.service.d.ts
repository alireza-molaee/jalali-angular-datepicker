import { Moment } from 'jalali-moment';
import { WeekDays } from '../common/types/week-days.type';
import { UtilsService } from '../common/services/utils/utils.service';
import { IDay } from './day.model';
import { IDayCalendarConfig } from './day-calendar-config.model';
import { IMonthCalendarConfig } from '../month-calendar/month-calendar-config';
export declare class DayCalendarService {
    private utilsService;
    private readonly DAYS;
    readonly GREGORIAN_DEFAULT_CONFIG: IDayCalendarConfig;
    readonly JALALI_CONFIG_EXTENTION: IDayCalendarConfig;
    DEFAULT_CONFIG: IDayCalendarConfig;
    constructor(utilsService: UtilsService);
    private getMonthFormat(config?);
    private removeNearMonthWeeks(currentMonth, monthArray);
    getConfig(config: IDayCalendarConfig): IDayCalendarConfig;
    generateDaysMap(firstDayOfWeek: WeekDays): {
        [key: number]: string;
    };
    generateMonthArray(config: IDayCalendarConfig, month: Moment, selected: Moment[]): IDay[][];
    generateWeekdays(firstDayOfWeek: WeekDays): Moment[];
    isDateDisabled(day: IDay, config: IDayCalendarConfig): boolean;
    getHeaderLabel(config: IDayCalendarConfig, month: Moment): string;
    shouldShowLeft(min: Moment, currentMonthView: Moment): boolean;
    shouldShowRight(max: Moment, currentMonthView: Moment): boolean;
    generateDaysIndexMap(firstDayOfWeek: WeekDays): {
        [key: number]: string;
    };
    getMonthCalendarConfig(componentConfig: IDayCalendarConfig): IMonthCalendarConfig;
    getDayBtnText(config: IDayCalendarConfig, day: Moment): string;
}
