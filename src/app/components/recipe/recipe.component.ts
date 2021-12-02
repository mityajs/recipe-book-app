import { Component, OnInit } from '@angular/core'
import { Recipe } from 'src/app/interfaces/recipe'
import { RecipeDataService } from 'src/app/shared/services/recipe-data.service'

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: Recipe = { recipe_id: 0, title: '', description: '', steps: '' }
  steps: string[] = []

  constructor(private rds: RecipeDataService) {}

  ngOnInit() {
    this.recipe = this.rds.getRecipe()
    this.steps = this.recipe.steps.split('&')
  }
}
