// Type definitions for transaction management module

// Transaction types
export type TransactionStatus = "pending" | "success" | "failed" | "canceled" | "expired";

export type PaymentMethod = "transfer" | "qr" | "cash" | "ewallet" | "others";

// Transaction interface
export interface Transaction {
  id: string;
  subtotal: number;
  total: number;
  total_weight: number;
  sender_name: string;
  sender_id: string;
  datetime: string;
  status: TransactionStatus;
  discount: number;
}

export interface TransactionDetail extends Transaction {
  items: TransactionItem[];
}

// Transaction items for transaction with detail breakdown
export interface TransactionItem {
  id: string;
  transaction_id: string;
  waste_partner_id: string;
  waste_name: string;
  unit: string;
  measure: number;
  price: number;
  total_price: number;
}

// API Response Types
export interface TransactionResponse {
  transaction: Transaction;
  items: TransactionItem[];
  customerName?: string;
  tpsName: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  totalCount: number;
  page: number;
  limit: number;
}

// Request interfaces for creating transactions
export interface CreateTransactionRequest {
  sender_id: string;
  status: TransactionStatus;
  datetime: string;
  discount?: number;
  payment_method: PaymentMethod;
  note?: string;
  items: {
    waste_partner_id: string;
    weight: number;
  }[];
}

// Form values
export interface TransactionFormValues {
  nasabah_id?: string;
  waste_partner_id: string;
  weight: string;
  date: string;
  notes?: string;
}

// Filter options
export interface TransactionFilterOptions {
  partner_id?: string;
  search?: string;
  status?: TransactionStatus;
  start_date?: string;
  end_date?: string;
}

