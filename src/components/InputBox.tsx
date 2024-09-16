import { useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { useWalletContext } from "../providers/wallet.auth.provider";

export const InputBox = () => {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState<number>();
  const { setBorrowAmount } = useWalletContext();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    setBorrowAmount(value);
  };

  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Amount
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">
            {currency === "USD" ? <FaDollarSign /> : <FaEthereum />}
          </span>
        </div>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="0.00"
          min=""
          value={amount}
          onChange={handleAmountChange}
          className="block w-full h-14 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 mr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
          >
            <option value="USD">USD</option>
            <option value="ETH">ETH</option>
          </select>
        </div>
      </div>
    </div>
  );
};
