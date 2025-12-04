import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features = [
    {
      icon: 'checklist',
      title: 'Học từ vựng qua Flashcard',
      description: 'Ghi nhớ từ vựng nhanh chóng với hình ảnh và âm thanh trực quan.',
      color: 'bg-blue-500'
    },
    {
      icon: 'rule',
      title: 'Bài tập đa dạng',
      description: 'Nối từ, trắc nghiệm, điền từ, nghe và viết giúp củng cố kiến thức.',
      color: 'bg-green-500'
    },
    {
      icon: 'timeline',
      title: 'Theo dõi tiến độ',
      description: 'Biểu đồ thống kê chi tiết giúp bạn nắm bắt được sự tiến bộ mỗi ngày.',
      color: 'bg-purple-500'
    },
    {
      icon: 'auto_awesome',
      title: 'Ôn tập thông minh',
      description: 'Hệ thống tự động nhắc nhở ôn tập các từ vựng sắp quên.',
      color: 'bg-yellow-500'
    }
  ];
}
