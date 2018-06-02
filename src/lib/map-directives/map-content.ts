import { MapOutletComponent } from './../map-outlet/map-outlet';

import { Directive, AfterViewInit, Optional, SkipSelf, TemplateRef } from '@angular/core';

@Directive({ selector: '[mapContent]' })
export class MapContentDirective implements AfterViewInit {
    constructor(
        @Optional()
        @SkipSelf()
        public outlet: MapOutletComponent,
        public template: TemplateRef<any>
    ) { }

    ngAfterViewInit() {
        this.outlet.attachContent(this.template);
    }
}
