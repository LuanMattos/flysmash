import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
    constructor() { }
    @Input() overlay_id;
    @Output() closeOverlayOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit(): void { }

    closeOverlay() {
        this.closeOverlayOutput.emit(true);
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('close-overlay').style.display = 'none';
    }
}
