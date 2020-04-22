import React, { useState, useEffect } from 'react'
import { Form, Button, message } from 'antd';
import InputComp from '../Componentes/InputComponent';
import InNumComp from '../Componentes/InputNumberComp';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import Axios from '../Servicios/AxiosDesktop'

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormMainboard = Form.create({
    name:'Perifericos'})( props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [codigos, setCodigos] = useState([]);
    useEffect(() => {
        Axios.listado_codigos().then(res => {
          setCodigos(res.data); });    
    }, []);
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, valor) => {
            if (props.disabled === false){
                if (codigos.includes(valor.codigo)){
                    message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
                }else{
                    if(!err) {
                        props.submittedValues(valor);
                        props.handleNextButton();
                    }
                }
            }else{
                if(!err) {
                    props.submittedValues(valor);
                    props.handleNextButton();
                }
            }
        });
    }
    // const storeValues = () => {
    //     const values = getFieldsValue();
    //     props.submittedValues(values);
    //     props.handleBackButton();
    // }

    return (
        <Form {...layout} layout="horizontal" key={props.nombre} onSubmit={validateInput}>
            <div style={{marginLeft: 40, marginRight: 40, marginBottom: 40 }} >    
                <InputComp label="Código"                id="codigo"  initialValue={props.codigo} decorator={getFieldDecorator} disabled={props.disabled} />
                <MarcaComp required={false}              id="marca"   initialValue={props.marca} decorator={getFieldDecorator} />
                <InputComp label="Modelo"                id="modelo"  initialValue={props.modelo} decorator={getFieldDecorator} />
                <InputComp label="Número de serie"       id="nserie"  initialValue={props.nserie} decorator={getFieldDecorator} />  
                <InNumComp label="RAM Soportada"         id="ram_soportada" initialValue={props.ram_soportada} decorator={getFieldDecorator} text="GB" />
                <InNumComp label="Número slots"          id="num_slots"     initialValue={props.num_slots} decorator={getFieldDecorator} text=""  />
                <InNumComp label="Conexiones disco duro" id="conexiones_dd" initialValue={props.conexiones_dd} decorator={getFieldDecorator} text=""  />
                <DescrComp label="Descripción"           id="descr"   initialValue={props.descripcion} decorator={getFieldDecorator} />
            </div>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormMainboard;