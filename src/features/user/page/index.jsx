import { Input } from 'antd';
import React from 'react';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { useStore } from '../../../hooks/useStore';
import TableUser from '../components/TableUser';

const UserPage = () => {
    const [user, setUser] = useStore().user;

    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

    const [callback, setCallback] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const newUser = useStore().newUser;

    return (
        <AppLayout>
            <HeaderLayout
                noBack
                title="Danh sách tài khoản"
                subtitle=""
                button={[
                    <Input.TextArea
                        autoSize
                        onChange={(e) => {}}
                        placeholder="Nhập để tìm kiếm"
                        className="w-[400px] rounded-md"
                    />,
                ]}
            >
                <div className="p-4">
                    <TableUser
                        setLoading={setLoading}
                        selectedRowKeys={selectedRowKeys}
                        loading={loading}
                        callback={callback}
                        setCallback={setCallback}
                        setSelectedRowKeys={setSelectedRowKeys}
                        dataSource={newUser}
                        user={user}
                    />
                </div>
            </HeaderLayout>
        </AppLayout>
    );
};

export default UserPage;
