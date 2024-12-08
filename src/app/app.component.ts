import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { AuthService } from './servicios/auth.service';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutenticacionComponent, NgIf, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'red-social';
  isUserLoggedIn  : boolean = false;
  constructor(private authService: AuthService){
this.subscribeToAuthStatus()
  }
  subscribeToAuthStatus() {
    this.authService.userStatus$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
      console.log('¿Usuario logueado?:', this.isUserLoggedIn);
      if (isLoggedIn) {
        const user = this.authService.getCurrentUser();
        console.log('Usuario actual:', user?.email);
      }
    });
  }
}
