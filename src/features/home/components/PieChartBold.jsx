import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const PieChartBold = ({ reportPayment }) => {
    // total user_id in reportPayment

    const dataMap = reportPayment.map((rp) => {
        return {
            type: rp.email,
            user_id: rp.user_id,
            value: reportPayment.filter((r) => r.user_id === rp.user_id).length,
        };
    });

    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
    }

    const arrFinish = getUniqueListBy(dataMap, 'user_id');

    const config = {
        appendPadding: 40,
        data: arrFinish,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'outer',
            content: 'Số đơn: {value}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return <Pie {...config} />;
};

export default PieChartBold;
