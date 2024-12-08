import { Component } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';  
import { CommonModule, NgIf } from '@angular/common';  
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],

  standalone: true,  
  imports: [FormsModule, CommonModule, NgIf]  
})
export class AutenticacionComponent {
  state = LoginCompState.LOGIN;
  //login
  emaill: string = '';
  passwordl: string = '';
  errorMessage: string = '';
  //registro
  emailr: string = '';
  passwordr: string = '';
  nombrer: string = '';
  apellidor: string = '';
  //recuperar contr
  emailc: string = '';

  constructor(private authService: AuthService){

  }
  

  
  login() {
    
    if (this.emaill && this.passwordl) {
      console.log('mail', this.emaill, "pass: ", this.passwordl);
      this.authService.login(this.emaill, this.passwordl)
      
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
    }
  }

  
  register() {
    
    if (this.nombrer && this.apellidor && this.emailr && this.passwordr) {
      //regitsotr
      this.authService.registro(this.emailr, this.passwordr,this.nombrer, this.apellidor);
    } else {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña.';
    }
  }
  recuperar(){
    if(this.emailr){
      console.log(this.emailr)
    }

  }






  ForgotPassClick() {
    this.state = LoginCompState.FORGOT_PASSWORD;
  }
  CreateAccountClick() {
    this.state = LoginCompState.REGISTER;
  }
  LoginClick() {
    this.state = LoginCompState.LOGIN;
  }

  isLoginState() {
    return this.state == LoginCompState.LOGIN;
  }
  isRegisterState() {
    return this.state == LoginCompState.REGISTER;
  }
  isForgotPasswordState() {
    return this.state == LoginCompState.FORGOT_PASSWORD;
  }
}
export enum LoginCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD

}
