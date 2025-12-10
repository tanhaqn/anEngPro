import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrammarService } from '../../../core/services/grammar.service';
import { GrammarRule } from '../../../core/models/grammar.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-grammar-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './grammar-detail.html',
  styles: []
})
export class GrammarDetail implements OnInit {
  rule: GrammarRule | undefined;

  constructor(
    private route: ActivatedRoute,
    private grammarService: GrammarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.grammarService.getRuleById(id).subscribe(rule => {
        this.rule = rule;
      });
    });
  }

  cleanTitle(title: string): string {
    return title ? title.replace(/^\d+\.\s*/, '') : '';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
