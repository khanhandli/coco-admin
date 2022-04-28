import { Card, Col, Input, List, Row } from 'antd';
import React from 'react';
import { deleteDataAPI } from '../../apis/fetchData';
import { getNotifications } from '../../utils/common';

const PromotionComponent = ({ list, setValueEdit, valueEdit, getCallback, setIsEdit }) => {
    const inputRef = React.useRef();

    return (
        <Row>
            <Col span={12}>
                <Row className="m-4">
                    <Col span={24}>
                        <Row>
                            <Col span={9} className="mb-3 text-[16px]">
                                <span className="text-red-600">*</span> Tên khuyến mại
                            </Col>
                            <Col span={16}>
                                <Input
                                    ref={inputRef}
                                    onChange={(e) => setValueEdit(e.target.value)}
                                    value={valueEdit}
                                    size="middle"
                                    className="rounded-md"
                                    name="name"
                                    placeholder="Nhập tên khuyến mại"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Card className="shadow-md rounded-lg">
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={(item) => (
                            <>
                                <List.Item
                                    actions={[
                                        <a
                                            key="list-loadmore-edit"
                                            onClick={() => {
                                                inputRef.current && inputRef.current.focus();
                                                setValueEdit(item.name);
                                                setIsEdit(item._id);
                                            }}
                                        >
                                            Sửa
                                        </a>,
                                        <a
                                            onClick={async () => {
                                                try {
                                                    const res = await deleteDataAPI('home_promotion/' + item._id);
                                                    if (res.status === 200) {
                                                        getNotifications(`Xóa ${item.name} thành cômg`, 'success');
                                                        getCallback();
                                                    }
                                                } catch (error) {
                                                    console.log(
                                                        '🚀 ~ file: index.jsx ~ line 54 ~ PromotionComponent ~ error',
                                                        error
                                                    );
                                                }
                                            }}
                                            className="text-red-400"
                                            key="list-loadmore-more"
                                        >
                                            Xóa
                                        </a>,
                                    ]}
                                >
                                    <List.Item.Meta className="font-bold" title={item.name} />
                                </List.Item>
                            </>
                        )}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default PromotionComponent;
