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
import { ArticleDetailResolver } from './resolvers/article-detail-resolver';
import { ArticleListResolver } from './resolvers/article-list-resolver';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ForgottenPasswordPageComponent } from './pages/forgotten-password-page/forgotten-password-page.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'home', component: HomePageComponent, title: 'Home', resolve: { articles: ArticleListResolver } }, // Use resolver here
      { path: 'register', component: RegisterPageComponent, title: 'Registration' },
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      { path: 'forgottenpassword', component: ForgottenPasswordPageComponent, title: 'Forgotten Password' },
      { path: 'container', component: ContainerPageComponent, title: 'Containers', },
      { path: 'aboutUs', component: AboutUsPageComponent, title: 'About Us', },
      { path: 'product-search', component: ProductSearchComponent, title: 'Product Search', },
      { path: 'product/detail/:productId',component: ProductDetailPageComponent,title: 'Product Detail',resolve: { product: productDetailResolver },},
      { path: 'article/detail/:articleId',component: ArticleDetailPageComponent,title: 'Article Detail',resolve: { article: ArticleDetailResolver },},

            ],
 },
 { path: '**',component: NotFoundPageComponent,title: 'Not Found ',},

];
