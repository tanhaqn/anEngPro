import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VocabularyService } from '../../../core/services/vocabulary.service';
import { Course } from '../../../core/models/vocabulary.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  displayedCourses: Course[] = [];

  levels: string[] = [];
  categories: string[] = []; // We can derive categories from course titles or add a category field later

  searchTerm: string = '';
  selectedLevel: string = 'all';
  selectedCategory: string = 'all';

  private initialLoadSize = 9;
  private loadMoreSize = 6;

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit() {
    this.allCourses = this.vocabularyService.getCourses();
    this.levels = [...new Set(this.allCourses.map(c => c.level))].sort();
    // For now, we'll create categories from topic names
    this.categories = [...new Set(this.allCourses.map(c => this.extractCategory(c.title)))].sort();
    this.filterCourses();
  }

  filterCourses() {
    this.filteredCourses = this.allCourses.filter(course => {
      const searchTermMatch = course.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const levelMatch = this.selectedLevel === 'all' || course.level === this.selectedLevel;
      const categoryMatch = this.selectedCategory === 'all' || this.extractCategory(course.title) === this.selectedCategory;
      return searchTermMatch && levelMatch && categoryMatch;
    });
    this.displayedCourses = this.filteredCourses.slice(0, this.initialLoadSize);
  }

  loadMore() {
    const currentLength = this.displayedCourses.length;
    const moreCourses = this.filteredCourses.slice(currentLength, currentLength + this.loadMoreSize);
    this.displayedCourses.push(...moreCourses);
  }

  // A simple helper to extract a category from the title
  private extractCategory(title: string): string {
      const parts = title.split('(');
      if (parts.length > 1) {
          return parts[1].replace(')', '').trim();
      }
      // Fallback for titles without parenthesis
      const words = title.split(' ');
      return words[words.length - 1];
  }
}


