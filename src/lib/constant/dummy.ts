// =======================================================
// DUMMY DATA FOR REACT QUERY
// =======================================================
// -------------------------------------------------------
// Waste Categories

import { Customer } from "@/lib/types/entities/customer";
import { Record, RecordItem } from "@/lib/types/entities/record";
import { Transaction, TransactionItem } from "@/lib/types/entities/transaction";
import {
  Partner,
  Waste,
  WasteCategory,
  WastePartner,
} from "@/lib/types/entities/waste";

// -------------------------------------------------------
export const dummyWasteCategories: WasteCategory[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Organik",
    order: 1,
    status: "active",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Anorganik",
    order: 2,
    status: "active",
  },
  {
    id: "7b4a7fc6-9c5d-4c25-8c6a-b484dba7fe0e",
    name: "B3",
    order: 3,
    status: "active",
  },
  {
    id: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    name: "Residu",
    order: 4,
    status: "active",
  },
];

// -------------------------------------------------------
// Wastes
// -------------------------------------------------------
export const dummyWastes: Waste[] = [
  {
    id: "a2f3de45-bf3a-4992-b001-dd52e78fb123",
    categoryId: "550e8400-e29b-41d4-a716-446655440000",
    waste_category: "",
    name: "Sisa Makanan",
    slug: "sisa-makanan",
    isAccepted: true,
    status: "active",
    description: "Sisa makanan yang dapat dikompos",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    categoryId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    waste_category: "",
    name: "Kertas",
    slug: "kertas",
    isAccepted: true,
    status: "active",
    description: "Kertas bekas, koran, majalah",
  },
  {
    id: "58c1d4ac-699d-446c-8433-6a764db545e2",
    categoryId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    waste_category: "",
    name: "Botol Plastik",
    slug: "botol-plastik",
    isAccepted: true,
    status: "active",
    description: "Botol plastik PET",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    categoryId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    waste_category: "",
    name: "Kardus",
    slug: "kardus",
    isAccepted: true,
    status: "active",
    description: "Karton dan kardus bersih",
  },
  {
    id: "7b4a7fc6-9c5d-4c25-8c6a-b484dba7fe0e",
    categoryId: "7b4a7fc6-9c5d-4c25-8c6a-b484dba7fe0e",
    waste_category: "",
    name: "Baterai Bekas",
    slug: "baterai-bekas",
    isAccepted: true,
    status: "active",
    description: "Baterai alkaline dan baterai litium bekas",
  },
  {
    id: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    categoryId: "7b4a7fc6-9c5d-4c25-8c6a-b484dba7fe0e",
    waste_category: "",
    name: "Lampu Neon",
    slug: "lampu-neon",
    isAccepted: true,
    status: "active",
    description: "Lampu neon dan lampu hemat energi",
  },
  {
    id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c",
    categoryId: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    waste_category: "",
    name: "Pembalut",
    slug: "pembalut",
    isAccepted: false,
    status: "rejected",
    description: "Pembalut bekas",
  },
  {
    id: "8f794e19-e738-42cc-95d4-0baf9c8e951c",
    categoryId: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    waste_category: "",
    name: "Popok",
    slug: "popok",
    isAccepted: false,
    status: "rejected",
    description: "Popok bekas",
  },
  {
    id: "e0a557a7-ae12-49aa-a3dc-5ee558456e88",
    categoryId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    waste_category: "",
    name: "Kaleng Aluminium",
    slug: "kaleng-aluminium",
    isAccepted: true,
    status: "active",
    description: "Kaleng minuman aluminium",
  },
  {
    id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c",
    categoryId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    waste_category: "",
    name: "Botol Kaca",
    slug: "botol-kaca",
    isAccepted: true,
    status: "active",
    description: "Botol kaca bening dan berwarna",
  },
];

