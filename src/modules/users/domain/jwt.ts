export interface JWTClaims {
  userId: string;
  mobileNumber: string;
  username: string;
  adminUser: boolean;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
