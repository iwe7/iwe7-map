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
import { BmapControlAnchor } from './types';

@Directive({ selector: '[geolocationControl]' })
export class GeolocationControlDirective {
    @Output() geolocationControl: EventEmitter<any> = new EventEmitter();

    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_TOP_LEFT';
    @Input() width: any = 10;
    @Input() height: any = 60;
    @Input() showAddressBar: boolean = true;
    @Input() enableAutoLocation: boolean = true;
    @Input() locationIcon: any;

    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const geolocationControl = new BMap.GeolocationControl({
                anchor: this.anchor ? (<any>window)[this.anchor] : BMAP_ANCHOR_TOP_LEFT,
                offset: new BMap.Size(this.width, this.height),
                showAddressBar: this.showAddressBar,
                enableAutoLocation: this.enableAutoLocation
            });
            geolocationControl.addEventListener('locationSuccess', (e: any) => {
                this.geolocationControl.emit(e.addressComponent);
            });
            geolocationControl.addEventListener('locationError', (e: any) => {
                console.log(e);
            });
            map.addControl(geolocationControl);
        });
    }
}
