import { Component } from '@angular/core'
import { AuthorisationService } from 'src/app/shared/services/authorisation.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthorisationService) {}

  isAuth() {
    return this.authService.getAuth()
  }
  logout() {
    this.authService.setAuth(false)
  }
}
