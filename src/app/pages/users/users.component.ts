import { Component } from '@angular/core';
import { UsersService } from '../../services/http/users.service';
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: UsuarioInterface[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}
