import { CoreDomPortalHost } from 'iwe7-core';
import { Injector, ContentChildren, QueryList, Output } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
import { Optional, EventEmitter } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({ selector: '[getContainer]' })
export class GetContainerDirective {
    host: CoreDomPortalHost;
    @Output() getContainer: EventEmitter<CoreDomPortalHost> = new EventEmitter();
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService,
        public injector: Injector
    ) { }

    ngAfterViewInit() {
        this.mapService.getMap().subscribe(map => {
            const container = map.getContainer();
            this.host = new CoreDomPortalHost(this.injector, container);
            this.getContainer.emit(this.host);
        });
    }
}
