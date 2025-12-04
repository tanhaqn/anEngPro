import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  todayWords: any[] = [];
  schedule: any[] = []; // Keep mock for now or implement later
  progress: any[] = []; // Keep mock for now

  selectedWord: any;

  constructor(
    private gamificationService: GamificationService,
    private vocabularyService: VocabularyService
  ) {
    this.loadDueWords();
  }

  loadDueWords() {
    const dueIds = this.gamificationService.getDueWords();
    this.todayWords = dueIds.map(id => {
      const word = this.vocabularyService.getWordById(id);
      const status = this.gamificationService.getWordStatus(id);
      if (!word || !status) return null;

      return {
        ...word,
        word: word.term, // Map term to word for template compatibility
        meaning: word.definition, // Map definition to meaning
        status: this.getStatusText(status.strength),
        statusClass: this.getStatusClass(status.strength),
        nextReview: `Ôn lại: ${new Date(status.nextReviewDate).toLocaleDateString()}`,
        expanded: false,
        id: word.id
      };
    }).filter(w => w !== null);

    if (this.todayWords.length > 0) {
      this.selectWord(this.todayWords[0]);
    }
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

  selectWord(word: any) {
    this.todayWords.forEach(w => w.expanded = false);
    word.expanded = true;
    this.selectedWord = word;
  }

  reviewWord(wordId: string, quality: number) {
    this.gamificationService.updateWordStatus(wordId, quality);
    // Remove from list or update status
    this.loadDueWords();
  }
}
