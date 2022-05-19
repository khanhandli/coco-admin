import { Space } from 'antd';
import React from 'react';
import { patchDataAPI } from '../../../apis/fetchData';

const ListButtonOrder = ({ selectedRowKeys, callback, setCallback, setSelectedRowKeys }) => {
    return (
        <Space size="middle">
            <button
                onClick={() => {
                    selectedRowKeys.forEach(async (key) => {
                        await patchDataAPI('payment/' + key, {
                            status: 2,
                        });
                    });

                    setCallback(!callback);
                    setSelectedRowKeys([]);
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
                <div className="flex h-full items-centerrelative px-4 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5  mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Duyệt</span>
                </div>
            </button>
            <button
                onClick={() => {
                    selectedRowKeys.forEach(async (key) => {
                        await patchDataAPI('payment/' + key, {
                            status: 0,
                        });
                    });

                    setCallback(!callback);
                    setSelectedRowKeys([]);
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
                <div className="flex items-center relative px-4 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Hủy</span>
                </div>
            </button>
            <button
                onClick={() => {
                    selectedRowKeys.forEach(async (key) => {
                        await patchDataAPI('payment/' + key, {
                            status: 3,
                        });
                    });

                    setCallback(!callback);
                    setSelectedRowKeys([]);
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
                <span className="flex items-center relative px-4 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>
                    <span>Hoàn thành</span>
                </span>
            </button>
        </Space>
    );
};

export default ListButtonOrder;
