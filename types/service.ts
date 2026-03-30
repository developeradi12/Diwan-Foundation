export interface IService {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ServiceFormData = Omit<IService, "_id" | "slug" | "createdAt" | "updatedAt">;

export const CATEGORY_OPTIONS = [
  "Healthcare",
  "Education",
  "Livelihoods",
  "Women Empowerment",
  "Disaseter Response",
  "Empowering Grassroots",
  "Child Education",
  "Blood Donation"
];