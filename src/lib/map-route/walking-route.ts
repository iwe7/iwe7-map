import { Iwe7MapService } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, Input, Output, EventEmitter } from '@angular/core';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;
@Directive({ selector: '[walkingRoute]' })
export class WalkingRouteDirective {
    @Input() start: any;
    @Input() end: any;

    @Output() walkingRoute: EventEmitter<any> = new EventEmitter();
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const walking = new BMap.WalkingRoute(map, {
                renderOptions: {
                    map: map,
                    autoViewport: true
                },
                onSearchComplete: (result) => {
                    console.log(result);
                }
            });
            walking.search(this.start, this.end);
        });
    }
}
