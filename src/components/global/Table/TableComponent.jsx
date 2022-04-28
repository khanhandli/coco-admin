import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park',
//     },
//     {
//         key: '4',
//         name: 'Disabled User',
//         age: 99,
//         address: 'Sidney No. 1 Lake Park',
//     },
// ];

const TableComponent = ({ onSelectedRow, loading, data, columns }) => {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            onSelectedRow(selectedRows);
        },
    };
    return (
        <div>
            <Table
                loading={loading}
                className="rounded-2xl"
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                rowKey={(record) => record._id}
            />
        </div>
    );
};

export default TableComponent;
