export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class JWTPayload {
  mobileNumber: string;
  id: number;
  type: UserType;
}

