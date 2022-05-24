import React from 'react';
import { postDataAPI } from '../../../apis/fetchData';
import AppLayout from '../../../components/layouts/AppLayout';
import Statistics from '../components/Statistics';
import moment from 'moment';
import ChartColumn from '../components/ChartColumn';
import TableOrder from '../components/TableOrder';
import { Avatar, Col, Row, Space, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useStore } from '../../../hooks/useStore';
import ListButtonOrder from '../components/ListButtonOrder';
import PieChart from '../components/PieChart';
import PieChartBold from '../components/PieChartBold';
import PieQuarter from '../components/PieQuarter';
import PieColumn from '../components/PieColumn';

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const colorActive =
    'inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group';
const colorIconActive = 'mr-2 w-5 h-5 text-blue-600 dark:text-blue-500';

const colorNotActive =
    'inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group';
const colorNotIconActive =
    'mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300';

const listTabOrder = ['Danh sách đơn hàng', 'Biểu đồ thống kế'];

const HomePage = () => {
    const [user, setUser] = useStore().user;

    const [reportProduct, setReportProduct] = React.useState([]);
    const [reportPayment, setReportPayment] = React.useState([]);
    const [reportUser, setReportUser] = React.useState([]);
    const [reportPaymentProduct, setReportPaymentProduct] = React.useState([]);

    const [startDate, setStartDate] = React.useState(moment().add(-100, 'days').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = React.useState(moment().add(1, 'days').format('YYYY-MM-DD'));
    const [activeOrder, setActiveOrder] = React.useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

    const [callback, setCallback] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const newUser = useStore().newUser;
    const [products, setProducts] = useStore().products;
    console.log('🚀 ~ file: index.jsx ~ line 47 ~ HomePage ~ products', products);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await postDataAPI('product/report', {
                startDate,
                endDate,
            });
            if (res.status === 200) {
                setProducts(res.data.products);
                setReportPayment(res.data.payments);
                setReportUser(res.data.users);
                setReportPaymentProduct(res.data.history_);
            }
            setLoading(false);
        })();
    }, [startDate, callback]);

    return (
        <AppLayout>
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="font-bold font-mono text-3xl mt-3">Dashboard</h2>
                    <Avatar.Group
                        maxCount={10}
                        maxStyle={{ alignItems: 'center', color: '#f56a00', backgroundColor: '#fde3cf' }}
                    >
                        {newUser &&
                            newUser.length > 0 &&
                            newUser.map((item) => (
                                <Tooltip title={item.name} placement="bottom" key={item._id}>
                                    <div className="relative">
                                        <Avatar
                                            className="cursor-pointer p-[2px] mr-[16px]"
                                            size="large"
                                            style={{ backgroundColor: randomColor() }}
                                            src={item.avatar}
                                        />
                                        {user?._id == item?._id && (
                                            <span class="flex h-3 w-3 absolute bottom-0 right-4">
                                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-600"></span>
                                            </span>
                                        )}
                                    </div>
                                </Tooltip>
                            ))}
                    </Avatar.Group>
                </div>
                <Statistics
                    setStartDate={setStartDate}
                    reportPaymentProduct={reportPaymentProduct}
                    reportPayment={reportPayment}
                    reportUser={reportUser}
                />
                <div className="bg-white p-6 rounded-xl shadow-lg border border-[#f3f3f3] mt-2">
                    <h2 className="mb-10 font-bold text-[17px]">Doanh thu theo ngày</h2>
                    <ChartColumn reportPayment={reportPayment} />
                </div>
                <div className="bg-white p-6 mt-6 rounded-xl transition-all shadow-lg border border-[#f3f3f3]">
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between w-full">
                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                {listTabOrder.map((item, index) => (
                                    <li key={index} className="mr-2">
                                        <div
                                            onClick={() => setActiveOrder(index)}
                                            className={`cursor-pointer ${
                                                activeOrder === index ? colorActive : colorNotActive
                                            }`}
                                        >
                                            {index ? (
                                                <svg
                                                    className={`${
                                                        activeOrder === index ? colorIconActive : colorNotIconActive
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    className={`${
                                                        activeOrder === index ? colorIconActive : colorNotIconActive
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                                                </svg>
                                            )}

                                            {item}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {selectedRowKeys.length > 0 && (
                                <ListButtonOrder
                                    callback={callback}
                                    setCallback={setCallback}
                                    selectedRowKeys={selectedRowKeys}
                                    setSelectedRowKeys={setSelectedRowKeys}
                                />
                            )}
                        </div>
                    </div>
                    {!activeOrder ? (
                        <TableOrder
                            setLoading={setLoading}
                            selectedRowKeys={selectedRowKeys}
                            loading={loading}
                            callback={callback}
                            setCallback={setCallback}
                            setSelectedRowKeys={setSelectedRowKeys}
                            reportPayment={reportPayment}
                        />
                    ) : (
                        <Row gutter={[40, 40]}>
                            <Col span={12}>
                                <div className="text-[18px] font-bold mb-4">Thống kê sản phẩm đã bán</div>
                                <PieChart products={products} />
                            </Col>
                            <Col span={12}>
                                <div className="text-[18px] font-bold mb-4">Thống kê đơn hàng theo khách hàng</div>
                                <PieChartBold reportPayment={reportPayment} />
                            </Col>
                            <Col span={12}>
                                <div className="text-[18px] font-bold mt-2">Thống kê sản phẩm đã bán theo danh mục</div>
                                <PieQuarter reportPayment={reportPayment} />
                            </Col>
                            <Col span={12}>
                                <div className="text-[18px] font-bold mt-2">Thống kê doanh thu theo sản phẩm</div>
                                <PieColumn products={products} />
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default HomePage;
