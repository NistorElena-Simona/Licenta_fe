export interface User {
    id: string;
    email: string;
    name: string;
    roles: ("ADMIN" | "EMPLOYEE")[];
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
  }
  
  export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
  }