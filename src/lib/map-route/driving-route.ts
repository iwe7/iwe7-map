import { Iwe7MapService } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, Input, Output, EventEmitter } from '@angular/core';
declare const BMAP_STATUS_SUCCESS: any;
declare const BMap: any;
@Directive({ selector: '[drivingRoute]' })
export class DrivingRouteDirective {
    @Input() start: any;
    @Input() end: any;

    @Output() drivingRoute: EventEmitter<any> = new EventEmitter();
    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const transit = new BMap.DrivingRoute(map, {
                renderOptions: {
                    map: map,
                    autoViewport: true
                },
                onSearchComplete: (result) => {
                    if (transit.getStatus() === BMAP_STATUS_SUCCESS) {
                        const plans = [];
                        const numPlanss = result.getNumPlans();
                        for (let j = 0; j < numPlanss; j++) {
                            const plan = result.getPlan(j);
                            plans.push(plan);
                        }
                        const newPlans = [];
                        plans.forEach(plan => {
                            const routes = [];
                            for (let j = 0; j < plan.getNumRoutes(); j++) {
                                const route = plan.getRoute(j);
                                const steps = [];
                                for (let i = 0; i < route.getNumSteps(); i++) {
                                    const step = route.getStep(i);
                                    steps.push({
                                        description: step.getDescription(false),
                                        distance: step.getDistance(false),
                                        position: step.getPosition()
                                    });
                                }
                                routes.push({
                                    steps: steps,
                                    distance: route.getDistance(false),
                                    path: route.getPath(),
                                    numSteps: route.getNumSteps(),
                                    routeType: route.getRouteType()
                                });
                            }
                            newPlans.push(routes);
                        });
                        this.drivingRoute.emit(newPlans);
                    } else {
                        console.log(result);
                    }
                }
            });
            transit.search(this.start, this.end);
        });
    }
}
