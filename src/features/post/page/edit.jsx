import { Button, Col, Form, Row } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataAPI, postDataAPI, putDataAPI } from '../../../apis/fetchData';
import RichEditor from '../../../components/editor';
import FormComponent from '../../../components/global/Form';
import FormItem from '../../../components/global/Form/FormItem';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { getNotifications, imageUpload } from '../../../utils/common';
import UploadFile from '../../../components/global/Form/uploadFile';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const [post, setPost] = React.useState('');
    const [value, setValue] = React.useState({
        title: '',
        image: '',
    });
    console.log('🚀 ~ file: edit.jsx ~ line 22 ~ EditPost ~ value', value);

    const onSubmit = async (values) => {
        setLoading(true);

        if (!value.title || !value.image) return getNotifications('Vui lòng nhập đủ thông tin ảnh hoặc tên', 'error');

        if (typeof value.image === 'string') {
            try {
                const res = await putDataAPI('post/' + id, {
                    ...values,
                    image: value.image,
                    content: post,
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
            if (photo.url) {
                try {
                    const res = await putDataAPI('post/' + id, {
                        ...values,
                        image: photo.url,
                        content: post,
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
        setLoading(false);
    };

    React.useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const res = await getDataAPI('post/' + id);
                if (res.status === 200) {
                    setPost(res.data.content);
                    setValue(res.data);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
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
        <AppLayout loading={loading}>
            {value.title && (
                <FormComponent onValuesChange={onValuesChange} onSubmit={onSubmit}>
                    <HeaderLayout
                        title="Sửa bài viết"
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
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    initialValue={value.title}
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
            )}
        </AppLayout>
    );
};

export default EditPost;
