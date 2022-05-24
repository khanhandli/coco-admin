import React from 'react';
import { Column } from '@ant-design/plots';
import { formatNumber } from '../../../utils/common';
import moment from 'moment';

const ChartColumn = ({ reportPayment }) => {
    // caluate priceCheckout when with createdAt
    let sumedUpDates = [];
    let prices = [];

    function isDateSumedUp(date) {
        return sumedUpDates.indexOf(date.substring(0, 10)) !== -1;
    }

    function sumUpDate(date) {
        let sum = 0;

        reportPayment.forEach((t) => {
            if (t.createdAt.substring(0, 10) === date.substring(0, 10)) {
                sum += parseInt(t.priceCheckout);
            }
        });

        sumedUpDates.push(date.substring(0, 10));
        prices.push(sum);
    }

    reportPayment.forEach((t) => {
        if (!isDateSumedUp(t.createdAt)) {
            sumUpDate(t.createdAt);
        }
    });

    var obj = {};
    sumedUpDates.forEach((d, i) => (obj[d] = prices[i]));

    const data = [];

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            data.push({ createdAt: key, priceCheckout: value });
        }
    }

    const config = {
        data: reportPayment && reportPayment.length > 0 ? data : false,
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
