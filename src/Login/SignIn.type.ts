import { APIResponse } from "../common/types/APIResponse.type";

export interface SignInApiResponse extends APIResponse<SignInResponseData> {
  //
}

export interface SignInResponseData {
  entity: Entity;
}

export interface Entity {
  user: User;
  token: Token;
}

export interface Token {
  accessToken: string;
}

export interface User {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userRoles: UserRole[];
}

export interface UserRole {
  id: string;
  role: string;
  userId: string;
  createdAt: Date;
}
