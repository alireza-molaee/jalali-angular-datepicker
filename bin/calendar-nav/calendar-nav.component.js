"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CalendarNavComponent = (function () {
    function CalendarNavComponent() {
        this.onLeftNav = new core_1.EventEmitter();
        this.onLeftSecondaryNav = new core_1.EventEmitter();
        this.onRightNav = new core_1.EventEmitter();
        this.onRightSecondaryNav = new core_1.EventEmitter();
        this.onLabelClick = new core_1.EventEmitter();
        this.isLabelClickable = false;
        this.showLeftNav = true;
        this.showLeftSecondaryNav = false;
        this.showRightNav = true;
        this.showRightSecondaryNav = false;
        this.leftNavDisabled = false;
        this.leftSecondaryNavDisabled = false;
        this.rightNavDisabled = false;
        this.rightSecondaryNavDisabled = false;
    }
    CalendarNavComponent.prototype.leftNavClicked = function () {
        this.onLeftNav.emit();
    };
    CalendarNavComponent.prototype.leftSecondaryNavClicked = function () {
        this.onLeftSecondaryNav.emit();
    };
    CalendarNavComponent.prototype.rightNavClicked = function () {
        this.onRightNav.emit();
    };
    CalendarNavComponent.prototype.rightSecondaryNavClicked = function () {
        this.onRightSecondaryNav.emit();
    };
    CalendarNavComponent.prototype.labelClicked = function () {
        this.onLabelClick.emit();
    };
    CalendarNavComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dp-calendar-nav',
                    template: '<div class="dp-calendar-nav-container">   <div class="dp-calendar-nav-container-left">     <button type="button"             class="dp-calendar-nav-left"             [hidden]="!showLeftNav"             [disabled]="leftNavDisabled"             (click)="leftNavClicked()">     </button>     <button type="button"             class="dp-calendar-secondary-nav-left"             *ngIf="showLeftSecondaryNav"             [disabled]="leftSecondaryNavDisabled"             (click)="leftSecondaryNavClicked()">     </button>   </div>   <span class="dp-nav-header" [hidden]="isLabelClickable">{{label}}</span>   <button type="button"           class="dp-nav-header dp-nav-header-btn"           [hidden]="!isLabelClickable"           (click)="labelClicked()">     {{label}}   </button>   <div class="dp-calendar-nav-container-right">     <button type="button"             class="dp-calendar-secondary-nav-right"             *ngIf="showRightSecondaryNav"             [disabled]="rightSecondaryNavDisabled"             (click)="rightSecondaryNavClicked()">     </button>     <button type="button"             class="dp-calendar-nav-right"             [hidden]="!showRightNav"             [disabled]="rightNavDisabled"             (click)="rightNavClicked()">     </button>   </div> </div> ',
                    styles: ['.dp-calendar-nav-container {  position: relative;  box-sizing: border-box;  height: 25px;  border: 1px solid #000000;  border-bottom: none;}.dp-nav-date-btn {  box-sizing: border-box;  height: 25px;  border: 1px solid #000000;  border-bottom: none;}.dp-calendar-nav-container-left,.dp-calendar-nav-container-right {  direction: ltr;  position: absolute;  top: 50%;  transform: translateY(-50%);}.dp-calendar-nav-container-left {  left: 5px;}.dp-calendar-nav-container-right {  right: 5px;}.dp-calendar-nav-left,.dp-calendar-nav-right,.dp-calendar-secondary-nav-left,.dp-calendar-secondary-nav-right {  cursor: pointer;}.dp-calendar-nav-left,.dp-calendar-nav-right {  line-height: 0;}.dp-calendar-nav-left::before,.dp-calendar-nav-right::before {  position: relative;  content: \'\';  display: inline-block;  height: 8px;  width: 8px;  vertical-align: baseline;  border-style: solid;  border-width: 2px 2px 0 0;  transform: rotate(45deg);}.dp-calendar-secondary-nav-left::before,.dp-calendar-secondary-nav-right::before,.dp-calendar-secondary-nav-left::after,.dp-calendar-secondary-nav-right::after {  position: relative;  content: \'\';  display: inline-block;  height: 8px;  width: 8px;  vertical-align: baseline;  border-style: solid;  border-width: 2px 2px 0 0;  transform: rotate(45deg);}.dp-calendar-secondary-nav-left::before,.dp-calendar-secondary-nav-right::before {  margin-right: -8px;}.dp-calendar-nav-left::before {  position: relative;  content: \'\';  display: inline-block;  height: 8px;  width: 8px;  vertical-align: baseline;  border-style: solid;  border-width: 2px 2px 0 0;  transform: rotate(-135deg);}.dp-calendar-secondary-nav-left::before,.dp-calendar-secondary-nav-left::after {  position: relative;  content: \'\';  display: inline-block;  height: 8px;  width: 8px;  vertical-align: baseline;  border-style: solid;  border-width: 2px 2px 0 0;  transform: rotate(-135deg);}.dp-calendar-secondary-nav-left::before {  margin-right: -8px;}.dp-nav-header {  position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);  font-size: 13px;}.dp-nav-header-btn {  cursor: pointer;}:host.dp-material .dp-calendar-nav-container {  height: 30px;  border: none;  background: #FFFFFF;}:host.dp-material .dp-calendar-nav-left,:host.dp-material .dp-calendar-nav-right,:host.dp-material .dp-calendar-secondary-nav-left,:host.dp-material .dp-calendar-secondary-nav-right {  border: none;  color: inherit;  background: none;  outline: none;  font-size: 16px;}:host.dp-material .dp-nav-header-btn {  height: 20px;  width: 100px;  border: none;  color: inherit;  background: none;  outline: none;}:host.dp-material .dp-nav-header-btn:hover {  background: rgba(0, 0, 0, 0.05);}:host.dp-material .dp-nav-header-btn:active {  background: rgba(0, 0, 0, 0.1);}']
                },] },
    ];
    /** @nocollapse */
    CalendarNavComponent.ctorParameters = function () { return []; };
    CalendarNavComponent.propDecorators = {
        'onLeftNav': [{ type: core_1.Output },],
        'onLeftSecondaryNav': [{ type: core_1.Output },],
        'onRightNav': [{ type: core_1.Output },],
        'onRightSecondaryNav': [{ type: core_1.Output },],
        'onLabelClick': [{ type: core_1.Output },],
        'label': [{ type: core_1.Input },],
        'isLabelClickable': [{ type: core_1.Input },],
        'showLeftNav': [{ type: core_1.Input },],
        'showLeftSecondaryNav': [{ type: core_1.Input },],
        'showRightNav': [{ type: core_1.Input },],
        'showRightSecondaryNav': [{ type: core_1.Input },],
        'leftNavDisabled': [{ type: core_1.Input },],
        'leftSecondaryNavDisabled': [{ type: core_1.Input },],
        'rightNavDisabled': [{ type: core_1.Input },],
        'rightSecondaryNavDisabled': [{ type: core_1.Input },],
        'theme': [{ type: core_1.HostBinding, args: ['class',] }, { type: core_1.Input },],
    };
    return CalendarNavComponent;
}());
exports.CalendarNavComponent = CalendarNavComponent;
//# sourceMappingURL=calendar-nav.component.js.map