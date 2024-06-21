import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _http = inject(LoginService);
  formulario: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.formulario.get('email') as FormControl;
  }

  get password() {
    return this.formulario.get('password') as FormControl;
  }

  onSubmit() {
    this.loginError = null; // Reset error message
    if (this.formulario.valid) {
      console.log('Email:', this.email.value);
      console.log('Password:', this.password.value);
      this._http.getToken(this.email.value, this.password.value).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.loginError = 'Email o contraseña incorrectos';
          } else {
            this.loginError = 'Ocurrió un error. Inténtalo de nuevo más tarde.';
          }
          return throwError(error);
        })
      ).subscribe((res: any) => {
        console.log(res);
        localStorage.setItem("token", res["token"]);
        this.router.navigate(['/productos']);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
