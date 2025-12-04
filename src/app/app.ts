import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top';
import { QuickLookupComponent } from './shared/components/quick-lookup/quick-lookup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ScrollToTopComponent, QuickLookupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('an-eng-pro');
}
