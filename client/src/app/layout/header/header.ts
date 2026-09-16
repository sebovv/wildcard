import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Busy } from '../../core/services/busy';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  imports: [MatIcon, MatButton, MatBadge, RouterLink, RouterLinkActive, MatProgressBar],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  busyService = inject(Busy);
}
