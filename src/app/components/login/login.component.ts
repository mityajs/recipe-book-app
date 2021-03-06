import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { AuthorisationService } from 'src/app/shared/services/authorisation.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  constructor(private authService: AuthorisationService) {}

  isAuth() {
    return this.authService.getAuth()
  }

  authorise() {
    this.authService.setAuth(true)
  }

  validateEmail() {
    if (this.email.hasError('required')) {
      return 'Please, enter a value'
    }

    return this.email.hasError('email') ? 'Not a valid email' : ''
  }

  validatePassword() {
    if (this.password.hasError('required')) {
      return 'Please, enter a value'
    } else return ''
  }
}
