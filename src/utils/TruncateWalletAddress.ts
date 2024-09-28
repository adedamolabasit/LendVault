export const truncateAddress = (address: string): string => {
  if (address.length <= 10) {
    return address;
  }
  const start = address.slice(0, 12);
  const end = address.slice(-14);
  return `${start}......${end}`;
};
