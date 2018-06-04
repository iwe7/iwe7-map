import { MemberControlComponent } from './map-control/member-control';
import { MapGetElementRefDirective } from './get-element-ref';
import { PanoramaControlComponent } from './map-control/panorama-control';
import { StoreControlComponent } from './map-control/store-control';
import { GeolocationDirective } from './map-method/geolocation';
import { MapContentDirective } from './map-directives/map-content';
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

import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { CustomControlDirective } from './map-control/custom-control';

export const MapComponents = [
  MapOutletComponent,
  MapContainerComponent,
  MapOverlayComponent,
  GetLocationPipe,
  GetPointPipe,
  StoreControlComponent,
  PanoramaControlComponent,
  MemberControlComponent
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
  MapContentDirective,
  GeolocationDirective,
  CustomControlDirective,
  MapGetElementRefDirective
];


@NgModule({
  imports: [
    PortalModule,
    CommonModule,
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [...MapComponents, ...MapDirectives],
  exports: [...MapComponents, ...MapDirectives],
  entryComponents: []
})
export class Iwe7MapModule { }
