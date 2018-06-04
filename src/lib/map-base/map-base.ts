import { takeUntil, tap, filter } from 'rxjs/operators';
import { Iwe7MapService } from './../iwe7-map.service';
import { Injector, InjectFlags, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Iwe7CoreComponent } from "iwe7-core";

export class Iwe7MapBase extends Iwe7CoreComponent {
    mapService: Iwe7MapService;
    cd: ChangeDetectorRef;
    constructor(injector: Injector) {
        super(injector);
        this.cd = this.injector.get(ChangeDetectorRef);
        this.mapService = this.injector.get(Iwe7MapService, null);
        this.runOutsideAngular(() => {
            this.mapService.getMap().pipe(
                takeUntil(this.getCyc('ngOnDestroy'))
            ).subscribe(res => this.setCyc('getMap', res));
            this.mapService.loaded.pipe(
                takeUntil(this.getCyc('ngOnDestroy')),
            ).subscribe(res => this.setCyc('mapLoaded', res));
        });
    }
}
