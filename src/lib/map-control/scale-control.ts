import { Iwe7MapService, } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, Input } from '@angular/core';
declare const BMap: any;
declare const BMAP_ANCHOR_TOP_LEFT: any;
declare const BMAP_ANCHOR_TOP_RIGHT: any;

import { BmapControlAnchor } from './types';
@Directive({ selector: '[scaleControl]' })
export class ScaleControlDirective {
    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_TOP_RIGHT';
    @Input() width: any = 10;
    @Input() height: any = 40;
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const scaleControl = new BMap.ScaleControl({
                anchor: this.anchor ? (<any>window)[this.anchor] : BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(this.width, this.height),
            });
            map.addControl(scaleControl);
        });
    }
}
