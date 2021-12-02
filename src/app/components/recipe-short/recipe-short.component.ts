import { Component, Input, OnInit } from '@angular/core'
import { Recipe } from 'src/app/interfaces/recipe'
import { ApiService } from 'src/app/shared/services/api.service'
import { AuthorisationService } from 'src/app/shared/services/authorisation.service'
import { RecipeDataService } from 'src/app/shared/services/recipe-data.service'
import { RecipeComponent } from '../recipe/recipe.component'

@Component({
  selector: 'app-recipe-short',
  templateUrl: './recipe-short.component.html',
  styleUrls: ['./recipe-short.component.scss'],
})
export class RecipeShortComponent implements OnInit {
  @Input() moreInfo: boolean = true
  @Input() liked: boolean = false
  @Input() recipe: Recipe = {
    recipe_id: 0,
    title: '',
    description: '',
    steps: '',
    liked: false,
  }

  constructor(
    private rds: RecipeDataService,
    private authService: AuthorisationService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (this.recipe.liked) this.liked = true
  }

  isAuth() {
    return this.authService.isAuth()
  }

  openRecipe() {
    this.rds.setRecipe(this.recipe)
  }

  likeToggle(): void {
    this.liked = !this.liked
  }
  addToFavorites() {
    let kek = {
      userId: this.authService.getUser().user_id,
      recipeId: this.recipe.recipe_id,
    }
    this.apiService.postRequest('/favourites', kek)
  }
  deleteFromFavorites() {
    let kek = {
      userId: this.authService.getUser().user_id,
      recipeId: this.recipe.recipe_id,
    }
    console.log(this.recipe.recipe_id)

    this.apiService.deleteRequest('/favourites', kek)
  }
}
