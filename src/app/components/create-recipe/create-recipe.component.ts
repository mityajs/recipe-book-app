import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/shared/services/api.service'
import { Category } from 'src/app/interfaces/category'
import { Ingredient } from 'src/app/interfaces/ingredient'
import { Recipe } from 'src/app/interfaces/recipe'
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms'
import { RecipeComponent } from '../recipe/recipe.component'

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.apiService.getRequest('/categories').then((data: Category[]) => {
      this.listOfCategories = data
    })
    this.apiService.getRequest('/ingredients').then((data: Ingredient[]) => {
      this.listOfIngredients = data
    })
    if (!!this.recipe_id) {
      let rec_id = { recipe_id: this.recipe_id }
      this.apiService
        .postRequest('/get_recipe', rec_id)
        .then((data: Recipe) => {
          this.recipe_test = data
          this.deleteStep(0) //delete first empty control
          //add controls with proper steps data
          this.recipe_test.steps.split('&').forEach((item) => {
            this.addStep(item)
          })
          //title and description set values
          this.form.controls.title.setValue(this.recipe_test.title)
          this.form.controls.description.setValue(this.recipe_test.description)
        })
      this.apiService
        .postRequest('/get_recipe_categories', rec_id)
        .then((data: Category[]) => {
          this.recipe_categories_test = data
          this.form.controls.categories.setValue(data.map((item) => item.name))
        })
      this.apiService
        .postRequest('/get_recipe_ingredients', rec_id)
        .then((data: Ingredient[]) => {
          this.recipe_ingredients_test = data
          this.deleteIngredient(0)
          this.recipe_ingredients_test.forEach((item) => {
            this.addIngredient(item.name, item.amount, item.rec_ingr_id)
          })
        })
    }
  }

  //random id from db, for test TODO:make @input
  //if ==0, form will work as create
  recipe_id: Number = 2

  recipe_test: Recipe = {
    recipe_id: 0,
    title: '',
    description: '',
    steps: '',
  }
  recipe_categories_test: Category[] = []
  recipe_ingredients_test: Ingredient[] = []

  listOfIngredients: Ingredient[] = []
  listOfCategories: Category[] = []

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    steps: this.fb.array([this.fb.control('', Validators.required)]),
    ingredients: this.fb.array([
      this.fb.group({
        ingredient: ['', Validators.required],
        amount: ['', Validators.required],
        id: [''],
      }),
    ]),
    categories: ['', Validators.required],
  })

  get steps() {
    return this.form.get('steps') as FormArray
  }
  addStep(step?: string) {
    this.steps.push(this.fb.control(step || '', Validators.required))
  }
  deleteStep(index: number) {
    this.steps.removeAt(index)
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray
  }
  getIngr(index: number) {
    return this.ingredients.controls[index] as FormGroup
  }
  addIngredient(ingr?: string, amount?: string, rec_ingr_id?: number) {
    this.ingredients.push(
      this.fb.group({
        ingredient: [ingr || '', Validators.required],
        amount: [amount || '', Validators.required],
        rec_ingr_id: [rec_ingr_id || ''],
      })
    )
  }
  deleteIngredient(index: number) {
    this.ingredients.removeAt(index)
  }

  create() {
    let data = this.form.value

    data.steps = data.steps.join('&')

    let recipe_data = {
      title: data.title,
      description: data.description,
      steps: data.steps,
    }
    this.apiService.postRequest('/newrecipe', recipe_data).then((recipe) => {
      const recipe_id = recipe.recipe_id
      data.categories.forEach((category: string) => {
        let rec_cat = {
          recipe_id,
          category_id:
            this.listOfCategories[
              this.listOfCategories.findIndex((item) => item.name == category)
            ].category_id,
        }
        this.apiService.postRequest('/recipe-categories', rec_cat)
      })
      data.ingredients.forEach((ingredient: Ingredient) => {
        let rec_ingr = {
          recipe_id,
          ingredient_id:
            this.listOfIngredients[
              this.listOfIngredients.findIndex(
                (item) => item.name == ingredient.name
              )
            ].ingredient_id,
          amount: ingredient.amount,
        }
        this.apiService.postRequest('/recipe-ingredients', rec_ingr)
      })
    })
  }

  update() {
    let data = this.form.value

    //recipe(title,description,steps)
    data.steps = data.steps.join('&')
    let recipe_data = {
      title: data.title,
      description: data.description,
      steps: data.steps,
    }
    this.apiService.postRequest('/put_recipe', recipe_data)

    //categories
    let oldcats = this.recipe_categories_test.map((category) => category.name)
    let newcats: string[] = data.categories
    oldcats.forEach((categoryName) => {
      if (!newcats.includes(categoryName)) {
        let rec_cat = {
          recipe_id: this.recipe_id,
          category_id:
            this.listOfCategories[
              this.listOfCategories.findIndex(
                (item) => item.name == categoryName
              )
            ].category_id,
        }
        this.apiService.deleteRequest('/recipe-categories', rec_cat)
      }
    })
    newcats.forEach((categoryName) => {
      if (!oldcats.includes(categoryName)) {
        let rec_cat = {
          recipe_id: this.recipe_id,
          category_id:
            this.listOfCategories[
              this.listOfCategories.findIndex(
                (item) => item.name == categoryName
              )
            ].category_id,
        }
        this.apiService.postRequest('/recipe-categories', rec_cat)
      }
    })

    //ingredients
    let oldingr = this.recipe_ingredients_test
    let newingr: Ingredient[] = data.ingredients
    //added ingredients
    newingr.forEach((ingredient) => {
      if (!ingredient.rec_ingr_id) {
        let rec_ingr = {
          recipe_id: this.recipe_id,
          ingredient_id:
            this.listOfIngredients[
              this.listOfIngredients.findIndex(
                (item) => item.rec_ingr_id == ingredient.rec_ingr_id
              )
            ].ingredient_id,
          amount: ingredient.amount,
        }
        this.apiService.postRequest('/recipe-ingredients', rec_ingr)
      }
      //deleted ingredients
      else if (
        !oldingr
          .map((item) => item.rec_ingr_id)
          .includes(ingredient.rec_ingr_id)
      ) {
        let rec_ingr = {
          rec_ingr_id: ingredient.rec_ingr_id,
        }
        this.apiService.deleteRequest('/recipe-ingredients', rec_ingr)
      }
      //update
      else {
        let rec_ingr = {
          rec_ingr_id: ingredient.rec_ingr_id,
          recipe_id: this.recipe_id,
          ingredient_id:
            this.listOfIngredients[
              this.listOfIngredients.findIndex(
                (item) => item.rec_ingr_id == ingredient.rec_ingr_id
              )
            ].ingredient_id,
          amount: ingredient.amount,
        }
        this.apiService.putRequest('/recipe-ingredients', rec_ingr)
      }
    })
  }

  logg() {
    console.log(this.form.value)
    console.log(this.listOfCategories)
  }
}
