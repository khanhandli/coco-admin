import React from 'react';
import { MessageOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import blog from '../../../assets/images/blog.png';
import sale from '../../../assets/images/sale.png';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../../hooks/useStore';
import { TimeDay } from '../../../utils/common';
import { Badge, Drawer } from 'antd';
import { getDataAPI } from '../../../apis/fetchData';
import moment from 'moment';

const stylesNumberInfo = 'text-[16px] text-[#11243D] font-bold text-center';
const titleInfo = 'text-[12px] text-[#707A89]';

const SideBarRight = () => {
    const [user, setUser] = useStore().user;
    const { pathname } = useLocation();
    const newUser = useStore().newUser;
    const newPost = useStore().newPost;
    const [products, setProducts] = useStore().products;
    const [visibleNoti, setVisibleNoti] = React.useState(false);
    const [listNoti, setListNoti] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const showDrawer = () => {
        setVisibleNoti(true);
    };

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('notification?limit=' + page * 4);
            if (res.status === 200) {
                setListNoti(res.data);
            }
        })();
    }, [page]);
    return (
        <div className="max-h-screen overflow-y-auto custom_scroll w-[350px] 2xl:w-[380px] shadow-lg p-[16px]">
            <div className="flex justify-between items-center mb-[50px] 2xl:mb-[80px] p-[10px]">
                <div>
                    <div className="text-[17px] text-[#11243D] font-bold mb-[5px]">Hi Admin</div>
                    <div className="text-[13px] text-[#707A89]">{TimeDay()}</div>
                </div>
                <div className="flex">
                    {/* <div className="cursor-pointer hover:bg-[#f3f3f3] h-[48px] mr-[10px] w-[48px] flex items-center justify-center sidebar_right_icon">
                        <MessageOutlined style={{ fontSize: '20px' }} />
                    </div> */}

                    <div
                        onClick={showDrawer}
                        className="cursor-pointer hover:bg-[#f3f3f3] h-[48px] mr-[10px] w-[48px] flex items-center justify-center sidebar_right_icon"
                    >
                        <Badge
                            count={listNoti?.data && listNoti?.data.length > 0 ? listNoti?.data?.length : 0}
                            overflowCount={10}
                        >
                            <BellOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                    </div>
                    <div
                        onClick={() => {
                            localStorage.removeItem('firstLoginAdmin');
                            window.location.reload();
                        }}
                        className="cursor-pointer hover:bg-[#f3f3f3] h-[48px] w-[48px] flex items-center justify-center sidebar_right_icon"
                    >
                        <LogoutOutlined style={{ fontSize: '20px' }} />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center">
                    <div className="shadow-lg bg-[#FF7901] h-[94px] w-[94px] relative rounded-md">
                        <img
                            src={user?.avatar}
                            alt="alt"
                            className="absolute rounded-md object-cover h-[78px] bottom-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="mt-[30px] text-[#11243D] text-[17px] font-bold mb-[4px]">{user.name}</h2>
                    <h5 className="text-[#707A89] text-[12px]">
                        {user?.story ? user?.story : 'UI/UX Designer @Redwhale'}
                    </h5>
                </div>
                <div className="p-[30px]">
                    <div className="flex justify-between">
                        <div>
                            <div className={stylesNumberInfo}>{newUser && newUser.length}</div>
                            <div className={titleInfo}>Người dùng</div>
                        </div>
                        <div>
                            <div className={stylesNumberInfo}>{newPost && newPost.length}</div>
                            <div className={titleInfo}>Bài đăng</div>
                        </div>
                        <div>
                            <div className={stylesNumberInfo}>{products && products.length}</div>
                            <div className={titleInfo}>Sản phẩm</div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4 mt-[24px]">
                        <div className="h-[40px] flex items-center justify-center bg-[#4F46BA] text-white cursor-pointer rounded-[10px]">
                            Xem Profile
                        </div>
                        <div className="h-[40px] flex items-center justify-center border-[1px] border-[solid] border-[#ccc] rounded-[10px]">
                            Sửa Profile
                        </div>
                    </div> */}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-[24px]">
                    <Link to="/post">
                        <div
                            className={`h-[190px] flex flex-col justify-center ${
                                pathname.includes('post') ? 'bg-[#bd9ee8]' : 'bg-[#F2E9FF]'
                            } hover:bg-[#bd9ee8] p-[15px] text-white cursor-pointer rounded-[10px]`}
                        >
                            <img src={blog} alt="blog" height="42px" width="42px" />
                            <h3 className="font-bold text-[20px] mt-[10px] text-[#51459E]">Bài đăng</h3>
                            <div className="font-bold text-[12px] text-[#51459E]">Bấm để thêm bài đăng</div>
                        </div>
                    </Link>
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
            <Drawer
                title="Thông báo"
                drawerStyle={{ background: '#f1f1f1' }}
                onClose={() => setVisibleNoti(!visibleNoti)}
                placement="right"
                visible={visibleNoti}
                className="list_noti"
            >
                <div>
                    {listNoti?.data &&
                        listNoti?.data?.length > 0 &&
                        listNoti?.data.map((item, index) => {
                            return (
                                <div key={index} className="w-full p-3 mt-2 bg-white rounded-2xl shadow-lg flex">
                                    <div className="w-[4.6rem] h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                        <img className="h-[16px] w-[16px]" src={item.img} alt="avt" />
                                    </div>
                                    <div className="pl-3">
                                        <p
                                            className="text-sm mb-1 leading-5"
                                            dangerouslySetInnerHTML={{ __html: item.title }}
                                        />

                                        <p className="text-xs leading-3 pt-1 text-gray-500">
                                            {moment(item.createdAt).fromNow()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    {listNoti?.total >= 4 && page * 4 < listNoti?.total && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setPage(page + 1)}
                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                                    Xem thêm
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </Drawer>
        </div>
    );
};

export default SideBarRight;
