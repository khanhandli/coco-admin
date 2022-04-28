import { Button, Form, Tabs } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../../../components/global/Table/TableComponent';
import AppLayout from '../../../components/layouts/AppLayout';
import HeaderLayout from '../../../components/layouts/HeaderLayout';
import { AppleOutlined, AndroidOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import PromotionComponent from '../../../components/promotion';
import FormComponent from '../../../components/global/Form';
import { getNotifications, imageUpload } from '../../../utils/common';
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../../apis/fetchData';
import Banner from '../../../components/banner';

const { TabPane } = Tabs;

const columns = [
    {
        title: 'Tên khám phá',
        dataIndex: 'name',
        render: (text, row) => (
            <div className="ml-8 capitalize">
                <Link to={`/promotion/edit_explore/${row._id}`}>{text}</Link>
            </div>
        ),
    },
    {
        title: 'Icon',
        dataIndex: 'image',
        render: (text, row) => (
            <div className="ml-8 capitalize">
                <img className="h-[23px] w-[23px]" src={text} alt="" />
            </div>
        ),
    },
];

const Promotion = () => {
    const [valueSelected, setValueSelected] = React.useState([]);

    const [listPromotion, setListPromotion] = React.useState([]);
    const [listExplore, setListExplore] = React.useState([]);

    const [callback, setCallback] = React.useState(false);

    const [valueEdit, setValueEdit] = React.useState('');
    const [isEdit, setIsEdit] = React.useState(false);
    const [detailBanner, setDetailBanner] = React.useState('');

    const [idBanner, setIdBanner] = React.useState('');

    const onSubmit = async (value) => {
        if (isEdit) {
            const res = await putDataAPI('home_promotion/' + isEdit, { name: valueEdit });
            if (res.status == 200) {
                getNotifications(res.data.msg, 'success');
                setCallback(!callback);
                setIsEdit(false);
                setValueEdit('');
            }
        } else {
            const res = await postDataAPI('home_promotion', { name: valueEdit });
            if (res.status == 200) {
                getNotifications(res.data.msg, 'success');
                setCallback(!callback);
                setValueEdit('');
            }
        }
    };

    const getCallback = () => {
        setCallback(!callback);
    };

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('home_banner');
            if (res.status === 200) {
                setDetailBanner(res.data[0].data);
                setIdBanner(res.data[0]._id);
            }
        })();
    }, [callback]);

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('home_promotion');
            if (res.status == 200) {
                setListPromotion(res.data);
            }
            const resexplore = await getDataAPI('home_explore');
            if (resexplore.status == 200) {
                setListExplore(resexplore.data);
            }
        })();
    }, [callback]);

    return (
        <AppLayout>
            <HeaderLayout noBack title="Danh sách khuyến mại" subtitle="">
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <div className="flex items-center">
                                <PropertySafetyOutlined />
                                <span>Khuyến mại</span>
                            </div>
                        }
                        key="9999"
                    >
                        <HeaderLayout
                            noBack
                            notStyle
                            button={[
                                <Button type="primary" onClick={onSubmit} className="rounded-lg bg-blue-500" key="100">
                                    {isEdit ? `Sửa ${valueEdit}` : 'Thêm'}
                                </Button>,
                                valueSelected.length > 0 && (
                                    <Button type="default" className="rounded-lg" key="123">
                                        <Link to="/promotion/edit_promo/">Sửa</Link>
                                    </Button>
                                ),
                            ]}
                        />
                        <div className="p-4">
                            <PromotionComponent
                                getCallback={getCallback}
                                valueEdit={valueEdit}
                                setValueEdit={setValueEdit}
                                list={listPromotion}
                                setIsEdit={setIsEdit}
                            />
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="flex items-center">
                                <AppleOutlined />
                                <span>Khám phá</span>
                            </div>
                        }
                        key="2"
                    >
                        <HeaderLayout
                            notStyle
                            button={[
                                <Button type="primary" className="rounded-lg bg-blue-500" key="87687">
                                    <Link to="/promotion/create_explore">Thêm khám phá</Link>
                                </Button>,
                                valueSelected.length > 0 && (
                                    <>
                                        <Button type="default" className="rounded-lg" key="3213">
                                            <Link to={`/promotion/edit_explore/${valueSelected[0]._id}`}>Sửa</Link>
                                        </Button>
                                        <Button
                                            onClick={async () => {
                                                const res = await deleteDataAPI('home_explore/' + valueSelected[0]._id);
                                                if (res.status === 200) {
                                                    getNotifications(res.data.msg, 'success');
                                                    getCallback();
                                                }
                                            }}
                                            type="default"
                                            className="rounded-lg"
                                            key="43"
                                        >
                                            <div>Xóa</div>
                                        </Button>
                                    </>
                                ),
                            ]}
                        />
                        <div className="p-4">
                            <TableComponent
                                data={listExplore}
                                columns={columns}
                                onSelectedRow={(value) => setValueSelected(value)}
                            />
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <div className="flex items-center">
                                <AndroidOutlined />
                                <span>Banner</span>
                            </div>
                        }
                        key="3"
                    >
                        <Banner idBanner={idBanner} getCallback={getCallback} detailBanner={detailBanner} />
                    </TabPane>
                </Tabs>
            </HeaderLayout>
        </AppLayout>
    );
};

export default Promotion;
