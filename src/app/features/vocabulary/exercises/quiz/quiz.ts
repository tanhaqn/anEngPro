import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VocabularyService, Course, Word } from '../../../../core/services/vocabulary';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {
  course: Course | undefined;
  questions: {
    questionText: string,
    options: { id: string, text: string, label: string }[],
    correctId: string,
    selectedId: string | null,
    isCorrect: boolean | null
  }[] = [];
  currentQuestionIndex = 0;
  score = 0;
  showResult = false;
  showFeedback = false;

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.course = this.vocabularyService.getCourseById(id);
      this.initGame();
    }
  }

  initGame() {
    if (!this.course) return;

    this.questions = this.course.words.map(word => {
      // Create question from example by replacing the term with blanks
      const questionText = word.example.replace(new RegExp(word.term, 'gi'), '_______');

      // Generate 3 random wrong options (terms)
      const otherWords = this.course!.words.filter(w => w.id !== word.id);
      const wrongOptions = otherWords.sort(() => Math.random() - 0.5).slice(0, 3).map(w => ({ id: w.id, text: w.term }));

      // Combine with correct option
      const allOptions = [...wrongOptions, { id: word.id, text: word.term }]
        .sort(() => Math.random() - 0.5)
        .map((opt, index) => ({ ...opt, label: String.fromCharCode(65 + index) })); // A, B, C, D

      return {
        questionText,
        options: allOptions,
        correctId: word.id,
        selectedId: null,
        isCorrect: null
      };
    }).sort(() => Math.random() - 0.5);

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.showFeedback = false;
  }

  selectOption(optionId: string) {
    if (this.questions[this.currentQuestionIndex].selectedId !== null) return;

    this.questions[this.currentQuestionIndex].selectedId = optionId;
    const isCorrect = optionId === this.questions[this.currentQuestionIndex].correctId;
    this.questions[this.currentQuestionIndex].isCorrect = isCorrect;

    if (isCorrect) {
      this.score += 10;
    }

    this.showFeedback = true;
  }

  getCorrectAnswerText(): string {
    const question = this.questions[this.currentQuestionIndex];
    const correctOption = question.options.find(o => o.id === question.correctId);
    return correctOption ? correctOption.text : '';
  }

  nextQuestion() {
    this.showFeedback = false;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResult = true;
    }
  }

  resetGame() {
    this.initGame();
  }
}
