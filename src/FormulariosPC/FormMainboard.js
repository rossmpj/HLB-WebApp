import React from 'react'
import { Form, Button } from 'antd';
import InputComp from '../Componentes/InputComponent';
import InNumComp from '../Componentes/InputNumberComp';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormMainboard = Form.create({
    name:'Perifericos'})( props => {
    const { getFieldDecorator, getFieldsValue, validateFields } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, valor) => {
            if(!err) {
                props.submittedValues(valor);
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
                <InputComp label="Código"                id="codigo_mainb"  initialValue={props.codigo} decorator={getFieldDecorator} disabled={props.disabled} />
                <MarcaComp required={false}              id="marca_mainb"   initialValue={props.marca} decorator={getFieldDecorator} />
                <InputComp label="Modelo"                id="modelo_mainb"  initialValue={props.modelo} decorator={getFieldDecorator} />
                <InputComp label="Número de serie"       id="nserie_mainb"  initialValue={props.nserie} decorator={getFieldDecorator} />  
                <InNumComp label="RAM Soportada"         id="ram_soportada" initialValue={props.ram_soportada} decorator={getFieldDecorator} text="GB" />
                <InNumComp label="Número slots"          id="num_slots"     initialValue={props.num_slots} decorator={getFieldDecorator} text=""  />
                <InNumComp label="Conexiones disco duro" id="conexiones_dd" initialValue={props.conexiones_dd} decorator={getFieldDecorator} text=""  />
                <DescrComp label="Descripción"           id="descr_mainb"   initialValue={props.descripcion} decorator={getFieldDecorator} />
            </div>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormMainboard;