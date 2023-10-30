export interface UserDTO {
  userId: string;
  username: string;
  fullname: string;
  mobileNumber: string;
  isAdminUser?: boolean;
  isDeleted?: boolean;
}
