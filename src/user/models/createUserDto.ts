export interface CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  rol?: number;
}
