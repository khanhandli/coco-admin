import React from 'react';
import { formatNumber } from '../../../utils/common';
import CartStatistic from './CartStatistic';
import turnover from '../../../assets/images/turnover.png';
import order from '../../../assets/images/order.png';
import product from '../../../assets/images/product.png';
import man from '../../../assets/images/man.png';
import moment from 'moment';

const listFilters = [
    {
        name: 'Tất cả',
        value: -100,
    },
    {
        name: 'Hôm nay',
        value: 0,
    },
    {
        name: '30 ngày',
        value: -30,
    },
    {
        name: '90 ngày',
        value: -90,
    },
    {
        name: '6 tháng',
        value: -240,
    },
    {
        name: '1 năm',
        value: -480,
    },
];
const handleFilter = (value) => {
    return moment().add(value, 'days').format('YYYY-MM-DD');
};

const Statistics = ({ setStartDate, reportPayment, reportUser, reportPaymentProduct }) => {
    const [keyActive, setKeyActive] = React.useState(0);

    const totalPayment =
        reportPayment && reportPayment.length > 0
            ? reportPayment.reduce((total, item) => {
                  return total + item.priceCheckout;
              }, 0)
            : 0;
    return (
        <div>
            <div className="flex flex-wrap pb-3 lg:mx-0">
                <ul className="w-full sm:w-4/5 text-xs sm:text-sm justify-center lg:justify-end items-center flex flex-row space-x-1 mt-2 overflow-hidden mb-4">
                    {listFilters.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={`cursor-pointer ${
                                    keyActive === index
                                        ? 'px-4 py-2 bg-indigo-500 rounded-full text-sm text-gray-100 hover:bg-indigo-700 hover:text-gray-200'
                                        : 'px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-indigo-700 hover:text-gray-200'
                                }`}
                                onClick={() => {
                                    setKeyActive(index);
                                    setStartDate(handleFilter(item.value));
                                }}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
                <CartStatistic total={totalPayment} title="Doanh thu" icon={turnover} />
                <CartStatistic total={reportPayment.length} title="Đơn hàng" icon={order} />
                <CartStatistic total={reportPaymentProduct.length} title="Sản phẩm bán" icon={product} />
                <CartStatistic total={reportUser.length} title="Người dùng" icon={man} />
            </div>
        </div>
    );
};

export default Statistics;
