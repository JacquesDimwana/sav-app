import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './components/footer/footer';
import { Navibar } from './components/navibar/navibar';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Navibar, Footer ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sav-app');
}