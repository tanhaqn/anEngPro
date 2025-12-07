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
    protected Math = Math;
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

    activeSentenceIndex = -1;

    readConversation() {
        if (!this.selectedConversation) return;

        if (this.isSpeaking) {
            this.stopReading();
            return;
        }

        this.isSpeaking = true;
        this.activeSentenceIndex = -1;
        this.playNextSentence();
    }

    playNextSentence() {
        if (!this.selectedConversation || !this.isSpeaking) return;

        this.activeSentenceIndex++;

        if (this.activeSentenceIndex >= this.selectedConversation.sentences.length) {
            this.stopReading();
            return;
        }

        const sentence = this.selectedConversation.sentences[this.activeSentenceIndex];
        this.currentUtterance = new SpeechSynthesisUtterance(sentence.en);
        this.currentUtterance.lang = 'en-US';
        this.currentUtterance.rate = 0.9; // Slightly slower for better clarity

        this.currentUtterance.onend = () => {
            // Small pause between sentences
            setTimeout(() => {
                if (this.isSpeaking) {
                    this.playNextSentence();
                }
            }, 500);
        };

        this.currentUtterance.onerror = (e) => {
            console.error('Speech synthesis error', e);
            this.stopReading();
        };

        window.speechSynthesis.speak(this.currentUtterance);
        this.cdr.detectChanges();
    }

    stopReading() {
        if (this.currentUtterance) {
            window.speechSynthesis.cancel();
            this.currentUtterance = null;
        }
        this.isSpeaking = false;
        this.activeSentenceIndex = -1;
        this.cdr.detectChanges();
    }

    onScroll(event: any) {
        const element = event.target;
        this.showScrollTop = element.scrollTop > 300;
    }

    scrollToTop() {
        this.mainContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
