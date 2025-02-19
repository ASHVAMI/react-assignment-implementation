export interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface AuthState {
  user: null | {
    uid: string;
    email: string;
    displayName: string;
  };
  loading: boolean;
  error: string | null;
}