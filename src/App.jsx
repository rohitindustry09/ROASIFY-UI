import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductAnalysis from "./pages/ProductAnalysis";
import QuadrantView from "./pages/QuadrantView";
import DiscountAnalysis from "./pages/DiscountAnalysis";
import { DataProvider } from "./state/DataContext";

export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <div className="app">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/product-analysis" replace />} />
            <Route path="/product-analysis" element={<ProductAnalysis />} />
            <Route path="/quadrant-view" element={<QuadrantView />} />
            <Route path="/discount-analysis" element={<DiscountAnalysis />} />
            <Route path="*" element={<Navigate to="/product-analysis" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </DataProvider>
  );
}
