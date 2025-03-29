import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * HTTP interceptor that automatically attaches the authentication token to requests.
 * Refreshes the token if expired and retries the request.
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Directly access localStorage for the token
  const token = localStorage.getItem("accessToken");

  // Don't add token for login request
  if (req.url.includes('/login')) {
    return next(req);
  }

  // Clone request and add Authorization header
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req).pipe(
    catchError((error) => {
      // If token is expired, refresh the token
      if (error.status === 401 && !req.url.includes('/Auth/Refresh')) {
        console.log('Token expired, attempting to refresh...'); // Debugging log

        // Use HttpClient directly to avoid circular dependency
        const httpClient = inject(HttpClient);
        return httpClient.post<{ token: string }>('/api/v1/Auth/Refresh', {}).pipe(
          tap((response) => {
            const newAccessToken = response.token;
            localStorage.setItem('accessToken', newAccessToken);  // Update token in localStorage
          }),
          switchMap((response) => {
            // Retry the failed request with the new token
            const newAccessToken = response.token;
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              }
            });
            return next(clonedRequest);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
