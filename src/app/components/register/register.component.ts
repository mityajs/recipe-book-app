import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])
  repeatedPassword = new FormControl('', [Validators.required])

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
