import { Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page.component';
import { ProductDetailPage } from './pages/product-detail-page/product-detail-page.component';
import { productDetailResolver } from './resolvers/product-detail.resolver';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', component: HomePageComponent, title: 'Home', canActivate: [AuthGuard] },
      { path: 'register', component: RegisterPageComponent, title: 'Registrace' },
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      {
        path: 'not-found',
        component: NotFoundPageComponent,
        title: 'Not Found ',
      },
      {
        path: 'post/detail/:postId',
        component: ProductDetailPage,
        title: 'Post Detail',
        resolve: { product: productDetailResolver },
      },
    ],
  },
  { path: '**', redirectTo: '/not-found' },
];
