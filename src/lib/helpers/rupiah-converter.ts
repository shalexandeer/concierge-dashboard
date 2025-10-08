export const formatRupiah = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Rp0";
  }

  return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

