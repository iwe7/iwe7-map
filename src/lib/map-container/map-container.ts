import { Injector } from '@angular/core';
import { Iwe7MapBase } from './../map-base/map-base';
import { Iwe7MapService } from './../iwe7-map.service';
import { ElementRef, ComponentRef, ViewEncapsulation, SkipSelf, Input, ChangeDetectionStrategy } from '@angular/core';
import { TemplateRef } from '@angular/core';

import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MapOutletComponent } from '../map-outlet/map-outlet';
declare const BMap: any;
declare const BMAP_NORMAL_MAP: any;
declare const BMAP_PERSPECTIVE_MAP: any;
declare const BMAP_SATELLITE_MAP: any;
declare const BMAP_HYBRID_MAP: any;

import { ElementRefPortal, StringPortal } from 'iwe7-core';
import { takeLast, tap } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'map-container',
    template: ``,
    styles: [
        `
            :host {
                min-height: 100%;
                height: 100%;
                max-height: 100%;
                display: block;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent extends Iwe7MapBase {
    @Input() enableHighResolution: boolean = true;
    @Input() enableMapClick: boolean = true;

    constructor(
        public ele: ElementRef,
        @Optional()
        public outlet: MapOutletComponent,
        injector: Injector
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('mapLoaded').pipe(
                tap(res => {
                    this.initMap();
                })
            ).subscribe();
        });
    }

    initMap() {
        const map = new BMap.Map(this.ele.nativeElement, {
            enableHighResolution: coerceBooleanProperty(this.enableHighResolution),
            enableMapClick: coerceBooleanProperty(this.enableMapClick)
        });
        const point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 11);
        map.enableScrollWheelZoom();
        this.mapService.setMap(map);
        if (this.outlet) {
            this.outlet.attach(new ElementRefPortal(this.ele.nativeElement));
        }
    }
}
