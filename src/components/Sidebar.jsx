import React from "react";
import { NavLink } from "react-router-dom";
import { UploadIcon, GridIcon, TagIcon, BrandofiMark } from "./Icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="navlabel">Workspace</div>
        <nav>
          <NavLink to="/product-analysis" className={({ isActive }) => "navitem" + (isActive ? " active" : "")}>
            <UploadIcon /> Product Analysis
          </NavLink>
          <NavLink to="/quadrant-view" className={({ isActive }) => "navitem" + (isActive ? " active" : "")}>
            <GridIcon /> Quadrant View
          </NavLink>
          <NavLink to="/discount-analysis" className={({ isActive }) => "navitem" + (isActive ? " active" : "")}>
            <TagIcon /> Discount Analysis
          </NavLink>
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-note">
          No Data Storage. All processing happens securely on our system — your data is never accessed, stored, or retained in our backend.
        </div>

        <div className="brand-card">
          <BrandofiMark size={20} />
          <span>
            brand<span className="accent">ofi</span>
          </span>
        </div>
      </div>
    </div>
  );
}
