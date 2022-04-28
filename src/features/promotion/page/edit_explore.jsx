import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../../apis/fetchData';
import FormComponent from '../../../components/global/Form';
import FormItem from '../../../components/global/Form/FormItem';
import UploadFile from '../../../components/global/Form/uploadFile';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { getNotifications, imageUpload } from '../../../utils/common';
const initialState = {
    name: '',
    image: '',
    promotion: '',
};
const EditExplore = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = React.useState(initialState);

    const onSubmit = async (values) => {
        if (!value.name || !value.image) return getNotifications('Vui lòng nhập đủ thông tin ảnh hoặc tên', 'error');

        if (typeof value.image === 'string') {
            const res = await putDataAPI(`home_explore/${id}`, { ...values, image: value.image });
            if (res.status === 200) {
                getNotifications(res.data.msg, 'success');
                setValue(initialState);
                navigate(-1);
            }
        } else {
            const photo = await imageUpload(value.image);
            if (photo) {
                const res = await putDataAPI('home_explore/' + id, { ...values, image: photo.url });
                if (res.status === 200) {
                    getNotifications(res.data.msg, 'success');
                    setValue(initialState);
                    navigate(-1);
                }
            }
        }
    };

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('home_explore/' + id);
            if (res.status === 200) {
                setValue({
                    ...value,
                    name: res.data.name,
                    image: res.data.image,
                    promotion: res?.data?.promotion?._id || '',
                });
            }
        })();
    }, []);

    const handleUpfile = (file) => {
        setValue({ ...value, image: file });
    };

    const onValuesChange = (values) => {
        setValue({ ...value, ...values });
    };

    return (
        <AppLayout>
            {value.name && (
                <FormComponent onValuesChange={onValuesChange} onSubmit={onSubmit}>
                    <HeaderLayout
                        title={`Sửa ${value?.name}`}
                        button={[
                            <Button type="primary" htmlType="submit" className="rounded-lg bg-blue-500" key="3">
                                Lưu
                            </Button>,
                            <Button
                                type="default"
                                onClick={async () => {
                                    const res = await deleteDataAPI('home_explore/' + id);
                                    if (res.status === 200) {
                                        getNotifications(res.data.msg, 'success');
                                        navigate(-1);
                                    }
                                }}
                                className="rounded-lg"
                                key="3"
                            >
                                Xóa
                            </Button>,
                        ]}
                    >
                        <Row className="m-4">
                            <Col span={14}>
                                <Row>
                                    <Col span={24}>
                                        <FormItem
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tên khám phá không được để trống',
                                                },
                                            ]}
                                            label="Tên khám phá"
                                            name="name"
                                            placeholder="Nhập tên khám phá"
                                            type="input"
                                            initialValue={value.name}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <FormItem
                                            label="Khuyến mại"
                                            name="promotion"
                                            placeholder="Chọn khuyến mại"
                                            type="select"
                                            apiUrl="home_promotion"
                                            selectedValue={value.promotion}
                                        />
                                    </Col>
                                    <Col>
                                        <UploadFile handleUpfile={(file) => handleUpfile(file)} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={10}>
                                <Card title="Preview" className="shadow-md rounded-lg">
                                    {value?.name && (
                                        <div className="flex items-center">
                                            <img
                                                className="h-[23px] w-[23px] mr-3"
                                                src={
                                                    id
                                                        ? value.image
                                                        : value.image
                                                        ? URL.createObjectURL(value.image)
                                                        : 'https://res.cloudinary.com/hunre/image/upload/v1643106557/famer/t%E1%BA%A3i_xu%E1%BB%91ng_at4ce0.png'
                                                }
                                                alt=""
                                            />
                                            <span className="text-[15px] font-bold">{value.name}</span>
                                        </div>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </HeaderLayout>
                </FormComponent>
            )}
        </AppLayout>
    );
};

export default EditExplore;