// -------------------------------------------------------
// Partners
// -------------------------------------------------------
export const dummyPartners: Partner[] = [
  {
    id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c",
    slug: "tps-warga-sejahtera",
    display_name: "TPS Warga Sejahtera",
    location: "Jl. Merdeka No. 123, Jakarta Selatan",
    type: "tps",
    capacity: "500kg/hari",
    description: "TPS untuk pengelolaan sampah warga sekitar",
  },
  {
    id: "8f794e19-e738-42cc-95d4-0baf9c8e951c",
    slug: "tps-bersih-barokah",
    display_name: "TPS Bersih Barokah",
    location: "Jl. Kebersihan No. 45, Jakarta Timur",
    type: "tps",
    capacity: "800kg/hari",
    description: "TPS dengan fasilitas pengolahan sampah organik",
  },
  {
    id: "e0a557a7-ae12-49aa-a3dc-5ee558456e88",
    slug: "sdn-budi-luhur",
    display_name: "SDN Budi Luhur",
    location: "Jl. Pendidikan No. 67, Jakarta Pusat",
    type: "school",
    capacity: "200kg/hari",
    description: "Sekolah yang menerapkan program bank sampah",
  },
  {
    id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c",
    slug: "pt-daur-ulang-sejati",
    display_name: "PT Daur Ulang Sejati",
    location: "Jl. Industri No. 89, Jakarta Utara",
    type: "company",
    capacity: "2000kg/hari",
    description: "Perusahaan pengolahan sampah terpadu",
  },
  {
    id: "3bdf7ac9-ae0d-478a-9e4b-8211f7e3b093",
    slug: "bank-sampah-kampung-hijau",
    display_name: "Bank Sampah Kampung Hijau",
    location: "Jl. Lingkungan No. 12, Jakarta Barat",
    type: "community",
    capacity: "300kg/hari",
    description: "Bank sampah berbasis komunitas",
  },
];

// -------------------------------------------------------
// Waste Partners
// -------------------------------------------------------
export const dummyWastePartners: WastePartner[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    waste_id: "a2f3de45-bf3a-4992-b001-dd52e78fb123",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c",
    price: 1000,
    additional_attribute: { min_weight: 1, max_weight: 100 },
  },
  {
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    waste_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c",
    price: 2500,
    additional_attribute: { min_weight: 1, max_weight: 50 },
  },
  {
    id: "3e928d77-df34-4398-8fef-39c0c753864a",
    waste_id: "550e8400-e29b-41d4-a716-446655440001",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c",
    price: 3000,
    additional_attribute: { min_weight: 1, max_weight: 30 },
  },
  {
    id: "4a2725b9-b79a-4392-abc4-a8624fa29d00",
    waste_id: "58c1d4ac-699d-446c-8433-6a764db545e2",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c",
    price: 2000,
    additional_attribute: { min_weight: 1, max_weight: 50 },
  },
  {
    id: "29a863b9-ffae-4a43-a2ef-38b8374d31b3",
    waste_id: "550e8400-e29b-41d4-a716-446655440001",
    partner_id: "8f794e19-e738-42cc-95d4-0baf9c8e951c",
    price: 3500,
    additional_attribute: { min_weight: 1, max_weight: 40 },
  },
  {
    id: "a5f441a2-1845-4dea-a5dc-9613fe71c2e0",
    waste_id: "58c1d4ac-699d-446c-8433-6a764db545e2",
    partner_id: "8f794e19-e738-42cc-95d4-0baf9c8e951c",
    price: 2200,
    additional_attribute: { min_weight: 1, max_weight: 60 },
  },
  {
    id: "67590fd2-9619-4c5a-8a86-23f02f4e4edf",
    waste_id: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    partner_id: "8f794e19-e738-42cc-95d4-0baf9c8e951c",
    price: 5000,
    additional_attribute: { min_weight: 1, max_weight: 20 },
  },
  {
    id: "819ad19f-fa90-4c9f-82a4-8c5dbb02f855",
    waste_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    partner_id: "e0a557a7-ae12-49aa-a3dc-5ee558456e88",
    price: 2300,
    additional_attribute: { min_weight: 1, max_weight: 30 },
  },
  {
    id: "90e0b760-9e66-4e47-bae9-89c24b2d85a0",
    waste_id: "550e8400-e29b-41d4-a716-446655440001",
    partner_id: "e0a557a7-ae12-49aa-a3dc-5ee558456e88",
    price: 2800,
    additional_attribute: { min_weight: 1, max_weight: 25 },
  },
  {
    id: "0718d1f7-777e-4a50-ad87-bde161dee325",
    waste_id: "58c1d4ac-699d-446c-8433-6a764db545e2",
    partner_id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c",
    price: 2500,
    additional_attribute: { min_weight: 10, max_weight: 1000 },
  },
  {
    id: "ce6fb80a-5184-4165-a96b-7bf718e0a1ba",
    waste_id: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    partner_id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c",
    price: 5500,
    additional_attribute: { min_weight: 5, max_weight: 500 },
  },
  {
    id: "76f11f41-7629-487a-a56c-4f03da8d037a",
    waste_id: "7b4a7fc6-9c5d-4c25-8c6a-b484dba7fe0e",
    partner_id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c",
    price: 1800,
    additional_attribute: { min_weight: 5, max_weight: 800 },
  },
  {
    id: "8e36e9b7-a80f-4404-a202-91805b6f08c3",
    waste_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    partner_id: "3bdf7ac9-ae0d-478a-9e4b-8211f7e3b093",
    price: 2400,
    additional_attribute: { min_weight: 1, max_weight: 40 },
  },
  {
    id: "46a359b2-a65f-4636-9891-06d0542e6214",
    waste_id: "550e8400-e29b-41d4-a716-446655440001",
    partner_id: "3bdf7ac9-ae0d-478a-9e4b-8211f7e3b093",
    price: 3200,
    additional_attribute: { min_weight: 1, max_weight: 35 },
  },
  {
    id: "dbaed704-9db2-4082-a3a3-f6366cc42d90",
    waste_id: "58c1d4ac-699d-446c-8433-6a764db545e2",
    partner_id: "3bdf7ac9-ae0d-478a-9e4b-8211f7e3b093",
    price: 2100,
    additional_attribute: { min_weight: 1, max_weight: 45 },
  },
];

