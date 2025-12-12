import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToeicService } from '../../../../core/services/toeic.service';
import { ToeicPart7Passage, ToeicPart7Question } from '../../../../core/models/toeic.model';

/**
 * Part 7 Reading Component
 * 
 * Flow: Đọc bài văn và trả lời câu hỏi Part 7
 * ────────────────────────────────────────────────────────────
 *  Part 7 List → Part 7 Reading (trang này)
 *                  ├── Left: Passage content
 *                  ├── Right: Questions
 *                  ├── User answers all questions
 *                  └── Submit → Show results
 * ────────────────────────────────────────────────────────────
 */
@Component({
    selector: 'app-part7-reading',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './part7-reading.html',
    styleUrl: './part7-reading.css'
})
export class Part7ReadingComponent implements OnInit {
    passage: ToeicPart7Passage | undefined;
    userAnswers: { [questionId: string]: number } = {};
    isSubmitted = false;
    score = 0;
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private toeicService: ToeicService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const passageId = params['id'];
            this.loadPassage(passageId);
        });
    }

    loadPassage(passageId: string) {
        this.toeicService.getPart7PassageById(passageId).subscribe({
            next: (passage) => {
                this.passage = passage;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading passage:', err);
                this.isLoading = false;
            }
        });
    }

    selectAnswer(questionId: string, answerIndex: number) {
        if (this.isSubmitted) return;
        this.userAnswers[questionId] = answerIndex;
    }

    isSelected(questionId: string, answerIndex: number): boolean {
        return this.userAnswers[questionId] === answerIndex;
    }

    isAnswered(questionId: string): boolean {
        return this.userAnswers[questionId] !== undefined;
    }

    get allQuestionsAnswered(): boolean {
        if (!this.passage) return false;
        return this.passage.questions.every(q => this.isAnswered(q.id));
    }

    get answeredCount(): number {
        return Object.keys(this.userAnswers).length;
    }

    submitAnswers() {
        if (!this.passage || !this.allQuestionsAnswered) return;

        this.score = 0;
        this.passage.questions.forEach(question => {
            if (this.userAnswers[question.id] === question.correctAnswer) {
                this.score++;
            }
        });

        this.isSubmitted = true;
    }

    isCorrect(question: ToeicPart7Question): boolean {
        return this.userAnswers[question.id] === question.correctAnswer;
    }

    getOptionLetter(index: number): string {
        return ['A', 'B', 'C', 'D'][index];
    }

    getScorePercentage(): number {
        if (!this.passage) return 0;
        return Math.round((this.score / this.passage.questions.length) * 100);
    }

    restartReading() {
        this.userAnswers = {};
        this.isSubmitted = false;
        this.score = 0;
    }

    getTypeIcon(type: string): string {
        const icons: { [key: string]: string } = {
            'notice': 'campaign',
            'email': 'mail',
            'memo': 'note',
            'article': 'article',
            'advertisement': 'ads_click'
        };
        return icons[type] || 'description';
    }

    getTypeLabel(type: string): string {
        const labels: { [key: string]: string } = {
            'notice': 'Thông báo',
            'email': 'Email',
            'memo': 'Memo',
            'article': 'Bài báo',
            'advertisement': 'Quảng cáo'
        };
        return labels[type] || type;
    }
}
