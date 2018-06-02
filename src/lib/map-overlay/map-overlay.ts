import { HostBinding, SimpleChanges, OnChanges, ViewEncapsulation } from '@angular/core';
import { ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Component, OnInit, SkipSelf, Optional, Input } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { takeLast } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare const BMap: any;
let overlayTotal: number = 0;

@Component({
    selector: 'map-overlay',
    templateUrl: 'map-overlay.html',
    styleUrls: ['./map-overlay.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapOverlayComponent {
    @Input() lat: number;
    @Input() lng: number;

    @Input() offsetX: number = 0;
    @Input() offsetY: number = 0;

    overlay: any;
    id: string;

    @HostBinding('style.position')
    @Input()
    position: string = 'absolute';

    onChange: Subject<SimpleChanges> = new Subject();
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public ele: ElementRef,
        public render: Renderer2
    ) {
        overlayTotal++;
        this.id = 'overlay' + overlayTotal;
        this.render.addClass(this.ele.nativeElement, this.id);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.onChange.next(changes);
    }
}