// -------------------------------------------------------
// Customers (Nasabah)
// -------------------------------------------------------
export const dummyCustomers: Customer[] = [
  {
    id: "C0001",
    name: "Ahmad Subagja",
    phone: "081234567890",
    address: "Jl. Mawar No. 10, Jakarta Selatan",
    email: "ahmad@example.com",
    idNumber: "3175020501800001",
    totalWaste: 125.5,
    totalReward: 350000,
    joinDate: "2023-01-15",
    status: "active",
    notes: "Nasabah aktif",
  },
  {
    id: "C0002",
    name: "Siti Aminah",
    phone: "081298765432",
    address: "Jl. Melati No. 23, Jakarta Timur",
    totalWaste: 87.2,
    totalReward: 220000,
    joinDate: "2023-02-20",
    status: "active",
    notes: "",
  },
  {
    id: "C0003",
    name: "Budi Santoso",
    phone: "08567890123",
    address: "Jl. Dahlia No. 45, Jakarta Barat",
    email: "budi@example.com",
    totalWaste: 210.8,
    totalReward: 520000,
    joinDate: "2023-01-05",
    status: "active",
    notes: "Nasabah dengan kontribusi terbanyak",
  },
  {
    id: "C0004",
    name: "Dewi Lestari",
    phone: "081345678901",
    address: "Jl. Anggrek No. 12, Jakarta Utara",
    idNumber: "3172045203900002",
    totalWaste: 65.3,
    totalReward: 180000,
    joinDate: "2023-03-10",
    status: "active",
    notes: "",
  },
  {
    id: "C0005",
    name: "Eko Prabowo",
    phone: "085678901234",
    address: "Jl. Flamboyan No. 8, Jakarta Pusat",
    totalWaste: 42.1,
    totalReward: 105000,
    joinDate: "2023-04-05",
    status: "inactive",
    notes: "Tidak aktif sejak Juni 2023",
  },
  {
    id: "C0006",
    name: "Fina Rahmawati",
    phone: "089876543210",
    address: "Jl. Teratai No. 17, Jakarta Selatan",
    email: "fina@example.com",
    totalWaste: 93.7,
    totalReward: 270000,
    joinDate: "2023-02-28",
    status: "active",
    notes: "",
  },
  {
    id: "C0007",
    name: "Gunawan Wibowo",
    phone: "081234987654",
    address: "Jl. Kenanga No. 33, Jakarta Timur",
    idNumber: "3175020907850003",
    totalWaste: 118.2,
    totalReward: 310000,
    joinDate: "2023-01-20",
    status: "active",
    notes: "Rutin setor sampah setiap minggu",
  },
  {
    id: "C0008",
    name: "Hani Susanti",
    phone: "085678123456",
    address: "Jl. Cempaka No. 27, Jakarta Barat",
    totalWaste: 33.5,
    totalReward: 95000,
    joinDate: "2023-04-12",
    status: "inactive",
    notes: "Pindah alamat",
  },
  {
    id: "C0009",
    name: "Irfan Hakim",
    phone: "081345678912",
    address: "Jl. Seroja No. 19, Jakarta Utara",
    email: "irfan@example.com",
    totalWaste: 78.6,
    totalReward: 200000,
    joinDate: "2023-03-01",
    status: "active",
    notes: "",
  },
  {
    id: "C0010",
    name: "Juwita Pratiwi",
    phone: "089876123456",
    address: "Jl. Kamboja No. 22, Jakarta Pusat",
    idNumber: "3172044505920004",
    totalWaste: 104.3,
    totalReward: 290000,
    joinDate: "2023-02-10",
    status: "active",
    notes: "Fokus pada sampah plastik",
  },
];

