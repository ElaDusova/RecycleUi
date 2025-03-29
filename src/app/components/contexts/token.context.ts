import { HttpContextToken } from '@angular/common/http';
import { InjectionToken, signal, WritableSignal } from '@angular/core';

/**
 * Injection token for managing authentication state.
 *
 * This token provides a writable signal to store and update the authentication token.
 */
// Define a context key for the token
export const AUTH_TOKEN = new InjectionToken<WritableSignal<string | null>>('AUTH_TOKEN', {providedIn: 'root', factory: () => signal(null)});
