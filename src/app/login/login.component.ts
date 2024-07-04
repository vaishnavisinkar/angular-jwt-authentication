import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup | undefined;
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {

      if (response.token) {
        alert(response.token);
        const jwtToken = response.token;
        localStorage.setItem('JWT', jwtToken);
        this.router.navigateByUrl('/dashboard');
      }

      console.log(response);
    })
  }
}
