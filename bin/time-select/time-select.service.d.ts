import { Moment } from 'jalali-moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { ITimeSelectConfig } from './time-select-config.model';
export declare type TimeUnit = 'hour' | 'minute' | 'second';
export declare const FIRST_PM_HOUR = 12;
export declare class TimeSelectService {
    private utilsService;
    readonly DEFAULT_CONFIG: ITimeSelectConfig;
    constructor(utilsService: UtilsService);
    getConfig(config: ITimeSelectConfig): ITimeSelectConfig;
    getTimeFormat(config: ITimeSelectConfig): string;
    getHours(config: ITimeSelectConfig, t: Moment | null): string;
    getMinutes(config: ITimeSelectConfig, t: Moment | null): string;
    getSeconds(config: ITimeSelectConfig, t: Moment | null): string;
    getMeridiem(config: ITimeSelectConfig, time: Moment): string;
    decrease(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): Moment;
    increase(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): Moment;
    toggleMeridiem(time: Moment): Moment;
    shouldShowDecrease(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): boolean;
    shouldShowIncrease(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): boolean;
    shouldShowToggleMeridiem(config: ITimeSelectConfig, time: Moment): boolean;
}
