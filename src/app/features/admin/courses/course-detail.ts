
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VocabularyService, Course, Word } from '../../../core/services/vocabulary';

@Component({
    selector: 'app-course-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './course-detail.html'
})
export class CourseDetailComponent implements OnInit {
    course: Course | undefined;

    // Modal State
    showModal = false;
    isEditing = false;
    currentWord: Partial<Word> = {};

    constructor(
        private route: ActivatedRoute,
        private vocabularyService: VocabularyService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.course = this.vocabularyService.getCourseById(id);
            }
        });
    }

    onAddWord() {
        this.isEditing = false;
        this.currentWord = {
            term: '',
            meaning: '',
            definition: '',
            partOfSpeech: 'noun',
            example: '',
            exampleTranslation: ''
        };
        this.showModal = true;
    }

    onEditWord(word: Word) {
        this.isEditing = true;
        this.currentWord = { ...word };
        this.showModal = true;
    }

    onDeleteWord(word: Word) {
        if (this.course && confirm(`Delete "${word.term}"?`)) {
            this.course.words = this.course.words.filter(w => w.id !== word.id);
        }
    }

    onSave() {
        if (!this.course) return;

        if (this.isEditing) {
            // Edit
            const index = this.course.words.findIndex(w => w.id === this.currentWord.id);
            if (index !== -1) {
                this.course.words[index] = this.currentWord as Word;
            }
        } else {
            // Add
            const newWord = {
                ...this.currentWord,
                id: `${this.course.id}-${Date.now()}`,
                // default empty values for required fields if needed
                pronunciation: this.currentWord.ipa || ''
            } as Word;
            this.course.words.unshift(newWord);
        }
        this.closeModal();
    }

    closeModal() {
        this.showModal = false;
        this.currentWord = {};
    }
}
