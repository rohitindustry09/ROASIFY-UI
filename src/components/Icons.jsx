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
