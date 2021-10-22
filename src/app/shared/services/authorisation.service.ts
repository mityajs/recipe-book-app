import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthorisationService {
  private authorized: boolean = true

  getAuth(): boolean {
    return this.authorized
  }
  setAuth(auth: boolean): void {
    this.authorized = auth
  }
  constructor() {}
}
