export interface SaleDetailDTO {
  productId: number;
  quantity: number;
}

export interface SaleDTO {
  saleDetails: SaleDetailDTO[];
  customerId: number;
  paymentType: string;
  stripePaymentReference: string;
}
