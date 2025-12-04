import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GamificationService } from '../../../core/services/gamification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats: any[] = [];
  leaderboard: any[] = [];

  constructor(private gamificationService: GamificationService) {
    this.updateStats();
    this.generateLeaderboard();
  }

  updateStats() {
    const progress = this.gamificationService.currentProgress;
    this.stats = [
      { title: 'Cấp độ', value: progress.level, subtitle: 'Level', icon: 'military_tech', iconClass: 'bg-primary/20 text-primary' },
      { title: 'Chuỗi ngày', value: progress.streak, subtitle: 'Chuỗi ngày', icon: 'local_fire_department', iconClass: 'bg-orange-500/20 text-orange-400' },
      { title: 'Điểm KN', value: progress.xp, subtitle: 'XP', icon: 'star', iconClass: 'bg-purple-500/20 text-purple-400' },
      { title: 'Đá quý', value: progress.gems, subtitle: 'Gems', icon: 'diamond', iconClass: 'bg-blue-500/20 text-blue-400' }
    ];
  }

  generateLeaderboard() {
    // Mock data
    const mockUsers = [
      { name: 'Sarah M.', xp: 2500, avatar: 'https://i.pravatar.cc/150?u=1' },
      { name: 'John D.', xp: 2350, avatar: 'https://i.pravatar.cc/150?u=2' },
      { name: 'Emily R.', xp: 2100, avatar: 'https://i.pravatar.cc/150?u=3' },
    ];

    const currentUser = {
      name: 'Bạn',
      xp: this.gamificationService.currentProgress.xp,
      avatar: 'https://i.pravatar.cc/150?u=4',
      isMe: true
    };

    this.leaderboard = [...mockUsers, currentUser].sort((a, b) => b.xp - a.xp);
  }

  courses = [
    {
      title: 'Tiếng Anh Thương mại',
      category: 'Khóa học',
      progress: 75,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnmKr4GKxj4S_eygaCk5S2v3WgvRmA63uzYVuImgJLLfw_M5QVHgbAX1c6sceWjayuWOsIhtBHpgdLaqT0Qai0ARdUhOkVyoPO9xkqYSC6qL1DRf3iiII9PfTB1ELdw7Nj5QJEr-4jlCw7DEuVvTctg6cxkJczUCQyRPqa1Klk_YPEz6D-iEOgWlb4Mq27oOSkHQs4SCcjGr_O_WRjA98sd4SznrnoBXQu2AzoG7XpL6r3L6yhUanjovgpkGuKsjHga8FHePllcbqg'
    },
    {
      title: 'IELTS Listening - Phần 2',
      category: 'Luyện thi',
      progress: 40,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbUJb7CUwT1ONtdvNstNs7SgVf_iqxOsojKFWIDEnb9GEtasQOC5Xk_YHc5upUW0e-Fz8XUjDQqu8aHqcrKI1HAhmhPAoWVqKneLgODtLU4JXsfEGNWieuM2PeELrt89Iqc1N51ETcLMZ16_cqDH9Ug9BARfsVHPDW6Xc9QxZX3ZzygPnrvzfbdcuheGXAdr5-llyz_vidjHMnvZiNx3WevT2_0H93fuw8j18Bhvo5kULqm9g1s6HZI5w7JZHD-7BeSspe13JBmdHs'
    }
  ];

  weeklyActivity = [
    { day: 'T2', height: '60%' },
    { day: 'T3', height: '80%' },
    { day: 'T4', height: '40%' },
    { day: 'T5', height: '70%' },
    { day: 'T6', height: '90%' },
    { day: 'T7', height: '50%' },
    { day: 'CN', height: '75%' }
  ];
}
