import { Button, Card, Col, Form, Row } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataAPI, postDataAPI, putDataAPI } from '../../../apis/fetchData';
import RichEditor from '../../../components/editor';
import FormComponent from '../../../components/global/Form';
import FormItem from '../../../components/global/Form/FormItem';
import UploadFile from '../../../components/global/Form/uploadFile';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { formatNumber, getNotifications, imageUpload } from '../../../utils/common';
const initialState = {
    title: '',
    image: '',
};
const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(initialState);
    const [desc, setDesc] = React.useState('');
    const [detail, setDetail] = React.useState('');

    const onSubmit = async (values) => {
        if (!value.title || !value.image) return getNotifications('Vui lòng nhập đủ thông tin ảnh hoặc tên', 'error');

        if (typeof value.image === 'string') {
            try {
                const res = await putDataAPI('product/' + id, {
                    ...value,
                    ...values,
                    image: value.image,
                    description: desc,
                    detail,
                });
                if (res.status === 200) {
                    getNotifications(res.data.msg, 'success');
                    navigate(-1);
                }
            } catch (error) {
                console.log('🚀 ~ file: create.jsx ~ line 13 ~ onSubmit ~ error', error);
            }
        } else {
            const photo = await imageUpload(value.image);
            if (photo) {
                try {
                    const res = await putDataAPI('product/' + id, {
                        ...value,
                        ...values,
                        image: photo.url,
                        description: desc,
                        detail,
                    });
                    if (res.status === 200) {
                        getNotifications(res.data.msg, 'success');
                        navigate(-1);
                    }
                } catch (error) {
                    console.log('🚀 ~ file: create.jsx ~ line 13 ~ onSubmit ~ error', error);
                }
            }
        }
    };

    React.useEffect(() => {
        const getData = async () => {
            try {
                const res = await getDataAPI('product/' + id);
                if (res.status === 200) {
                    setDesc(res.data.description);
                    setValue(res.data);
                }
            } catch (error) {
                console.log('🚀 ~ file: create.jsx ~ line 13 ~ onSubmit ~ error', error);
            }
        };
        getData();
    }, []);

    const handleUpfile = (file) => {
        setValue({ ...value, image: file });
    };

    const onValuesChange = (values) => {
        setValue({ ...value, ...values });
    };

    return (
        <AppLayout>
            {value.title && (
                <FormComponent onValuesChange={onValuesChange} onSubmit={onSubmit}>
                    <HeaderLayout
                        title="Thêm danh mục"
                        subtitle="* là các trường bắt buộc nhập"
                        button={[
                            <Form.Item className="flex items-center mb-0">
                                <Button type="primary" htmlType="submit" className="rounded-lg bg-blue-500" key="3">
                                    Lưu
                                </Button>
                            </Form.Item>,
                            <Button type="default" className="rounded-lg" key="3">
                                Xóa
                            </Button>,
                        ]}
                    >
                        <Row className="m-4" gutter={[20, 0]}>
                            <Col span={16}>
                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tên sản phẩm không được để trống',
                                                },
                                            ]}
                                            label="Tên sản phẩm"
                                            name="title"
                                            placeholder="Nhập tên sản phẩm"
                                            type="input"
                                            initialValue={value.title}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            label="Danh mục"
                                            name="category"
                                            placeholder="Chọn danh mục cha"
                                            type="select"
                                            apiUrl="all_category"
                                            isSelectNoParent
                                            selectedValue={value.category}
                                        />
                                    </Col>

                                    <Col span={12}>
                                        <FormItem
                                            initialValue={value.price}
                                            label="Giá"
                                            name="price"
                                            placeholder="Nhập giá"
                                            type="input_number"
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            label="Khuyến mại"
                                            name="promotion"
                                            placeholder="Chọn khuyến mại (nếu có))"
                                            type="select"
                                            apiUrl="home_promotion"
                                            isSelectNoParent
                                            selectedValue={value.promotion}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            label="Trạng thái"
                                            name="status"
                                            placeholder="Chọn trạng thái"
                                            type="custom_select"
                                            selectedValue={value.status || 'Còn hàng'}
                                            data={[
                                                { _id: 'Còn hàng', name: 'Còn hàng' },
                                                { _id: 'Hết hàng', name: 'Hết hàng' },
                                            ]}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            label="Số lượng"
                                            name="quantity"
                                            placeholder="Nhập số lượng"
                                            type="input_number"
                                            initialValue={value.quantity}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <div className="h-full flex items-center">
                                            <UploadFile
                                                title="Chọn ảnh sản phẩm"
                                                handleUpfile={(file) => handleUpfile(file)}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            initialValue={value?.discount}
                                            label="Giảm giá(%)"
                                            name="discount"
                                            placeholder="Nhập số lượng"
                                            type="input_number"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <h2>Proview</h2>
                                    {value.title && (
                                        <div className="flex">
                                            <img
                                                style={{
                                                    maxHeight: '160px',
                                                    maxWidth: '160px',
                                                    height: '150px',
                                                    width: '150px',
                                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                                }}
                                                src={
                                                    id
                                                        ? value.image
                                                        : value.image
                                                        ? URL.createObjectURL(value.image)
                                                        : 'https://res.cloudinary.com/hunre/image/upload/v1643106557/famer/t%E1%BA%A3i_xu%E1%BB%91ng_at4ce0.png'
                                                }
                                                alt="alt"
                                            />
                                            <div className="ml-3">
                                                <h2 className="font-bold text-lg break-all">{value.title}</h2>
                                                <div
                                                    className="mt-1 text-md break-all custom_desc"
                                                    dangerouslySetInnerHTML={{
                                                        __html: value.description,
                                                    }}
                                                />
                                                <span>
                                                    {value.price && (
                                                        <>
                                                            <span className="font-bold mt-1">
                                                                {formatNumber(value.price)}
                                                            </span>{' '}
                                                            <span className="text-sm">Đồng</span>
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </Col>
                            <Col span={12}>
                                <RichEditor body={desc} setBody={setDesc} />
                            </Col>
                            <Col span={12}>
                                <RichEditor body={detail} setBody={setDetail} />
                            </Col>
                        </Row>
                    </HeaderLayout>
                </FormComponent>
            )}
        </AppLayout>
    );
};

export default EditProduct;
