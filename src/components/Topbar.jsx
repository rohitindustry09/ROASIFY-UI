import React from "react";
import { ChevronDownIcon } from "./Icons";

export default function Topbar({ crumbs, onShare, onExport, exportDisabled }) {
  return (
    <div className="topbar">
      <div className="crumbs">
        Workspace / {crumbs.slice(0, -1).map((c, i) => <span key={i}>{c} / </span>)}
        <b>{crumbs[crumbs.length - 1]}</b>
      </div>
      <div className="topbar-actions">
        <div className="pill pill-outline">All data <ChevronDownIcon width={11} height={11} /></div>
        <div className="pill pill-outline">INR <ChevronDownIcon width={11} height={11} /></div>
        <div className="pill pill-outline" onClick={onShare}>Share</div>
        <div
          className={"pill pill-solid" + (exportDisabled ? " disabled" : "")}
          onClick={exportDisabled ? undefined : onExport}
        >
          Export
        </div>
      </div>
    </div>
  );
}
