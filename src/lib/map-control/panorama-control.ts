import { merge } from 'rxjs';
import { onTouchEnd, onTouchCancel } from 'iwe7-util';
import { switchMap, takeUntil, take } from 'rxjs/operators';
import { MapOutletComponent } from './../map-outlet/map-outlet';
import { Iwe7MapBase } from './../map-base/map-base';
import { Component, OnInit, Injector, ViewChild, ElementRef, Optional, Renderer2 } from '@angular/core';
declare const BMap: any;
import { DOCUMENT } from '@angular/common';
import { onTouchMove } from 'iwe7-util';
import { map, tap } from 'rxjs/operators';
@Component({
    selector: 'panorama-control',
    template: `
    <button (click)="getPoint($event)" [disabled]="shown" mat-mini-fab>
        <mat-icon>place</mat-icon>
    </button>
    `,
    styleUrls: ['./panorama-control.scss']
})
export class PanoramaControlComponent extends Iwe7MapBase {
    @ViewChild('panel') panel: ElementRef;
    doc: Document;

    shown: boolean = false;
    constructor(injector: Injector, @Optional() public outlet: MapOutletComponent, public render: Renderer2) {
        super(injector);
        this.doc = this.injector.get(DOCUMENT);
        this.getCyc('getMap').subscribe(map => {
            map.addTileLayer(new BMap.PanoramaCoverageLayer());
            map.addEventListener('click', (res) => {
                this.setCyc('mapClick', res);
            });
            this.map = map;
            const panorama = new BMap.Panorama(map.getContainer(), {
                albumsControl: true,
                linksControl: true,
                navigationControl: true
            });
            panorama.setPov({ heading: -40, pitch: 6 });
            panorama.hide();
            map.setPanorama(panorama);
        });
        this.getCyc('getPoint', true).pipe(
            switchMap(res => {
                return this.getCyc('mapClick', true).pipe(
                    take(1),
                    tap((res: any) => {
                        const point = res.point;
                        const panorama = this.map.getPanorama();
                        panorama.setPosition(point);
                        panorama.show();
                    })
                );
            })
        ).subscribe();
    }

    createContainer() {
        this.doc.createElement('div');
    }

    map: any;
    getPoint(e: any) {
        this.setCyc('getPoint', e, true);
    }
}
