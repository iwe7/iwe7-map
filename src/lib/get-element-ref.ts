
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[mapGetElementRef]' })
export class MapGetElementRefDirective {
    @Output() mapGetElementRef: EventEmitter<ElementRef> = new EventEmitter();
    constructor(public ele: ElementRef) {
    }

    ngOnInit() {
        this.mapGetElementRef.emit(this.ele);
    }
}
