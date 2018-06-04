import { HostBinding, Output, EventEmitter } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Iwe7MapService, loaded } from './../iwe7-map.service';
import { Directive, HostListener, SkipSelf, Optional } from '@angular/core';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;
@Directive({ selector: '[geolocation]' })
export class GeolocationDirective {
    @Output() geolocation: EventEmitter<any> = new EventEmitter();
    @Output() beforeGeolocation: EventEmitter<any> = new EventEmitter();
    @HostListener('click', ['$event'])
    _click(e: any) {
        this.mapService.getMap().subscribe(map => {
            const geolocation = new BMap.Geolocation();
            const that = this;
            this.beforeGeolocation.emit();
            geolocation.getCurrentPosition(function (r: any) {
                if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                    that.geolocation.emit(r);
                } else {
                    that.geolocation.emit(false);
                }
            }, { enableHighAccuracy: true });
        });
    }
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef,
        public render: Renderer2
    ) { }
}
