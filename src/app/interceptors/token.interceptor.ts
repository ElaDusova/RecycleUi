import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN } from '../components/contexts/token.context';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login')) {
    return next(req);
  }

  const token = inject(AUTH_TOKEN);

  // edit request
  console.log(token());
  req = req.clone({
    // bring token from sessionStorage and add as header
    setHeaders: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return next(req);
};
