import { tap, filter } from 'rxjs/operators';
import { Iwe7MapBase } from './../map-base/map-base';
import { Iwe7MapService } from './../iwe7-map.service';
import { OnInit, Input, Injector, OnChanges, Component, ChangeDetectionStrategy } from '@angular/core';
import { Directive, SkipSelf, Optional } from '@angular/core';
import { Iwe7ScriptService } from 'iwe7-script';
declare const BMapLib: any;
declare const BMap: any;
import { BmapControlAnchor } from './types';
import { switchMap } from 'rxjs/operators';
@Component({
    selector: 'traffic-control',
    template: `
    <button (click)="switchTraffic($event)" [disabled]="locationing" mat-mini-fab>
        <mat-icon>traffic</mat-icon>
    </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficControlDirective extends Iwe7MapBase {
    @Input() anchor: BmapControlAnchor = 'BMAP_ANCHOR_BOTTOM_RIGHT';
    @Input() width: any = 10;
    @Input() height: any = 140;
    constructor(
        public script: Iwe7ScriptService,
        injector: Injector
    ) {
        super(injector);
    }
    layer: any;
    map: any;
    switchTraffic(e: any) {
        if (this.layer) {
            this.map.removeTileLayer(this.layer);
            this.layer = undefined;
        } else {
            this.getCyc('getMap').pipe(
                tap(map => {
                    this.map = map;
                    const now = new Date();
                    let day = now.getDay();
                    if (day === 0) {
                        day = 7;
                    }
                    const hour = now.getHours();
                    this.layer = new BMap.TrafficLayer({
                        predictDate: {
                            weekday: day,
                            hour: hour
                        }
                    });
                    map.addTileLayer(this.layer);
                })
            ).subscribe();
        }
    }
}
