import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VocabularyService, Course, Word } from '../../../../core/services/vocabulary';

@Component({
  selector: 'app-listen-write',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listen-write.html',
  styleUrl: './listen-write.css',
})
export class ListenWrite implements OnInit {
  course: Course | undefined;
  questions: { word: Word, userAnswer: string, isCorrect: boolean | null }[] = [];
  currentQuestionIndex = 0;
  score = 0;
  showResult = false;

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

    this.questions = this.course.words.map(word => ({
      word,
      userAnswer: '',
      isCorrect: null
    })).sort(() => Math.random() - 0.5);

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
  }

  playAudio() {
    const word = this.questions[this.currentQuestionIndex].word.term;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  checkAnswer() {
    const question = this.questions[this.currentQuestionIndex];
    if (question.userAnswer.trim().toLowerCase() === question.word.term.toLowerCase()) {
      question.isCorrect = true;
      this.score++;
    } else {
      question.isCorrect = false;
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  skipQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    question.isCorrect = false;
    this.nextQuestion();
  }

  nextQuestion() {
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
