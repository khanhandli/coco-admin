import { Spin } from 'antd';
import React from 'react';
import SideBarLeft from '../global/SideBar/SideBarLeft';
import SideBarRight from '../global/SideBar/SideBarRight';

const AppLayout = ({ children, loading }) => {
    return (
        <Spin spinning={loading ? loading : false} tip="Đang tải dữ liệu">
            <div className="flex min-h-screen">
                <SideBarLeft />
                <div className="h-screen overflow-y-auto hidden_scroll p-[20px] bg-[#FAFAFA] flex-1">{children}</div>
                <SideBarRight />
            </div>
        </Spin>
    );
};

export default AppLayout;
