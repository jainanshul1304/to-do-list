import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Auth } from '../../services/auth.services';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [Auth],
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoggedIn: boolean | null = false;
  private auth = inject(Auth);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  applyForm = new FormGroup({
    emailId: new FormControl(''),
    keyPassword: new FormControl(''),
  });

  onLogin() {
    console.log(this.applyForm.value.emailId, this.applyForm.value.keyPassword);

    const email = this.applyForm.value.emailId ?? '';

    const password = this.applyForm.value.keyPassword ?? '';

    console.log(email, password);

    this.auth.login(email, password).subscribe(
      (response) => {
        console.log(response.success);
        if (response.success) {
          this.isLoggedIn = true;
          localStorage.setItem('token', response.token);
          localStorage.setItem('loggedIn', 'true');

          console.log('Login successful!');
          this.toastr.success('You are now logged in!');
          this.router.navigate(['/home']);
      

        } else {
          this.isLoggedIn = false;
          console.log(this.isLoggedIn);
          this.toastr.error('Invalid credentials');
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
}
