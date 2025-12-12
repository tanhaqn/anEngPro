import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamificationService } from '../../../core/services/gamification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMobileMenuOpen = false;
  progress$;

  constructor(private gamificationService: GamificationService) {
    this.progress$ = this.gamificationService.progress$;
  }

  navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/vocabulary', label: 'Từ vựng' },
    { path: '/grammar', label: 'Ngữ pháp' },
    { path: '/reading', label: 'Luyện đọc' },
    { path: '/toeic', label: 'TOEIC' },
    { path: '/review', label: 'Ôn tập' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
