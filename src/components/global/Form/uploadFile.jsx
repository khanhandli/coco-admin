import { Button, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({ handleUpfile, title }) => {
    const propsUpload = {
        name: 'file',
        action: '',
        maxCount: 1,
        multiple: false,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                const fileList = [...info.fileList].slice(-1);

                if (fileList[0]) {
                    handleUpfile(fileList[0]?.originFileObj);
                }
            }
        },
    };

    return (
        <div>
            <Upload style={{ width: '100%' }} {...propsUpload} accept="image/*" beforeUpload={() => false}>
                <Button className="flex items-center" style={{ width: '100%' }} icon={<UploadOutlined />}>
                    {title ? title : 'Chọn icon'}
                </Button>
            </Upload>
        </div>
    );
};

export default UploadFile;
