export interface UserDTO {
  username: string;
  fullname: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isDeleted?: boolean;
}
