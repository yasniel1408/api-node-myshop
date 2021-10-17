export interface PutUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  rol?: number;
}
