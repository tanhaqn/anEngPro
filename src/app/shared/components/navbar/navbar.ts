import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMobileMenuOpen = false;

  navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/vocabulary', label: 'Từ vựng' },
    { path: '/grammar', label: 'Ngữ pháp' },
    { path: '/reading', label: 'Luyện đọc' },
    { path: '/review', label: 'Ôn tập' },
    { path: '/dashboard', label: 'Tiến độ' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
