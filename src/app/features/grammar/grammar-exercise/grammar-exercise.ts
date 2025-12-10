import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Question {
  type: 'multiple-choice' | 'fill-blank' | 'word-order';
  instruction: string;
  question?: string;
  options?: string[];
  sentenceParts?: { type: 'text' | 'blank'; content?: string }[];
  words?: string[];
  correctAnswer: string;
  explanation: string;
}

@Component({
  selector: 'app-grammar-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './grammar-exercise.html',
  styles: []
})
export class GrammarExercise implements OnInit {
  grammarTitle = 'Thì hiện tại đơn';
  currentQuestionIndex = 0;
  totalQuestions = 3;
  showAnswer = false;

  // For multiple choice
  selectedAnswer: string = '';

  // For fill in blank
  userAnswer: string = '';

  // For word arrangement
  availableWords: string[] = [];
  arrangedWords: string[] = [];

  // Sample questions
  questions: Question[] = [
    {
      type: 'multiple-choice',
      instruction: 'Chọn dạng đúng của động từ để hoàn thành câu.',
      question: 'She ___ to school every day.',
      options: ['go', 'goes', 'going'],
      correctAnswer: 'goes',
      explanation: 'Trong thì hiện tại đơn, với chủ ngữ là ngôi thứ ba số ít (He, She, It), động từ cần được thêm "s" hoặc "es". Trong trường hợp này, động từ "go" kết thúc bằng "o", nên chúng ta thêm "es" thành "goes".'
    },
    {
      type: 'fill-blank',
      instruction: 'Điền từ thích hợp vào chỗ trống.',
      sentenceParts: [
        { type: 'text', content: 'They' },
        { type: 'blank' },
        { type: 'text', content: 'not like coffee.' }
      ],
      correctAnswer: 'do',
      explanation: 'Câu hoàn chỉnh là "They do not like coffee." hoặc dạng rút gọn "They don\'t like coffee.". Khi tạo câu phủ định ở thì hiện tại đơn với chủ ngữ I, You, We, They, chúng ta sử dụng trợ động từ "do + not".'
    },
    {
      type: 'word-order',
      instruction: 'Sắp xếp các từ sau để tạo thành câu hoàn chỉnh.',
      words: ['He', 'usually', 'reads', 'books', 'in the morning'],
      correctAnswer: 'He usually reads books in the morning.',
      explanation: 'Trạng từ chỉ tần suất "usually" thường đứng trước động từ thường ("reads") và sau chủ ngữ ("He"). Cụm từ chỉ thời gian "in the morning" thường được đặt ở cuối câu.'
    }
  ];

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
  }

  ngOnInit() {
    this.initializeQuestion();
  }

  initializeQuestion() {
    const question = this.currentQuestion;
    if (!question) return;

    this.showAnswer = false;
    this.selectedAnswer = '';
    this.userAnswer = '';

    if (question.type === 'word-order' && question.words) {
      this.availableWords = [...question.words].sort(() => Math.random() - 0.5);
      this.arrangedWords = [];
    }
  }

  addWord(word: string) {
    if (this.showAnswer) return;
    const index = this.availableWords.indexOf(word);
    if (index > -1) {
      this.availableWords.splice(index, 1);
      this.arrangedWords.push(word);
    }
  }

  removeWord(index: number) {
    if (this.showAnswer) return;
    const word = this.arrangedWords[index];
    this.arrangedWords.splice(index, 1);
    this.availableWords.push(word);
  }

  checkAnswer() {
    this.showAnswer = true;
  }

  skipQuestion() {
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.initializeQuestion();
    } else {
      // Navigate to results or back to grammar detail
      alert('Hoàn thành bài tập!');
    }
  }
}
