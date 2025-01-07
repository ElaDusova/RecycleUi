import { Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page/not-found-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page/product-detail-page.component';
import { productDetailResolver } from './resolvers/product-detail-resolver';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContainerPageComponent } from './pages/container-page/container-page.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'home', component: HomePageComponent, title: 'Home', },
      { path: 'register', component: RegisterPageComponent, title: 'Registration' },
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      {path: 'not-found',component: NotFoundPageComponent,title: 'Not Found ',},
      { path: 'container', component: ContainerPageComponent, title: 'Containers', },
      { path: 'product-search', component: ProductSearchComponent, title: 'Product Search', },
      {path: 'product/detail/:productId',component: ProductDetailPageComponent,title: 'Product Detail',resolve: { product: productDetailResolver },},
      {path: 'forgot-password',component: ForgotPasswordPageComponent,title: 'Forgot Password',},
    ],
  },
  { path: '**', redirectTo: '/not-found' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no route is matched
];
@NgModule({
})
export class AppRoutingModule { }
