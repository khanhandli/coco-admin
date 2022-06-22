import { Spin } from 'antd';
import React from 'react';
import { postDataAPI } from '../../apis/fetchData';
import { getNotifications } from '../../utils/common';

const initialState = {
    email: '',
    password: '',
};

const Login = () => {
    const [loading, setLoading] = React.useState(false);

    const [valueLogin, setValueLogin] = React.useState(initialState);

    return (
        <div>
            {loading ? (
                <div className="h-screen w-screen flex items-center justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <section className=" gradient-form bg-gray-200 h-screen w-full flex justify-center">
                    <div className="container py-12 px-6 h-full">
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <div className="xl:w-10/12">
                                <div className="block bg-white shadow-lg rounded-lg">
                                    <div className="lg:flex lg:flex-wrap g-0">
                                        <div className="lg:w-6/12 px-4 md:px-0">
                                            <div className="md:p-12 md:mx-6">
                                                <div className="text-center">
                                                    <img
                                                        className="mx-auto w-48"
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                        alt="logo"
                                                    />
                                                    <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                                                        Shop Mỹ Phẩm CoCoAdmin
                                                    </h4>
                                                </div>
                                                <form>
                                                    <p className="mb-4">Hãy đăng nhập bằng tài khoản Admin</p>
                                                    <div className="mb-4">
                                                        <input
                                                            onChange={(e) =>
                                                                setValueLogin({ ...valueLogin, email: e.target.value })
                                                            }
                                                            value={valueLogin.email}
                                                            type="text"
                                                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                            id="exampleFormControlInput"
                                                            placeholder="Địa chỉ email"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <input
                                                            onChange={(e) =>
                                                                setValueLogin({
                                                                    ...valueLogin,
                                                                    password: e.target.value,
                                                                })
                                                            }
                                                            value={valueLogin.password}
                                                            type="password"
                                                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                            id="exampleFormControlInput1"
                                                            placeholder="Mật khẩu"
                                                        />
                                                    </div>
                                                    <div className="text-center pt-1 mb-12 pb-1">
                                                        <button
                                                            className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                            type="button"
                                                            data-mdb-ripple="true"
                                                            data-mdb-ripple-color="light"
                                                            style={{
                                                                background: `linear-gradient(
                                                            to right,
                                                            #ee7724,
                                                            #d8363a,
                                                            #dd3675,
                                                            #b44593
                                                          )`,
                                                            }}
                                                            onClick={async () => {
                                                                try {
                                                                    setLoading(true);
                                                                    const res = await postDataAPI('login', valueLogin);
                                                                    if (res.status === 200) {
                                                                        if (res?.data?.user?.role)
                                                                            return getNotifications(
                                                                                'Bạn không có quyền truy cập',
                                                                                'error'
                                                                            );

                                                                        localStorage.setItem('firstLoginAdmin', true);

                                                                        getNotifications(res.data.msg, 'success');
                                                                        setLoading(false);

                                                                        window.location.href = '/home';
                                                                    }
                                                                } catch (error) {
                                                                    getNotifications(
                                                                        error?.response.data?.msg,
                                                                        'error'
                                                                    );
                                                                    setLoading(false);
                                                                }
                                                            }}
                                                        >
                                                            Đăng nhập
                                                        </button>
                                                        <a className="text-gray-500" href="#!">
                                                            Quên mật khẩu?
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center justify-between pb-6">
                                                        <p className="mb-0 mr-2">Bạn chưa có tài khoản?</p>
                                                        <button
                                                            type="button"
                                                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                            data-mdb-ripple="true"
                                                            data-mdb-ripple-color="light"
                                                        >
                                                            Liên hệ ban quản lý
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div
                                            className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                            style={{
                                                background:
                                                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                                            }}
                                        >
                                            <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                                <h4 className="text-xl font-semibold mb-6">
                                                    Đổi mới mỗi ngày để thành công
                                                </h4>
                                                <p className="text-sm">
                                                    Trong khi hầu hết mọi người nghĩ về kinh doanh làm đẹp như mỹ phẩm,
                                                    nó đã phát triển về phạm vi và giờ đây bao gồm nhiều loại sản phẩm.
                                                    Ngoài mỹ phẩm, còn có nước hoa, chất làm sạch da, một loạt các sản
                                                    phẩm chăm sóc da khác, mỹ phẩm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Login;
