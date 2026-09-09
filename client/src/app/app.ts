import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from "./layout/header/header";
import { RouterOutlet } from "@angular/router";

@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('WildCard');
}
