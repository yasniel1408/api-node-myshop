export interface CreateShoppingDto {
  paymentType: string;
  createdAt?: Date;
  productId: number;
  userId: number;
}
