import React, { useMemo } from "react";
import { fmtINR, fmtROI } from "../lib/format";

export default function TopPerformers({ rows, count = 3, minSpend = 1 }) {
  const top = useMemo(() => {
    return rows
      .filter((r) => r.totalSpend > minSpend)
      .slice()
      .sort((a, b) => {
        const av = a.roi === Infinity ? Number.MAX_VALUE : a.roi;
        const bv = b.roi === Infinity ? Number.MAX_VALUE : b.roi;
        return bv - av;
      })
      .slice(0, count);
  }, [rows, count, minSpend]);

  if (!top.length) return <div className="sub">Not enough spend-bearing products yet.</div>;

  return (
    <div className="top3">
      {top.map((r) => (
        <div className="top-card" key={r.id}>
          <div className="roi">{fmtROI(r.roi)}</div>
          <div className="ttitle">{r.productTitle} — {r.variantTitle || "—"}</div>
          <div className="meta">Meta Spend {fmtINR(r.metaSpend)} · Total Spend {fmtINR(r.totalSpend)}</div>
          <div className="meta">Revenue {fmtINR(r.revenue)} · {r.items} units</div>
        </div>
      ))}
    </div>
  );
}
