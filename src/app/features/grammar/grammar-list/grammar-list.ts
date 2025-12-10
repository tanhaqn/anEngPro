import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrammarCategory } from '../../../core/models/grammar.model';
import { GrammarService } from '../../../core/services/grammar.service';
import { ContentCard } from '../../../shared/components/content-card/content-card';

@Component({
  selector: 'app-grammar-list',
  imports: [CommonModule, ContentCard],
  templateUrl: './grammar-list.html',
  styleUrl: './grammar-list.css',
})
export class GrammarList {
  allCategories: GrammarCategory[] = [];
  displayCategories: GrammarCategory[] = [];
  activeFilter: string = 'tenses';
  isLoading: boolean = true;

  filters = [
    { id: 'tenses', label: 'Các Thì' },
    { id: 'structures', label: 'Cấu Trúc' },
    { id: 'rewrite', label: 'Viết Lại Câu' },
    { id: 'phonetics_vocab', label: 'Ngữ Âm & Từ Vựng' }
  ];

  constructor(private grammarService: GrammarService) { }

  ngOnInit() {
    this.isLoading = true;
    this.grammarService.getGrammarData().subscribe({
      next: (data) => {
        this.allCategories = data.categories;
        // Set initial filter to 'tenses'
        this.setFilter('tenses');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading grammar data:', err);
        this.isLoading = false;
      }
    });
  }

  setFilter(filterId: string) {
    this.activeFilter = filterId;
    this.displayCategories = this.allCategories.filter(cat => cat.id === filterId);
  }
}
