import React, { useMemo, useRef, useState } from "react";
import Topbar from "../components/Topbar";
import { readFileAsGrid, findHeaderRow, gridToObjects, buildColumnMap } from "../lib/fileParse";
import { fmtINR, fmtNum, fmtPct, fmtBytes } from "../lib/format";
import { CheckIcon, RefreshIcon, DownloadIcon, XIcon } from "../components/Icons";

const CANDIDATE_COLS = {
  code: ["discount code", "discount codes", "coupon", "promo code"],
  discountAmount: ["discount amount", "total discounts", "discounts"],
  orderTotal: ["total", "order total", "subtotal"],
  orderId: ["name", "order", "order id", "order number"],
  createdAt: ["created at", "date", "order date"],
};

const REQUIRED_FRAGMENTS = ["discount"];

function toNum(v) {
  if (v === null || v === undefined || v === "") return 0;
  const n = parseFloat(String(v).replace(/,/g, "").replace(/[₹$]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function DiscountAnalysis() {
  const [fileInfo, setFileInfo] = useState(null);
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const grid = await readFileAsGrid(file);
      const headerIdx = findHeaderRow(grid, REQUIRED_FRAGMENTS);
      if (headerIdx === -1) {
        throw new Error(
          "No discount-related column found. Export orders from Shopify (Orders → Export) with the \"Discount Code\" and \"Discount Amount\" columns included."
        );
      }
      const objRows = gridToObjects(grid, headerIdx);
      if (!objRows.length) throw new Error("No data rows found in this file.");
      const cols = buildColumnMap(Object.keys(objRows[0]), CANDIDATE_COLS);
      if (!cols.discountAmount && !cols.code) {
        throw new Error("Couldn't find discount code or discount amount columns in this file.");
      }
      const parsed = objRows.map((r) => ({
        code: (cols.code ? String(r[cols.code] ?? "").trim() : "") || "(no code)",
        discount: cols.discountAmount ? toNum(r[cols.discountAmount]) : 0,
        total: cols.orderTotal ? toNum(r[cols.orderTotal]) : 0,
        orderId: cols.orderId ? String(r[cols.orderId] ?? "") : "",
      }));
      setRows(parsed);
      setFileInfo({ name: file.name, size: file.size, rowCount: parsed.length });
    } catch (e) {
      setError(e.message || "Couldn't read this file.");
    } finally {
      setBusy(false);
    }
  }

  const byCode = useMemo(() => {
    if (!rows) return [];
    const map = new Map();
    for (const r of rows) {
      const key = r.code || "(no code)";
      let acc = map.get(key);
      if (!acc) {
        acc = { code: key, orders: 0, discount: 0, revenue: 0 };
        map.set(key, acc);
      }
      acc.orders += 1;
      acc.discount += r.discount;
      acc.revenue += r.total;
    }
    return Array.from(map.values())
      .filter((r) => !search.trim() || r.code.toLowerCase().includes(search.trim().toLowerCase()))
      .sort((a, b) => b.discount - a.discount);
  }, [rows, search]);

  const totals = useMemo(() => {
    if (!rows) return null;
    const totalOrders = rows.length;
    const discountedOrders = rows.filter((r) => r.discount > 0).length;
    const totalDiscount = rows.reduce((a, r) => a + r.discount, 0);
    const totalRevenue = rows.reduce((a, r) => a + r.total, 0);
    const grossRevenue = totalRevenue + totalDiscount;
    return {
      totalOrders,
      discountedOrders,
      discountRate: totalOrders ? (discountedOrders / totalOrders) * 100 : 0,
      totalDiscount,
      totalRevenue,
      discountOfRevenue: grossRevenue > 0 ? (totalDiscount / grossRevenue) * 100 : 0,
      aov: totalOrders ? totalRevenue / totalOrders : 0,
      aovDiscounted: discountedOrders ? rows.filter((r) => r.discount > 0).reduce((a, r) => a + r.total, 0) / discountedOrders : 0,
      aovFullPrice: (totalOrders - discountedOrders) > 0
        ? rows.filter((r) => r.discount === 0).reduce((a, r) => a + r.total, 0) / (totalOrders - discountedOrders)
        : 0,
    };
  }, [rows]);

  function downloadCSV() {
    const lines = ["Discount Code,Orders,Total Discount,Revenue,Avg Discount Per Order"];
    byCode.forEach((r) => {
      lines.push([`"${r.code.replace(/"/g, '""')}"`, r.orders, r.discount.toFixed(2), r.revenue.toFixed(2), (r.discount / r.orders).toFixed(2)].join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "roasify_discount_analysis.csv";
    a.click();
  }

  return (
    <div className="main">
      <Topbar crumbs={["Discount Analysis", "By Code"]} exportDisabled={!rows} onExport={downloadCSV} />
      <div className="content">
        <h1>Discount Analysis</h1>
        <p className="sub">See how much revenue discount codes are costing you, and which ones actually earn their keep.</p>

        <div className="note-banner">
          I wasn't given screenshots of this page's real layout, so this is a best-effort rebuild inferred from the page name and the app's design system — not a verified copy. The Product Analysis and Quadrant View pages are the ones checked directly against your screenshots.
        </div>

        <div className="upload-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className={"upload-card" + (fileInfo ? " filled" : "")}>
            {fileInfo && (
              <button className="close-x" onClick={() => { setFileInfo(null); setRows(null); }}>
                <XIcon />
              </button>
            )}
            <div className="uh">
              <div className="src-icon shopify">S</div>
              <div>
                <div className="name">Shopify Orders Export <span className="badge-req">Required</span></div>
                <div className="fields">Discount Code · Discount Amount · Total · Order · Created At</div>
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.txt"
              style={{ display: "none" }}
              onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ""; }}
            />

            {fileInfo ? (
              <div className="file-chip">
                <div className="fc-left">
                  <span className="fc-check"><CheckIcon /></span>
                  <div style={{ minWidth: 0 }}>
                    <div className="fc-name">{fileInfo.name}</div>
                    <div className="fc-meta">{fmtBytes(fileInfo.size)} · {fileInfo.rowCount.toLocaleString("en-IN")} orders</div>
                  </div>
                </div>
                <div className="fc-actions">
                  <button className="icon-btn" onClick={() => inputRef.current?.click()}><RefreshIcon /></button>
                </div>
              </div>
            ) : (
              <div
                className={"dropzone" + (dragOver ? " dragover" : "")}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
              >
                <div className="dz-main">{busy ? "Reading file…" : "Drop CSV or Excel here"}</div>
                <div className="dz-sub">Shopify → Orders → Export · or click to browse · max 50 MB</div>
              </div>
            )}
            {error && <div className="error-msg">{error}</div>}
          </div>
        </div>

        {!rows && (
          <div className="empty-state">
            <h3>No discount data yet</h3>
            <div>Export your orders from Shopify admin with discount columns included, then drop the file above.</div>
          </div>
        )}

        {rows && totals && (
          <>
            <div className="cards quad4" style={{ marginTop: 18 }}>
              <div className="card"><div className="lbl">Total Orders</div><div className="val">{fmtNum(totals.totalOrders)}</div></div>
              <div className="card"><div className="lbl">Discounted Orders</div><div className="val">{fmtPct(totals.discountRate)}</div></div>
              <div className="card"><div className="lbl">Total Discount Given</div><div className="val">{fmtINR(totals.totalDiscount)}</div></div>
              <div className="card"><div className="lbl">Discount % of Gross Rev</div><div className="val">{fmtPct(totals.discountOfRevenue)}</div></div>
            </div>
            <div className="cards" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: 12 }}>
              <div className="card"><div className="lbl">Overall AOV</div><div className="val">{fmtINR(totals.aov)}</div></div>
              <div className="card"><div className="lbl">AOV — Discounted Orders</div><div className="val">{fmtINR(totals.aovDiscounted)}</div></div>
              <div className="card"><div className="lbl">AOV — Full Price Orders</div><div className="val">{fmtINR(totals.aovFullPrice)}</div></div>
            </div>

            <div className="section-title" style={{ marginTop: 26 }}>Discount codes</div>
            <div className="toolbar">
              <input className="search" placeholder="Search discount code…" value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className="btn-primary" onClick={downloadCSV}><DownloadIcon /> Download CSV</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Discount Code</th>
                    <th>Orders</th>
                    <th>Total Discount</th>
                    <th>Revenue (net)</th>
                    <th>Avg Discount / Order</th>
                  </tr>
                </thead>
                <tbody>
                  {byCode.map((r) => (
                    <tr key={r.code}>
                      <td>{r.code}</td>
                      <td className="mono">{fmtNum(r.orders)}</td>
                      <td className="mono">{fmtINR(r.discount)}</td>
                      <td className="mono">{fmtINR(r.revenue)}</td>
                      <td className="mono">{fmtINR(r.discount / r.orders)}</td>
                    </tr>
                  ))}
                  {byCode.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: "center", padding: 24, color: "var(--text-dim)" }}>No codes match this search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
