import { Button, Tabs } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../../../components/global/Table/TableComponent';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { deleteDataAPI, getDataAPI } from '../../../apis/fetchData';
import { getNotifications } from '../../../utils/common';

const { TabPane } = Tabs;
const Categories = () => {
    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            render: (text, row) => (
                <div className="ml-8 capitalize">
                    <Link to={`/categories/edit/${row._id}`}>{text}</Link>
                </div>
            ),
        },
    ];

    const [loading, setLoading] = React.useState(false);
    const [valueSelected, setValueSelected] = React.useState([]);
    const [dataSource, setDataSource] = React.useState([]);
    const [callback, setCallback] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getDataAPI('category');
            console.log('🚀 ~ file: index.jsx ~ line 28 ~ res', res);
            if (res.status === 200) {
                setDataSource(res.data);
            }
            setLoading(false);
        })();
    }, [callback]);

    return (
        <AppLayout>
            <HeaderLayout
                noBack
                title="Danh sách danh mục"
                subtitle=""
                button={[
                    <Button type="primary" className="rounded-lg bg-blue-500" key="3">
                        <Link to="/categories/create">Thêm danh mục</Link>
                    </Button>,
                    valueSelected.length > 0 && (
                        <>
                            <Button type="default" className="rounded-lg" key="4">
                                <Link to={`/categories/edit/${valueSelected[0]._id}`}>Sửa</Link>
                            </Button>
                            <Button
                                onClick={async () => {
                                    let res;
                                    if (valueSelected[0]?.children?.length > 0) {
                                        valueSelected[0].children.forEach(async (child) => {
                                            await deleteDataAPI('category/' + child._id);
                                        });
                                        res = await deleteDataAPI('category/' + valueSelected[0]._id);
                                    } else {
                                        res = await deleteDataAPI('category/' + valueSelected[0]._id);
                                    }
                                    if (res.status === 200) {
                                        getNotifications(res.data.msg, 'success');
                                        setValueSelected([]);
                                        setCallback(!callback);
                                    }
                                }}
                                type="default"
                                className="rounded-lg"
                                key="5"
                            >
                                Xóa
                            </Button>
                        </>
                    ),
                ]}
            >
                <div className="p-4">
                    <TableComponent
                        columns={columns}
                        loading={loading}
                        data={dataSource}
                        onSelectedRow={(value) => setValueSelected(value)}
                    />
                </div>
            </HeaderLayout>
        </AppLayout>
    );
};

export default Categories;
