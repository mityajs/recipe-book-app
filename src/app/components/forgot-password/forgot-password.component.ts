import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  step: number = 1
  email = new FormControl('', [Validators.required, Validators.email])
  code = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])

  nextStep() {
    this.step += 1
  }
  prevStep() {
    this.step -= 1
  }

  validateEmail() {
    if (this.email.hasError('required')) {
      return 'Please, enter a value'
    }

    return this.email.hasError('email') ? 'Not a valid email' : ''
  }

  validateCode() {
    return this.code.hasError('required') ? 'Please, enter code' : ''
  }

  validatePassword() {
    return this.password.hasError('required') ? 'Please, enter passwords' : ''
  }
}
