import { Form, Input, Button, Checkbox } from 'antd';

const FormComponent = ({ onSubmit, children, initialValues, onSetField, onValuesChange }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onSubmit(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            layout="vertical"
            wrapperCol={{
                span: 22,
            }}
            // initialValues={initialValues ? initialValues : {}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={onValuesChange}
        >
            {children}
        </Form>
    );
};

export default FormComponent;
