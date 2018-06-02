import { ElementRef, HostListener } from '@angular/core';
import { Directive, SkipSelf, Optional } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
@Directive({ selector: '[zoomOut]' })
export class ZoomOutDirective {
    @HostListener('click', ['$event'])
    _click(e: any) {
        this.mapService.getMap().subscribe(map => {
            map.zoomOut();
        });
    }
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef
    ) { }
}
