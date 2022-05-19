import { Avatar, Button, List, Skeleton } from 'antd';
import React from 'react';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { Link } from 'react-router-dom';
import { getNotifications } from '../../../utils/common';
import { getDataAPI, deleteDataAPI } from '../../../apis/fetchData';
const PostPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const [callback, setCallback] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            setLoading(true);

            const res = await getDataAPI('post');
            if (res.status === 200) {
                setPosts(res.data);
                setLoading(false);
            }
        })();
    }, [callback]);

    return (
        <AppLayout>
            <HeaderLayout
                button={[
                    <Button type="primary" className="rounded-lg bg-blue-500" key="3">
                        <Link to="/post/create">Tạo bài đăng</Link>
                    </Button>,
                ]}
                noBack
                title="Danh sách bài đăng"
                subtitle=""
            >
                {posts && posts.length > 0 && (
                    <List
                        className="demo-loadmore-list"
                        loading={loading}
                        itemLayout="horizontal"
                        dataSource={posts}
                        pagination={{
                            showSizeChanger: false,

                            total: 10,
                        }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Link to={`/post/edit/${item._id}`} key="list-loadmore-edit">
                                        Sửa
                                    </Link>,
                                    <div
                                        onClick={async () => {
                                            const res = await deleteDataAPI('post/' + item._id);
                                            if (res.status === 200) {
                                                getNotifications(res.data.msg, 'success');
                                                setCallback(!callback);
                                            }
                                        }}
                                        className="cursor-pointer hover:text-blue-500"
                                        key="list-loadmore-more"
                                    >
                                        Xóa
                                    </div>,
                                ]}
                            >
                                <Skeleton avatar title={false} loading={loading} active>
                                    <List.Item.Meta
                                        avatar={<Avatar size={70} src={item.image} />}
                                        title={<div className="text-[15px] font-bold">{item.title}</div>}
                                        description={
                                            <div
                                                className="custom_desc w-[96%] text-sm"
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.content.slice(0, 1500),
                                                }}
                                            />
                                        }
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                )}
            </HeaderLayout>
        </AppLayout>
    );
};

export default PostPage;
