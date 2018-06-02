import { filter, map, switchMap, takeLast, tap } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { Iwe7ScriptService } from 'iwe7-script';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;
export let hasLoad = false;
export const loaded: BehaviorSubject<boolean> = new BehaviorSubject(hasLoad);
@Injectable({
  providedIn: 'root'
})
export class Iwe7MapService {
  private map: any;
  get loaded() {
    return loaded;
  }
  get hasLoad() {
    return hasLoad;
  }
  private mapInited$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    public script: Iwe7ScriptService
  ) { }

  load() {
    const init = () => {
      hasLoad = true;
      loaded.next(this.hasLoad);
      loaded.complete();
    };
    (<any>window).init = (<any>window).init || init;
    this.script.load(['https://api.map.baidu.com/api?v=2.0&ak=Xo6mSiXtItekVGBfNLsedOR1ncASB4pV&type=.js&callback=init'])
      .subscribe(res => {
        loaded.next(this.hasLoad);
      });
  }

  getCurrentPosition(enableHighAccuracy: boolean = true): Observable<any> {
    return Observable.create((observer) => {
      this.loaded.subscribe(map => {
        if (map) {
          const geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition((res: any) => {
            if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
              observer.next(res);
              observer.complete();
            }
          }, {
              enableHighAccuracy: enableHighAccuracy
            });
        }
      });
    });
  }

  getLocalCity(): Observable<any> {
    return Observable.create((observer) => {
      this.loaded.subscribe(map => {
        if (map) {
          const myCity = new BMap.LocalCity();
          myCity.get((result) => {
            observer.next(result);
            observer.complete();
          });
        }
      });
    });
  }

  clearOverlays(): Observable<boolean> {
    return Observable.create((observer) => {
      this.getMap().subscribe(map => {
        map.clearOverlays();
        observer.next(true);
        observer.complete();
      });
    });
  }

  toPoint(x, y): Observable<any> {
    return Observable.create((observer) => {
      this.loaded.subscribe(res => {
        if (res) {
          const point = new BMap.Point(x, y);
          observer.next(point);
          observer.complete();
        }
      });
    });
  }
  // 原始 1->5
  // 谷歌 3->5
  convertor(pointArr: any[], from: number, to: number): Observable<any> {
    return Observable.create((observer) => {
      this.loaded.subscribe(res => {
        if (res) {
          const convertor = new BMap.Convertor();
          convertor.translate(pointArr, from, to, (data: any) => {
            if (data.status === 0) {
              observer.next(data);
              observer.complete();
            }
          });
        }
      });
    });
  }

  setMap(map: any) {
    this.map = map;
    this.mapInited$.next(true);
  }

  getMap(): Observable<any> {
    return this.mapInited$.pipe(
      filter(res => res),
      switchMap(res => of(this.map)),
    );
  }
}