// -------------------------------------------------------
// Transactions and Transaction Items
// -------------------------------------------------------
export const dummyTransactions: Transaction[] = [
  {
    id: "f2d624bc-1c31-4251-a9cc-9bd0bc8caacd",
    subtotal: 13000,
    total: 13000,
    sender_name: "Ahmad Subagja",
    datetime: "2023-01-15",
    status: "pending",
    discount: 0,
    sender_id: "C0001",
    total_weight: 5.2,
  }
];

// Populate transaction items
// Update transaction items in transactions array

export const dummyTransactionItems: TransactionItem[] = [
  {
    id: "f2d624bc-1c31-4251-a9cc-9bd0bc8caacd",
    transaction_id: "f2d624bc-1c31-4251-a9cc-9bd0bc8caacd",
    waste_partner_id: "550e8400-e29b-41d4-a716-446655440000",
    waste_name: "Sampah Plastik",
    unit: "kg",
    measure: 5.2,
    price: 2500,
    total_price: 13000,
  }
];

// -------------------------------------------------------
// Records
// -------------------------------------------------------
export const dummyRecordItems: RecordItem[] = [
  {
    id: "RI0001",
    record_id: "R0001",
    waste_partner_id: "550e8400-e29b-41d4-a716-446655440000",
    unit: "kg",
    measure: 5.2,
  },
  {
    id: "RI0002",
    record_id: "R0001",
    waste_partner_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    unit: "kg",
    measure: 5.7,
  },
  {
    id: "RI0003",
    record_id: "R0002",
    waste_partner_id: "7b4a7fc6-9c5d-4c25-8c6a-b484dba7fe0e",
    unit: "kg",
    measure: 10.2,
  },
  {
    id: "RI0004",
    record_id: "R0002",
    waste_partner_id: "b88e97a3-5f9c-4375-a9d5-c4985c1c8f25",
    unit: "kg",
    measure: 9.8,
  },
  {
    id: "RI0005",
    record_id: "R0003",
    waste_partner_id: "a2f3de45-bf3a-4992-b001-dd52e78fb123",
    unit: "kg",
    measure: 5.1,
  },
  {
    id: "RI0006",
    record_id: "R0004",
    waste_partner_id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    unit: "kg",
    measure: 7.5,
  },
  {
    id: "RI0007",
    record_id: "R0005",
    waste_partner_id: "3e928d77-df34-4398-8fef-39c0c753864a",
    unit: "kg",
    measure: 6.8,
  },
  {
    id: "RI0008",
    record_id: "R0005",
    waste_partner_id: "4a2725b9-b79a-4392-abc4-a8624fa29d00",
    unit: "kg",
    measure: 1.8,
  },
  {
    id: "RI0009",
    record_id: "R0006",
    waste_partner_id: "29a863b9-ffae-4a43-a2ef-38b8374d31b3",
    unit: "kg",
    measure: 20.0,
  },
  {
    id: "RI0010",
    record_id: "R0006",
    waste_partner_id: "a5f441a2-1845-4dea-a5dc-9613fe71c2e0",
    unit: "kg",
    measure: 22.5,
  },
  {
    id: "RI0011",
    record_id: "R0007",
    waste_partner_id: "67590fd2-9619-4c5a-8a86-23f02f4e4edf",
    unit: "kg",
    measure: 9.5,
  },
  {
    id: "RI0012",
    record_id: "R0007",
    waste_partner_id: "819ad19f-fa90-4c9f-82a4-8c5dbb02f855",
    unit: "kg",
    measure: 1.0,
  },
  {
    id: "RI0013",
    record_id: "R0008",
    waste_partner_id: "90e0b760-9e66-4e47-bae9-89c24b2d85a0",
    unit: "kg",
    measure: 6.3,
  },
  {
    id: "RI0014",
    record_id: "R0008",
    waste_partner_id: "0718d1f7-777e-4a50-ad87-bde161dee325",
    unit: "kg",
    measure: 4.5,
  },
  {
    id: "RI0015",
    record_id: "R0009",
    waste_partner_id: "ce6fb80a-5184-4165-a96b-7bf718e0a1ba",
    unit: "kg",
    measure: 80.0,
  },
  {
    id: "RI0016",
    record_id: "R0009",
    waste_partner_id: "76f11f41-7629-487a-a56c-4f03da8d037a",
    unit: "kg",
    measure: 22.0,
  },
  {
    id: "RI0017",
    record_id: "R0010",
    waste_partner_id: "8e36e9b7-a80f-4404-a202-91805b6f08c3",
    unit: "kg",
    measure: 7.0,
  },
  {
    id: "RI0018",
    record_id: "R0010",
    waste_partner_id: "46a359b2-a65f-4636-9891-06d0542e6214",
    unit: "kg",
    measure: 4.1,
  },
  {
    id: "RI0019",
    record_id: "R0011",
    waste_partner_id: "dbaed704-9db2-4082-a3a3-f6366cc42d90",
    unit: "kg",
    measure: 10.5,
  },
  {
    id: "RI0020",
    record_id: "R0012",
    waste_partner_id: "c3b6a2e8-7d69-4d2f-9c6b-e8a4f9d7c3b5",
    unit: "kg",
    measure: 30.0,
  },
  {
    id: "RI0021",
    record_id: "R0013",
    waste_partner_id: "f5e4d3c2-b1a2-3c4d-5e6f-7a8b9c0d1e2f",
    unit: "kg",
    measure: 15.0,
  },
  {
    id: "RI0022",
    record_id: "R0014",
    waste_partner_id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    unit: "kg",
    measure: 18.5,
  },
  {
    id: "RI0023",
    record_id: "R0015",
    waste_partner_id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    unit: "kg",
    measure: 12.5,
  },
  {
    id: "RI0024",
    record_id: "R0015",
    waste_partner_id: "9e8d7c6b-5a4b-3c2d-1e0f-9a8b7c6d5e4f",
    unit: "kg",
    measure: 8.0,
  },
];

