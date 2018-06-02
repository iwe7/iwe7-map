import { MapContentDirective } from './map-directives/map-content';
import { CustomControlDirective } from './map-control/custom-control';
import { WalkingRouteDirective } from './map-route/walking-route';
import { TransitRouteDirective } from './map-route/transit-route';
import { DrivingRouteDirective } from './map-route/driving-route';
import { TrafficControlDirective } from './map-control/traffic-control';
import { MapAutoCompleteDirective } from './map-directives/autocomplete';
import { GetLocationPipe, GetPointPipe } from './map-pipe/geocoder.pipe';
import { LocalSearchDirective } from './map-method/search';
import { GetContainerDirective } from './map-pane/get-container';
import { ZoomOutDirective } from './map-method/zoom-out';
import { ZoomInDirective } from './map-method/zoom-in';
import { ScaleControlDirective } from './map-control/scale-control';
import { NavigationControlDirective } from './map-control/navigation-control';
import { GeolocationControlDirective } from './map-control/geolocation-control';
import { MapPaneDirective } from './map-pane/map-pane';
import { MapOverlayComponent } from './map-overlay/map-overlay';
import { MapEventsDirective } from './map-directives/map-events';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { MapOutletComponent } from './map-outlet/map-outlet';
import { MapContainerComponent } from './map-container/map-container';
import { MapOptionsDirective } from './map-directives/map-options';

export const MapComponents = [
  MapOutletComponent,
  MapContainerComponent,
  MapOverlayComponent,
  GetLocationPipe,
  GetPointPipe
];

export const MapDirectives = [
  MapOptionsDirective,
  ZoomInDirective,
  ZoomOutDirective,
  MapEventsDirective,
  MapPaneDirective,
  GeolocationControlDirective,
  NavigationControlDirective,
  ScaleControlDirective,
  GetContainerDirective,
  LocalSearchDirective,
  MapAutoCompleteDirective,
  TrafficControlDirective,
  DrivingRouteDirective,
  TransitRouteDirective,
  WalkingRouteDirective,
  CustomControlDirective,
  MapContentDirective
];


@NgModule({
  imports: [
    PortalModule,
    CommonModule
  ],
  declarations: [...MapComponents, ...MapDirectives],
  exports: [...MapComponents, ...MapDirectives],
  entryComponents: []
})
export class Iwe7MapModule { }
