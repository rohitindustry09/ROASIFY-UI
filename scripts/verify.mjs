import fs from "fs";
import Papa from "papaparse";
import { findHeaderRow, gridToObjects } from "../src/lib/fileParse.js";
import { aggregateMeta, aggregateGoogle, aggregateShopify, mergeAll, quadrantSummary, requiredFragmentsFor } from "../src/lib/merge.js";

const UP = "/mnt/user-data/uploads";

function readGrid(path) {
  const text = fs.readFileSync(path, "utf-8");
  const res = Papa.parse(text, { skipEmptyLines: true });
  return res.data;
}

function loadObjects(path, source) {
  const grid = readGrid(path);
  const idx = findHeaderRow(grid, requiredFragmentsFor(source));
  if (idx === -1) throw new Error("header not found for " + source);
  return gridToObjects(grid, idx);
}

const metaRows = loadObjects(`${UP}/Meta-R-1May-31Jul.csv`, "meta");
const shopifyRows = loadObjects(`${UP}/Shopify-R-1May-31Jul.csv`, "shopify");
const googleRows = loadObjects(`${UP}/Google-R-1May-31Jul.csv`, "google");

console.log("Row counts -> meta:", metaRows.length, "shopify:", shopifyRows.length, "google:", googleRows.length);

const metaMap = aggregateMeta(metaRows);
const shopifyMap = aggregateShopify(shopifyRows);
const googleMap = aggregateGoogle(googleRows);

console.log("Unique variant ids -> meta:", metaMap.size, "shopify:", shopifyMap.size, "google:", googleMap.size);

const merged = mergeAll({ metaMap, shopifyMap, googleMap });
const t = merged.totals;

function inr(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }

console.log("\n=== SUMMARY ===");
console.log("Products:", t.products, " (expected 17701 from live app, 17699 from python replica)");
console.log("Meta Spend:", inr(t.metaSpend), " (expected ₹48,34,876)");
console.log("Google Cost:", inr(t.googleCost), " (expected ₹3,16,953 give or take)");
console.log("Total Spend:", inr(t.totalSpend), " (expected ₹51,51,828 give or take)");
console.log("Revenue:", inr(t.revenue), " (expected ₹3,90,43,698)");
console.log("Overall ROI:", t.roi.toFixed(2) + "x", " (expected 7.6x)");
console.log("Items sold:", t.items, " (expected 2408)");
console.log("Spend threshold:", inr(merged.spendThreshold), " (expected ₹291)");
console.log("Revenue threshold:", inr(merged.revenueThreshold), " (expected ₹2,206)");

const q = quadrantSummary(merged.rows);
console.log("\n=== QUADRANTS ===");
for (const [k, v] of Object.entries(q)) {
  console.log(k.padEnd(11), "products:", v.products, " spend:", inr(v.spend), " revenue:", inr(v.revenue), " roi:", v.roi.toFixed(2) + "x");
}

const top = merged.rows.filter(r => r.totalSpend > 1).sort((a,b) => (b.roi===Infinity?1e18:b.roi) - (a.roi===Infinity?1e18:a.roi)).slice(0,3);
console.log("\n=== TOP 3 ===");
for (const r of top) {
  console.log(r.productTitle, "-", r.variantTitle, " ROI:", r.roi.toFixed(1)+"x", " revenue:", inr(r.revenue));
}
