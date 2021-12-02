import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../shared/services/api.service'
import { Category } from 'src/app/interfaces/category'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: string[] = []
  category: string = ''

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRequest('/categories').then((data: Category[]) => {
      this.categories = data.map((item) => item.name)
    })
  }
}
