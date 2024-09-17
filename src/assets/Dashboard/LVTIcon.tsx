import * as React from "react";
import { SVGProps } from "react";

export const LVTIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 200 200" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop
          offset="0%"
          style={{
            stopColor: "#164e63",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#0e3a4d",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
    <circle
      cx={100}
      cy={100}
      r={90}
      fill="url(#a)"
      stroke="#0D3B4E"
      strokeWidth={5}
    />
    <circle
      cx={100}
      cy={100}
      r={75}
      fill="none"
      stroke="#2DD4BF"
      strokeWidth={4}
    />
    <text
      x="50%"
      y="57%"
      fill="#FFF"
      stroke="#2DD4BF"
      strokeWidth={1}
      fontFamily="Arial, sans-serif"
      fontSize={36}
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {"LVT"}
    </text>
    <circle
      cx={100}
      cy={100}
      r={60}
      fill="none"
      stroke="#2DD4BF"
      strokeDasharray="4 6"
      strokeWidth={1.5}
    />
    <circle
      cx={100}
      cy={100}
      r={50}
      fill="none"
      stroke="#2DD4BF"
      strokeDasharray="3 5"
    />
    <circle cx={40} cy={100} r={4} fill="#2DD4BF" />
    <circle cx={160} cy={100} r={4} fill="#2DD4BF" />
    <circle cx={100} cy={40} r={4} fill="#2DD4BF" />
    <circle cx={100} cy={160} r={4} fill="#2DD4BF" />
    <circle cx={70} cy={45} r={3} fill="#2DD4BF" />
    <circle cx={130} cy={45} r={3} fill="#2DD4BF" />
    <circle cx={45} cy={70} r={3} fill="#2DD4BF" />
    <circle cx={155} cy={70} r={3} fill="#2DD4BF" />
    <circle cx={45} cy={130} r={3} fill="#2DD4BF" />
    <circle cx={155} cy={130} r={3} fill="#2DD4BF" />
    <circle cx={70} cy={155} r={3} fill="#2DD4BF" />
    <circle cx={130} cy={155} r={3} fill="#2DD4BF" />
  </svg>
);
