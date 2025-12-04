import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingService } from '../../../core/services/reading';
import { Level, Topic, Conversation } from '../../../core/models/reading.model';


@Component({
    selector: 'app-reading',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reading.html'
})
export class ReadingComponent implements OnInit, OnDestroy {
    levels: Level[] = [];
    selectedLevel: Level | undefined;
    selectedTopic: Topic | undefined;
    selectedConversation: Conversation | undefined;

    showTranslation = true;
    isSpeaking = false;
    currentUtterance: SpeechSynthesisUtterance | null = null;

    showScrollTop = false;
    @ViewChild('mainContainer') mainContainer!: ElementRef;

    constructor(private readingService: ReadingService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.readingService.getLevels().subscribe({
            next: (data) => {
                this.levels = data;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Failed to load reading data', err);
            }
        });
    }

    ngOnDestroy() {
        this.stopReading();
    }

    selectLevel(level: Level) {
        this.selectedLevel = level;
        this.selectedTopic = undefined;
        this.selectedConversation = undefined;
        this.stopReading();
    }

    selectTopic(topic: Topic) {
        this.selectedTopic = topic;
        this.selectedConversation = undefined;
        this.stopReading();
    }

    selectConversation(conversation: Conversation) {
        this.selectedConversation = conversation;
        this.stopReading();
    }

    goBackToLevels() {
        this.selectedLevel = undefined;
        this.selectedTopic = undefined;
        this.selectedConversation = undefined;
        this.stopReading();
    }

    goBackToTopics() {
        this.selectedTopic = undefined;
        this.selectedConversation = undefined;
        this.stopReading();
    }

    goBackToConversations() {
        this.selectedConversation = undefined;
        this.stopReading();
    }

    toggleTranslation() {
        this.showTranslation = !this.showTranslation;
    }

    readConversation() {
        if (!this.selectedConversation) return;

        if (this.isSpeaking) {
            this.stopReading();
            return;
        }

        this.isSpeaking = true;
        const fullText = this.selectedConversation.sentences.map(s => s.en).join('. ');

        this.currentUtterance = new SpeechSynthesisUtterance(fullText);
        this.currentUtterance.lang = 'en-US';
        this.currentUtterance.rate = 0.8;

        this.currentUtterance.onend = () => {
            this.isSpeaking = false;
            this.currentUtterance = null;
        };

        window.speechSynthesis.speak(this.currentUtterance);
    }

    stopReading() {
        if (this.currentUtterance) {
            window.speechSynthesis.cancel();
            this.currentUtterance = null;
        }
        this.isSpeaking = false;
    }

    onScroll(event: any) {
        const element = event.target;
        this.showScrollTop = element.scrollTop > 300;
    }

    scrollToTop() {
        this.mainContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
