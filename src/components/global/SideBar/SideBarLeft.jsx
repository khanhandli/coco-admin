import React from 'react';
import logo from '../../../assets/images/logo.png';
import {
    HomeOutlined,
    ContainerOutlined,
    CalendarOutlined,
    SettingOutlined,
    CaretRightOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons';
import { Divider, Collapse } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { getDataAPI } from '../../../apis/fetchData';
import moment from 'moment';
import { useStore } from '../../../hooks/useStore';
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const SideBarLeft = () => {
    const { pathname } = useLocation();
    const newPost = useStore().newPost;
    const newUser = useStore().newUser;

    return (
        <div className="max-h-screen overflow-y-auto custom_scroll w-[270px] 2xl:w-[290px] shadow-lg p-[35px] border-r-2 border-solid border-r-[#E2E2E2] sidebar_left">
            <div className="flex items-center mb-[50px] 2xl:mb-[80px]">
                <img src={logo} alt="logo" />
                <div className="ml-[11px]">
                    <div className="text-[15px] mb-[1px] text-[#6D6D6D] font-bold">CoCoShop Admin</div>
                    <div className="text-[11px] text-[#A6A6A6]">Growth & Marketing</div>
                </div>
            </div>
            <div>
                <Link to="/">
                    <div className="flex items-center mb-[40px]">
                        <HomeOutlined
                            style={{ fontSize: '18px', color: 'black', opacity: pathname === '/' ? 1 : 0.4 }}
                        />
                        <span
                            className={`text-[15px] font-[500] ml-[16px] text-black ${
                                pathname === '/' ? 'opacity-100' : 'opacity-40'
                            }`}
                        >
                            Dashboard
                        </span>
                    </div>
                </Link>
                <Link to="/categories">
                    <div className="flex items-center mb-[40px]">
                        <ContainerOutlined
                            style={{
                                fontSize: '18px',
                                color: 'black',
                                opacity: pathname.includes('categories') ? 1 : 0.4,
                            }}
                        />
                        <span
                            className={`text-[15px] font-[500] ml-[16px] text-black ${
                                pathname.includes('categories') ? 'opacity-100' : 'opacity-40'
                            }`}
                        >
                            Ql Danh mục
                        </span>
                    </div>
                </Link>
                <Link to="/product">
                    <div className="flex items-center mb-[40px]">
                        <CodeSandboxOutlined
                            style={{
                                fontSize: '18px',
                                color: 'black',
                                opacity: pathname.includes('product') ? 1 : 0.4,
                            }}
                        />
                        <span
                            className={`text-[15px] font-[500] ml-[16px] text-black ${
                                pathname.includes('product') ? 'opacity-100' : 'opacity-40'
                            }`}
                        >
                            Ql Sản phẩm
                        </span>
                    </div>
                </Link>
                {/* <div className="flex items-center mb-[40px]">
                    <CalendarOutlined style={{ fontSize: '18px', color: 'black', opacity: 0.4 }} />
                    <span className="text-[15px] font-[500] ml-[16px] text-black opacity-40">Activity</span>
                </div> */}
                <div className="flex items-center mb-[40px]">
                    <SettingOutlined style={{ fontSize: '18px', color: 'black', opacity: 0.4 }} />
                    <span className="text-[15px] font-[500] ml-[16px] text-black opacity-40">Setting</span>
                </div>
                <Divider className="mt-[20px] 2xl:mt-[20px]" />
                <Collapse
                    bordered={false}
                    ghost
                    defaultActiveKey={['1']}
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined style={{ fontSize: '16px' }} rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                >
                    <Panel header="Bài đăng" key="1" className="site-collapse-custom-panel">
                        {newPost &&
                            newPost.length > 0 &&
                            newPost.map((item, index) => {
                                if (index < 3)
                                    return (
                                        <div key={index} className="flex items-center mt-[14px]">
                                            <img
                                                className="h-[32px] w-[32px] object-cover rounded-full"
                                                src={item.image}
                                                alt={item.title}
                                            />
                                            <div className="flex flex-col">
                                                <span className="ml-2 truncate text-[15px] font-[500] text-black">
                                                    <Link to={`/post/edit/${item._id}`}>{item.title}</Link>
                                                </span>
                                                <span className="ml-2 truncate text-[12px] text-[#ccc]">
                                                    {moment(item.createdAt).format('hh:mm DD/MM/YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    );
                            })}
                    </Panel>
                </Collapse>
                <Divider className="mt-[10px] 2xl:mt-[20px]" />
                <Collapse
                    bordered={false}
                    ghost
                    defaultActiveKey={['1']}
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined style={{ fontSize: '16px' }} rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                >
                    <Panel header="Người dùng mới" key="1" className="site-collapse-custom-panel">
                        {newUser &&
                            newUser.length > 0 &&
                            newUser.map((item, index) => {
                                if (index < 3)
                                    return (
                                        <div key={index} className="flex items-center mt-[14px]">
                                            <img
                                                className="h-[32px] w-[32px] object-cover rounded-full"
                                                src={item.avatar}
                                                alt={item.name}
                                            />
                                            <div className="flex flex-col">
                                                <span className="ml-2 truncate text-[15px] font-[500] text-black">
                                                    <Link to={`/edit/user/${item.id}`}>{item.name}</Link>
                                                </span>
                                                <span className="ml-2 truncate text-[12px] text-[#ccc]">
                                                    {moment(item.createdAt).format('hh:mm DD/MM/YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    );
                            })}
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

export default SideBarLeft;
