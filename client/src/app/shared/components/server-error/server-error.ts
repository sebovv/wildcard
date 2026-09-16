import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';

@Component({
  imports: [MatCard],
  selector: 'app-server-error',
  styleUrl: './server-error.css',
  templateUrl: './server-error.html',
})

export class ServerError {
  error?: any = signal<any>(undefined);

  constructor(private router: Router) {
    const navigation = this.router.currentNavigation();
    console.log(navigation);
    this.error.set(navigation?.extras.state?.['error']);
  }
}
