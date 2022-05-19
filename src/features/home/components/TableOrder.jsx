import { Popconfirm, Table, Input, Button, Space } from 'antd';
import React from 'react';
import { formatNumber } from '../../../utils/common';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { deleteDataAPI } from '../../../apis/fetchData';
const TableOrder = ({
    selectedRowKeys,
    reportPayment,
    setSelectedRowKeys,
    loading,
    setLoading,
    callback,
    setCallback,
}) => {
    const [searchText, setSearchText] = React.useState('');

    const rowSelection = {
        onChange: (selectedRowKey, selectedRows) => {
            setSelectedRowKeys(selectedRowKey);
        },
        selectedRowKeys: selectedRowKeys,
    };

    async function confirmDelete(e, value) {
        await deleteDataAPI('payment/' + value);
        setLoading(!loading);
        setCallback(!callback);
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => node}
                    placeholder={`Tìm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        className="text-blue-500"
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => {
                            handleReset(clearFilters);
                            handleSearch([], confirm, dataIndex);
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        render: (text) => text,
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        { title: 'Email', dataIndex: 'email', key: 'email', ...getColumnSearchProps('email') },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
                if (value == 1) {
                    return <span className="font-bold text-yellow-300">Chờ xác nhận</span>;
                }
                if (value == 2) {
                    return <span className="font-bold text-blue-300">Đang giao</span>;
                }
                if (value == 3) {
                    return <span className="font-bold text-green-300">Thành công</span>;
                }

                return <span className="font-bold text-red-300">Hủy</span>;
            },
        },
        {
            title: 'Phương thức',
            dataIndex: 'type',
            key: 'type',
            render: (value) => {
                if (value == 'money') {
                    return <span>Tiền mặt</span>;
                }
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'priceCheckout',
            key: 'priceCheckout',
            render: (value) => <span className="font-bold text-yellow-600">{formatNumber(value)}</span>,
        },
    ];

    return (
        <Table
            rowSelection={{
                ...rowSelection,
            }}
            columns={[
                ...columns,
                {
                    align: 'center',
                    title: 'Thao tác',
                    dataIndex: '_id',
                    key: '_id',
                    render: (value) => (
                        <Popconfirm
                            title="Bạn chắc chắn muốn xóa đơn hàng?"
                            onConfirm={(e) => confirmDelete(e, value)}
                            // onCancel={cancel}
                            okText="Đồng ý"
                            cancelText="Hủy"
                            okButtonProps={{ style: { background: '#6395F9' } }}
                        >
                            <div className="cursor-pointer flex items-center justify-center">
                                <DeleteOutlined />
                            </div>
                        </Popconfirm>
                    ),
                },
            ]}
            loading={loading}
            dataSource={reportPayment}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record._id}
        />
    );
};

export default TableOrder;
