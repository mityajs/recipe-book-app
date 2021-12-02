import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/shared/services/api.service'
import { Category } from 'src/app/interfaces/category'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getCategories()
  }

  listOfCategories: Category[] = []
  create = new FormControl('', [Validators.required])
  delete = new FormControl('', [Validators.required])
  update = new FormControl('', [Validators.required])
  update_value = new FormControl('', [Validators.required])
  upd: boolean = false

  getCategories() {
    this.api.getRequest('/categories').then((data: Category[]) => {
      this.listOfCategories = data
    })
  }

  createCategory() {
    let category = { name: this.create.value }
    this.api.postRequest('/newcategory', category).then(() => {
      this.getCategories()
    })
  }
  deleteCategory() {
    let category = { category_id: this.delete.value.category_id }
    this.api.deleteRequest('/category', category).then(() => {
      this.getCategories()
    })
  }
  updateCheck() {
    if (this.update.valid) {
      this.update_value.setValue(this.update.value.name)
      this.upd = true
    }
  }
  updateCategory() {
    if (this.update_value.valid) {
      let category = {
        category_id: this.update.value.category_id,
        name: this.update_value.value,
      }
      this.api.putRequest('/category', category).then(() => {
        this.getCategories()
        this.upd = false
      })
    }
  }
  updateCancel() {
    this.upd = false
  }
}
