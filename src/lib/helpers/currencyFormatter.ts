export const currencyFormatter = (currency: string, price: string | number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return formatter.format(Number(price));
};
