/**
 * Truncate an address by showing the first 6 characters, three dots, and the last 4 characters.
 * 
 * @param address - The full address to be truncated.
 * @returns The truncated address.
 */
export const truncateAddress = (address: string): string => {
    if (address.length <= 10) {
      // If the address is too short, return it as-is.
      return address;
    }
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };
  