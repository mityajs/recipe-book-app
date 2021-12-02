import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/interfaces/user'
import { AuthorisationService } from 'src/app/shared/services/authorisation.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User = this.authService.getUser()
  constructor(
    public authService: AuthorisationService,
    private router: Router
  ) {}

  isAuth() {
    this.user = this.authService.getUser()
    return this.authService.isAuth()
  }
  logout() {
    this.authService.logout()
  }

  ngOnInit() {
    if (!this.authService.isAuth()) this.router.navigate(['/categories'])
  }
}
