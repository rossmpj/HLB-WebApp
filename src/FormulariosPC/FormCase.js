import React, { Fragment, useState, useEffect } from 'react'
import { Form, Button, Select, message } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import Axios from '../Servicios/AxiosDesktop'

const tailLayout = { wrapperCol: { offset: 11, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };        
const { Option } = Select;  

const FormCase = Form.create({
    name:'FormCase'})( props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [codigos, setCodigos] = useState([]);

    useEffect(() => {
        Axios.listado_codigos().then(res => {
          setCodigos(res.data); });    
    }, []);

    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, v) => {
            if (props.disabled === false){
                if (codigos.includes(v.codigo)){
                    message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
                }else{
                    if(!err) {
                        props.submittedValues(v);
                        props.handleNextButton();
                    }
                }
            }else{
                if(!err) {
                    props.submittedValues(v);
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
                <InputComp label="Código"          id={"codigo"} class="" initialValue={props.codigo} decorator={getFieldDecorator} disabled={props.disabled} />
                <MarcaComp required={true}          id={"marca"}  class="" initialValue={props.marca} decorator={getFieldDecorator} />
                <InputComp label="Modelo"          id={"modelo"} class="" initialValue={props.modelo} decorator={getFieldDecorator} />
                <InputComp label="Número de serie" id={"nserie"} class="" initialValue={props.nserie} decorator={getFieldDecorator} />
                <DescrComp label="Descripción"     id={"descr"}  class="" initialValue={props.descr} decorator={getFieldDecorator} />
                </Fragment>}
            </div>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormCase;