import { Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import { getDataAPI } from '../../../apis/fetchData';

const FormItem = ({
    label,
    name,
    rules,
    placeholder,
    type,
    apiUrl,
    initialValue,
    selectedValue,
    isSelectNoParent,
    data,
}) => {
    const [dataSelect, setDataSelect] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (type !== 'select') return;
        (async () => {
            setLoading(true);
            const res = await getDataAPI(apiUrl);
            if (res.status === 200) {
                let data = res.data;
                // if (selectedValue) {
                //     const res = await getDataAPI(apiUrl + `/${selectedValue}`);
                //     console.log('🚀 ~ file: FormItem.jsx ~ line 17 ~ res', res);
                //     if (res.status === 200) {
                //         data.push(res.data);
                //     }
                // }

                setDataSelect(data);
                setLoading(false);
            }
        })();
    }, []);
    return type === 'input' ? (
        <Form.Item initialValue={initialValue} label={label} name={name} rules={rules}>
            <Input size="middle" className="rounded-md" placeholder={placeholder} />
        </Form.Item>
    ) : type === 'select' ? (
        <Form.Item initialValue={loading ? '' : selectedValue} label={label} name={name} rules={rules}>
            <Select loading={loading} disabled={loading} defaultValue="">
                <Select.Option value="">{loading ? 'Đang tải dữ liệu' : 'Không chọn'}</Select.Option>
                {isSelectNoParent
                    ? dataSelect &&
                      dataSelect.length > 0 &&
                      dataSelect.map((item, index) => (
                          <Select.Option key={index} value={item?._id}>
                              {item.name}
                          </Select.Option>
                      ))
                    : dataSelect &&
                      dataSelect.length > 0 &&
                      dataSelect
                          .filter((item) => !item?.parent)
                          .map((item, index) => (
                              <Select.Option key={index} value={item?._id}>
                                  {item.name}
                              </Select.Option>
                          ))}
            </Select>
        </Form.Item>
    ) : type === 'text_teara' ? (
        <Form.Item initialValue={initialValue} label={label} name={name} rules={rules}>
            <Input.TextArea size="middle" className="rounded-md" placeholder={placeholder} />
        </Form.Item>
    ) : type === 'input_number' ? (
        <Form.Item initialValue={initialValue} label={label} name={name} rules={rules}>
            <InputNumber size="middle" className="rounded-md w-full" placeholder={placeholder} />
        </Form.Item>
    ) : type === 'custom_select' ? (
        <Form.Item initialValue={loading ? '' : selectedValue} label={label} name={name} rules={rules}>
            <Select loading={loading} disabled={loading} defaultValue="">
                <Select.Option value="">{loading ? 'Đang tải dữ liệu' : 'Không chọn'}</Select.Option>
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                        <Select.Option key={index} value={item?._id}>
                            {item.name}
                        </Select.Option>
                    ))}
            </Select>
        </Form.Item>
    ) : null;
};

export default FormItem;
