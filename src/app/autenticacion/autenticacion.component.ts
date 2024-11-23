import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],

  standalone: true,  // Esto permite que este componente sea independiente, si lo deseas.
  imports: [FormsModule, CommonModule]  // Asegúrate de incluir CommonModule aquí
})
export class AutenticacionComponent {
  // Variables para los formularios
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  

  // Lógica del formulario de login
  login() {
    // Aquí pondríamos la lógica de autenticación (por ahora solo mostramos un mensaje)
    if (this.email && this.password) {
      console.log('Login con', this.email);
      // Simulación de error
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
    }
  }

  // Lógica para el registro de usuario
  register() {
    // Aquí pondríamos la lógica para registrar un nuevo usuario
    if (this.email && this.password) {
      console.log('Registrando usuario con', this.email);
      // Simulación de error
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
    }
  }
}