export const dummyRecords: Record[] = [
  {
    id: "R0001",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c", // was 1
    pic_id: "b3f271d2-1c36-4f78-8bd9-9d843d4f9e01", // was 101
    total: 30000, // 5.2 * 2500 + 5.7 * 3000
    datetime: "2023-10-01T10:30:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0001",
    notes: "Kertas dan botol plastik dari Ahmad Subagja",
    items: [], // Will be populated below
  },
  {
    id: "R0002",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c", // was 1
    pic_id: "d2a3f4c6-8ea6-4e3a-9f11-618b8c0eb271", // was 102
    total: 45000, // 10.2 * 2000 + 9.8 * 2500
    datetime: "2023-10-02T14:45:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0002",
    notes: "Kardus dan kertas dari Budi Santoso",
    items: [],
  },
  {
    id: "R0003",
    partner_id: "8f794e19-e738-42cc-95d4-0baf9c8e951c", // was 2
    pic_id: "e1c4d1f8-7a3b-4d89-a2c9-3b6f278bd3a2", // was 103
    total: 17850, // 5.1 * 3500
    datetime: "2023-10-03T09:15:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0003",
    notes: "Botol plastik dari Dewi Lestari",
    items: [],
  },
  {
    id: "R0004",
    partner_id: "8f794e19-e738-42cc-95d4-0baf9c8e951c", // was 2
    pic_id: "b3f271d2-1c36-4f78-8bd9-9d843d4f9e01", // was 101
    total: 37500, // 7.5 * 5000
    datetime: "2023-10-04T13:20:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0004",
    notes: "Kaleng aluminium dari Gunawan Wibowo",
    items: [],
  },
  {
    id: "R0005",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c", // was 1
    pic_id: "f4b5c6d7-2e3f-4a1b-8c9d-7e6f5a4b3c2d", // was 104
    total: 22400, // 6.8 * 2500 + 1.8 * 3000
    datetime: "2023-10-05T11:00:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0005",
    notes: "Kertas dan botol plastik dari Siti Aminah",
    items: [],
  },
  {
    id: "R0006",
    partner_id: "3bdf7ac9-ae0d-478a-9e4b-8211f7e3b093", // was 5
    pic_id: "a9b8c7d6-5e4f-3a2b-1c0d-9e8f7a6b5c4d", // was 105
    total: 120000, // 20.0 * 2400 + 22.5 * 3200
    datetime: "2023-10-06T10:10:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0006",
    notes: "Kertas dan botol plastik dari pengumpulan kolektif RT 05",
    items: [],
  },
  {
    id: "R0007",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c", // was 1
    pic_id: "d2a3f4c6-8ea6-4e3a-9f11-618b8c0eb271", // was 102
    total: 29500, // 9.5 * 3000 + 1.0 * 1000
    datetime: "2023-10-07T15:30:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0007",
    notes: "Botol plastik dan sisa makanan dari Fina Rahmawati",
    items: [],
  },
  {
    id: "R0008",
    partner_id: "e0a557a7-ae12-49aa-a3dc-5ee558456e88", // was 3
    pic_id: "e1c4d1f8-7a3b-4d89-a2c9-3b6f278bd3a2", // was 103
    total: 27000, // 6.3 * 2300 + 4.5 * 2800
    datetime: "2023-10-08T12:45:00Z",
    status: "processed",
    is_sell: false,
    is_process: true,
    transaction_id: "T0008",
    processed_to: "R0011",
    notes:
      "Kertas dan botol plastik dari Irfan Hakim, diproses untuk daur ulang",
    items: [],
  },
  {
    id: "R0009",
    partner_id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c", // was 4
    pic_id: "a9b8c7d6-5e4f-3a2b-1c0d-9e8f7a6b5c4d", // was 105
    total: 320000, // 80.0 * 2500 + 22.0 * 5500
    datetime: "2023-10-09T09:00:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 3000,
    transaction_id: "T0009",
    source: "Hasil olahan dari beberapa nasabah",
    notes: "Pengiriman kardus dan kaleng aluminium ke pengolah akhir",
    items: [],
  },
  {
    id: "R0010",
    partner_id: "8f794e19-e738-42cc-95d4-0baf9c8e951c", // was 2
    pic_id: "f4b5c6d7-2e3f-4a1b-8c9d-7e6f5a4b3c2d", // was 104
    total: 33500, // 7.0 * 3500 + 4.1 * 2200
    datetime: "2023-10-10T14:20:00Z",
    status: "canceled",
    is_sell: false,
    is_process: false,
    transaction_id: "T0010",
    notes: "Botol plastik dan kardus dari Juwita Pratiwi, dibatalkan",
    items: [],
  },
  // Additional records to showcase all features
  {
    id: "R0011",
    partner_id: "e0a557a7-ae12-49aa-a3dc-5ee558456e88", // was 3
    pic_id: "a9b8c7d6-5e4f-3a2b-1c0d-9e8f7a6b5c4d", // was 105
    total: 24150, // 10.5 * 2300
    datetime: "2023-10-11T10:00:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 2700,
    discount: 5,
    source: "Hasil proses dari R0008",
    notes: "Bahan kertas daur ulang",
    items: [],
  },
  {
    id: "R0012",
    partner_id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c", // was 4
    pic_id: "b3f271d2-1c36-4f78-8bd9-9d843d4f9e01", // was 101
    total: 75000, // 30.0 * 2500
    datetime: "2023-10-12T13:30:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 3200,
    discount: 0,
    notes: "Kardus quality A untuk pabrik kertas",
    items: [],
  },
  {
    id: "R0013",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c", // was 1
    pic_id: "d2a3f4c6-8ea6-4e3a-9f11-618b8c0eb271", // was 102
    total: 45000, // 15.0 * 3000
    datetime: "2023-10-13T09:45:00Z",
    status: "processed",
    is_sell: false,
    is_process: true,
    processed_to: "R0014",
    notes: "Botol plastik untuk daur ulang premium",
    items: [],
  },
  {
    id: "R0014",
    partner_id: "fa53f02e-4299-4bcb-96e8-116de2a5c43c", // was 4
    pic_id: "e1c4d1f8-7a3b-4d89-a2c9-3b6f278bd3a2", // was 103
    total: 101750, // 18.5 * 5500
    datetime: "2023-10-14T11:15:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 6000,
    source: "Hasil proses dari R0013",
    notes: "Aluminium daur ulang kualitas tinggi",
    items: [],
  },
  {
    id: "R0015",
    partner_id: "c7a83b2f-7c4d-4342-8e9a-c5bb7d240d1c", // was 1
    pic_id: "f4b5c6d7-2e3f-4a1b-8c9d-7e6f5a4b3c2d", // was 104
    total: 55250, // 12.5 * 2500 + 8.0 * 3000
    datetime: "2023-10-15T14:00:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    discount: 10,
    notes: "Kertas dan botol plastik dari program sekolah",
    items: [],
  },
];

