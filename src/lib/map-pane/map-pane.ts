import { Directive, SkipSelf, Optional, Injector, Input, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { CoreDomPortalHost, ElementRefPortal } from 'iwe7-core';
import { MapOverlayComponent } from '../map-overlay/map-overlay';
declare const BMap: any;
export type PaneType = 'floatPane' | 'floatShadow' | 'labelPane' | 'mapPane' | 'markerMouseTarget' | 'markerPane' | 'markerShadow' | 'vertexPane';
@Directive({ selector: '[mapPane]' })
export class MapPaneDirective implements AfterViewInit {
    panel: HTMLElement;
    host: CoreDomPortalHost;
    @Input() mapPane: PaneType = 'labelPane';

    @ContentChildren(MapOverlayComponent) overlays: QueryList<MapOverlayComponent>;

    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public injector: Injector
    ) {

    }

    ngAfterViewInit() {
        this.overlays.changes.subscribe(res => {
            // console.log(res);
        });
        this.mapService.getMap().subscribe(map => {
            setTimeout(() => {
                this.panel = map.getPanes()[this.mapPane];
                // console.log(map.getPanes());
                this.host = new CoreDomPortalHost(this.injector, this.panel);
                this.overlays.forEach(overlay => {
                    overlay.onChange.subscribe(res => {
                        console.log(res);
                        this.updateOverlay(overlay, map);
                    });
                    this.updateOverlay(overlay, map);
                    this.updateOverlay(overlay, map);
                });
            }, 0);
        });
    }

    updateOverlay(overlay: MapOverlayComponent, map: any) {
        const point = new BMap.Point(overlay.lat, overlay.lng);
        const pixel = map.pointToOverlayPixel(point);
        overlay.render.setStyle(overlay.ele.nativeElement, 'left', pixel.x - overlay.offsetX + 'px');
        overlay.render.setStyle(overlay.ele.nativeElement, 'top', pixel.y - overlay.offsetY + 'px');
        this.host.attach(new ElementRefPortal(overlay.ele.nativeElement));
    }
}
