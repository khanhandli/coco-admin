import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../features/auth/Login';

const adminRouter = () => {
    return (
        <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default adminRouter;
