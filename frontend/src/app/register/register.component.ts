import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Auth } from '../../services/auth.services';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private auth = inject(Auth);
  // private mail = inject(MailService);
  private toastr = inject(ToastrService);
  // private route = inject(ActivatedRoute);
  private router = inject(Router);
  applyForm = new FormGroup({
    emailId: new FormControl(''),
    keyPassword: new FormControl(''),
  });
  isLoggedIn: boolean | null = false;

  ngOnInit() {
    const showError = localStorage.getItem('displayError');
    if (showError == 'true') {
      this.toastr.error('Invalid credentials');
      localStorage.removeItem('displayError');
    }
    this.userLogInStatus.emit(this.isLoggedIn);
  }
  onRegister() {
    console.log(this.applyForm.value.emailId, this.applyForm.value.keyPassword);
    const email = this.applyForm.value.emailId ?? '';
    const password = this.applyForm.value.keyPassword ?? '';
    console.log(email, password);

    this.auth.register(email, password).subscribe(
      (response) => {
        console.log(response.success);
        if (response.success) {
          this.isLoggedIn = true;
          localStorage.setItem('loggedIn', 'true');
          console.log('Signup successful!');
          this.toastr.success('You are now signed in!');
          this.router.navigate(['/home']);
        } else {
          this.isLoggedIn = false;
          console.log(this.isLoggedIn);
          window.location.reload();
          console.log('Error');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
        this.isLoggedIn = false;
        localStorage.setItem('displayError', 'true');
      }
    );
  }
  @Output() userLogInStatus = new EventEmitter<boolean | null>();
}
