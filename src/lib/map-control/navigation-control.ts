import { tap } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { Iwe7MapBase } from './../map-base/map-base';
import {
    Directive, SkipSelf,
    Optional, ElementRef,
    HostListener, EventEmitter,
    Output, Input
} from '@angular/core';

import { Iwe7MapService } from './../iwe7-map.service';

declare const BMap: any;
declare const BMAP_ANCHOR_TOP_LEFT: any;
declare const BMAP_ANCHOR_TOP_RIGHT: any;
declare const BMAP_ANCHOR_BOTTOM_LEFT: any;
declare const BMAP_ANCHOR_BOTTOM_RIGHT: any;

declare const BMAP_NAVIGATION_CONTROL_LARGE: any;
declare const BMAP_NAVIGATION_CONTROL_SMALL: any;
declare const BMAP_NAVIGATION_CONTROL_PAN: any;
declare const BMAP_NAVIGATION_CONTROL_ZOOM: any;

import { BmapNavigationControlType, BmapControlAnchor } from './types';
import { switchMap } from 'rxjs/operators';
@Directive({ selector: '[navigationControl]' })
export class NavigationControlDirective extends Iwe7MapBase {
    @Output() navigationControl: EventEmitter<any> = new EventEmitter();

    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_BOTTOM_RIGHT';
    @Input() width: any = 10;
    @Input() height: any = 60;
    @Input() type: BmapNavigationControlType = 'BMAP_NAVIGATION_CONTROL_SMALL';
    @Input() showZoomInfo: boolean = true;
    @Input() enableGeolocation: boolean = true;

    control: any;

    constructor(
        public ele: ElementRef,
        injector: Injector
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('getMap').pipe(
                switchMap(map => {
                    return this.getCyc('ngOnCHanges').pipe(
                        tap(res => {
                            if (this.control) {
                                map.removeControl(this.control);
                            }
                        }),
                        tap(changes => {
                            this.control = new BMap.NavigationControl({
                                anchor: this.anchor ? (<any>window)[this.anchor] : BMAP_ANCHOR_BOTTOM_LEFT,
                                offset: new BMap.Size(this.width, this.height),
                                type: this.type ? (<any>window)[this.type] : BMAP_NAVIGATION_CONTROL_SMALL,
                                showZoomInfo: this.showZoomInfo,
                                enableGeolocation: this.enableGeolocation
                            });
                            map.addControl(this.control);
                        })
                    );
                })
            ).subscribe();
        });
    }
}
