import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {


  signupForm: FormGroup | undefined;

  constructor(
    private service: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }
  private passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPasword')?.value;
    if (password != confirmPassword) {
      fg.get("confirmPassword")?.setErrors({ passwordMismatch: true })
    } else {
      fg.get('confirmPasword')?.setErrors(null);
    }

  }
  signup() {
    console.log(this.signupForm.value);
    this.service.signup(this.signupForm.value).subscribe((response) => {
      console.log(response);
    })
  }


}
