import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Space, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { deleteDataAPI, patchDataAPI } from '../../../apis/fetchData';
import { formatNumber } from '../../../utils/common';
const TableUser = ({
    user,
    selectedRowKeys,
    setSelectedRowKeys,
    loading,
    setLoading,
    callback,
    setCallback,
    dataSource,
}) => {
    const [searchText, setSearchText] = React.useState('');

    const rowSelection = {
        onChange: (selectedRowKey, selectedRows) => {
            setSelectedRowKeys(selectedRowKey);
        },
        selectedRowKeys: selectedRowKeys,
    };

    async function confirmDelete(e, value) {
        await deleteDataAPI('delete/' + value);
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
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Phân quyền',
            dataIndex: 'role',
            key: 'role',
            render: (value, row) => (
                <>
                    <Select
                        disabled={user._id === row?._id}
                        onChange={(value) => {
                            patchDataAPI('role', { role: value, id: row?._id });
                        }}
                        className="w-full"
                        defaultValue={value}
                    >
                        <Select.Option value={0}>User</Select.Option>
                        <Select.Option value={1}>Admin</Select.Option>
                    </Select>
                </>
            ),
        },

        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (value, row) => (
                <>
                    <div className="flex justify-center">
                        <img src={value} alt="img" className="h-[40px] w-[40px]" />
                    </div>
                    {user?._id == row?._id && (
                        <span className="flex h-3 w-3 absolute top-2 right-[40px]">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-600"></span>
                        </span>
                    )}
                </>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => <span className="font-bold text-yellow-600">{moment(value).format('DD/MM/YYYY')}</span>,
        },
    ];

    return (
        <Table
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
                            disabled={user._id === value}
                        >
                            <button
                                disabled={user._id === value}
                                className="cursor-pointer flex items-center justify-center w-full"
                            >
                                <DeleteOutlined />
                            </button>
                        </Popconfirm>
                    ),
                },
            ]}
            loading={loading}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record._id}
        />
    );
};

export default TableUser;
