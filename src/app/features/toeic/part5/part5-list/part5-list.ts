import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToeicService } from '../../../../core/services/toeic.service';
import { ToeicPart5Topic } from '../../../../core/models/toeic.model';

/**
 * Part 5 List Component
 * 
 * Flow: Hiển thị danh sách chủ đề ngữ pháp Part 5
 * ────────────────────────────────────────────────────────────
 *  TOEIC Home → Part 5 List (trang này)
 *                  ├── Topic Card 1 → Click → /toeic/part5/nouns
 *                  ├── Topic Card 2 → Click → /toeic/part5/verb_tenses
 *                  └── ...
 * ────────────────────────────────────────────────────────────
 */
@Component({
    selector: 'app-part5-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './part5-list.html',
    styleUrl: './part5-list.css'
})
export class Part5ListComponent implements OnInit {
    topics: ToeicPart5Topic[] = [];
    isLoading = true;

    constructor(private toeicService: ToeicService) { }

    ngOnInit() {
        this.toeicService.getPart5Topics().subscribe({
            next: (topics) => {
                this.topics = topics;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading Part 5 topics:', err);
                this.isLoading = false;
            }
        });
    }

    getQuestionCount(topicId: string): number {
        return this.toeicService.getQuestionCountByTopic(topicId);
    }

    getLessonCount(topic: ToeicPart5Topic): number {
        return topic.lessons?.length || 0;
    }
}
