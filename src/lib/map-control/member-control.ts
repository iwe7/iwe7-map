import { Component } from '@angular/core';

@Component({
    selector: 'member-control',
    template: `
        <button (click)="getStore($event)" [disabled]="locationing" mat-mini-fab>
            <mat-icon>store_mall</mat-icon>
        </button>
    `
})
export class MemberControlComponent {
    constructor() { }
}
