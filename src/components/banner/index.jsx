import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import { getDataAPI, patchDataAPI, putDataAPI } from '../../apis/fetchData';
import { getNotifications, imageUpload } from '../../utils/common';
import FormComponent from '../global/Form';
import FormItem from '../global/Form/FormItem';
import UploadFile from '../global/Form/uploadFile';
const initialState = {
    module: '',
    name: '',
    image: '',
    promotion: '',
};

const Banner = ({ detailBanner, getCallback, idBanner }) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [value, setValue] = React.useState(initialState);
    console.log('🚀 ~ file: index.jsx ~ line 19 ~ Banner ~ value', value);
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = (item, module) => {
        setValue({ module, name: item.name, image: item.image, promotion: item?.promotion || '' });
        setVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);

        if (!value.name || !value.image || !value.module)
            return getNotifications('Vui lòng nhập đủ thông tin ảnh hoặc tên', 'error');

        if (typeof value.image === 'string') {
            const res = await patchDataAPI('home_banner/' + idBanner, {
                data: {
                    ...detailBanner,
                    [value.module]: {
                        name: value.name,
                        image: value.image,
                        promotion: value.promotion === '' ? null : value.promotion,
                    },
                },
            });
            if (res.status === 200) {
                getNotifications(res.data.msg, 'success');
                setValue(initialState);
                getCallback();
                setVisible(false);
                setConfirmLoading(false);
            }
        } else {
            console.log('vao day');
            const photo = await imageUpload(value.image);
            if (photo) {
                const res = await patchDataAPI('home_banner/' + idBanner, {
                    data: {
                        ...detailBanner,
                        [value.module]: {
                            name: value.name,
                            image: photo.url,
                            promotion: value.promotion === '' ? null : value.promotion,
                        },
                    },
                });
                if (res.status === 200) {
                    getNotifications(res.data.msg, 'success');
                    setValue(initialState);
                    getCallback();
                    setVisible(false);
                    setConfirmLoading(false);
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
        <div>
            <div className="flex-1 flex flex-col">
                <div className="flex-1 grid grid-flow-col gap-2 xl:gap-4 mb-4">
                    <div
                        className="relative bg_img row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-5 rounded-[32px]"
                        style={{
                            background: `url("${detailBanner.banner_1.image}") round`,
                        }}
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                            onClick={() => {
                                showModal(detailBanner.banner_1, 'banner_1');
                                setIsOpen(true);
                            }}
                        >
                            Sửa
                        </Button>
                    </div>
                    <div
                        style={{
                            background: `url("${detailBanner.banner_2.image}") round`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_2, 'banner_2');
                            setIsOpen(true);
                        }}
                        className="relative bg_img row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-5 bg-[red] rounded-[32px]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                    <div
                        style={{
                            background: `url("${detailBanner.banner_3.image}") no-repeat center center`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_3, 'banner_3');
                            setIsOpen(true);
                        }}
                        className="relative bg_img col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_22] bg-[red] rounded-[32px]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                    <div
                        style={{
                            background: `url("${detailBanner.banner_4.image}") no-repeat center center`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_4, 'banner_4');
                            setIsOpen(true);
                        }}
                        className="relative bg_img col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_24] bg-[red] rounded-[32px]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
                <div className="flex-1 grid grid-flow-col gap-2 xl:gap-4">
                    <div
                        style={{
                            background: `url("${detailBanner.banner_5.image}") no-repeat center center`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_5, 'banner_5');
                            setIsOpen(true);
                        }}
                        className="relative bg_img rounded-[32px] col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_22] bg-[red]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                    <div
                        style={{
                            background: `url("${detailBanner.banner_6.image}") no-repeat center center`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_6, 'banner_6');
                            setIsOpen(true);
                        }}
                        className="relative bg_img rounded-[32px] col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_22] bg-[red]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                    <div
                        style={{
                            background: `url("${detailBanner.banner_7.image}") round`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_7, 'banner_7');
                            setIsOpen(true);
                        }}
                        className="relative bg_img rounded-[32px] row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-5 bg-[red]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                    <div
                        style={{
                            background: `url("${detailBanner.banner_8.image}") round`,
                        }}
                        onClick={() => {
                            showModal(detailBanner.banner_8, 'banner_8');
                            setIsOpen(true);
                        }}
                        className="relative bg_img rounded-[32px] row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-5 bg-[red]"
                    >
                        <Button
                            className="bg-orange-600 absolute bottom-2 px-6 font-bold right-8 rounded-full outline-none border-0"
                            type="primary"
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <FormComponent onValuesChange={onValuesChange}>
                    <Modal
                        title="Sửa banner khuyến mại"
                        visible={visible}
                        centered
                        className="rounded-2xl"
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={() => {
                            setValue(initialState);
                            setVisible(false);
                            setConfirmLoading(false);
                            setIsOpen(false);
                        }}
                        maskClosable={false}
                        cancelText="Đóng"
                        okButtonProps={{ style: { background: 'blue', borderRadius: '15px', padding: '0 30px' } }}
                        cancelButtonProps={{ style: { borderRadius: '15px', padding: '0 30px' } }}
                    >
                        <Row className="m-4">
                            <Col span={24}>
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
                                    <Col span={24}>
                                        <div className="flex justify-end">
                                            <UploadFile title="Chọn ảnh" handleUpfile={(file) => handleUpfile(file)} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal>
                </FormComponent>
            )}
        </div>
    );
};

export default Banner;
