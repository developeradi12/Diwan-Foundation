// types/donation.ts

export interface DonorUser {
  _id: string;
  Name: string;
  email: string;
  phone: string;
}

export type PaymentStatus = "pending" | "success" | "failed";

export interface DonationDTO {
  _id: string;
  user: DonorUser | null;
  amount: number;
  paymentStatus: PaymentStatus;
  cashfreeOrderId?: string;
  paidAt: Date | null;
  createdAt: Date;
}

export interface DonationStats {
  totalRaised: number;
  successCount: number;
  pendingCount: number;
  failedCount: number;
}