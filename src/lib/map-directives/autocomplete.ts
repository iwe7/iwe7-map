
import { Iwe7MapService } from './../iwe7-map.service';
import { ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Directive, SkipSelf, Optional } from '@angular/core';
declare const BMap: any;
@Directive({ selector: '[mapAutoComplete]' })
export class MapAutoCompleteDirective implements OnInit {
    @Output() mapAutoComplete: EventEmitter<any> = new EventEmitter();
    @Output() onconfirm: EventEmitter<any> = new EventEmitter();
    @Output() onhighlight: EventEmitter<any> = new EventEmitter();

    constructor(
        public ele: ElementRef,
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const autocomplete = new BMap.Autocomplete({
                location: map,
                onSearchComplete: (res) => {
                    const numPois = res.getNumPois();
                    const pois = [];
                    for (let i = 0; i < numPois; i++) {
                        const poi = res.getPoi(i);
                        if (poi) {
                            pois.push(poi);
                        }
                    }
                    this.mapAutoComplete.emit(pois);
                },
                input: this.ele.nativeElement
            });
            autocomplete.addEventListener('onconfirm', (...res) => {
                this.onconfirm.emit(res);
            });
            autocomplete.addEventListener('onhighlight', (...res) => {
                this.onhighlight.emit(res);
            });
        });
    }
}
