import React from "react";

export default function Topbar({ crumbs, onShare, onExport, exportDisabled }) {
  return (
    <div className="topbar">
      <div className="crumbs">
        Workspace / {crumbs.slice(0, -1).map((c, i) => <span key={i}>{c} / </span>)}
        <b>{crumbs[crumbs.length - 1]}</b>
      </div>
      <div className="topbar-actions">
        <div className="pill">All data ▾</div>
        <div className="pill">₹ INR ▾</div>
        <div className="pill" onClick={onShare}>⇪ Share</div>
        <div
          className={"pill primary" + (exportDisabled ? " " : "")}
          onClick={exportDisabled ? undefined : onExport}
          style={exportDisabled ? { opacity: 0.5, cursor: "default" } : {}}
        >
          ⬇ Export
        </div>
      </div>
    </div>
  );
}
