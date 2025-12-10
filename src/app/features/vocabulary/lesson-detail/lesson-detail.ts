import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VocabularyService, Course, Word } from '../../../core/services/vocabulary';
import { GamificationService } from '../../../core/services/gamification.service';
import { Router } from '@angular/router';

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
    private vocabularyService: VocabularyService,
    private gamificationService: GamificationService,
    private router: Router
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    // Check hearts
    if (this.gamificationService.currentProgress.hearts <= 0) {
      alert("Bạn đã hết Tim! Hãy học lại bài cũ hoặc chờ hồi phục.");
      this.router.navigate(['/']);
      return;
    }

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
    } else if (this.course && this.currentWordIndex === this.course.words.length - 1) {
      // Finished lesson
      this.gamificationService.addXp(20);
      alert("Chúc mừng! Bạn đã hoàn thành bài học và nhận được 20 XP!");
      this.router.navigate(['/vocabulary']);
    }
  }

  prevCard() {
    if (this.currentWordIndex > 0) {
      this.currentWordIndex--;
      this.isFlipped = false;
    }
  }

  startPractice() {
    if (!this.course) return;
    this.router.navigate(['/vocabulary', this.course.id, 'exercises']);
  }
}
