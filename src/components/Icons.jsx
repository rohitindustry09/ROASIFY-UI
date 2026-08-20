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

/* ---- Source / brand marks — traced from the brandofi mockup, exact fills ---- */

/* Meta: infinity ribbon, two-tone gradient matching the mockup's woven shading. */
export const MetaMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="metaGrad" x1="0" y1="16" x2="64" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#4060B5" />
        <stop offset="0.5" stopColor="#4A74C3" />
        <stop offset="1" stopColor="#4060B5" />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="url(#metaGrad)"
      d="M48.44 16.44C40.70 16.44 34.92 23.24 32.00 27.69C29.08 23.24 23.30 16.44 15.56 16.44C6.98 16.44 0.00 23.41 0.00 32.00C0.00 40.60 6.98 47.56 15.56 47.56C23.30 47.56 29.08 40.76 32.00 36.31C34.92 40.76 40.70 47.56 48.44 47.56C57.03 47.56 64.00 40.60 64.00 32.00C64.00 23.41 57.03 16.44 48.44 16.44ZM15.56 42.76C9.63 42.76 4.80 37.79 4.80 32.00C4.80 26.21 9.63 21.24 15.56 21.24C22.25 21.24 27.28 28.29 28.56 32.00C27.18 36.08 22.37 42.76 15.56 42.76ZM48.44 42.76C41.63 42.76 36.82 36.08 35.44 32.00C36.72 28.29 41.75 21.24 48.44 21.24C54.37 21.24 59.20 26.21 59.20 32.00C59.20 37.79 54.37 42.76 48.44 42.76Z"
    />
  </svg>
);

/* Shopify: 3D bag — bright front face, darker shadow side, two handle
   loops, bold white S. Colors #86C532 / #538F31 sampled from the mockup. */
export const ShopifyMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M42 15c3.4.6 6.6 1.1 6.6 1.1s2.4 2.4 2.7 2.7c.3.3.5 1.6.5 1.6l3.2 34-15 3.4V15Z" fill="#538F31" />
    <path d="M42 15c-.2 0-.5-.1-.9-.1v-.2c0-3-1.5-5.5-4-6.7 1-.3 1.9-.4 2.6-.4 0 0 1.7 2.2 2.3 7.4Z" fill="#538F31" />
    <path
      d="M41.1 14.9s-.9-.2-2.4-.2c-1.4 0-2.6.4-3.4.9-.8-.9-1.8-1.3-2.9-1.3-6.5 0-9.6 8.1-10.5 12.2-2.6.8-4.4 1.4-4.7 1.5-1.4.4-1.4.5-1.6 1.8L11.6 58l30.4 5.7V14.9h-.9Z"
      fill="#86C532"
    />
    <path
      d="M31.4 20.2c-1.9.6-4 1.2-6 1.9.6-2.2 1.7-4.4 3-5.9.5-.6 1.2-1.2 2-1.6.9 1.5 1.1 3.9 1 5.6ZM27 15c.7 0 1.3.2 1.8.5-.7.4-1.4 1.1-2.1 1.9-1.7 1.9-3 4.8-3.5 7.6-1.6.5-3.2 1-4.7 1.4C19.6 21.6 23 15.2 27 15Z"
      fill="#6FA82B"
    />
    <path d="M22 22c0-4.4 3.1-9.6 8-9.6" stroke="#86C532" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <path d="M33.5 20.4c0-4.9 2.8-11 8-11" stroke="#86C532" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <path
      d="M35.5 26.5c-1.6-.6-3.5-1-5.3-.7-3.5.6-5.7 3.7-5 6.5.6 2.3 2.8 3.4 5.2 4.6 1.8.9 3.7 1.9 4 3.4.3 1.3-.5 2.7-2.4 3-2.5.5-6-.7-6-.7l-.8 4.3s3.1 1.4 6.8.8c4.5-.7 6.9-3.7 6.3-6.9-.5-2.6-2.8-3.8-5.1-5-1.9-1-3.7-1.9-4-3.3-.2-1.1.5-2.3 2.2-2.6 2-.4 4.6.5 4.6.5l1-4.1Z"
      fill="#FFFFFF"
    />
  </svg>
);

/* Google: four-arc pinwheel with a cream centre and a protruding blue tab —
   the mockup's "G" treatment, exact arc colors from the source file. */
export const GoogleMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <g transform="rotate(-45 32 32)">
      <circle cx="32" cy="32" r="21" fill="none" stroke="#EF3A25" strokeWidth="14" strokeDasharray="33 99" strokeDashoffset="0" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#F8D505" strokeWidth="14" strokeDasharray="33 99" strokeDashoffset="-33" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#34B53F" strokeWidth="14" strokeDasharray="33 99" strokeDashoffset="-66" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#4675C3" strokeWidth="14" strokeDasharray="33 99" strokeDashoffset="-99" />
    </g>
    <circle cx="32" cy="32" r="13.5" fill="#F8E3CD" />
    <rect x="31" y="22" width="15" height="12" rx="2" fill="#4675C3" />
  </svg>
);

/* brandofi wordmark icon — the growth-arrow/flag mark that replaces the
   "a" in the sidebar logo card. Lime #D7E721, as sampled from the PDF. */
export const BrandofiMark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="8.5" cy="24" r="2.6" fill="#D7E721" />
    <path
      d="M10.2 22.3 21 11.5"
      stroke="#D7E721"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M13 9.5h11v11"
      stroke="#D7E721"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
