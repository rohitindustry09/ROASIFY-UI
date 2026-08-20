import React from "react";
import { NavLink } from "react-router-dom";
import { UploadIcon, GridIcon, TagIcon } from "./Icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <div className="sq" />
        ROAS<span className="accent">ify</span>
      </div>
      <div className="navlabel">Workspace</div>
      <NavLink to="/product-analysis" className={({ isActive }) => "navitem" + (isActive ? " active" : "")}>
        <UploadIcon /> Product Analysis
      </NavLink>
      <NavLink to="/quadrant-view" className={({ isActive }) => "navitem" + (isActive ? " active" : "")}>
        <GridIcon /> Quadrant View
      </NavLink>
      <NavLink to="/discount-analysis" className={({ isActive }) => "navitem" + (isActive ? " active" : "")}>
        <TagIcon /> Discount Analysis
      </NavLink>
      <div className="sidebar-foot">
        Unofficial client-side rebuild.<br />All processing happens in your browser — nothing uploads anywhere.
      </div>
    </div>
  );
}
