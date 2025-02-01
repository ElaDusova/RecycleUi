import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/login')) {
    return next(req);
  }

  const token = localStorage.getItem("accessToken");

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/Auth/Refresh')) {
        return authService.refreshToken().pipe(
          switchMap((newAccessToken) => {
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(clonedRequest);
          })
        );
      }

      return throwError(() => error);
    })
  )
}