// -------------------------------------------------------
// API Response Dummy Data (for React Query)
// -------------------------------------------------------

// Waste Category Response
export const dummyWasteCategoryResponse = {
  categories: dummyWasteCategories,
};

// Waste List Response
export const dummyWasteListResponse = {
  wastes: dummyWastes,
  totalCount: dummyWastes.length,
  page: 1,
  limit: 10,
};

// Waste Partner List Response
export const dummyWastePartnerListResponse = {
  wastePartners: dummyWastePartners,
  wastesDetails: dummyWastes.map((waste) => ({
    id: waste.id,
    name: waste.name,
    slug: waste.slug,
    isAccepted: waste.isAccepted,
    status: waste.status,
    description: waste.description,
    categoryName:
      dummyWasteCategories.find((cat) => cat.id === waste.categoryId)?.name ||
      "Unknown",
  })),
  totalCount: dummyWastePartners.length,
  page: 1,
  limit: 10,
};

// Customer List Response
export const dummyCustomerListResponse = {
  customers: dummyCustomers,
  totalCount: dummyCustomers.length,
  page: 1,
  limit: 10,
};

// Transaction List Response
export const dummyTransactionListResponse = {
  transactions: dummyTransactions,
  totalCount: dummyTransactions.length,
  page: 1,
  limit: 10,
};

