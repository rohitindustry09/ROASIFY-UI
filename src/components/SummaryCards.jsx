import React from "react";
import { fmtINR, fmtNum, fmtROI } from "../lib/format";
import { useAnimatedNumber } from "../lib/useAnimatedNumber";

function Stat({ label, value, fmt, className = "" }) {
  const shown = useAnimatedNumber(value);
  return (
    <div className="card">
      <div className="lbl">{label}</div>
      <div className={"val " + className}>{fmt(shown)}</div>
    </div>
  );
}

export default function SummaryCards({ totals }) {
  return (
    <div className="cards">
      <Stat label="Products" value={totals.products} fmt={fmtNum} />
      <Stat label="Meta Spend" value={totals.metaSpend} fmt={fmtINR} />
      <Stat label="Google Cost" value={totals.googleCost} fmt={fmtINR} />
      <Stat label="Total Spend" value={totals.totalSpend} fmt={fmtINR} />
      <Stat label="Revenue" value={totals.revenue} fmt={fmtINR} />
      <Stat label="Overall ROI" value={totals.roi} fmt={fmtROI} className={"roi" + (totals.roi < 0 ? " neg" : "")} />
    </div>
  );
}
