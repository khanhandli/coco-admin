import React from 'react';
import { Column } from '@ant-design/plots';
import { formatNumber } from '../../../utils/common';
import moment from 'moment';

const ChartColumn = ({ reportPayment }) => {
    const config = {
        data: reportPayment && reportPayment.length > 0 ? reportPayment : false,
        xField: 'createdAt',
        yField: 'priceCheckout',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            createdAt: {
                formatter: (val) => moment(val).format('DD/MM/YYYY'),
            },
            priceCheckout: {
                formatter: (val) => `${formatNumber(val)}đ`,
            },
        },
        minColumnWidth: 30,
        maxColumnWidth: 30,
        tooltip: {
            formatter: (datum) => {
                return { name: 'Tổng tiền', value: formatNumber(datum.priceCheckout) };
            },
        },
    };
    return <Column {...config} />;
};

export default React.memo(ChartColumn);
