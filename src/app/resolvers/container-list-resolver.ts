import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContainerService } from '../services/container.service';
import { ContainerView } from '../models/container/container-view.interface';
@Injectable({
  providedIn: 'root'
})
export class ContainerListResolver implements Resolve<ContainerView[] | undefined> {
  constructor(private containerService: ContainerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContainerView[] | undefined> {
    return this.containerService.getContainers().pipe(
      catchError((err) => {
        console.log(err);
        this.router.navigate(['']);
        return of(undefined);
      })
    );
  }
}
