import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userData: any;
  constructor(private authService: AuthService){
    this.authService.userData$.subscribe((data) => {
      this.userData = data;
      console.log('Datos recibidos en el componente:', this.userData);
    });

  }
  cerrarsesion(){
    this.authService.cerrarSesion()
  }
}
