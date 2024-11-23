import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],

  standalone: true,  
  imports: [FormsModule, CommonModule]  
})
export class AutenticacionComponent {
  
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  

  
  login() {
    
    if (this.email && this.password) {
      console.log('Login con', this.email);
      
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
    }
  }

  
  register() {
    
    if (this.email && this.password) {
      console.log('Registrando usuario con', this.email);
      
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
    }
  }
}
