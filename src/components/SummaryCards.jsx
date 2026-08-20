import React from "react";
import { fmtINR, fmtNum, fmtROI } from "../lib/format";

export default function SummaryCards({ totals }) {
  return (
    <div className="cards">
      <div className="card"><div className="lbl">Products</div><div className="val">{fmtNum(totals.products)}</div></div>
      <div className="card"><div className="lbl">Meta Spend</div><div className="val">{fmtINR(totals.metaSpend)}</div></div>
      <div className="card"><div className="lbl">Google Cost</div><div className="val">{fmtINR(totals.googleCost)}</div></div>
      <div className="card"><div className="lbl">Total Spend</div><div className="val">{fmtINR(totals.totalSpend)}</div></div>
      <div className="card"><div className="lbl">Revenue</div><div className="val">{fmtINR(totals.revenue)}</div></div>
      <div className="card"><div className="lbl">Overall ROI</div><div className={"val roi" + (totals.roi < 0 ? " neg" : "")}>{fmtROI(totals.roi)}</div></div>
    </div>
  );
}
