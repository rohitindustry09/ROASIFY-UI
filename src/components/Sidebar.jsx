import React, { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UploadIcon, GridIcon, TagIcon, BrandofiMark } from "./Icons";

const ITEMS = [
  { to: "/product-analysis", label: "Product Analysis", Icon: UploadIcon },
  { to: "/quadrant-view", label: "Quadrant View", Icon: GridIcon },
  { to: "/discount-analysis", label: "Discount Analysis", Icon: TagIcon },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, ready: false });

  const activeIdx = Math.max(0, ITEMS.findIndex((i) => pathname.startsWith(i.to)));

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIdx];
    const parent = navRef.current;
    if (el && parent) {
      const pRect = parent.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      setIndicator({ top: eRect.top - pRect.top, height: eRect.height, ready: true });
    }
  }, [activeIdx]);

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="navlabel">Workspace</div>
        <nav ref={navRef} style={{ position: "relative" }}>
          {indicator.ready && (
            <div
              className="nav-indicator"
              style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }}
            />
          )}
          {ITEMS.map(({ to, label, Icon }, i) => (
            <NavLink
              key={to}
              to={to}
              ref={(el) => (itemRefs.current[i] = el)}
              className={({ isActive }) => "navitem" + (isActive ? " active" : "")}
            >
              {i !== activeIdx && <Icon />}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-note">
          No Data Storage. All processing happens securely on our system — your data is never accessed, stored, or retained in our backend.
        </div>

        <div className="brand-card">
          <span className="brand-word">
            br
            <BrandofiMark size={20} />
            ndofi
          </span>
        </div>
      </div>
    </div>
  );
}
