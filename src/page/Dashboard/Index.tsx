"use client";

import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { DashWrapper } from "../Layout/DashWrapper";

interface Stat {
  name: string;
  value: string;
  unit?: string;
}

interface ActivityItem {
  user: {
    name: string;
    imageUrl: string;
  };
  commit: string;
  branch: string;
  status: "Completed" | "Error";
  duration: string;
  date: string;
  dateTime: string;
}

const stats: Stat[] = [
  { name: "Total Assets Locked", value: "405" },
  { name: "Total Debt", value: "3.65", unit: "mins" },
  { name: "Number of servers", value: "3" },
  { name: "Success rate", value: "98.5%" },
];

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
};

const activityItems: ActivityItem[] = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  // More items...
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  return (
    <DashWrapper>
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Account
          </h3>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul role="list" className="mt-4 space-y-4">
          {activityItems.map((activity) => (
            <li
              key={activity.dateTime}
              className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm ring-1 ring-gray-900/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
                <img
                  src={activity.user.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span>{activity.user.name}</span>{" "}
                  <span>{activity.commit}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {activity.branch} - {activity.status} - {activity.duration} -{" "}
                  {activity.date}
                </p>
              </div>
              <div
                className={`absolute right-4 top-4 ${
                  statuses[activity.status]
                }`}
              >
                {activity.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-sm font-semibold leading-6 text-gray-900">
          Vault
        </div>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative flex gap-x-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm ring-1 ring-gray-900/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10 text-gray-600">
                <ChartBarSquareIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="flex gap-x-2">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {stat.name}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.value} {stat.unit}
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </DashWrapper>
  );
}
