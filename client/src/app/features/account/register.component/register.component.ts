import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { TextInputComponent } from '../../../shared/components/text-input.component/text-input.component';

@Component({
  imports: [MatCard, ReactiveFormsModule, MatButton, TextInputComponent],
  selector: 'app-register.component',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private snack = inject(SnackbarService);
  validationErrors?: string[];

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snack.success('Registrtion successfull - you can now login');
        this.router.navigateByUrl('/account/login');
      },
      error: errors => this.validationErrors = errors,
    });
  }
}
