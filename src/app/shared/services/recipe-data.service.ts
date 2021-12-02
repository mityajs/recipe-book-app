import { Injectable } from '@angular/core'
import { Recipe } from 'src/app/interfaces/recipe'

@Injectable({
  providedIn: 'root',
})
export class RecipeDataService {
  private recipe: Recipe = {
    recipe_id: 0,
    title: '',
    description: '',
    steps: '',
    //categories
    //ingredients
  }

  getRecipe(): Recipe {
    return this.recipe
  }
  setRecipe(recipe: Recipe) {
    this.recipe = recipe
  }
}
