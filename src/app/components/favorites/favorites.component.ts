import { Component } from '@angular/core'
import { Recipe } from 'src/app/interfaces/recipe'
import { ApiService } from 'src/app/shared/services/api.service'
import { AuthorisationService } from 'src/app/shared/services/authorisation.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  recipes: Recipe[] = []
  noFavorites: boolean = false
  nothingFound: boolean = false

  constructor(
    private apiService: ApiService,
    private authService: AuthorisationService
  ) {}

  ngOnInit() {
    let user = { userId: this.authService.getUser().user_id }
    this.apiService
      .postRequest('/favourite-recipes', user)
      .then((data: Recipe[]) => {
        this.recipes = data
        this.nothingFound = this.recipes.length == 0
      })
  }
}
