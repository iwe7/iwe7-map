import { Directive, SkipSelf, Optional, Injector, Input, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { CoreDomPortalHost, ElementRefPortal, Iwe7CoreComponent } from 'iwe7-core';
import { MapOverlayComponent } from '../map-overlay/map-overlay';
declare const BMap: any;
export type PaneType = 'floatPane' | 'floatShadow' | 'labelPane' | 'mapPane' | 'markerMouseTarget' | 'markerPane' | 'markerShadow' | 'vertexPane';

import { switchMap, tap } from 'rxjs/operators';
@Directive({ selector: '[mapPane]' })
export class MapPaneDirective extends Iwe7CoreComponent implements AfterViewInit {
    panel: HTMLElement;
    host: CoreDomPortalHost;
    @Input() mapPane: PaneType = 'labelPane';
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        injector: Injector
    ) {
        super(injector);
    }
}
