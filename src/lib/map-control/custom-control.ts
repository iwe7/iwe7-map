import { ElementRef, OnDestroy } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, OnInit } from '@angular/core';
declare const BMap: any;
@Directive({ selector: '[customControl]' })
export class CustomControlDirective implements OnInit, OnDestroy {
    control: any;
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(mp => {
            const that = this;
            const CustomControl = class extends BMap.Control {
                initialize(map: any) {
                    map.getContainer().appendChild(that.ele.nativeElement);
                    return that.ele.nativeElement;
                }
            };
            this.control = new CustomControl();
            mp.addControl(this.control);
            console.log(this.control);
        });
    }

    ngOnDestroy() {
        this.mapService.getMap().subscribe(mp => {
            mp.removeControl(this.control);
        });
    }
}
