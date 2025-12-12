import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToeicService } from '../../../core/services/toeic.service';

/**
 * TOEIC Home Component
 * 
 * Flow: Entry point cho module TOEIC
 * ────────────────────────────────────────────────────────────
 *  TOEIC Home 
 *    ├── Part 5 Card → Click → Navigate to /toeic/part5
 *    └── Part 7 Card → Click → Navigate to /toeic/part7
 * ────────────────────────────────────────────────────────────
 */
@Component({
    selector: 'app-toeic-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './toeic-home.html',
    styleUrl: './toeic-home.css'
})
export class ToeicHomeComponent implements OnInit {
    part5Info = { title: '', description: '', topicCount: 0 };
    part7Info = { title: '', description: '', passageCount: 0 };

    constructor(private toeicService: ToeicService) { }

    ngOnInit() {
        this.toeicService.getPart5Info().subscribe(info => {
            this.part5Info = info;
        });

        this.toeicService.getPart7Info().subscribe(info => {
            this.part7Info = info;
        });
    }
}
