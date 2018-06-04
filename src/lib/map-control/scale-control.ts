import { switchMap, tap } from 'rxjs/operators';
import { Iwe7MapService, } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, Input, Injector } from '@angular/core';
declare const BMap: any;
declare const BMAP_ANCHOR_TOP_LEFT: any;
declare const BMAP_ANCHOR_TOP_RIGHT: any;

import { BmapControlAnchor } from './types';
import { Iwe7MapBase } from '../map-base/map-base';
@Directive({ selector: '[scaleControl]' })
export class ScaleControlDirective extends Iwe7MapBase {
    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_BOTTOM_LEFT';
    @Input() width: any = 50;
    @Input() height: any = 60;
    control: any;
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('getMap').pipe(
                switchMap(map => {
                    return this.getCyc('ngOnChanges').pipe(
                        tap(res => {
                            if (this.control) {
                                map.removeControl(this.control);
                            }
                        }),
                        tap(changes => {
                            this.control = new BMap.ScaleControl({
                                anchor: this.anchor ? (<any>window)[this.anchor] : BMAP_ANCHOR_TOP_RIGHT,
                                offset: new BMap.Size(this.width, this.height),
                            });
                            map.addControl(this.control);
                        })
                    );
                })
            ).subscribe();
        });
    }
}
