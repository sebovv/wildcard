import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIcon, MatButton, RouterLink],
  selector: 'app-empty-state',
  styleUrl: './empty-state.component.css',
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent { }
