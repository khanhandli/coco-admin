import React from 'react';
import { Column } from '@ant-design/plots';
import { formatNumber } from '../../../utils/common';
import moment from 'moment';

const PieColumn = ({ products }) => {
    const data = products
        .map((item) => {
            return {
                title: item.title,
                total: item.price * item.sold,
            };
        })
        .filter((item) => item.total);

    const config = {
        data,
        padding: 60,
        xField: 'title',
        yField: 'total',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            total: {
                formatter: (val) => formatNumber(val),
            },
            title: {
                formatter: (val) => val.slice(0, 8) + '...',
            },
        },
        minColumnWidth: 30,
        maxColumnWidth: 30,
        tooltip: {
            formatter: (datum) => {
                return { name: 'Tổng tiền', value: formatNumber(datum.total) };
            },
        },
    };
    return <Column {...config} />;
};

export default PieColumn;
