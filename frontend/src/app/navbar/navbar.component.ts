import { CommonModule } from '@angular/common';
import { Component ,Output, EventEmitter, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  imgLink = "../../assets/download.jpg"
  lastWeek: boolean = false;
  @Output() event = new EventEmitter<boolean>();
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);
  route = inject(Router);
  logStatus = localStorage.getItem("loggedIn");
  ngOnInit(): void {
    this.logStatus = localStorage.getItem("loggedIn");
  }
  onLogOut(){
    localStorage.setItem("loggedIn","false");
    this.toastr.info("You are logged out");
    this.cdr.detectChanges();
  }
}
