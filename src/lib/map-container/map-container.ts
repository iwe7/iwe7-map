import { Iwe7MapService } from './../iwe7-map.service';
import { ElementRef, ComponentRef, ViewEncapsulation, SkipSelf, Input } from '@angular/core';
import { TemplateRef } from '@angular/core';

import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MapOutletComponent } from '../map-outlet/map-outlet';
declare const BMap: any;
declare const BMAP_NORMAL_MAP: any;
declare const BMAP_PERSPECTIVE_MAP: any;
declare const BMAP_SATELLITE_MAP: any;
declare const BMAP_HYBRID_MAP: any;

import { ElementRefPortal, StringPortal } from 'iwe7-core';
import { takeLast } from 'rxjs/operators';
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
    ]
})
export class MapContainerComponent {
    @Input() enableHighResolution: boolean = true;
    @Input() enableMapClick: boolean = true;

    constructor(
        public ele: ElementRef,
        @Optional()
        @SkipSelf()
        public outlet: MapOutletComponent,
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) {
        if (this.mapService) {
            this.mapService.loaded.pipe(
                takeLast(1)
            ).subscribe(() => {
                this.initMap();
            });
        }
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
