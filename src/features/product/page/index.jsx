import { Avatar, Button, Input, List, Skeleton } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteDataAPI, getDataAPI } from '../../../apis/fetchData';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { formatNumber, getNotifications } from '../../../utils/common';

const Product = () => {
    const [product, setProduct] = React.useState([]);
    const [productSearch, setProductSearch] = React.useState([]);
    console.log('🚀 ~ file: index.jsx ~ line 12 ~ Product ~ productSearch', productSearch);
    const [loading, setLoading] = React.useState(false);
    const [callback, setCallback] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getDataAPI('product');
            if (res.status === 200) {
                setProduct(res.data);
                setLoading(false);
            }
        })();
    }, [callback]);

    return (
        <AppLayout>
            <HeaderLayout
                noBack
                title="Danh sách sản phẩm"
                subtitle=""
                button={[
                    <Input.TextArea
                        autoSize
                        onChange={(e) => {
                            if (!e.target.value) {
                                setProductSearch([]);
                            } else {
                                setProductSearch(
                                    product.filter((item) =>
                                        item.title.toLowerCase().includes(e.target.value.toLowerCase())
                                    )
                                );
                            }
                        }}
                        placeholder="Nhập để tìm kiếm"
                        className="w-[400px] rounded-md"
                    />,
                    <Button type="primary" className="rounded-lg bg-blue-500" key="3">
                        <Link to="/product/create">Thêm sản phẩm</Link>
                    </Button>,
                ]}
            >
                {product && product.length > 0 && (
                    <List
                        className="demo-loadmore-list"
                        loading={
                            loading || (productSearch && productSearch.length > 0)
                                ? !productSearch.length
                                : !product.length
                        }
                        itemLayout="horizontal"
                        dataSource={productSearch && productSearch.length > 0 ? productSearch : product}
                        pagination={{
                            showSizeChanger: false,

                            pageSize: 5,
                        }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Link to={`/product/edit/${item._id}`} key="list-loadmore-edit">
                                        Sửa
                                    </Link>,
                                    <div
                                        onClick={async () => {
                                            const res = await deleteDataAPI('product/' + item._id);
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
