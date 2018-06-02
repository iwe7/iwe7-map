import { Component, ContentChild, TemplateRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { Directive, Input, SkipSelf, Optional } from '@angular/core';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;

@Component({
    selector: '[localSearch]', template: `
    <ng-container *ngFor="let item of pois">
        <ng-container *ngTemplateOutlet="template;context:{$implicit: item}"></ng-container>
    </ng-container>
` })
export class LocalSearchDirective {
    pois: any[] = [];
    @Input()
    set localSearch(val: string) {
        if (val) {
            this.mapService.getMap().subscribe(map => {
                const local = new BMap.LocalSearch(map, {
                    renderOptions: { map: map },
                    onSearchComplete: (results) => {
                        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
                            const pois = [];
                            for (let i = 0; i < results.getCurrentNumPois(); i++) {
                                pois.push(results.getPoi(i));
                            }
                            this.pois = pois;
                        }
                    }
                });
                local.search(val);
            });
        }
    }
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public view: ViewContainerRef,
    ) { }
}
