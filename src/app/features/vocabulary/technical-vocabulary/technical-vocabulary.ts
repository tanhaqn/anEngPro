import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VocabularyService } from '../../../core/services/vocabulary';
import { Course } from '../../../core/models/vocabulary.model';
import { ContentCard } from '../../../shared/components/content-card/content-card';

@Component({
    selector: 'app-technical-vocabulary',
    standalone: true,
    imports: [CommonModule, FormsModule, ContentCard],
    templateUrl: './technical-vocabulary.html',
    styleUrl: './technical-vocabulary.css',
})
export class TechnicalVocabulary implements OnInit {
    allCourses: Course[] = [];
    filteredCourses: Course[] = [];
    displayedCourses: Course[] = [];

    searchTerm: string = '';

    protected readonly Math = Math;

    private initialLoadSize = 9;
    private loadMoreSize = 6;

    constructor(private vocabularyService: VocabularyService) { }

    ngOnInit() {
        this.allCourses = this.vocabularyService.getTechnicalCourses();
        this.filterCourses();
    }

    filterCourses() {
        this.filteredCourses = this.allCourses.filter(course => {
            const searchTermMatch = course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            return searchTermMatch;
        });
        this.displayedCourses = this.filteredCourses.slice(0, this.initialLoadSize);
    }

    loadMore() {
        const currentLength = this.displayedCourses.length;
        const moreCourses = this.filteredCourses.slice(currentLength, currentLength + this.loadMoreSize);
        this.displayedCourses.push(...moreCourses);
    }
}
