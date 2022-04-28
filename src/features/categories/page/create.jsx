import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postDataAPI } from '../../../apis/fetchData';
import FormComponent from '../../../components/global/Form';
import FormItem from '../../../components/global/Form/FormItem';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { getNotifications } from '../../../utils/common';

const CreateCategory = () => {
    const navigate = useNavigate();

    const onSubmit = async (value) => {
        try {
            const res = await postDataAPI('category', value);
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
            <FormComponent onSubmit={onSubmit}>
                <HeaderLayout
                    title="Thêm danh mục"
                    subtitle="* là các trường bắt buộc nhập"
                    button={[
                        <Form.Item className="flex items-center mb-0">
                            <Button type="primary" htmlType="submit" className="rounded-lg bg-blue-500" key="3">
                                Thêm
                            </Button>
                        </Form.Item>,
                    ]}
                >
                    <Row className="m-4">
                        <Col span={12}>
                            <FormItem
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
        </AppLayout>
    );
};

export default CreateCategory;
