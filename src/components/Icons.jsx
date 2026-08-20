import React from "react";

const base = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const UploadIcon = (p) => (
  <svg {...base} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
);
export const GridIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
);
export const TagIcon = (p) => (
  <svg {...base} {...p}><path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.83 0l5.59-5.59a2 2 0 0 0 0-2.83Z" /><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" /></svg>
);
export const CheckIcon = (p) => (
  <svg {...base} width={14} height={14} {...p}><polyline points="20 6 9 17 4 12" /></svg>
);
export const RefreshIcon = (p) => (
  <svg {...base} width={13} height={13} {...p}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
);
export const XIcon = (p) => (
  <svg {...base} width={13} height={13} {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
export const StarIcon = (p) => (
  <svg {...base} width={13} height={13} fill="currentColor" {...p}><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" /></svg>
);
export const DiamondIcon = (p) => (
  <svg {...base} width={13} height={13} {...p}><polygon points="12 2 22 12 12 22 2 12" /></svg>
);
export const CircleIcon = (p) => (
  <svg {...base} width={13} height={13} {...p}><circle cx="12" cy="12" r="9" /></svg>
);
export const AlertIcon = (p) => (
  <svg {...base} width={13} height={13} {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);
export const DownloadIcon = (p) => (
  <svg {...base} width={14} height={14} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);
export const SparkleIcon = (p) => (
  <svg {...base} width={14} height={14} fill="currentColor" stroke="none" {...p}><path d="M12 2l1.6 5.8L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.2L12 2z" /></svg>
);
export const PlayIcon = (p) => (
  <svg {...base} width={12} height={12} fill="currentColor" stroke="none" {...p}><polygon points="6 3 20 12 6 21 6 3" /></svg>
);
export const ArrowRightIcon = (p) => (
  <svg {...base} width={14} height={14} {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
export const ChevronDownIcon = (p) => (
  <svg {...base} width={13} height={13} {...p}><polyline points="6 9 12 15 18 9" /></svg>
);
export const PanelIcon = (p) => (
  <svg {...base} width={14} height={14} {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
);
export const InboxIcon = (p) => (
  <svg {...base} width={40} height={40} {...p}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" /></svg>
);

/* ---- Source / brand marks (stylized, not literal trademarked artwork) ---- */

export const MetaMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="metaGrad" x1="0" y1="4" x2="48" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#4FA8FF" />
        <stop offset="1" stopColor="#0B5FDB" />
      </linearGradient>
    </defs>
    <path
      d="M9 32c0-8.5 4-15.5 9-15.5 3.2 0 5 2.6 6.9 7 1.9-4.4 3.7-7 6.9-7 5 0 9 7 9 15.5-1.6-6.5-4.9-11.2-8.3-11.2-2.7 0-4.6 2.9-6.3 6.7-.4.9-.8 1.9-1.3 3-.5-1.1-.9-2.1-1.3-3-1.7-3.8-3.6-6.7-6.3-6.7-3.4 0-6.7 4.7-8.3 11.2Z"
      fill="url(#metaGrad)"
    />
  </svg>
);

export const ShopifyMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="shopGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#95D53F" />
        <stop offset="1" stopColor="#5A8F29" />
      </linearGradient>
    </defs>
    <rect x="5" y="10" width="38" height="34" rx="8" fill="url(#shopGrad)" />
    <path d="M14 16.5c0-5 3.8-9.5 9-9.5" stroke="url(#shopGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <path d="M28.5 16.5c0-5 3.8-9.5 9-9.5" stroke="url(#shopGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <text x="24" y="33.5" textAnchor="middle" fontSize="21" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">S</text>
  </svg>
);

export const GoogleMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M44 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.3c-.5 2.7-2 4.9-4.3 6.4v5.3h6.9C41.9 36.7 44 31.1 44 24.5Z" fill="#4285F4" />
    <path d="M24 44c5.8 0 10.7-1.9 14.2-5.2l-6.9-5.3c-1.9 1.3-4.4 2.1-7.3 2.1-5.6 0-10.3-3.8-12-8.9h-7.1v5.5C8.4 39.4 15.6 44 24 44Z" fill="#34A853" />
    <path d="M12 26.7c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.5H4.9C3.4 15.7 2.5 19.7 2.5 24s.9 8.3 2.4 11.2L12 26.7Z" fill="#FBBC05" />
    <path d="M24 9.9c3.2 0 6 1.1 8.2 3.2l6.1-6.1C34.7 3.5 29.8 1.5 24 1.5c-8.4 0-15.6 4.6-19.1 12.5l7.1 5.5c1.7-5.1 6.4-8.9 12-8.9Z" fill="#EA4335" />
  </svg>
);

export const BrandofiMark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M4 20c2-8 8-13 16-14-1 6-3 10-8 13.5-3 2.1-6 2.2-8 .5Z"
      fill="#C4E065"
    />
    <path
      d="M4 20c4 1 9-.4 13-3.6"
      stroke="#8FB63E"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
