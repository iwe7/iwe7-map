import { sampleTime } from 'rxjs/operators';
import { Iwe7MapService } from './../iwe7-map.service';
import { Directive, SkipSelf, Optional, Input, Output, EventEmitter } from '@angular/core';
declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;
@Directive({ selector: '[transitRoute]' })
export class TransitRouteDirective {
    @Input() start: any;
    @Input() end: any;
    @Output() transitRoute: EventEmitter<any> = new EventEmitter();

    @Input() hasHtml: boolean = false;

    constructor(
        @SkipSelf()
        @Optional()
        public mapService: Iwe7MapService
    ) { }

    ngOnInit() {
        this.mapService.getMap().subscribe(map => {
            const transit = new BMap.TransitRoute(map, {
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
                                const walkPlan = plan.getRoute(j);
                                const linePlan = plan.getLine(j);
                            }
                            newPlans.push({
                                route: this.formatPlanRoute(plan),
                                line: this.formatPlanLine(plan),
                                numLines: plan.getNumLines(),
                                numRoutes: plan.getNumRoutes(),
                                description: plan.getDescription(this.hasHtml),
                                distance: plan.getDistance(false),
                                duration: plan.getDuration(false)
                            });
                        });
                        this.transitRoute.emit(newPlans);
                    } else {
                        console.log(result);
                    }
                }
            });
            transit.search(this.start, this.end);
        });
    }


    formatPlanLine(plan: any) {
        const total = plan.getNumLines();
        const lines = [];
        for (let i = 0; i < total; i++) {
            const planLine = plan.getLine(i);
            const line = {
                getOffStop: planLine.getGetOffStop(),
                getOnStop: planLine.getGetOnStop(),
                numViaStops: planLine.getNumViaStops(),
                path: planLine.getPath(),
                title: planLine.getTitle(),
                distance: planLine.getDistance(false)
            };
            lines.push(line);
        }
        return lines;
    }

    formatPlanRoute(plan: any) {
        const total = plan.getNumRoutes();
        const routes = [];
        for (let i = 0; i < total; i++) {
            const planRoute = plan.getRoute(i);
            const line = {
                numSteps: planRoute.getNumSteps(),
                path: planRoute.getPath(),
                distance: planRoute.getDistance(false)
            };
            routes.push(line);
        }
        return routes;
    }

    getWalkRouteSteps(route: any) {
        const steps = [];
        for (let i = 0; i < route.getNumSteps(); i++) {
            const step = route.getStep(i);
            steps.push({
                description: step.getDescription(),
                distance: step.getDistance(),
                position: step.getPosition()
            });
        }
        return steps;
    }

    getLineRouteSteps(route: any) {
        if (!route) {
            return;
        }
        const steps = [];
        for (let i = 0; i < route.getNumViaStops(); i++) {
            steps.push({
                distance: route.getDistance(i)
            });
        }
        return {
            title: route.getTitle(),
            path: route.getPath(),
            numViaStops: route.getNumViaStops(),
            getOnStop: route.getGetOnStop(),
            getOffStop: route.getGetOffStop(),
            steps: steps
        };
    }
}
