import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { Auth } from '../services/auth.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent,RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  standalone: true
})
export class AppComponent{
  title: string = "app";
}
