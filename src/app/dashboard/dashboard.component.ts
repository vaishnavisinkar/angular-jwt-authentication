import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  message: String;
  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.secretMessage();
  }

  secretMessage() {
    this.service.secretMessage().subscribe((response) => {
      console.log(response);
      this.message = response.message;
    })
  }

  logout(): void {
    localStorage.removeItem('JWT');
    this.router.navigate(['/']);
  }
}
