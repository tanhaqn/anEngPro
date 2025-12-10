import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface CourseCardData {
    id: string;
    title: string;
    description: string;
    badge: string;  // Level or English name
    metaInfo?: {
        icon: string;
        text: string;
    }[];
    routePath: string;  // e.g., '/vocabulary' or '/grammar'
}

@Component({
    selector: 'app-course-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './course-card.html',
    styleUrl: './course-card.css',
})
export class CourseCard {
    @Input() data!: CourseCardData;
    @Input() index: number = 0;

    get gradientClass(): string {
        const gradients = [
            'from-blue-500/20 to-indigo-500/20',
            'from-emerald-500/20 to-teal-500/20',
            'from-purple-500/20 to-pink-500/20'
        ];
        return gradients[this.index % 3];
    }

    get blurCircleClass(): string {
        const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500'];
        return colors[this.index % 3];
    }
}
