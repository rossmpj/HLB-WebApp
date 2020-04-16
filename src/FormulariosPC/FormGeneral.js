import React from 'react'
import { Form, Button } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import AsignComp from '../Componentes/AsignarSelect';
import IpSelect from '../Componentes/IpSelect';
import EstadComp from '../Componentes/EstadoSelect';

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormGeneral = Form.create({
    name:'General'})( props => {
    const { getFieldDecorator, validateFields } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if(!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    }
    return (
        <Form {...layout} key={props.name} layout="horizontal" onSubmit={validateInput}>
            <InputComp label="Código" id="codigo" initialValue={props.codigo} decorator={getFieldDecorator} disabled={props.disabled} />
            <AsignComp required={false} id="asignar" initialValue={props.asignar} decorator={getFieldDecorator} />
            {(props.modelo === undefined) || props.modelo=== null || (props.nserie === undefined) ? null : 
            <div>
                <MarcaComp required={true} id="marca" initialValue={props.marca} decorator={getFieldDecorator} />
                <InputComp label="Modelo" id="modelo" initialValue={props.modelo} decorator={getFieldDecorator} />
                <InputComp label="Número de serie" id="nserie" initialValue={props.nserie} decorator={getFieldDecorator} />    
            </div>}
            <InputComp label="Nombre PC" id="nombre_pc" initialValue={props.nombre_pc} decorator={getFieldDecorator} />
            <InputComp label="Usuario-PC" id="usuario_pc" initialValue={props.usuario_pc} decorator={getFieldDecorator} />
            <EstadComp required={true} id="estado" initialValue={props.estado} decorator={getFieldDecorator} />
            <IpSelect required={false} id="ip" initialValue={props.ip} decorator={getFieldDecorator} />
            <DescrComp label="Descripción" id="descripcion" initialValue={props.descripcion} decorator={getFieldDecorator} />
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">Siguiente</Button>
            </Form.Item>
        </Form>
    );
});

export default FormGeneral;