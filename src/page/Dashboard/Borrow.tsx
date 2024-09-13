import { DashWrapper } from "../Layout/DashWrapper";
import { InputBox } from "../../components/InputBox";

export const Borrow = () => {
  return (
    <div className="h-5/6 w-full  ">
      <div className="flex flex-col px-12 py-12 gap-6">
        <div className="w-full">
          <InputBox />
        </div>

        <div className=" rounded-lg bg-gray-50 px-4 py-6">
          <dl className="divide-y divide-gray-200 text-sm">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">$72</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium text-gray-900">$5</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Tax</dt>
              <dd className="font-medium text-gray-900">$6.16</dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">Order total</dt>
              <dd className="font-medium text-indigo-600">$83.16</dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-center">
          <button className="w-full border  border-cyan-800 text-black ">Borrow Token</button>
        </div>
      </div>
    </div>
  );
};
