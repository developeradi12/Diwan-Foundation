// types/donation.ts

export interface DonorUser {
  _id: string;
  Name: string;
  email: string;
  phone: string;
}

export interface DonationDTO {
  _id: string;
  user: DonorUser | null;
  amount: number;
  screenshot?: string;
  paidAt: Date | null;
  createdAt: Date;
}

export interface DonationStats {
  totalRaised: number;
}