import { MapBaseDirective } from './map-base';
import { Directive, SkipSelf, Optional, Input, SimpleChanges } from '@angular/core';
import { Iwe7MapService } from './../iwe7-map.service';
declare const BMap: any;
declare const BMAP_NORMAL_MAP: any;
import { coerceBooleanProperty } from '@angular/cdk/coercion';
@Directive({ selector: '[center],[currentCity],[zoom],[lat],[lng]' })
export class MapOptionsDirective extends MapBaseDirective {
    // 当前城市
    @Input() currentCity: string;
    // 缩放
    @Input() zoom: number = 11;
    @Input() maxZoom: number;
    @Input() minZoom: number;
    // 鼠标样式
    @Input() defaultCursor: string;
    @Input() draggingCursor: string;
    // 经纬度
    @Input() lat: any;
    @Input() lng: any;

    @Input() offsetX: number;
    @Input() offsetY: number;

    // 
    @Input() dragging: boolean = true;
    @Input() scrollWheelZoom: boolean = true;
    @Input() doubleClickZoom: boolean = true;
    @Input() keyboard: boolean = true;

    @Input() inertialDragging: boolean = false;
    @Input() continuousZoom: boolean = false;
    @Input() pinchToZoom: boolean = true;
    @Input() autoResize: boolean = true;
    @Input() mapType: any;

    constructor(
        @SkipSelf()
        @Optional()
        mapService: Iwe7MapService
    ) {
        super(mapService, {
            currentCity: 'setCurrentCity',
            zoom: 'setZoom',
            lat: 'setLat',
            lng: 'setLng',
            maxZoom: 'setMaxZoom',
            minZoom: 'setMinZoom',
            defaultCursor: 'setDefaultCursor',
            draggingCursor: 'setDraggingCursor',
            dragging: 'setEnableDragging',
            scrollWheelZoom: 'setScrollWheelZoom',
            doubleClickZoom: 'setDoubleClickZoom',
            keyboard: 'setKeyboard',
            offsetX: 'setOffsetX',
            offsetY: 'setOffsetY',
            inertialDragging: 'setInertialDragging',
            continuousZoom: 'setContinuousZoom',
            pinchToZoom: 'setPinchToZoom',
            autoResize: 'setAutoResize',
            mapType: 'setMapType'
        });
    }

    setMapType(map: any) {
        const mapType = this.mapType || BMAP_NORMAL_MAP;
        map.setMapType(mapType);
    }

    setAutoResize(map: any) {
        const autoResize = coerceBooleanProperty(this.autoResize);
        if (autoResize) {
            map.enableAutoResize();
        } else {
            map.disableAutoResize();
        }
    }

    setPinchToZoom(map: any) {
        const pinchToZoom = coerceBooleanProperty(this.pinchToZoom);
        if (pinchToZoom) {
            map.enablePinchToZoom();
        } else {
            map.disablePinchToZoom();
        }
    }

    setContinuousZoom(map: any) {
        const continuousZoom = coerceBooleanProperty(this.continuousZoom);
        if (continuousZoom) {
            map.enableContinuousZoom();
        } else {
            map.disableContinuousZoom();
        }
    }

    setInertialDragging(map: any) {
        const inertialDragging = coerceBooleanProperty(this.inertialDragging);
        if (inertialDragging) {
            map.enableInertialDragging();
        } else {
            map.disableInertialDragging();
        }
    }

    setOffsetX(map: any) {
        map.panBy(this.offsetX, this.offsetY);
    }

    setOffsetY(map: any) {
        map.panBy(this.offsetX, this.offsetY);
    }

    setKeyboard(map: any) {
        const keyboard = coerceBooleanProperty(this.keyboard);
        if (keyboard) {
            map.enableKeyboard();
        } else {
            map.disableKeyboard();
        }
    }

    setScrollWheelZoom(map: any) {
        const scrollWheelZoom = coerceBooleanProperty(this.scrollWheelZoom);
        if (scrollWheelZoom) {
            map.enableScrollWheelZoom();
        } else {
            map.disableScrollWheelZoom();
        }
    }

    setDoubleClickZoom(map: any) {
        const doubleClickZoom = coerceBooleanProperty(this.doubleClickZoom);
        if (doubleClickZoom) {
            map.enableDoubleClickZoom();
        } else {
            map.disableDoubleClickZoom();
        }
    }

    setEnableDragging(map: any) {
        const dragging = coerceBooleanProperty(this.dragging);
        if (dragging) {
            map.enableDragging();
        } else {
            map.disableDragging();
        }
    }

    setLat(map: any) {
        if (this.lng) {
            this._setCenter(map);
        }
    }

    setLng(map: any) {
        if (this.lat) {
            this._setCenter(map);
        }
    }

    private _setCenter(map: any) {
        const point = new BMap.Point(this.lat, this.lng);
        map.panTo(point);
        // map.setCenterAndZoom(point, this.zoom);
    }
}
