import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MatDialogModule } from '@angular/material/dialog'

import { CapitalizePipe } from './shared/pipes/capitalize.pipe'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { RecipeComponent } from './components/recipe/recipe.component'
import { CategoriesComponent } from './components/categories/categories.component'
import { RecipeShortComponent } from './components/recipe-short/recipe-short.component'
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component'
import { FavoritesComponent } from './components/favorites/favorites.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component'
import { CreateCategoryComponent } from './components/create-category/create-category.component'
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    RecipeComponent,
    RecipeShortComponent,
    AllRecipesComponent,
    FavoritesComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    CreateRecipeComponent,
    CapitalizePipe,
    CreateCategoryComponent,
    CreateIngredientComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    //TODO:create module
    RouterModule.forRoot([
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'all-recipes', component: AllRecipesComponent },
      { path: 'recipe', component: RecipeComponent },
      { path: 'create-recipe', component: CreateRecipeComponent },
      { path: 'create-category', component: CreateCategoryComponent },
      { path: 'create-ingredient', component: CreateIngredientComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
