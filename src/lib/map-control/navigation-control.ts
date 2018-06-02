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
@Directive({ selector: '[navigationControl]' })
export class NavigationControlDirective {
    @Output() navigationControl: EventEmitter<any> = new EventEmitter();

    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_TOP_LEFT';
    @Input() width: any = 10;
    @Input() height: any = 100;
    @Input() type: BmapNavigationControlType = 'BMAP_NAVIGATION_CONTROL_SMALL';
    @Input() showZoomInfo: boolean = true;
    @Input() enableGeolocation: boolean = true;

    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const navigationControl = new BMap.NavigationControl({
                anchor: this.anchor ? (<any>window)[this.anchor] : BMAP_ANCHOR_BOTTOM_LEFT,
                offset: new BMap.Size(this.width, this.height),
                type: this.type ? (<any>window)[this.type] : BMAP_NAVIGATION_CONTROL_SMALL,
                showZoomInfo: this.showZoomInfo,
                enableGeolocation: this.enableGeolocation
            });
            map.addControl(navigationControl);
        });
    }
}
