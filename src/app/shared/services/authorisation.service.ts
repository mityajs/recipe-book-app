import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { User } from 'src/app/interfaces/user'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthorisationService {
  private user: User | null = null
  private guest: User = {
    user_id: 0,
    user_name: 'guest',
    email: 'email',
    password: 'password',
    role_id: 0,
  }

  constructor(private api: ApiService, private router: Router) {}

  isAuth(): boolean {
    return this.user !== null
  }
  getUser(): User {
    return this.user || this.guest
  }
  setUser(id: number) {
    this.api.getRequest(`/user/${id}`).then((data: User[]) => {
      if (data.length != 0) {
        this.user = data[0]
      }
    })
  }
  auth(email: string, password: string) {
    let credentials = { email, password }
    this.api.postRequest('/auth', credentials).then((data: User[]) => {
      if (data.length != 0) {
        this.user = data[0]
        localStorage.setItem('user-id', this.user.user_id.toString())
        this.router.navigate(['categories'])
      }
    })
  }
  logout() {
    localStorage.clear()
    this.user = null
    this.router.navigate(['categories'])
  }
}
