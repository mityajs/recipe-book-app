import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/shared/services/api.service'
import { FormControl, Validators } from '@angular/forms'
import { Ingredient } from 'src/app/interfaces/ingredient'

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.scss'],
})
export class CreateIngredientComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getIngredients()
  }

  listOfIngredients: Ingredient[] = []
  upd: boolean = false

  createIngr = new FormControl('', [Validators.required])
  createDesc = new FormControl('', [Validators.required])
  deleteIngr = new FormControl('', [Validators.required])
  updateIngr = new FormControl('', [Validators.required])
  updateIngrName = new FormControl('', [Validators.required])
  updateIngrDesc = new FormControl('', [Validators.required])

  getIngredients() {
    this.api.getRequest('/ingredients').then((data: Ingredient[]) => {
      this.listOfIngredients = data
    })
  }

  createIngredient() {
    if (this.createIngr.valid && this.createDesc.valid) {
      let ingredient = {
        name: this.createIngr.value,
        description: this.createDesc.value,
      }
      this.api.postRequest('/ingredient', ingredient).then(() => {
        this.getIngredients()
      })
    }
  }

  deleteIngredient() {
    let ingredient = { ingredient_id: this.deleteIngr.value.ingredient_id }
    this.api.deleteRequest('/ingredient', ingredient).then(() => {
      this.getIngredients()
    })
  }

  updateCheck() {
    if (this.updateIngr.valid) {
      this.updateIngrName.setValue(this.updateIngr.value.name)
      this.updateIngrDesc.setValue(this.updateIngr.value.description)
      this.upd = true
    }
  }
  updateIngredient() {
    if (this.updateIngrName.valid && this.updateIngrName.value) {
      let ingredient = {
        ingredient_id: this.updateIngr.value.ingredient_id,
        name: this.updateIngrName.value,
        description: this.updateIngrDesc.value,
      }
      this.api.putRequest('/ingredient', ingredient).then(() => {
        this.getIngredients()
      })
    }
  }
  updateCancel() {
    this.upd = false
  }
}
