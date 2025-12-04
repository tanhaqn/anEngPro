import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

export interface TextSelection {
    text: string;
    rect: DOMRect;
}

@Injectable({
    providedIn: 'root'
})
export class TextSelectionService {
    private selectionSubject = new BehaviorSubject<TextSelection | null>(null);
    public selection$ = this.selectionSubject.asObservable();

    constructor(private ngZone: NgZone) {
        this.initListener();
    }

    private initListener() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(document, 'mouseup').pipe(
                debounceTime(200)
            ).subscribe(() => {
                this.checkSelection();
            });
        });
    }

    private checkSelection() {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const text = selection.toString().trim();

            // Only emit if text is selected and it's a single word or short phrase (optional limit)
            if (text.length < 50) {
                this.ngZone.run(() => {
                    this.selectionSubject.next({ text, rect });
                });
            }
        } else {
            this.ngZone.run(() => {
                this.selectionSubject.next(null);
            });
        }
    }

    clearSelection() {
        window.getSelection()?.removeAllRanges();
        this.selectionSubject.next(null);
    }
}
