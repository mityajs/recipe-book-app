import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-recipe-short',
  templateUrl: './recipe-short.component.html',
  styleUrls: ['./recipe-short.component.scss'],
})
export class RecipeShortComponent {
  @Input() moreInfo: boolean = true
  @Input() liked: boolean = false

  likeToggle(): void {
    this.liked = !this.liked
  }
}
