import React from 'react';
import { MessageOutlined, BellOutlined } from '@ant-design/icons';
import blog from '../../../assets/images/blog.png';
import sale from '../../../assets/images/sale.png';
import { Link, useLocation } from 'react-router-dom';

const SideBarRight = () => {
    const { pathname } = useLocation();

    return (
        <div className="w-[350px] 2xl:w-[380px] shadow-lg p-[16px]">
            <div className="flex justify-between items-center mb-[50px] 2xl:mb-[80px] p-[10px]">
                <div>
                    <div className="text-[17px] text-[#11243D] font-bold mb-[5px]">Hi Admin</div>
                    <div className="text-[13px] text-[#707A89]">Good Morning!</div>
                </div>
                <div className="flex">
                    <div className=" h-[48px] mr-[10px] w-[48px] flex items-center justify-center sidebar_right_icon">
                        <MessageOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <div className=" h-[48px] w-[48px] flex items-center justify-center sidebar_right_icon">
                        <BellOutlined style={{ fontSize: '20px' }} />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <div className="shadow-lg bg-[#FF7901] h-[94px] w-[94px] rounded-md"></div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="mt-[30px] text-[#11243D] text-[17px] font-bold mb-[4px]">Nguyễn Như Ý</h2>
                    <h5 className="text-[#707A89] text-[12px]">UI/UX Designer @Redwhale</h5>
                </div>
                <div className="p-[30px]">
                    <div className="flex justify-between">
                        <div>
                            <div className="text-[16px] text-[#11243D] font-bold">786K</div>
                            <div className="text-[12px] text-[#707A89]">Followers</div>
                        </div>
                        <div>
                            <div className="text-[16px] text-[#11243D] font-bold">786K</div>
                            <div className="text-[12px] text-[#707A89]">Followers</div>
                        </div>
                        <div>
                            <div className="text-[16px] text-[#11243D] font-bold">786K</div>
                            <div className="text-[12px] text-[#707A89]">Followers</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-[24px]">
                        <div className="h-[40px] flex items-center justify-center bg-[#4F46BA] text-white cursor-pointer rounded-[10px]">
                            Xem Profile
                        </div>
                        <div className="h-[40px] flex items-center justify-center border-[1px] border-[solid] border-[#ccc] rounded-[10px]">
                            Sửa Profile
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-[24px]">
                    <div className="h-[190px] flex flex-col justify-center bg-[#F2E9FF] hover:bg-[#bd9ee8] p-[15px] text-white cursor-pointer rounded-[10px]">
                        <img src={blog} alt="blog" height="42px" width="42px" />
                        <h3 className="font-bold text-[20px] mt-[10px] text-[#51459E]">Bài đăng</h3>
                        <div className="font-bold text-[12px] text-[#51459E]">Bấm để thêm bài đăng</div>
                    </div>
                    <Link to="/promotion">
                        <div
                            className={`h-[190px] flex flex-col justify-center ${
                                pathname.includes('promotion') ? 'bg-[#e4ad9e]' : 'bg-[#FEF3F0]'
                            } hover:bg-[#e4ad9e] p-[15px] text-white cursor-pointer rounded-[10px]`}
                        >
                            <img src={sale} alt="sale" height="42px" width="42px" />
                            <h3 className="font-bold text-[20px] mt-[10px] text-[#AC6755]">Khuyến mại</h3>
                            <div className="font-bold text-[12px] text-[#AC6755]">Bấm để tạo khuyến mại</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBarRight;
