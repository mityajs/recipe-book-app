import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

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
    MatFormFieldModule,
    ReactiveFormsModule,
    //create module
    RouterModule.forRoot([
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'all-recipes', component: AllRecipesComponent },
      { path: 'recipe', component: RecipeComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
