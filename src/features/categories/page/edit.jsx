import { Button, Col, Form, Row } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../../components/global/Form';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import FormItem from '../../../components/global/Form/FormItem';
import { getDataAPI, putDataAPI } from '../../../apis/fetchData';
import { getNotifications } from '../../../utils/common';

const EditCategory = () => {
    const { id } = useParams();
    const [detailData, setDetailData] = React.useState({ name: '', parent: '' });
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            try {
                const res = await getDataAPI(`category/${id}`);
                if (res.status === 200) {
                    setDetailData(res.data);
                }
            } catch (error) {
                console.log('🚀 ~ file: edit.jsx ~ line 13 ~ useEffect ~ error', error);
            }
        })();
    }, []);

    const onSubmit = async (value) => {
        try {
            const res = await putDataAPI(`category/${id}`, value);
            if (res.status === 200) {
                getNotifications(res.data.msg, 'success');
                navigate(-1);
            }
        } catch (error) {
            console.log('🚀 ~ file: create.jsx ~ line 13 ~ onSubmit ~ error', error);
        }
    };

    return (
        <AppLayout>
            {detailData?.name && (
                <FormComponent
                    // initialValues={{
                    //     name: detailData.name,
                    //     parent: detailData?.parent ? detailData?.parent?._id : '',
                    // }}
                    onSubmit={onSubmit}
                >
                    <HeaderLayout
                        title="Sửa danh mục"
                        subtitle="* là các trường bắt buộc nhập"
                        button={[
                            <Form.Item className="flex items-center mb-0 mr-4">
                                <Button type="primary" htmlType="submit" className="rounded-lg bg-blue-500" key="3">
                                    Lưu
                                </Button>
                            </Form.Item>,
                            <Button type="default" className="rounded-lg" key="3">
                                Xóa
                            </Button>,
                        ]}
                    >
                        <Row className="m-4">
                            <Col span={12}>
                                <FormItem
                                    initialValue={detailData.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tên danh mục không được để trống',
                                        },
                                    ]}
                                    label="Tên danh mục"
                                    name="name"
                                    placeholder="Nhập tên danh mục"
                                    type="input"
                                />
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    selectedValue={detailData?.parent?._id}
                                    label="Danh mục cha"
                                    name="parent"
                                    placeholder="Chọn danh mục cha"
                                    type="select"
                                    apiUrl="category"
                                />
                            </Col>
                        </Row>
                    </HeaderLayout>
                </FormComponent>
            )}
        </AppLayout>
    );
};

export default EditCategory;
