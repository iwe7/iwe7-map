import { Iwe7MapBase } from './../map-base/map-base';
import { switchMap, tap } from 'rxjs/operators';
import { Iwe7CoreComponent } from 'iwe7-core';
import { ElementRef, OnDestroy, Injector, DoCheck } from '@angular/core';
import { Iwe7MapService, } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, OnInit, Input } from '@angular/core';
declare const BMap: any;
declare const BMAP_ANCHOR_BOTTOM_LEFT: any;
import { BmapControlAnchor } from './types';
@Directive({ selector: '[customControl]' })
export class CustomControlDirective extends Iwe7MapBase {
    control: any;

    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_TOP_LEFT';
    @Input() width: any = 0;
    @Input() height: any = 0;

    constructor(
        public ele: ElementRef,
        public injector: Injector
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('getMap').pipe(
                switchMap(map => {
                    return this.getCyc('ngOnChanges').pipe(
                        tap(res => {
                            if (this.control) {
                                map.removeControl(this.control);
                                this.control = undefined;
                            }
                        }),
                        tap(res => {
                            const control = this.getBmapControl();
                            this.control = new control();
                            map.addControl(this.control);
                        })
                    );
                })
            ).subscribe();
        });
    }

    getBmapControl() {
        const that = this;
        const Control = function () {
            this.defaultAnchor = (<any>window)[that.anchor || 'BMAP_ANCHOR_TOP_LEFT'];
            this.defaultOffset = new BMap.Size(that.width, that.height);
        };
        Control.prototype = new BMap.Control();
        Control.prototype.initialize = map => map.getContainer().appendChild(that.ele.nativeElement);
        return Control;
    }

    ngOnDestroy() {
        this.runOutsideAngular(() => {
            this.mapService.getMap().subscribe(mp => {
                mp.removeControl(this.control);
            });
        });
        super.ngOnDestroy();
    }
}
