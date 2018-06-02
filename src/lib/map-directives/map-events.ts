import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, debounceTime } from 'rxjs/operators';

import { ElementRef, HostListener, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Directive, SkipSelf, Optional } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import * as _ from 'lodash';
@Directive({
    selector: `
    [mapClick],
    [mapDblclick],
    [mapRightclick],
    [mapRightdblclick],
    [mapMaptypechange],
    [mapMousemove],
    [mapMouseover],
    [mapMouseout],
    [mapMovestart],
    [mapMoving],
    [mapMoveend],
    [mapZoomstart],
    [mapZoomend],
    [mapAddoverlay],
    [mapAddcontrol],
    [mapRemovecontrol],
    [mapRemoveoverlay],
    [mapClearoverlays],
    [mapDragstart],
    [mapDragging],
    [mapDragend],
    [mapAddtilelayer],
    [mapRemovetilelayer],
    [mapLoad],
    [mapResize],
    [mapHotspotclick],
    [mapHotspotover],
    [mapHotspotout],
    [mapTilesloaded],
    [mapTouchstart],
    [mapTouchmove],
    [mapTouchend],
    [mapLongpress]
` })
export class MapEventsDirective implements OnDestroy {

    @Output() mapClick: EventEmitter<any> = new EventEmitter();
    @Output() mapDblclick: EventEmitter<any> = new EventEmitter();
    @Output() mapRightclick: EventEmitter<any> = new EventEmitter();
    @Output() mapRightdblclick: EventEmitter<any> = new EventEmitter();
    @Output() mapMaptypechange: EventEmitter<any> = new EventEmitter();
    @Output() mapMousemove: EventEmitter<any> = new EventEmitter();
    @Output() mapMouseover: EventEmitter<any> = new EventEmitter();
    @Output() mapMouseout: EventEmitter<any> = new EventEmitter();
    @Output() mapMovestart: EventEmitter<any> = new EventEmitter();
    @Output() mapMoving: EventEmitter<any> = new EventEmitter();
    @Output() mapMoveend: EventEmitter<any> = new EventEmitter();
    @Output() mapZoomstart: EventEmitter<any> = new EventEmitter();
    @Output() mapZoomend: EventEmitter<any> = new EventEmitter();
    @Output() mapAddoverlay: EventEmitter<any> = new EventEmitter();
    @Output() mapAddcontrol: EventEmitter<any> = new EventEmitter();
    @Output() mapRemovecontrol: EventEmitter<any> = new EventEmitter();
    @Output() mapRemoveoverlay: EventEmitter<any> = new EventEmitter();
    @Output() mapClearoverlays: EventEmitter<any> = new EventEmitter();
    @Output() mapDragstart: EventEmitter<any> = new EventEmitter();
    @Output() mapDragging: EventEmitter<any> = new EventEmitter();
    @Output() mapDragend: EventEmitter<any> = new EventEmitter();
    @Output() mapAddtilelayer: EventEmitter<any> = new EventEmitter();
    @Output() mapRemovetilelayer: EventEmitter<any> = new EventEmitter();
    @Output() mapLoad: EventEmitter<any> = new EventEmitter();
    @Output() mapResize: EventEmitter<any> = new EventEmitter();
    @Output() mapHotspotclick: EventEmitter<any> = new EventEmitter();
    @Output() mapHotspotover: EventEmitter<any> = new EventEmitter();
    @Output() mapHotspotout: EventEmitter<any> = new EventEmitter();
    @Output() mapTilesloaded: EventEmitter<any> = new EventEmitter();
    @Output() mapTouchstart: EventEmitter<any> = new EventEmitter();
    @Output() mapTouchmove: EventEmitter<any> = new EventEmitter();
    @Output() mapTouchend: EventEmitter<any> = new EventEmitter();
    @Output() mapLongpress: EventEmitter<any> = new EventEmitter();

    @Input() delay: number = 300;
    destoryed: Subject<boolean> = new Subject();
    keys: string[] = [
        'click', 'dblclick', 'rightclick', 'rightdblclick',
        'maptypechange', 'mousemove', 'mouseover', 'mouseout',
        'movestart', 'moving', 'moveend', 'zoomstart', 'zoomend',
        'addoverlay', 'addcontrol', 'removecontrol', 'removeoverlay',
        'clearoverlays', 'dragstart', 'dragging', 'dragend', 'addtilelayer',
        'removetilelayer', 'load', 'resize', 'hotspotclick', 'hotspotover',
        'hotspotout', 'tilesloaded', 'touchstart', 'touchmove', 'touchend',
        'longpress'
    ];
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) {

    }

    ngOnInit() {
        if (this.mapService) {
            this.mapService.getMap()
                .pipe(
                    takeUntil(this.destoryed)
                ).subscribe((map: any) => {
                    this.keys.map(item => {
                        this.listen(map, item).pipe(
                            takeUntil(this.destoryed),
                            debounceTime(this.delay)
                        ).subscribe(res => {
                            const s = _.upperFirst(item);
                            this[`map${s}`].emit(res);
                        });
                    });
                });
        }
    }

    ngOnDestroy() {
        this.destoryed.next();
        this.destoryed.complete();
    }

    listen(map: any, name: string): Observable<any> {
        return Observable.create((observer) => {
            map.addEventListener(name, (...res) => {
                observer.next(...res);
            });
        });
    }
}
