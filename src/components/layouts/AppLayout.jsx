import React from 'react';
import SideBarLeft from '../global/SideBar/SideBarLeft';
import SideBarRight from '../global/SideBar/SideBarRight';

const AppLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <SideBarLeft />
            <div className="p-[20px] bg-[#FAFAFA] flex-1">{children}</div>
            <SideBarRight />
        </div>
    );
};

export default AppLayout;
