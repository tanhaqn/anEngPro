

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VocabularyService, Course } from '../../../core/services/vocabulary';

@Component({
    selector: 'app-course-manager',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './course-manager.html'
})
export class CourseManagerComponent implements OnInit {
    courses: Course[] = [];

    // Modal State
    showModal = false;
    isEditing = false;
    currentCourse: Partial<Course> = {};

    // Default Thumbnail for new courses
    private defaultThumbnail = 'https://ui-avatars.com/api/?name=New+Course&background=0D8ABC&color=fff&size=256';

    constructor(private vocabularyService: VocabularyService) { }

    ngOnInit() {
        this.courses = this.vocabularyService.getCourses();
    }

    onAddCourse() {
        this.isEditing = false;
        this.currentCourse = {
            title: '',
            description: '',
            level: 'Beginner',
            thumbnail: this.defaultThumbnail,
            words: []
        };
        this.showModal = true;
    }

    onEditCourse(course: Course) {
        this.isEditing = true;
        // Create a copy to avoid mutating the list directly before saving
        this.currentCourse = { ...course };
        this.showModal = true;
    }

    onDeleteCourse(course: Course) {
        if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
            this.courses = this.courses.filter(c => c.id !== course.id);
            // In a real app, you would call this.vocabularyService.deleteCourse(course.id)
        }
    }

    onSave() {
        if (this.isEditing) {
            // Update existing course
            const index = this.courses.findIndex(c => c.id === this.currentCourse.id);
            if (index !== -1) {
                this.courses[index] = this.currentCourse as Course;
            }
        } else {
            // Add new course
            const newCourse = {
                ...this.currentCourse,
                id: Date.now().toString(), // Mock ID
                words: []
            } as Course;
            this.courses.unshift(newCourse);
        }
        this.closeModal();
    }

    closeModal() {
        this.showModal = false;
        this.currentCourse = {};
    }
}
