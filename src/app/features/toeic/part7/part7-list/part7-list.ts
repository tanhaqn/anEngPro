import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToeicService } from '../../../../core/services/toeic.service';
import { ToeicPart7Set, ToeicPart7Passage } from '../../../../core/models/toeic.model';

/**
 * Part 7 List Component
 * 
 * Flow: Hiển thị danh sách bài đọc Part 7
 * ────────────────────────────────────────────────────────────
 *  TOEIC Home → Part 7 List (trang này)
 *                  ├── Passage Card 1 → Click → /toeic/part7/passage_1
 *                  ├── Passage Card 2 → Click → /toeic/part7/passage_2
 *                  └── ...
 * ────────────────────────────────────────────────────────────
 */
@Component({
    selector: 'app-part7-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './part7-list.html',
    styleUrl: './part7-list.css'
})
export class Part7ListComponent implements OnInit {
    sets: ToeicPart7Set[] = [];
    allPassages: ToeicPart7Passage[] = [];
    isLoading = true;
    selectedSetId: string | null = null;

    constructor(private toeicService: ToeicService) { }

    ngOnInit() {
        this.toeicService.getPart7Sets().subscribe({
            next: (sets) => {
                this.sets = sets;
                if (sets.length > 0) {
                    this.selectedSetId = sets[0].id;
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading Part 7 sets:', err);
                this.isLoading = false;
            }
        });

        this.toeicService.getAllPart7Passages().subscribe({
            next: (passages) => {
                this.allPassages = passages;
            }
        });
    }

    get currentSet(): ToeicPart7Set | undefined {
        return this.sets.find(s => s.id === this.selectedSetId);
    }

    selectSet(setId: string) {
        this.selectedSetId = setId;
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

    getDifficultyColor(difficulty: string): string {
        const colors: { [key: string]: string } = {
            'basic': 'bg-emerald-500/20 text-emerald-400',
            'intermediate': 'bg-amber-500/20 text-amber-400',
            'advanced': 'bg-red-500/20 text-red-400'
        };
        return colors[difficulty] || 'bg-slate-500/20 text-slate-400';
    }

    getDifficultyLabel(difficulty: string): string {
        const labels: { [key: string]: string } = {
            'basic': 'Cơ bản',
            'intermediate': 'Trung bình',
            'advanced': 'Nâng cao'
        };
        return labels[difficulty] || difficulty;
    }
}
