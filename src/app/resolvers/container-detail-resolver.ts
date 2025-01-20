import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContainerDetail } from '../models/container/container-detail.interface';
import { ContainerService } from '../services/container.service';

@Injectable({
  providedIn: 'root'
})
export class ContainerDetailResolver implements Resolve<ContainerDetail | undefined> {
  constructor(private containerService: ContainerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContainerDetail | undefined> {
    const containerId = route.paramMap.get('containerId');

    if (!containerId) {
      console.error('Container ID not found');
      return of(undefined);  // Return undefined if no article ID is provided
    }

    return this.containerService.getContainerById(containerId).pipe(
      catchError((err) => {
        console.error('Error fetching container:', err);  // Log error
        this.router.navigate(['/']);  // Redirect to homepage if error occurs
        return of(undefined);  // Return undefined if there is an error
      })
    );
  }
}
