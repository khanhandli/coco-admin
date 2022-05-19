import React from 'react';
import { Column } from '@ant-design/plots';
import { formatNumber } from '../../../utils/common';
import moment from 'moment';

const PieColumn = ({ products }) => {
    const data = products.map((item) => {
        return {
            title: item.title,
            total: item.price * item.sold,
        };
    });

    const config = {
        data,
        xField: 'title',
        yField: 'total',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            price: {
                formatter: (val) => formatNumber(val),
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
