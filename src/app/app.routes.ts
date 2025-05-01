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
import { ProductCreateResolver } from './resolvers/product-create-resolver';
import { ArticleDetailResolver } from './resolvers/article-detail-resolver';
import { ArticleListResolver } from './resolvers/article-list-resolver';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ContainerDetailPageComponent } from './pages/container.detail-page/container.detail-page.component';
import { ContainerListResolver} from './resolvers/container-list-resolver';
import { ContainerDetailResolver} from './resolvers/container-detail-resolver';
import { LogoutPageComponent } from './pages/user-pages/logout-page/logout-page.component';
import { UserAccountPageComponent } from './pages/user-pages/user-account-page/user-account-page.component';
import { AddArticlesPageComponent } from './pages/admin-accesed-pages/add-articles-page/add-articles-page.component';
import { ValidationProductsPageComponent } from './pages/admin-accesed-pages/validation-products-page/validation-products-page.component';
import { UtilitiesAddPageComponent } from './pages/admin-accesed-pages/utilities-add-page/utilities-add-page.component';
import { ValidationPageComponent } from './pages/validation-page/validation-page.component';
import { MaterialCreateComponent } from './components/material/material-create/material-create.component';
import { ContainerCreateComponent } from './components/container/container-create/container-create.component';
import { ResetPasswordPageComponent } from './pages/reset-passowrd-page/reset-passowrd-page.component';
import { ForgotPasswordPageComponent } from './pages/forgotten-password-page/forgotten-password-page.component';
import { PartCreateComponent } from './components/part/part-create/part-create.component';
import { ContainerDeleteComponent } from './components/container/container-delete/container-delete.component';
import { DeleteItemsPageComponent } from './pages/delete-items-page/delete-items-page.component';
import { MaterialDeleteComponent } from './components/material/material-delete/material-delete.component';
import { PartDeleteComponent } from './components/part/part-delete/part-delete.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ArticleDeleteComponent } from './components/article/article-delete/article-delete.component';

/**
 * Main application routes.
 * - Defines child routes under `DefaultComponent`.
 * - Routes include page titles and resolvers where needed.
 */
export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // Default Pages
      { path: 'home', component: HomePageComponent, title: 'Home', resolve: { articles: ArticleListResolver } },
      { path: 'register', component: RegisterPageComponent, title: 'Registration' },
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      { path: 'logout', component: LogoutPageComponent, title: 'Logout' },
      { path: 'aboutUs', component: AboutUsPageComponent, title: 'About Us', },
      { path: 'useraccount', component: UserAccountPageComponent, title: 'User Account', },
      { path: 'product-search', component: ProductSearchPageComponent, title: 'Product Search', },
      { path: 'container', component: ContainerListPageComponent, title: 'Containers', resolve: { containers: ContainerListResolver } },

      // Product Validation Page
      { path: 'validationProducts', component: ValidationProductsPageComponent, title: 'Validation of Products' },

      // Emil Validation Page
      { path: 'confirm', component: ValidationPageComponent, title: 'Email Validation'},

      // Detail Items Pages
      { path: 'product/detail/:productId',component: ProductDetailPageComponent,title: 'Product Detail',resolve: { product: ProductDetailResolver },},
      { path: 'article/detail/:articleId',component: ArticleDetailPageComponent,title: 'Article Detail',resolve: { article: ArticleDetailResolver },},
      { path: 'container/detail/:containerId',component: ContainerDetailPageComponent,title: 'Container Detail',resolve: { container: ContainerDetailResolver },},

      // Create Items Pges
      { path: 'utilitiesCreate', component: UtilitiesAddPageComponent, title: 'Create Items' },
      { path: 'articleadd', component: AddArticlesPageComponent, title: 'Add Articles' },
      { path: 'product/create', component: ProductAddPageComponent, title: 'Product Add',resolve: { product: ProductCreateResolver }, },
      { path: 'create-container', component: ContainerCreateComponent },
      { path: 'create-material', component: MaterialCreateComponent },
      { path: 'create-part', component: PartCreateComponent },

      //Password Reset Pages
      { path: 'forgottenpassword', component: ForgotPasswordPageComponent },
      { path: 'reset-password', component: ResetPasswordPageComponent },

      // Items Delete Pages
      { path: 'itemsDelete', component: DeleteItemsPageComponent, title: 'Delete Items' },
      { path: 'delete-part', component: PartDeleteComponent},
      { path: 'delete-product', component: ProductDeleteComponent},
      { path: 'delete-container', component: ContainerDeleteComponent},
      { path: 'delete-material', component: MaterialDeleteComponent},
      { path: 'delete-article', component: ArticleDeleteComponent},


            ],
 },
 { path: '**',component: NotFoundPageComponent,title: 'Not Found ',},

];
