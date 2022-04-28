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

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const SideBarLeft = () => {
    const { pathname } = useLocation();

    return (
        <div className="w-[270px] 2xl:w-[290px] shadow-lg p-[35px] border-r-2 border-solid border-r-[#E2E2E2] sidebar_left">
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
                <div className="flex items-center mb-[40px]">
                    <CalendarOutlined style={{ fontSize: '18px', color: 'black', opacity: 0.4 }} />
                    <span className="text-[15px] font-[500] ml-[16px] text-black opacity-40">Activity</span>
                </div>
                <div className="flex items-center mb-[40px]">
                    <SettingOutlined style={{ fontSize: '18px', color: 'black', opacity: 0.4 }} />
                    <span className="text-[15px] font-[500] ml-[16px] text-black opacity-40">Setting</span>
                </div>
                <Divider className="mt-[30px] 2xl:mt-[60px]" />
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
                        <p>{text}</p>
                    </Panel>
                </Collapse>
                <Divider className="mt-[30px] 2xl:mt-[60px]" />
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
                        <p>{text}</p>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

export default SideBarLeft;
