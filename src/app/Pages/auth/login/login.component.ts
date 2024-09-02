import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../../Services/login-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor( private authService: LoginServiceService, private router: Router) { }

  login(): void {
    this.authService.Login(this.user, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        console.log(err);
      }
    );
  }
}

