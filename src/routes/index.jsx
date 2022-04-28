import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/global/NotFound';
import Categories from '../features/categories/page';
import CreateCategory from '../features/categories/page/create';
import EditCategory from '../features/categories/page/edit';
import HomePage from '../features/home/page';
import Product from '../features/product/page';
import CreateProduct from '../features/product/page/create';
import EditProduct from '../features/product/page/edit';
import Promotion from '../features/promotion/page';
import CreateExplore from '../features/promotion/page/create_explore';
import EditExplore from '../features/promotion/page/edit_explore';

const RouterList = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/promotion">
                <Route index element={<Promotion />} />
                <Route path="/promotion/create_explore" element={<CreateExplore />} />
                <Route path="/promotion/edit_explore/:id" element={<EditExplore />} />
            </Route>
            <Route path="/categories">
                <Route index element={<Categories />} />
                <Route path="/categories/create" element={<CreateCategory />} />
                <Route path="/categories/edit/:id" element={<EditCategory />} />
            </Route>

            <Route path="/product">
                <Route index element={<Product />} />
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
            </Route>
        </Routes>
    );
};

export default RouterList;
