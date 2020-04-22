import React, { useEffect, useState } from 'react'
import { Form, Button, message } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import AsignComp from '../Componentes/AsignarSelect';
import IpSelect from '../Componentes/IpSelect';
import EstadComp from '../Componentes/EstadoSelect';
import Axios from '../Servicios/AxiosDesktop'

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormGeneral = Form.create({
    name:'General'})( props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [codigos, setCodigos] = useState([]);
    useEffect(() => {
        Axios.listado_codigos().then(res => {
          setCodigos(res.data); });    
    }, []);

    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (props.disabled === false){
                if (codigos.includes(values.codigo)){
                    message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
                }else{
                    if(!err) {
                        props.submittedValues(values);
                        props.handleNextButton();
                    }
                }
            }else{
                if(!err) {
                    props.submittedValues(values);
                    props.handleNextButton();
                }
            }
        });
    }

    return (
        <Form {...layout} key={props.nombre} layout="horizontal" onSubmit={validateInput}>
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