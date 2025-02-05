import { Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page/not-found-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page/product-detail-page.component';
import { ProductDetailResolver } from './resolvers/product-detail-resolver';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ContainerListPageComponent } from './pages/container-list-page/container-list-page/container-list-page.component';
import { ProductSearchPageComponent } from './pages/product-search/product-search.component';
import { ProductAddPageComponent } from './pages/product-add-page/product-add-page.component';
import { ArticleDetailResolver } from './resolvers/article-detail-resolver';
import { ArticleListResolver } from './resolvers/article-list-resolver';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ForgottenPasswordPageComponent } from './pages/forgotten-password-page/forgotten-password-page.component';
import { ContainerDetailPageComponent } from './pages/container.detail-page/container.detail-page.component';
import {ContainerListResolver} from './resolvers/container-list-resolver';
import {ContainerDetailResolver} from './resolvers/container-detail-resolver';
import { LogoutPageComponent } from './pages/user-pages/logout-page/logout-page.component';
import { UserAccountPageComponent } from './pages/user-pages/user-account-page/user-account-page.component';
import { AddArticlesPageComponent } from './pages/admin-accesed-pages/add-articles-page/add-articles-page.component';
import { ValidationProductsPageComponent } from './pages/admin-accesed-pages/validation-products-page/validation-products-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'home', component: HomePageComponent, title: 'Home', resolve: { articles: ArticleListResolver } }, // Use resolver here
      { path: 'register', component: RegisterPageComponent, title: 'Registration' },
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      { path: 'logout', component: LogoutPageComponent, title: 'Logout' },
      { path: 'forgottenpassword', component: ForgottenPasswordPageComponent, title: 'Forgotten Password' },
      { path: 'container', component: ContainerListPageComponent, title: 'Containers', resolve: { containers: ContainerListResolver } },
      { path: 'aboutUs', component: AboutUsPageComponent, title: 'About Us', },
      { path: 'useraccount', component: UserAccountPageComponent, title: 'User Account', },
      { path: 'product-search', component: ProductSearchPageComponent, title: 'Product Search', },
      { path: 'product-add', component: ProductAddPageComponent, title: 'Product Add', },
      { path: 'product/detail/:productId',component: ProductDetailPageComponent,title: 'Product Detail',resolve: { product: ProductDetailResolver },},
      { path: 'article/detail/:articleId',component: ArticleDetailPageComponent,title: 'Article Detail',resolve: { article: ArticleDetailResolver },},
      { path: 'container/detail/:containerId',component: ContainerDetailPageComponent,title: 'Container Detail',resolve: { container: ContainerDetailResolver },},
      { path: 'articleadd', component: AddArticlesPageComponent, title: 'Logout' },
      { path: 'validationProducts', component: ValidationProductsPageComponent, title: 'Validation of Products' },

 //     { path: 'changepassword', component: ChangePasswordPageComponent, title: 'Change Password' },
 //     { path: 'changeUsername', component: ForgottenPasswordPageComponent, title: 'Change Username' },
 //     { path: 'changeUserPicture', component: ForgottenPasswordPageComponent, title: 'Change User Picture' },
            ],
 },
 { path: '**',component: NotFoundPageComponent,title: 'Not Found ',},

];
