import { tap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Injector, ChangeDetectionStrategy } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
// 附近store
import { Component, OnInit, Optional } from '@angular/core';
import { Iwe7CoreComponent } from 'iwe7-core';
import { Iwe7MapBase } from '../map-base/map-base';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;

@Component({
    selector: 'store-control',
    template: `
    <button (click)="getStore($event)" [disabled]="locationing" mat-mini-fab>
        <mat-icon>store_mall</mat-icon>
    </button>
    <div mapPane="labelPane" style="display: none;">
        <map-overlay *ngFor="let item of pois" [lat]="item.point.lat" [lng]="item.point.lng">
            <button color="primary" mat-mini-fab>
                <mat-icon>store_mall</mat-icon>
            </button>
        </map-overlay>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreControlComponent extends Iwe7MapBase {
    pois: any[] = [];
    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    getStore(e: any) {
        this.runOutsideAngular(() => {
            this.getCyc('getMap').subscribe(map => {
                const local = new BMap.LocalSearch(map, {
                    onSearchComplete: (results) => {
                        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
                            const pois = [];
                            for (let i = 0; i < results.getCurrentNumPois(); i++) {
                                pois.push(results.getPoi(i));
                            }
                            this.run(() => {
                                this.pois = pois;
                                this.cd.markForCheck();
                            });
                        }
                    }
                });
                local.enableAutoViewport();
                local.search('店铺');
            });
        });
    }
}
