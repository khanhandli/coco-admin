import { Avatar, Button, List, Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { getDataAPI } from '../../../apis/fetchData';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { formatNumber } from '../../../utils/common';

const Product = () => {
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getDataAPI('product');
            if (res.status === 200) {
                setProduct(res.data);
                setLoading(false);
            }
        })();
    }, []);

    return (
        <AppLayout>
            <HeaderLayout
                noBack
                title="Danh sách sản phẩm"
                subtitle=""
                button={[
                    <Button type="primary" className="rounded-lg bg-blue-500" key="3">
                        <Link to="/product/create">Thêm sản phẩm</Link>
                    </Button>,
                ]}
            >
                {product && product.length > 0 && (
                    <List
                        className="demo-loadmore-list"
                        loading={loading}
                        itemLayout="horizontal"
                        dataSource={product}
                        pagination={{
                            showSizeChanger: false,

                            total: 10,
                        }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Link to={`/product/edit/${item._id}`} key="list-loadmore-edit">
                                        Sửa
                                    </Link>,
                                    <div key="list-loadmore-more">Xóa</div>,
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
                                                    __html:
                                                        item.description &&
                                                        item.description.replace(/margin-bottom/g, ''),
                                                }}
                                            />
                                        }
                                    />
                                    <div>
                                        <span className="font-bold">{formatNumber(item.price)}</span> Đồng
                                    </div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                )}
            </HeaderLayout>
        </AppLayout>
    );
};

export default Product;
