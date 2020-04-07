import React from 'react'
import { Form, Button } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';

const tailLayout = { wrapperCol: { offset: 10, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormComponente = Form.create({
    name:'Componente'})( props => {
    const { getFieldDecorator, getFieldsValue, validateFields } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, v) => {
            if(!err) {
                props.submittedValues(v);
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
            <div style={{marginLeft: 40, marginRight: 40, marginBottom: 40 }} >       
                {/* <Divider> Monitor </Divider> */}
                <InputComp label="Código"          id={"codigo"+props.name} class="" initialValue={props.codigo} decorator={getFieldDecorator} />
                <MarcaComp required={true}          id={"marca"+props.name}  class="" initialValue={props.marca} decorator={getFieldDecorator} />
                <InputComp label="Modelo"          id={"modelo"+props.name} class="" initialValue={props.modelo} decorator={getFieldDecorator} />
                <InputComp label="Número de serie" id={"nserie"+props.name} class="" initialValue={props.nserie} decorator={getFieldDecorator} />
                <DescrComp label="Descripción"     id={"descr"+props.name}  class="" initialValue={props.descripcion} decorator={getFieldDecorator} />
            </div>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                <Button type="default" onClick={storeValues} >Regresar</Button>
            </Form.Item>
        </Form>
    );
});

export default FormComponente;