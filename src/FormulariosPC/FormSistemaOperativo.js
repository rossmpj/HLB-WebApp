import React, { useState, useEffect } from 'react';
import { Form, Button, Select, Switch } from 'antd';
import Axios from '../Servicios/AxiosLaptop'
import AxiosPrograma from '../Servicios/AxiosPrograma'

const { Option } = Select;
const tailLayout = { wrapperCol: { offset: 11, span: 5 } };             
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormSistemaOperativo = Form.create({
    name:'SistOp'})( props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [office, setOffice] = useState([]);
    const [so, setSo] = useState([]);
    useEffect(() => {
        Axios.listar_so().then(res => {
          setSo(res.data); });    
      }, []);
    useEffect(() => {
    AxiosPrograma.listado_programas().then(res => {
        setOffice(res.data); });    
    }, []);
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if(!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    }
    // const storeValues = () => {
    //     const values = getFieldsValue();
    //     props.submittedValues(values);
    //     props.handleBackButton();
    // }
    return (
        <Form {...layout} layout="horizontal" onSubmit={validateInput}>
            <Form.Item label="SO">
                {getFieldDecorator('so', {
                  rules: [{required: true, message: 'Debe completar este campo' }],
                  initialValue: props.so
                })(
                    <Select>
                        { so.map(m=><Option key={m} value={m}>{m}</Option>)}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Tipo de SO">
                {getFieldDecorator('tipo_so', {
                    rules: [{required: true, message: 'Debe completar este campo' }],
                    initialValue: props.tipo_so
                })(
                <Select style={{ width: 90 }} >
                    <Option value="32 Bits">32 Bits</Option>
                    <Option value="64 Bits">64 Bits</Option>
                </Select>
                )}
                 {/* <span className="ant-form-text">bits</span> */}
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
            <Form.Item label="Programas">
                {getFieldDecorator('office', {
                    rules: [{required: true, message: 'Debe completar este campo' }],
                    initialValue: props.office
                })(
                <Select mode="multiple">                    
                    { office.map(m=> <Option key={m.id_programa} value={m.id_programa}>{m.nombre}</Option>)}
                </Select>
                )}
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormSistemaOperativo;