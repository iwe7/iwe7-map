import { ViewEncapsulation } from '@angular/core';
import { ElementRef, Self, ChangeDetectorRef, Input, HostBinding, ContentChild, TemplateRef } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { Component, Injector, OnInit } from '@angular/core';
import { CoreDomPortalHost } from 'iwe7-core';
import { Iwe7ScriptService } from 'iwe7-script';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'map-outlet',
    template: `
    <ng-container *ngTemplateOutlet="tpl"></ng-container>
    `,
    styleUrls: ['./map-outlet.scss'],
    providers: [Iwe7MapService],
    encapsulation: ViewEncapsulation.None
})

export class MapOutletComponent extends CoreDomPortalHost implements OnInit {
    @HostBinding('style.height.px')
    @HostBinding('style.min-height.px')
    @HostBinding('style.max-height.px')
    @Input()
    height: number;

    @ContentChild(TemplateRef) tpl: TemplateRef<any>;
    constructor(
        injector: Injector,
        @Self()
        public iwe7Map: Iwe7MapService,
        public cd: ChangeDetectorRef,
        ele: ElementRef
    ) {
        super(injector, ele.nativeElement);
    }
    ngOnInit() {
        this.iwe7Map.load();
    }
}
