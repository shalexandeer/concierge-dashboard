/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WasteCategory {
  id: string;
  name: string;
  order: number;
  status: 'active' | 'inactive';
}

// Waste
export interface Waste {
  id: string;
  categoryId: string;
  waste_category: string;
  name: string;
  slug: string;
  isAccepted: boolean;
  status: 'active' | 'pending' | 'rejected';
  description: string;
}

// Partner (TPS)
export interface Partner {
  id: string;
  slug: string;
  display_name: string;
  location: string;
  type: 'tps' | 'school' | 'company' | 'community';
  capacity: string;
  description: string;
}

// Waste Partner (Relationship between waste and partner/TPS)
export interface WastePartner {
  id: string;
  waste_id: string;
  partner_id: string;
  price: number;
   
  additional_attribute: Record<string, any>; // Changed to proper JSON object
}

export interface WasteResponse {
  waste: Waste;
}

export interface WastePartnerResponse {
  wastePartner: WastePartner;
  wasteName: string;
  wasteCategory: string;
  wasteDescription: string;
  partnerName: string; // Added for clarity
}

export interface WasteCategoryResponse {
  categories: WasteCategory[];
}

export interface WasteListResponse {
  wastes: Waste[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface WastePartnerListResponse {
  wastePartners: WastePartner[];
  wastesDetails: {
    id: string;
    name: string;
    slug: string;
    isAccepted: boolean;
    status: string;
    description: string;
    categoryName: string; // Added category name directly
  }[];
  totalCount: number;
  page: number;
  limit: number;
}

// Waste Request Interfaces
export interface CreateWasteRequest {
  name: string;
  categoryId: string;
  description: string;
  slug?: string; // Optional, can be auto-generated
}

export interface CreateWastePartnerRequest {
  waste_id: string;
  partner_id: string;
  price: number;
  additional_attribute: Record<string, any>;
}

export interface UpdateWastePartnerRequest {
  price?: number;
  additional_attribute?: Record<string, any>;
}

export interface WasteFilterOptions {
  search?: string;
  category?: number | 'all';
  status?: 'active' | 'pending' | 'rejected' | 'all';
}

export interface WastePartnerFilterOptions {
  search?: string;
  partner_id?: number | 'all';
  category?: number | 'all';
}