import { Moment, unitOfTime } from 'jalali-moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { IMonth } from './month.model';
import { IMonthCalendarConfig } from './month-calendar-config';
export declare class MonthCalendarService {
    private utilsService;
    readonly GREGORIAN_DEFAULT_CONFIG: IMonthCalendarConfig;
    readonly JALALI_DEFAULT_CONFIG: IMonthCalendarConfig;
    DEFAULT_CONFIG: IMonthCalendarConfig;
    constructor(utilsService: UtilsService);
    getMomentMonthFormat(config?: IMonthCalendarConfig): unitOfTime.Base;
    getMomentYearFormat(config?: IMonthCalendarConfig): unitOfTime.Base;
    getConfig(config: IMonthCalendarConfig): IMonthCalendarConfig;
    increaseYear(year: Moment): void;
    decreaseYear(year: Moment): void;
    generateYear(year: Moment, selected?: Moment[]): IMonth[][];
    isMonthDisabled(month: IMonth, config: IMonthCalendarConfig): boolean;
    shouldShowLeft(min: Moment, currentMonthView: Moment): boolean;
    shouldShowRight(max: Moment, currentMonthView: Moment): boolean;
    getHeaderLabel(config: IMonthCalendarConfig, year: Moment): string;
    getMonthBtnText(config: IMonthCalendarConfig, month: Moment): string;
}
