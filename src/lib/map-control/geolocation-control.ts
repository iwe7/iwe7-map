import { Iwe7MapBase } from './../map-base/map-base';
import { Iwe7CoreComponent } from 'iwe7-core';
import { DomSanitizer } from '@angular/platform-browser';
import {
    Directive, SkipSelf,
    Optional, ElementRef,
    HostListener, EventEmitter,
    Output, Input, Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    NgZone, ViewContainerRef, ViewRef,
    Injector
} from '@angular/core';

import { Iwe7MapService } from './../iwe7-map.service';
import { MatIconRegistry, ThemePalette } from '@angular/material';
declare const BMap: any;
declare const BMAP_ANCHOR_TOP_LEFT: any;
declare const BMAP_ANCHOR_TOP_RIGHT: any;
declare const BMAP_ANCHOR_BOTTOM_LEFT: any;
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any;
declare const BMAP_STATUS_SUCCESS: any;
import { BmapControlAnchor } from './types';

@Component({
    selector: 'geolocation-control,[geolocationControl]',
    template: `
        <button (click)="getMyLocation($event)" [disabled]="locationing" mat-mini-fab>
            <mat-icon>my_location</mat-icon>
        </button>
        <map-overlay [lat]="lat" [lng]="lng">
            <button mat-mini-fab>
                <mat-icon>person_pin</mat-icon>
            </button>
        </map-overlay>
    `,
    styles: [
        `:host{display: block;}`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeolocationControlDirective extends Iwe7MapBase {
    @Input() locationing: boolean = true;
    @Input() lat: any;
    @Input() lng: any;
    @Input() zoom: number = 18;

    point: any;
    constructor(
        public ele: ElementRef,
        public icon: MatIconRegistry,
        public dm: DomSanitizer,
        public cd: ChangeDetectorRef,
        injector: Injector
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('ngAfterViewInit').subscribe(res => {
                this.getMyLocation({});
            });
        });
    }

    getMyLocation(e: any) {
        this.mapService.getMap().subscribe(map => {
            const geolocation = new BMap.Geolocation();
            this.locationing = true;
            geolocation.getCurrentPosition((r: any) => {
                if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
                    this.point = r.point;
                    map.panTo(this.point);
                    // map.centerAndZoom(this.point, this.zoom);
                    this.run(() => {
                        this.locationing = false;
                        this.lat = this.point.lat;
                        this.lng = this.point.lng;
                        this.cd.markForCheck();
                    });
                }
            }, { enableHighAccuracy: true });
        });
    }

    geolocation(e: any) { }
}
