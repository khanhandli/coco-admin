import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { getDataAPI } from './apis/fetchData';
import { getNotifications } from './utils/common';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [user, setUser] = useState();

    const [newPost, setNewPost] = useState([]);
    const [newUser, setnewUser] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLoginAdmin');

        if (firstLogin) {
            const refreshToken = async () => {
                const res = await getDataAPI('refresh_token');
                if (res.status === 200) {
                    if (!res?.data?.user?.role) {
                        localStorage.removeItem('firstLoginAdmin');
                        getNotifications('Bạn không có quyền truy cập', 'error');
                        return;
                    }
                    setToken(res.data.accesstoken);
                    setUser(res.data.user);
                }

                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);
            };

            refreshToken();
        }
    }, []);

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('post');
            const res2 = await getDataAPI('allInfor');
            if (res.status === 200) {
                setNewPost(res.data);
            }
            if (res2.status === 200) {
                setnewUser(res2.data);
            }
        })();
    }, []);

    const state = {
        newPost: newPost,
        newUser: newUser,
        products: [products, setProducts],
        token: [token, setToken],
        user: [user, setUser],
    };
    return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
