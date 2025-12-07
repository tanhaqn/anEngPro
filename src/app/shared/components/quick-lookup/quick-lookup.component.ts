import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSelectionService, TextSelection } from '../../../core/services/text-selection.service';
import { VocabularyService, Word } from '../../../core/services/vocabulary';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
    selector: 'app-quick-lookup',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="visible" 
         class="fixed z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 w-72 transition-all duration-200"
         [style.top.px]="position.top"
         [style.left.px]="position.left">
      
      <div *ngIf="loading" class="flex justify-center py-4">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>

      <div *ngIf="error" class="text-red-400 text-sm text-center py-2">
        {{error}}
      </div>

      <div *ngIf="!loading && !error && wordData">
        <div class="flex justify-between items-start mb-2">
            <div>
            <h3 class="text-xl font-bold text-white">{{wordData.term}}</h3>
            <p class="text-gray-400 text-sm">{{wordData.pronunciation}}</p>
            </div>
            <button (click)="playAudio()" class="text-blue-400 hover:text-blue-300">
            <span class="material-symbols-outlined">volume_up</span>
            </button>
        </div>

        <div class="mb-3">
            <p class="text-gray-300 font-medium">{{wordData.meaning || wordData.definition}}</p>
        </div>

        <div *ngIf="wordData.example" class="text-sm text-gray-400 italic border-t border-gray-800 pt-2">
            "{{wordData.example}}"
        </div>
      </div>
      
      <div class="mt-3 flex justify-end">
          <button (click)="close()" class="text-xs text-gray-500 hover:text-white">Đóng</button>
      </div>
    </div>
  `,
    styles: []
})
export class QuickLookupComponent implements OnInit {
    visible = false;
    loading = false;
    error: string | null = null;
    position = { top: 0, left: 0 };
    wordData: Word | undefined;

    constructor(
        private selectionService: TextSelectionService,
        private vocabularyService: VocabularyService,
        private translationService: TranslationService,
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.selectionService.selection$.subscribe(selection => {
            if (selection) {
                this.handleSelection(selection);
            } else {
                this.visible = false;
            }
        });
    }

    handleSelection(selection: TextSelection) {
        // Try to find the word
        // Simple lookup: exact match or case-insensitive
        // In a real app, we might need a more fuzzy search or API call
        const text = selection.text.toLowerCase();

        // Search in vocabulary service
        // Note: getWordById expects an ID, but we need to search by term.
        // We'll add a helper in VocabularyService or just iterate here for now.
        const allCourses = this.vocabularyService.getCourses();
        let foundWord: Word | undefined;

        for (const course of allCourses) {
            foundWord = course.words.find(w => w.term.toLowerCase() === text);
            if (foundWord) break;
        }

        if (foundWord) {
            this.wordData = foundWord;
            this.loading = false;
            this.error = null;
            this.setPosition(selection.rect);
            this.visible = true;
        } else {
            // Try external translation
            this.loading = true;
            this.error = null;
            this.wordData = undefined;
            this.setPosition(selection.rect);
            this.visible = true;

            this.translationService.translate(text).then(translatedText => {
                this.wordData = {
                    id: 'external',
                    term: text,
                    definition: translatedText,
                    pronunciation: '', // API doesn't return IPA easily
                    example: '',
                    meaning: translatedText
                } as any;
                this.loading = false;
            }).catch(err => {
                console.error(err);
                this.loading = false;
                this.error = 'Không thể dịch từ này (Lỗi kết nối)';
            });
        }
    }

    setPosition(rect: DOMRect) {
        // Position above the selection if possible, otherwise below
        const tooltipHeight = 200; // Approx
        let top = rect.top - tooltipHeight - 10;
        let left = rect.left;

        if (top < 10) {
            top = rect.bottom + 10;
        }

        // Keep within viewport width
        if (left + 288 > window.innerWidth) { // 288px = w-72
            left = window.innerWidth - 300;
        }

        this.position = { top, left };
    }

    playAudio() {
        if (this.wordData?.term) {
            const utterance = new SpeechSynthesisUtterance(this.wordData.term);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }

    close() {
        this.visible = false;
        this.selectionService.clearSelection();
    }

    @HostListener('document:mousedown', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this.visible && !this.el.nativeElement.contains(event.target)) {
            // If clicked outside tooltip, close it (unless it's the selection itself, handled by service)
            // Actually service handles clearing on new selection, but clicking blank space clears selection too.
            // We rely on service emitting null for that.
        }
    }
}
