import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToeicService } from '../../../../core/services/toeic.service';
import { ToeicPart5Topic, ToeicPart5Question } from '../../../../core/models/toeic.model';

/**
 * Part 5 Practice Component
 * 
 * Flow: Làm bài tập trắc nghiệm Part 5
 * ────────────────────────────────────────────────────────────
 *  Part 5 List → Part 5 Practice (trang này)
 *                  ├── Show Question
 *                  ├── User selects answer
 *                  ├── Show result + explanation
 *                  └── Next question or finish
 * ────────────────────────────────────────────────────────────
 */
@Component({
    selector: 'app-part5-practice',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './part5-practice.html',
    styleUrl: './part5-practice.css'
})
export class Part5PracticeComponent implements OnInit {
    topic: ToeicPart5Topic | undefined;
    allQuestions: ToeicPart5Question[] = [];
    currentQuestionIndex = 0;
    selectedAnswer: number | null = null;
    isAnswered = false;
    score = 0;
    isCompleted = false;
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private toeicService: ToeicService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const topicId = params['id'];
            this.loadTopic(topicId);
        });
    }

    loadTopic(topicId: string) {
        this.toeicService.getPart5TopicById(topicId).subscribe({
            next: (topic) => {
                this.topic = topic;
                if (topic) {
                    // Gather all questions from all lessons
                    this.allQuestions = [];
                    topic.lessons.forEach(lesson => {
                        this.allQuestions.push(...lesson.questions);
                    });
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading topic:', err);
                this.isLoading = false;
            }
        });
    }

    get currentQuestion(): ToeicPart5Question | undefined {
        return this.allQuestions[this.currentQuestionIndex];
    }

    get progress(): number {
        if (this.allQuestions.length === 0) return 0;
        return ((this.currentQuestionIndex + 1) / this.allQuestions.length) * 100;
    }

    selectAnswer(index: number) {
        if (this.isAnswered) return;

        this.selectedAnswer = index;
        this.isAnswered = true;

        if (this.currentQuestion && index === this.currentQuestion.correctAnswer) {
            this.score++;
        }
    }

    isCorrectAnswer(index: number): boolean {
        return this.currentQuestion?.correctAnswer === index;
    }

    isWrongAnswer(index: number): boolean {
        return this.isAnswered && this.selectedAnswer === index && !this.isCorrectAnswer(index);
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.allQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.selectedAnswer = null;
            this.isAnswered = false;
        } else {
            this.isCompleted = true;
        }
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.score = 0;
        this.isCompleted = false;
    }

    getScorePercentage(): number {
        if (this.allQuestions.length === 0) return 0;
        return Math.round((this.score / this.allQuestions.length) * 100);
    }

    getOptionLetter(index: number): string {
        return ['A', 'B', 'C', 'D'][index];
    }
}
