import { Component ,Output, EventEmitter, inject} from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imgLink = "../../assets/download.jpg"
  lastWeek: boolean = false;
  @Output() event = new EventEmitter<boolean>();
  onChange(isChecked: boolean) {
    this.lastWeek = isChecked;
    this.event.emit(this.lastWeek);
  }

}
