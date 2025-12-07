import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VocabularyService, Course, Word } from '../../../../core/services/vocabulary';

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
  status: 'active' | 'correct' | 'incorrect';
}

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './matching.html'
})
export class MatchingComponent implements OnInit {
  course: Course | undefined;
  leftColumn: { id: string, text: string, matched: boolean, selected: boolean, index: number }[] = [];
  rightColumn: { id: string, text: string, matched: boolean, selected: boolean, index: number }[] = [];

  lines: Line[] = [];
  activeLine: Line | null = null;

  selectedLeftIndex: number | null = null;
  selectedRightIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.course = this.vocabularyService.getCourseById(courseId);
      if (this.course) {
        this.initializeGame();
      }
    }
  }

  initializeGame() {
    if (!this.course) return;

    // Take first 5 words for the game
    const words = this.course.words.slice(0, 5);

    this.leftColumn = words.map((w, i) => ({
      id: w.id,
      text: w.term,
      matched: false,
      selected: false,
      index: i
    }));

    // Shuffle definitions for right column
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    this.rightColumn = shuffledWords.map((w, i) => ({
      id: w.id,
      text: w.meaning || '',
      matched: false,
      selected: false,
      index: i
    }));

    this.lines = [];
    this.activeLine = null;
    this.selectedLeftIndex = null;
    this.selectedRightIndex = null;
  }

  selectLeft(item: any, index: number) {
    if (item.matched) return;

    // Deselect previous
    this.leftColumn.forEach(i => i.selected = false);
    this.selectedLeftIndex = index;
    item.selected = true;

    this.checkMatch();
  }

  selectRight(item: any, index: number) {
    if (item.matched) return;

    // Deselect previous
    this.rightColumn.forEach(i => i.selected = false);
    this.selectedRightIndex = index;
    item.selected = true;

    this.checkMatch();
  }

  checkMatch() {
    if (this.selectedLeftIndex !== null && this.selectedRightIndex !== null) {
      const leftItem = this.leftColumn[this.selectedLeftIndex];
      const rightItem = this.rightColumn[this.selectedRightIndex];

      // Check if match is correct
      const isCorrect = leftItem.id === rightItem.id;
      const status = isCorrect ? 'correct' : 'incorrect';

      // Draw line with status
      this.drawPermanentLine(this.selectedLeftIndex, this.selectedRightIndex, status);

      if (isCorrect) {
        // Correct match
        leftItem.matched = true;
        rightItem.matched = true;
        leftItem.selected = false;
        rightItem.selected = false;
      } else {
        // Incorrect match - wait a bit then reset
        setTimeout(() => {
          leftItem.selected = false;
          rightItem.selected = false;
          // Remove the last line if it was incorrect
          this.lines.pop();
        }, 1000);
      }

      this.selectedLeftIndex = null;
      this.selectedRightIndex = null;
    }
  }

  drawPermanentLine(leftIndex: number, rightIndex: number, status: 'active' | 'correct' | 'incorrect' = 'correct') {
    const leftEl = document.getElementById(`left-${leftIndex}`);
    const rightEl = document.getElementById(`right-${rightIndex}`);

    if (leftEl && rightEl) {
      const container = document.querySelector('.desktop-matching-container');
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      // Calculate coordinates relative to the container
      const start = {
        x: (leftRect.right - containerRect.left) - 10, // Small offset to touch the dot
        y: (leftRect.top + leftRect.height / 2) - containerRect.top
      };

      const end = {
        x: (rightRect.left - containerRect.left) + 10, // Small offset to touch the dot
        y: (rightRect.top + rightRect.height / 2) - containerRect.top
      };

      this.lines.push({
        start,
        end,
        status
      });
    }
  }

  resetGame() {
    this.initializeGame();
  }

  @HostListener('window:resize')
  onResize() {
    // Recalculate lines on resize (simplified: just clear for now or re-calculate if we stored indices)
    // For a robust solution, we'd store the matched pairs indices and re-run drawPermanentLine for them.
    this.lines = [];
    // Re-draw lines for matched items
    this.leftColumn.forEach((leftItem, leftIndex) => {
      if (leftItem.matched) {
        // Find corresponding right item
        const rightIndex = this.rightColumn.findIndex(r => r.id === leftItem.id);
        if (rightIndex !== -1) {
          this.drawPermanentLine(leftIndex, rightIndex);
        }
      }
    });
  }
}
