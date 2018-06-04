import { Iwe7MapBase } from './../map-base/map-base';
import { MapPaneDirective } from './../map-pane/map-pane';
import { HostBinding, SimpleChanges, OnChanges, ViewEncapsulation, EventEmitter, Output, ChangeDetectionStrategy, Injector } from '@angular/core';
import { ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Component, OnInit, SkipSelf, Optional, Input } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { takeLast, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare const BMap: any;
let overlayTotal: number = 0;
import { Iwe7CoreComponent } from 'iwe7-core';
@Component({
    selector: 'map-overlay',
    templateUrl: 'map-overlay.html',
    styleUrls: ['./map-overlay.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapOverlayComponent extends Iwe7MapBase {
    _lat: any;
    @Input()
    set lat(val: number) {
        this._lat = val;
    }
    get lat() {
        return this._lat;
    }
    @Input() lng: number;

    @Input() offsetX: number = 0;
    @Input() offsetY: number = 0;

    @Output() initOverlay: EventEmitter<any> = new EventEmitter();

    overlay: any;
    id: string;
    map: any;

    @HostBinding('style.position')
    @Input()
    position: string = 'absolute';

    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef,
        public render: Renderer2,
        @Optional()
        public mapPan: MapPaneDirective,
        injector: Injector
    ) {
        super(injector);
        this._zone.runOutsideAngular(() => {
            overlayTotal++;
            this.id = 'overlay' + overlayTotal;
            this.render.addClass(this.ele.nativeElement, this.id);
            this.getCyc('getMap').pipe(
                switchMap(map => {
                    this.map = map;
                    return this.getCyc('ngOnChanges').pipe(
                        tap(changes => {
                            if (this.overlay) {
                                map.removeOverlay(this.overlay);
                                this.overlay = undefined;
                            }
                        }),
                        tap(changes => {
                            const overlay = this.getBmapOverlay();
                            this.overlay = new overlay(this.lng, this.lat);
                            map.addOverlay(this.overlay);
                            this.initOverlay.emit(this.overlay);
                        })
                    );
                })
            ).subscribe();
        });
    }

    ngOnDestroy() {
        if (this.overlay) {
            this.map.removeOverlay(this.overlay);
        }
        super.ngOnDestroy();
    }

    getBmapOverlay() {
        const that = this;
        const Overlay = function (lng: any, lat: any) {
            this._point = new BMap.Point(lng, lat);
        };
        Overlay.prototype = new BMap.Overlay();
        Overlay.prototype.initialize = function (map: any) {
            this._map = map;
            map.getPanes().labelPane.appendChild(that.ele.nativeElement);
            this._ele = that.ele.nativeElement;
            return this._ele;
        };
        Overlay.prototype.draw = function () {
            const pixel = this._map.pointToOverlayPixel(this._point);
            that.render.setStyle(this._ele, 'left', `${pixel.x - that.offsetX}px`);
            that.render.setStyle(this._ele, 'top', `${pixel.y - that.offsetY}px`);
        };
        return Overlay;
    }
}
