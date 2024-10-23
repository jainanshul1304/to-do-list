import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth.services';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [Auth],
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  
  applyForm = new FormGroup({
    emailId: new FormControl(''),
    keyPassword: new FormControl(''),
  });
  isLoggedIn: boolean | null = false;
  private auth = inject(Auth);
  constructor(private toastr: ToastrService) {}
  ngOnInit() {
    const showError = localStorage.getItem('displayError');
    if (showError == 'true') {
      this.toastr.error('Invalid credentials');
      localStorage.removeItem('displayError');
    }
  }

  onLogin() {
    console.log(this.applyForm.value.emailId, this.applyForm.value.keyPassword);
    const email = this.applyForm.value.emailId ?? '';
    const password = this.applyForm.value.keyPassword ?? '';

    console.log(email,password);
    this.auth.login(email, password).subscribe(
      (response) => {
        if (response.success) {
          this.isLoggedIn = true;
          localStorage.setItem('loggedIn', 'true');
          console.log('Login successful!');
        } else {
          this.isLoggedIn = false;
          window.location.reload();
          this.toastr.error("Errro!");
          console.log("Error");
        }
      },
      (error) => {
        console.error('An error occurred:', error);
        this.isLoggedIn = false;
        localStorage.setItem('displayError', 'true');
        window.location.href = window.location.href;
      }
    );
  }
}
