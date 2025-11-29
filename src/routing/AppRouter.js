import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import OrderListPage from "../pages/OrderListPage";
import AppLayout from "../layouts/AppLayout";
;

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/orders" element={<OrderListPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppRouter;

