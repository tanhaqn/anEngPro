import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VocabularyService, Course, Word } from '../../../core/services/vocabulary';

@Component({
  selector: 'app-lesson-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css',
})
export class LessonDetail implements OnInit {
  course: Course | undefined;
  currentWordIndex = 0;
  isFlipped = false;
  mobileTab: 'info' | 'details' = 'info';
  showScrollToTop = false;

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.course = this.vocabularyService.getCourseById(id);
    }
  }

  get currentWord(): Word | undefined {
    return this.course?.words[this.currentWordIndex];
  }

  get prevWord(): Word | undefined {
    if (!this.course || this.currentWordIndex <= 0) {
      return undefined;
    }
    return this.course.words[this.currentWordIndex - 1];
  }

  get nextWord(): Word | undefined {
    if (!this.course || this.currentWordIndex >= this.course.words.length - 1) {
      return undefined;
    }
    return this.course.words[this.currentWordIndex + 1];
  }

  get otherWords(): Word[] {
    if (!this.course) return [];
    const nextWords: Word[] = [];
    const totalWords = this.course.words.length;
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (this.currentWordIndex + i) % totalWords;
      nextWords.push(this.course.words[nextIndex]);
    }
    return nextWords;
  }

  goToWord(word: Word) {
    if (!this.course) return;
    const index = this.course.words.indexOf(word);
    if (index !== -1) {
      this.currentWordIndex = index;
      this.isFlipped = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  playAudio() {
    if (!this.currentWord?.term) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.currentWord.term);
    utterance.lang = 'en-US';
    utterance.rate = 0.5;
    window.speechSynthesis.speak(utterance);
  }

  playExampleAudio() {
    if (!this.currentWord?.example) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.currentWord.example);
    utterance.lang = 'en-US';
    utterance.rate = 0.5;
    window.speechSynthesis.speak(utterance);
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.playAudio();
  }

  nextCard() {
    if (this.course && this.currentWordIndex < this.course.words.length - 1) {
      this.currentWordIndex++;
      this.isFlipped = false;
    }
  }

  prevCard() {
    if (this.currentWordIndex > 0) {
      this.currentWordIndex--;
      this.isFlipped = false;
    }
  }
}
