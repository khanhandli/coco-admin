import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const PieQuarter = ({ reportPayment }) => {
    const dataMap = reportPayment.map((rp) => {
        return rp.cart.map((cart) => {
            return {
                type: cart.category.name,
                _id: cart.category._id,
            };
        });
    });
    const flatMap = [].concat.apply([], dataMap);

    const output = flatMap.reduce((acc, curr) => {
        curr.count = 1;
        const exists = acc.find((o) => o.type === curr?.type && o?._id === curr?._id);

        exists
            ? exists.count++
            : acc.push({ type: curr?.type, _id: curr?._id, count: curr?.count, value: curr?.count });

        return acc;
    }, []);

    console.log(output);

    const config = {
        appendPadding: 40,
        data: output,
        angleField: 'count',
        colorField: 'type',
        radius: 1,
        startAngle: Math.PI,
        endAngle: Math.PI * 1.5,
        label: {
            type: 'inner',
            offset: '-8%',
            content: 'Đã bán: {value}',
            style: {
                fontSize: 18,
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
            {
                type: 'pie-legend-active',
            },
        ],
        pieStyle: {
            lineWidth: 0,
        },
    };
    return <Pie {...config} />;
};

export default PieQuarter;
