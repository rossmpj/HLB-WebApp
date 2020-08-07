import React, { useState, useEffect } from 'react';
import { Form, Button, message, InputNumber } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import Axios from '../Servicios/AxiosDesktop'

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };              
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormProcesador = Form.create({
    name:'Procesador'})( props => {
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
                if (codigos.includes(values.codigo_proc)){
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
            // console.log("codec", props.codigo_equipo)
            // if (codigos.includes(values.codigo_proc)){
            //     message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
            // }else if (props.codigo_equipo===values.codigo_proc){
            //     message.error("El código ya fue asignado al equipo ", 4)
            // } else {
            //     if(!err) {
            //         props.submittedValues(values);
            //         props.handleNextButton();
            //     }
            // }
        });
    }

    const nucleosValidator = (rule, value, callback) => {
        try {
        if( value !== 1 && value !== 2 && value !== 4 && value !== 8 && value !== 16 && value !== 32 && value !== 64) {
                throw new Error("El procesador debe ser de 2 a la n núcleos, MÁX: 64");
                }
            } catch (err) {
                callback(err);
            }
      }

      const frecuenciaValidator = (rule, value, callback) => {
        try {
        if( isNaN(parseFloat(value)) && !isFinite(value) && value<1 && value>5.3){
        // !value.match('(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,2})?$')) {
                throw new Error("La frecuencia del procesador debe ser un valor entre 1 y 5.3 GHz");
                }
            } catch (err) {
                callback(err);
            }
      }
      

    // const storeValues = () => {
    //     const values = getFieldsValue();
    //     props.submittedValues(values);
    //     props.handleBackButton();
    // }
    return (
        <Form {...layout} layout="horizontal" onSubmit={validateInput}>
            <InputComp label="Código"          id="codigo_proc"  initialValue={props.codigo_proc}  decorator={getFieldDecorator} disabled={props.disabled} />
            <MarcaComp required={true}         id="marca_proc"   initialValue={props.marca_proc}   decorator={getFieldDecorator} />
            <InputComp label="Modelo"          id="modelo_proc"  initialValue={props.modelo_proc}  decorator={getFieldDecorator} />
            <InputComp label="Número de serie" id="nserie_proc"  initialValue={props.nserie_proc}  decorator={getFieldDecorator} />    
            <Form.Item label="Frecuencia">
                {getFieldDecorator('frec_proc', {
                rules: [{ required: true, message: 'Debe completar este campo. ' }, {validator: frecuenciaValidator}],
                initialValue: props.frec_proc
                })( <InputNumber min={1.0} max={5.3} /> )}
            </Form.Item>
            {/* <InNumComp label="Frecuencia"      id="frec_proc"    initialValue={props.frec_proc}    decorator={getFieldDecorator} text="GHz" /> */}
            <Form.Item label="Núcleos">
                {getFieldDecorator('nucleos_proc', {
                rules: [{ required: true, message: 'Debe completar este campo. ' }, {validator: nucleosValidator}],
                initialValue: props.nucleos_proc
                })( <InputNumber min={1} max={64} /> )}
            </Form.Item>
            {/* <InNumComp label="Núcleos"         id="nucleos_proc" initialValue={props.nucleos_proc} decorator={getFieldDecorator} text=""/> */}
            <DescrComp label="Descripción"     id="descr_proc"   initialValue={props.descr_proc}   decorator={getFieldDecorator} />
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormProcesador;