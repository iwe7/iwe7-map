import { Iwe7MapService } from './../iwe7-map.service';
import { Directive, Input, SkipSelf, Optional, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
declare const BMap: any;
@Directive({ selector: '[zoom]' })
export class MapBaseDirective implements OnInit, OnChanges {
    constructor(
        public mapService: Iwe7MapService,
        public keys: { [key: string]: string }
    ) { }

    ngOnInit() {
        this.udpateMap();
    }

    ngOnChanges(changes: SimpleChanges) {
        let hasChanges: boolean = false;
        this.mapService.getMap().subscribe(map => {
            _.forEach(this.keys, (item, key) => {
                if (key in changes) {
                    if (!changes[key].isFirstChange()) {
                        hasChanges = true;
                        if (this[item]) {
                            this[item](map);
                        } else {
                            if (this[key] !== undefined) {
                                map[item](this[key]);
                            }
                        }
                    }
                }
            });
        });
    }

    private udpateMap() {
        this.mapService.getMap().subscribe(map => {
            _.forEach(this.keys, (item, key) => {
                if (this[item]) {
                    this[item](map);
                } else {
                    if (this[key] !== undefined) {
                        map[item](this[key]);
                    }
                }
            });
        });
    }


}
