import { Observable, Subscription } from 'rxjs';
import { Iwe7MapService } from './../iwe7-map.service';
import { Pipe, PipeTransform, SkipSelf, Optional } from '@angular/core';
declare const BMap: any;
@Pipe({
    name: 'getPoint'
})
export class GetPointPipe implements PipeTransform {
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) { }
    transform(value: any, city: string): Observable<any> {
        return Observable.create((observer) => {
            this.mapService.loaded.subscribe(map => {
                if (map) {
                    const myGeo = new BMap.Geocoder();
                    myGeo.getPoint(value, (point: any) => {
                        observer.next(point);
                        observer.complete();
                    }, city);
                }
            });
        });
    }
}


@Pipe({
    name: 'getLocation'
})
export class GetLocationPipe implements PipeTransform {
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) { }
    transform(value: any): any {
        return Observable.create((observer) => {
            this.mapService.loaded.subscribe(map => {
                if (map) {
                    const point = new BMap.Point(value.lat, value.lng);
                    const myGeo = new BMap.Geocoder();
                    myGeo.getLocation(point, (res: any) => {
                        const addComp = res.addressComponents;
                        observer.next(addComp);
                        observer.complete();
                    });
                }
            });
        });
    }
}
