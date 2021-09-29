import { IAddress } from "./address";

export interface IUser {
  id?: number;
  email: string;
  displayName?: string;
  token?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  phoneNumber?: string;
  pictureUrl?: string;
  userRoles?: string[];
  selectedRole?: number;
  address?: IAddress;
  userDescription?: string;
  isOnboarded?: boolean;
}

// export interface IRole {
//   isRoleSelected?: boolean;
//   userRole?: string;
// }