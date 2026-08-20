import React from "react";
import { fmtINR, fmtROI } from "../lib/format";
import { DownloadIcon, XIcon } from "./Icons";

// Formula reverse-engineered from the live app's own numbers:
// suggestedBudget = currentSpend * 1.5
// expectedRevenue = revenue * 1.5 * 0.85   (i.e. +50% spend, 15% conservative ROI decay)
// estRoi          = originalRoi * 0.85
export default function ScaleSpendModal({ champions, onClose }) {
  const eligible = champions.filter((r) => r.totalSpend > 0).sort((a, b) => (b.roi === Infinity ? 1e18 : b.roi) - (a.roi === Infinity ? 1e18 : a.roi)).slice(0, 10);
  const totalAdditional = eligible.reduce((acc, r) => acc + r.revenue * 0.275, 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>Scale-Spend Plan — Champions</h3>
            <div className="msub">+50% budget · 15% conservative ROI decay</div>
          </div>
          <button className="icon-btn" onClick={onClose}><XIcon /></button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Spend</th>
              <th>Suggested Budget</th>
              <th>Expected Revenue</th>
              <th>Est. ROI</th>
            </tr>
          </thead>
          <tbody>
            {eligible.map((r) => (
              <tr key={r.id}>
                <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.productTitle}</td>
                <td className="mono">{fmtINR(r.totalSpend)}</td>
                <td className="mono">{fmtINR(r.totalSpend * 1.5)}</td>
                <td className="mono" style={{ color: "var(--green)" }}>{fmtINR(r.revenue * 1.275)}</td>
                <td className="mono" style={{ color: "var(--green)" }}>{fmtROI(r.roi === Infinity ? Infinity : r.roi * 0.85)}</td>
              </tr>
            ))}
            {eligible.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: 20, color: "var(--text-dim)" }}>No Champions with measurable spend yet — these are pure organic winners.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10 }}>
          * Conservative estimate: 15% ROI decay at 1.5× spend. Actual results may vary. Estimated additional revenue across these products: {fmtINR(totalAdditional)}.
        </div>

        <div className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button
            className="btn-primary"
            onClick={() => {
              const lines = ["Product,Current Spend,Suggested Budget,Expected Revenue,Est ROI"];
              eligible.forEach((r) => {
                lines.push(
                  [`"${r.productTitle.replace(/"/g, '""')}"`, r.totalSpend.toFixed(2), (r.totalSpend * 1.5).toFixed(2), (r.revenue * 1.275).toFixed(2), r.roi === Infinity ? "inf" : (r.roi * 0.85).toFixed(2)].join(",")
                );
              });
              const blob = new Blob([lines.join("\n")], { type: "text/csv" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "scale_spend_plan.csv";
              a.click();
            }}
          >
            <DownloadIcon /> Download Plan CSV
          </button>
        </div>
      </div>
    </div>
  );
}
