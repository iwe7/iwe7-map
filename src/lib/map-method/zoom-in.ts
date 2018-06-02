import { ElementRef, HostListener } from '@angular/core';
import { Directive, SkipSelf, Optional } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
@Directive({ selector: '[zoomIn]' })
export class ZoomInDirective {
    @HostListener('click', ['$event'])
    _click(e: any) {
        this.mapService.getMap().subscribe(map => {
            map.zoomIn();
        });
    }
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef
    ) { }
}
