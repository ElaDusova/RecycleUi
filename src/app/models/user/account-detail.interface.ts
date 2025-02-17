export interface LoggedUser {
  id: string;
  name: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
