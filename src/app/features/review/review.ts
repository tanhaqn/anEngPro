import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GamificationService } from '../../core/services/gamification.service';
import { VocabularyService, Word } from '../../core/services/vocabulary';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class Review {
  // Integrated Dashboard Data
  stats: any[] = [];
  courses: any[] = [];
  weeklyActivity: any[] = [];
  dailyQuests: any[] = [];
  quote: any = {};

  todayWords: any[] = [];
  schedule: any[] = [
    { day: 'T2', date: '04/12', count: 12, isToday: false },
    { day: 'T3', date: '05/12', count: 18, isToday: false },
    { day: 'T4', date: '06/12', count: 15, isToday: true, label: 'Hôm nay' },
    { day: 'T5', date: '07/12', count: 20, isToday: false },
    { day: 'T6', date: '08/12', count: 10, isToday: false },
    { day: 'T7', date: '09/12', count: 25, isToday: false },
    { day: 'CN', date: '10/12', count: 5, isToday: false },
  ];
  progress: any[] = [
    { title: 'Từ vựng cơ bản', percent: 75, completed: 150, total: 200 },
    { title: 'Ngữ pháp sơ cấp', percent: 40, completed: 20, total: 50 },
  ];

  // Review Session State
  isReviewing = false;
  isFinished = false;
  currentIndex = 0;
  isFlipped = false;
  currentWord: any = null;

  constructor(
    private gamificationService: GamificationService,
    private vocabularyService: VocabularyService,
    public router: Router
  ) {
    this.loadDueWords();
    this.initDashboardData();
  }

  initDashboardData() {
    // 1. Stats
    const progress = this.gamificationService.currentProgress;
    this.stats = [
      { title: 'Cấp độ', value: progress.level, subtitle: 'Level', icon: 'military_tech', iconClass: 'bg-primary/20 text-primary', color: 'text-blue-400', bg: 'bg-blue-500/20' },
      { title: 'Chuỗi', value: progress.streak, subtitle: 'Ngày', icon: 'local_fire_department', iconClass: 'bg-orange-500/20 text-orange-400', color: 'text-orange-400', bg: 'bg-orange-500/20' },
      { title: 'Điểm KN', value: progress.xp, subtitle: 'XP', icon: 'star', iconClass: 'bg-purple-500/20 text-purple-400', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
      { title: 'Đá quý', value: progress.gems, subtitle: 'Gems', icon: 'diamond', iconClass: 'bg-blue-500/20 text-blue-400', color: 'text-purple-400', bg: 'bg-purple-500/20' }
    ];

    // 2. Courses (Mock)
    this.courses = [
      {
        title: 'Tiếng Anh Thương mại',
        category: 'Business',
        progress: 75,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60'
      },
      {
        title: 'IELTS Listening - Part 2',
        category: 'Exam Prep',
        progress: 40,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'
      }
    ];

    // 3. Weekly Activity (Mock)
    this.weeklyActivity = [
      { day: 'T2', height: '60%' },
      { day: 'T3', height: '80%' },
      { day: 'T4', height: '40%' },
      { day: 'T5', height: '70%' },
      { day: 'T6', height: '90%' },
      { day: 'T7', height: '50%' },
      { day: 'CN', height: '75%' }
    ];

    // 4. Daily Quests (New)
    this.dailyQuests = [
      { title: 'Ôn tập 10 từ vựng', progress: this.todayWords.length > 0 ? 0 : 10, total: 10, completed: false, start: false },
      { title: 'Hoàn thành 1 bài đọc', progress: 0, total: 1, completed: false, start: true },
      { title: 'Đạt 50 XP', progress: 20, total: 50, completed: false, start: false }
    ];

    // 5. Quote
    this.quote = {
      text: "Language is the road map of a culture. It tells you where its people come from and where they are going.",
      author: "Rita Mae Brown"
    };
  }

  loadDueWords() {
    const dueIds = this.gamificationService.getDueWords();
    // Mock data if no due words just for UI demonstration if needed, 
    // but here we stick to real logic. If 0 words, we might want to show a 'completed' state.
    this.todayWords = dueIds.map(id => {
      const word = this.vocabularyService.getWordById(id);
      const status = this.gamificationService.getWordStatus(id);
      if (!word || !status) return null;

      return {
        ...word,
        word: word.term,
        meaning: word.definition,
        statusText: this.getStatusText(status.strength),
        statusClass: this.getStatusClass(status.strength),
        nextReview: `Mức độ: ${status.strength}`,
        id: word.id
      };
    }).filter(w => w !== null);
  }

  startReview() {
    if (this.todayWords.length > 0) {
      this.isReviewing = true;
      this.isFinished = false;
      this.currentIndex = 0;
      this.isFlipped = false;
      this.updateCurrentWord();
    }
  }

  updateCurrentWord() {
    this.currentWord = this.todayWords[this.currentIndex];
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  rateWord(quality: number) {
    if (!this.currentWord) return;

    this.gamificationService.updateWordStatus(this.currentWord.id, quality);

    // Update Quest progress (Mock)
    if (this.dailyQuests[0].progress < this.dailyQuests[0].total) {
      this.dailyQuests[0].progress++;
    }

    // Move to next word
    if (this.currentIndex < this.todayWords.length - 1) {
      this.currentIndex++;
      this.isFlipped = false; // Reset flip
      this.updateCurrentWord();
    } else {
      this.finishReview();
    }
  }

  finishReview() {
    this.isReviewing = false;
    this.isFinished = true;
    this.dailyQuests[0].completed = true;
    this.loadDueWords();
  }

  exitReview() {
    this.isReviewing = false;
    this.isFinished = false; // Or keep it true if they want to see stats?
    this.loadDueWords();
  }

  playAudio(text: string) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  getStatusText(strength: number): string {
    if (strength >= 5) return 'Thành thạo';
    if (strength >= 3) return 'Ghi nhớ tốt';
    return 'Cần ôn tập';
  }

  getStatusClass(strength: number): string {
    if (strength >= 5) return 'good';
    if (strength >= 3) return 'medium';
    return 'poor';
  }
}
