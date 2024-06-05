import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/http/users.service';
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [ CommonModule, NgOptimizedImage ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UsuarioInterface | undefined;

  constructor(private location: Location, private userService: UsersService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }


  getUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (userData: UsuarioInterface) => { // Especifica el tipo de datos para 'userData'
        console.log(userData)
        this.user = userData;
      },
      error: (error: any) => { // Maneja el error de la suscripción
        console.error('Error fetching user info:', error);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
