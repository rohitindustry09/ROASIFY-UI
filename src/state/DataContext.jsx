import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { get, set, del } from "idb-keyval";
import { aggregateMeta, aggregateGoogle, aggregateShopify, mergeAll } from "../lib/merge";

const DataCtx = createContext(null);
const STORE_KEY = "roasify:sources:v1";

function mapToArray(map) {
  return map ? Array.from(map.entries()) : [];
}
function arrayToMap(arr) {
  return new Map(arr || []);
}

const EMPTY_SOURCE = null;

export function DataProvider({ children }) {
  const [sources, setSources] = useState({ meta: EMPTY_SOURCE, shopify: EMPTY_SOURCE, google: EMPTY_SOURCE });
  const [merged, setMerged] = useState(null);
  const [runMeta, setRunMeta] = useState(null); // { runId, mergedAt }
  const [loaded, setLoaded] = useState(false);

  // Load persisted sources on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await get(STORE_KEY);
        if (saved) {
          const restored = {};
          for (const key of ["meta", "shopify", "google"]) {
            const s = saved[key];
            restored[key] = s
              ? { ...s, map: arrayToMap(s.mapArray), mapArray: undefined }
              : null;
          }
          setSources(restored);
        }
      } catch (e) {
        console.warn("Could not restore saved sources", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next) => {
    const toSave = {};
    for (const key of ["meta", "shopify", "google"]) {
      const s = next[key];
      toSave[key] = s ? { name: s.name, size: s.size, rowCount: s.rowCount, mapArray: mapToArray(s.map) } : null;
    }
    try {
      await set(STORE_KEY, toSave);
    } catch (e) {
      console.warn("Could not persist sources (data too large for storage?)", e);
    }
  }, []);

  const setFile = useCallback(
    (source, { name, size, rows }) => {
      let map;
      if (source === "meta") map = aggregateMeta(rows);
      else if (source === "shopify") map = aggregateShopify(rows);
      else if (source === "google") map = aggregateGoogle(rows);
      const entry = { name, size, rowCount: rows.length, map };
      setSources((prev) => {
        const next = { ...prev, [source]: entry };
        persist(next);
        return next;
      });
      setMerged(null);
      setRunMeta(null);
    },
    [persist]
  );

  const clearFile = useCallback(
    (source) => {
      setSources((prev) => {
        const next = { ...prev, [source]: null };
        persist(next);
        return next;
      });
      setMerged(null);
      setRunMeta(null);
    },
    [persist]
  );

  const clearAll = useCallback(async () => {
    setSources({ meta: null, shopify: null, google: null });
    setMerged(null);
    setRunMeta(null);
    await del(STORE_KEY);
  }, []);

  const runMergeNow = useCallback(() => {
    if (!sources.meta || !sources.shopify) return;
    const result = mergeAll({
      metaMap: sources.meta.map,
      shopifyMap: sources.shopify.map,
      googleMap: sources.google?.map,
    });
    setMerged(result);
    const now = new Date();
    const runId = `pa_${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(
      now.getDate()
    ).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    setRunMeta({ runId, mergedAt: now.toISOString() });
  }, [sources]);

  const canMerge = Boolean(sources.meta && sources.shopify);

  const value = useMemo(
    () => ({ sources, setFile, clearFile, clearAll, merged, runMergeNow, canMerge, runMeta, loaded }),
    [sources, setFile, clearFile, clearAll, merged, runMergeNow, canMerge, runMeta, loaded]
  );

  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}

export function useData() {
  const ctx = useContext(DataCtx);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
