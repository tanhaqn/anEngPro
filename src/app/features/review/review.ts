import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class Review {
  todayWords = [
    {
      word: 'Hello',
      pronunciation: '/həˈloʊ/',
      meaning: 'Xin chào',
      status: 'good',
      statusText: 'Ghi nhớ tốt',
      nextReview: 'Ôn lại sau: 7 ngày',
      expanded: false
    },
    {
      word: 'Apple',
      pronunciation: '/ˈæp.əl/',
      meaning: 'Quả táo',
      example: 'Ví dụ: She eats an apple every day.',
      status: 'good',
      statusText: 'Ghi nhớ tốt',
      nextReview: '',
      expanded: true
    },
    {
      word: 'House',
      pronunciation: '/haʊs/',
      meaning: 'Ngôi nhà',
      status: 'medium',
      statusText: 'Sắp quên',
      nextReview: 'Ôn lại sau: 1 ngày',
      expanded: false
    },
    {
      word: 'Computer',
      pronunciation: '/kəmˈpjuː.t̬ɚ/',
      meaning: 'Máy tính',
      status: 'poor',
      statusText: 'Cần ôn ngay',
      nextReview: 'Ôn lại sau: 10 phút',
      expanded: false
    }
  ];

  schedule = [
    { day: 'T2', date: '18/07', count: 0, isToday: true, label: 'HÔM NAY' },
    { day: 'T3', date: '18/07', count: 21 },
    { day: 'T4', date: '19/07', count: 18 },
    { day: 'T5', date: '20/07', count: 8 },
    { day: 'T6', date: '21/07', count: 12 },
    { day: 'T7', date: '22/07', count: 25 },
    { day: 'CN', date: '23/07', count: 5 },
  ];

  progress = [
      { title: 'Từ vựng cơ bản', completed: 15, total: 50, percent: 30 },
      { title: 'Ngữ pháp A1', completed: 35, total: 40, percent: 87.5 }
  ];

  selectedWord = this.todayWords.find(w => w.expanded);

  selectWord(word: any) {
    this.todayWords.forEach(w => w.expanded = false);
    word.expanded = true;
    this.selectedWord = word;
  }
}