// Record List Response
export const dummyRecordListResponse = {
  records: dummyRecords,
  totalCount: dummyRecords.length,
  page: 1,
  limit: 10,
};

// Detail response generators
export const getWasteResponse = (id: string) => {
  const waste = dummyWastes.find((w) => w.id === id);
  return waste ? { waste } : null;
};

export const getWastePartnerResponse = (id: string) => {
  const wastePartner = dummyWastePartners.find((wp) => wp.id === id);
  if (!wastePartner) return null;

  const waste = dummyWastes.find((w) => w.id === wastePartner.waste_id);
  const partner = dummyPartners.find((p) => p.id === wastePartner.partner_id);
  const category = waste
    ? dummyWasteCategories.find((c) => c.id === waste.categoryId)
    : null;

  return {
    wastePartner,
    wasteName: waste?.name || "Unknown",
    wasteCategory: category?.name || "Unknown",
    wasteDescription: waste?.description || "",
    partnerName: partner?.display_name || "Unknown",
  };
};

export const getCustomerResponse = (id: string) => {
  const customer = dummyCustomers.find((c) => c.id === id);
  return customer ? { customer } : null;
};

export const getTransactionResponse = (id: string) => {
  const transaction = dummyTransactions.find((t) => t.id === id);
  if (!transaction) return null;

  const items = dummyTransactionItems.filter(
    (item) => item.transaction_id === id
  );
  const customer = transaction.sender_name
    ? dummyCustomers.find((c) => c.id === transaction.sender_name)
    : null;
  // const tps = dummyPartners.find((p) => p.id.toString() === transaction.);

  return {
    transaction,
    items,
    customerName: customer?.name || undefined,
    tpsName: "Unknown",
  };
};

export const getRecordResponse = (id: string) => {
  const record = dummyRecords.find((r) => r.id === id);
  if (!record) return null;

  const wastePartner = dummyWastePartners.find(
    (wp) => wp.id === record.partner_id
  );
  const waste = wastePartner
    ? dummyWastes.find((w) => w.id === wastePartner.waste_id)
    : null;
  const partner = dummyPartners.find((p) => p.id === record.partner_id);

  return {
    record,
    wasteName: waste?.name || "Unknown",
    partnerName: partner?.display_name || "Unknown",
  };
};
