import { Component } from '@angular/core'

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss'],
})
export class AllRecipesComponent {
  recipes: object[] = [
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
    { title: 'title', description: 'desc', steps: 'steps' },
  ]
}
