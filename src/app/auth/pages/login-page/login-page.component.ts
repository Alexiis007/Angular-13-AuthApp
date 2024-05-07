import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private fb = inject( FormBuilder );
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  public myForm : FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  public login(){
    const {email,password} = this.myForm.value;
    this.authService.login(email,password)
    .subscribe({
      next:() => {
        this.router.navigateByUrl('/dashboard')
      },
      error(err) {
        Swal.fire('Error', err, 'error')        
      },
    });

  }
}
