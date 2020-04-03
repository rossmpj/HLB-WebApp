import React from 'react';
import { Form, Button, Select, Switch } from 'antd';

const { Option } = Select;
const tailLayout = { wrapperCol: { offset: 10, span: 5 } };             
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormSistemaOperativo = Form.create({
    name:'SistOp'})( props => {
    const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if(!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    }
    const storeValues = () => {
        const values = getFieldsValue();
        props.submittedValues(values);
        props.handleBackButton();
    }
    return (
        <Form {...layout} layout="horizontal" onSubmit={validateInput}>
            <Form.Item label="SO">
                {getFieldDecorator('so', {
                  rules: [{required: true, message: 'Debe completar este campo' }],
                  initialValue: props.so
                })(
                    <Select>
                        <Select.Option value="win7">Windows 7</Select.Option>
                        <Select.Option value="win10">Windows 10</Select.Option>
                        <Select.Option value="linkali">Linux Kali</Select.Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Tipo de SO">
                {getFieldDecorator('tipo_so', {
                    rules: [{required: true, message: 'Debe completar este campo' }],
                    initialValue: props.tipo_so
                })(
                <Select style={{ width: 80 }} >
                    <Option value="x86">32</Option>
                    <Option value="x64">64</Option>
                </Select>
                )} <span className="ant-form-text">bits</span>
            </Form.Item>
            <Form.Item label="Service pack 1">
                {getFieldDecorator('sp1', {
                    valuePropName: 'checked',
                    initialValue: props.sp1,
                    rules: [{required: true, message: 'Debe completar este campo' }]
                })( <Switch checkedChildren="Si" unCheckedChildren="No" /> )}
            </Form.Item>
            <Form.Item label="Licencia">
                {getFieldDecorator('licencia', {
                    valuePropName: 'checked',
                    initialValue: props.licencia,
                    rules: [{required: true, message: 'Debe completar este campo' }]
                })( <Switch checkedChildren="Si" unCheckedChildren="No" /> )}
            </Form.Item>
            <Form.Item label="Office">
                {getFieldDecorator('office', {
                    rules: [{required: true, message: 'Debe completar este campo' }],
                    initialValue: props.office
                })(
                <Select>
                    <Select.Option value="2010">Office 2010</Select.Option>
                    <Select.Option value="2013">Office 2013</Select.Option>
                </Select>
                )}
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                <Button type="default" onClick={storeValues} >Regresar</Button>
            </Form.Item>
        </Form>
    );
});

export default FormSistemaOperativo;