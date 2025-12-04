import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VocabularyService } from '../../../../core/services/vocabulary';
import { Course } from '../../../../core/models/vocabulary.model';

@Component({
    selector: 'app-lesson-exercises',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './lesson-exercises.html'
})
export class LessonExercisesComponent implements OnInit {
    courseId: string | null = null;
    course: Course | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vocabularyService: VocabularyService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.courseId = params.get('id');
            if (this.courseId) {
                this.loadCourse(this.courseId);
            }
        });
    }

    loadCourse(id: string): void {
        this.course = this.vocabularyService.getCourseById(id);
    }

    goBack(): void {
        if (this.courseId) {
            this.router.navigate(['/vocabulary', this.courseId]);
        }
    }

    nextLesson(): void {
        // Logic for next lesson/topic would go here.
        console.log('Next lesson clicked');
    }
}
