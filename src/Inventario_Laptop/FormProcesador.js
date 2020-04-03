import React from 'react';
import { Form, Button } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import InNumComp from '../Componentes/InputNumberComp';

const tailLayout = { wrapperCol: { offset: 10, span: 5 } };              
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormProcesador = Form.create({
    name:'Procesador'})( props => {
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
            <InputComp label="Código"          id="codigo_proc"  initialValue={props.codigo_proc}  decorator={getFieldDecorator} />
            <MarcaComp required={true}         id="marca_proc"   initialValue={props.marca_proc}   decorator={getFieldDecorator} />
            <InputComp label="Modelo"          id="modelo_proc"  initialValue={props.modelo_proc}  decorator={getFieldDecorator} />
            <InputComp label="Número de serie" id="nserie_proc"  initialValue={props.nserie_proc}  decorator={getFieldDecorator} />    
            <InNumComp label="Frecuencia"      id="frec_proc"    initialValue={props.frec_proc}    decorator={getFieldDecorator} text="GHz" />
            <InNumComp label="Núcleos"         id="nucleos_proc" initialValue={props.nucleos_proc} decorator={getFieldDecorator} text=""/>
            <DescrComp label="Descripción"     id="descr_proc"   initialValue={props.descr_proc}   decorator={getFieldDecorator} />
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                <Button type="default" onClick={storeValues} >Regresar</Button>
            </Form.Item>
        </Form>
    );
});

export default FormProcesador;