import React, { Fragment } from 'react'
import { Form, Button, Select } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };        
const { Option } = Select;  

const FormComponente = Form.create({
    name:'Componente'})( props => {
    const { getFieldDecorator, validateFields } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, v) => {
            console.log("vals", v)
            if(!err) {
                props.submittedValues(v)
                // if(props.nombre === 'monitor'){
                //     props.submittedValues({monitor: {"codigo": v.codigo_monitor, "marca": v.marca_monitor, "modelo": v.modelo_monitor, "nserie": v.nserie_monitor, "descr": v.descr_monitor}})
                // }else if (props.nombre === 'teclado'){
                //     props.submittedValues({teclado: {"codigo": v.codigo_teclado, "marca": v.marca_teclado, "modelo": v.modelo_teclado, "nserie": v.nserie_teclado, "descr": v.descr_teclado}})
                // }else if(props.nombre === 'mouse'){
                //     props.submittedValues({"codigo": v.codigo_mouse, "marca": v.marca_mouse, "modelo": v.modelo_mouse, "nserie": v.nserie_mouse, "descr": v.descr_mouse})
                // }else if (props.nombre === 'parlantes'){
                //     props.submittedValues({"codigo": v.codigo_parlantes, "marca": v.marca_parlantes, "modelo": v.modelo_parlantes, "nserie": v.nserie_parlantes, "descr": v.descr_parlantes})
                // }else if(props.nombre === 'case'){
                //     props.submittedValues({"codigo": v.codigo_case, "marca": v.marca_case, "modelo": v.modelo_case, "nserie": v.nserie_case, "descr": v.descr_case})
                // }else if (props.nombre === 'fuente_poder'){
                //     props.submittedValues({"codigo": v.codigo_fuente_poder, "marca": v.marca_fuente_poder, "modelo": v.modelo_fuente_poder, "nserie": v.nserie_fuente_poder, "descr": v.descr_fuente_poder})
                // }else if(props.nombre === 'tarjeta_red'){
                //     props.submittedValues({"codigo": v.codigo_tarjeta_red, "marca": v.marca_tarjeta_red, "modelo": v.modelo_tarjeta_red, "nserie": v.nserie_tarjeta_red, "descr": v.descr_tarjeta_red})
                // }else if (props.nombre === 'fuente_alimentacion'){
                //     props.submittedValues({"codigo": v.codigo_fuente_alimentacion, tipo: v.tipo, "marca": v.marca_fuente_alimentacion, "modelo": v.modelo_fuente_alimentacion, "nserie": v.nserie_fuente_alimentacion, "descr": v.descr_fuente_alimentacion})
                // }
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
        <Form {...layout} key={props.nombre} layout="horizontal" onSubmit={validateInput}>
            <div style={{marginLeft: 40, marginRight: 40, marginBottom: 40 }} > 
            {props.nombre=== 'fuente_alimentacion' ? 
            <Form.Item
            label="Tipo de fuente de alimentación"
            disabled={false}           
            >
                {getFieldDecorator("tipo", {
                    rules: [{ required: true, message: 'Debe completar este campo' }],
                    initialValue: props.tipo,
                })(
                    <Select style={{ width: '100%' }}>
                        <Option value="UPS">UPS</Option>
                        <Option value="Regulador">Regulador</Option>
                        <Option value="Ninguno">Ninguno</Option>
                    </Select>
                )}
            </Form.Item>:null
        
            }
                 {props.tipo==="Ninguno"
            ? <div className="App">No aplica</div> :   <Fragment key={props.nombre} >
                <InputComp label="Código"          id={"codigo_"+props.nombre} class="" initialValue={props.codigo} decorator={getFieldDecorator} disabled={props.disabled} />
                <MarcaComp required={true}          id={"marca_"+props.nombre}  class="" initialValue={props.marca} decorator={getFieldDecorator} />
                <InputComp label="Modelo"          id={"modelo_"+props.nombre} class="" initialValue={props.modelo} decorator={getFieldDecorator} />
                <InputComp label="Número de serie" id={"nserie_"+props.nombre} class="" initialValue={props.nserie} decorator={getFieldDecorator} />
                <DescrComp label="Descripción"     id={"descr_"+props.nombre}  class="" initialValue={props.descr} decorator={getFieldDecorator} />
                </Fragment>}
            </div>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormComponente;