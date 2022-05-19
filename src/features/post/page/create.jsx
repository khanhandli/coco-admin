import { Button, Col, Form, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postDataAPI } from '../../../apis/fetchData';
import RichEditor from '../../../components/editor';
import FormComponent from '../../../components/global/Form';
import FormItem from '../../../components/global/Form/FormItem';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { getNotifications, imageUpload } from '../../../utils/common';
import UploadFile from '../../../components/global/Form/uploadFile';

const CreatePost = () => {
    const navigate = useNavigate();

    const [post, setPost] = React.useState('');
    const [value, setValue] = React.useState({
        title: '',
        image: '',
    });

    const onSubmit = async (values) => {
        if (!value.title || !value.image) return getNotifications('Vui lòng nhập đủ thông tin ảnh hoặc tên', 'error');

        if (typeof value.image === 'string') {
        } else {
            const photo = await imageUpload(value.image);
            if (photo.url) {
                try {
                    const res = await postDataAPI('post', { ...values, content: post, image: photo.url });

                    if (res.status === 200) {
                        getNotifications(res.data.msg, 'success');
                        navigate('/post');
                    }
                } catch (error) {
                    console.log('🚀 ~ file: create.jsx ~ line 13 ~ onSubmit ~ error', error);
                }
            }
        }
    };

    const handleUpfile = (file) => {
        setValue({ ...value, image: file });
    };

    const onValuesChange = (values) => {
        setValue({ ...value, ...values });
    };
    return (
        <AppLayout>
            <FormComponent onValuesChange={onValuesChange} onSubmit={onSubmit}>
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
                    <Row>
                        <Col span={8}>
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
                            />
                            <div className="">
                                <UploadFile title="Chọn ảnh bài đăng" handleUpfile={(file) => handleUpfile(file)} />
                            </div>
                        </Col>
                        <Col span={16}>
                            <RichEditor body={post} setBody={setPost} />
                        </Col>
                    </Row>
                </HeaderLayout>
            </FormComponent>
        </AppLayout>
    );
};

export default CreatePost;
