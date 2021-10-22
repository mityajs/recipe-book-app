import { Component } from '@angular/core'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  recipes: object[] = [
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
  ]
}
