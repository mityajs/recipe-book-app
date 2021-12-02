import { Component, Input, OnInit } from '@angular/core'
import { ApiService } from '../../shared/services/api.service'
import { Recipe } from 'src/app/interfaces/recipe'
import { AuthorisationService } from 'src/app/shared/services/authorisation.service'

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss'],
})
export class AllRecipesComponent implements OnInit {
  recipes: Recipe[] = []
  searchValue: string = ''
  nothingFound: boolean = false
  @Input() category: string = ''

  constructor(
    private apiService: ApiService,
    private authService: AuthorisationService
  ) {}

  ngOnInit() {
    let url = ''
    let post = {}
    if (this.category) {
      url = '/all-recipes-of-category'
      post = {
        userId: this.authService.getUser().user_id,
        category: this.category,
      }
    } else {
      url = '/all-recipes'
      post = { userId: this.authService.getUser().user_id }
    }
    this.apiService.postRequest(url, post).then((data: Recipe[]) => {
      data.map((item) => {
        item.liked === null ? (item.liked = false) : (item.liked = true)
      })
      this.recipes = data
    })
  }

  searchInputHandler(searchValue: string) {
    this.searchValue = searchValue
  }

  searchRecipes() {
    let postvalue = {
      search: this.searchValue,
      userId: this.authService.getUser().user_id,
    }
    this.apiService
      .postRequest('/recipes-search', postvalue)
      .then((data: Recipe[]) => {
        this.recipes = data
        this.nothingFound = this.recipes.length == 0
      })
  }
}
