import { Iwe7MapService } from './../iwe7-map.service';
import { OnInit, Input } from '@angular/core';
import { Directive, SkipSelf, Optional } from '@angular/core';
import { Iwe7ScriptService } from 'iwe7-script';
declare const BMapLib: any;
declare const BMap: any;
import { BmapControlAnchor } from './types';
@Directive({ selector: '[trafficControl]' })
export class TrafficControlDirective implements OnInit {
    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_BOTTOM_LEFT';

    @Input() width: any = 10;
    @Input() height: any = 100;
    constructor(
        public script: Iwe7ScriptService,
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
    ) { }

    ngOnInit() {
        this.mapService.loaded.subscribe(res => {
            if (res) {
                this.script.load([
                    'http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css',
                    'http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js'
                ]).subscribe(res => {
                    if (res) {
                        this.mapService.getMap().subscribe(map => {
                            const ctrl = new BMapLib.TrafficControl({
                                showPanel: true
                            });
                            map.addControl(ctrl);
                            ctrl.setAnchor((<any>window)[this.anchor]);
                            ctrl.setOffset(
                                new BMap.Size(this.width, this.height)
                            );
                        });
                    }
                });
            }
        });
    }
}
