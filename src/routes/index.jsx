import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/global/NotFound';
import Categories from '../features/categories/page';
import CreateCategory from '../features/categories/page/create';
import EditCategory from '../features/categories/page/edit';
import HomePage from '../features/home/page';
import PostPage from '../features/post/page';
import CreatePost from '../features/post/page/create';
import EditPost from '../features/post/page/edit';
import Product from '../features/product/page';
import CreateProduct from '../features/product/page/create';
import EditProduct from '../features/product/page/edit';
import Promotion from '../features/promotion/page';
import CreateExplore from '../features/promotion/page/create_explore';
import EditExplore from '../features/promotion/page/edit_explore';
import UserPage from '../features/user/page';

const RouterList = () => {
    return (
        <Routes>
            <Route path="*" element={<HomePage />} />
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
            <Route path="/post">
                <Route index element={<PostPage />} />
                <Route path="/post/create" element={<CreatePost />} />
                <Route path="/post/edit/:id" element={<EditPost />} />
            </Route>
            <Route path="/user">
                <Route index element={<UserPage />} />
            </Route>
        </Routes>
    );
};

export default RouterList;
