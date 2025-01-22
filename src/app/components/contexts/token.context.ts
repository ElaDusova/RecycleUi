import { HttpContextToken } from '@angular/common/http';
import { InjectionToken, signal, WritableSignal } from '@angular/core';
import { single } from 'rxjs';

// Define a context key for the token
export const AUTH_TOKEN = new InjectionToken<WritableSignal<string | null>>('AUTH_TOKEN', {providedIn: 'root', factory: () => signal(null)});
