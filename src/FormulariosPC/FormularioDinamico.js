import React, { Fragment, useState } from 'react';
import { Form, Input, Icon, Button, InputNumber } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import InNumComp from '../Componentes/InputNumberComp';

let id = 0;
const tailLayout = {  wrapperCol: { offset: 10, span: 5 } };          
//const { Option } = Select;      
const buttonItemLayout = { wrapperCol: {span: 14, offset: 8} };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormularioDinamico = Form.create({
    name:'Dinamico'})( props => {
        const blankCat = { codigo: '', marca: '', modelo: '', nserie: '', capacidad: 0, tipo: '', descr: '' };
        const obj =  props.indx;
        const [registro, setRegistro] = useState(obj);  
        const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
        getFieldDecorator('keys1', { initialValue: [0] });
     
        const add1 = () => {
            const { form } = props;
            const keys1 = form.getFieldValue('keys1');
            const nextKeys1 = keys1.concat(id++);
            const values = [...registro];
            values.push(blankCat);
            setRegistro(values);
            form.setFieldsValue({
            keys1: nextKeys1,
            });
        };

        const remove1 = k => {
            const { form } = props;
            const keys1 = form.getFieldValue('keys1');
            if (keys1.length === 1) {
            return;
            }
            const values = [...registro];
            values.splice(k, 1);
            setRegistro(values);
            form.setFieldsValue({
            keys1: keys1.filter(key => key !== k),
            });
        };

        const handleInputChange = (index, name, event) => {
            const values = [...registro];
            if (name === "codigo") {
            values[index].codigo = event.currentTarget.value;
            } else if (name ==='modelo') {
                values[index].modelo = event.currentTarget.value;
            } else {
                values[index].nserie = event.currentTarget.value;
            } 
            setRegistro(values);
        };

        const formuItems = registro.map((k, index) => (
            <Fragment key={`${k}~${index}`}>
                <div style={{marginLeft: 40, marginRight: 40, marginBottom: 40, }} key={"coldd"+index}>
                    <div style={{paddingTop: 35,borderRadius: 10, borderColor: "#39CCCC" , borderWidth: 1 ,borderStyle: "solid", }}>
                        <Form.Item
                        label="Código" 
                        disabled={false}
                        className="form2col"
                        >
                            {getFieldDecorator(`codigo${index}`, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro[index].codigo,
                                onChange: e => handleInputChange(index, 'codigo', e)
                            })(
                                <Input />
                            )}
                        </Form.Item>    
                        <Form.Item
                        label="Modelo" 
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`modelo${index}`, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro.modelo,
                                onChange: e => handleInputChange(index, 'modelo', e)
                            })(
                                <Input />
                            )}
                        </Form.Item>  
                        <MarcaComp required={true}         id={"marca"}  class="form2col" decorator={getFieldDecorator} />
                        <InputComp label="Número de serie" onChange={(e) => handleInputChange(index, 'nserie',e)} initialValue={registro.nserie}  id={"nserie"} class="form2col" decorator={getFieldDecorator} />
                        <span>
                            <Form.Item
                            label="Capacidad" 
                            disabled={false}
                            className="form2col"            
                            >
                                {getFieldDecorator(`capacidad${index}`, {
                                    rules: [{ required: true, message: 'Debe completar este campo' }],
                                    initialValue: registro.capacidad,
                                    onChange: e => handleInputChange(index, 'capacidad', e)
                                })(
                                    <div>
                                        <InputNumber style={{ width: '65%', marginRight: '3%' }}/>
                                        {/* <Select style={{ width: '32%' }}>
                                            <Option value="rmb">RMB</Option>
                                            <Option value="dollar">Dollar</Option>
                                        </Select> */}
                                    </div>
                                )}
                            </Form.Item>  
                        </span>
                        <InputComp label="Tipo"            id={"tipo"}   class="form2col" decorator={getFieldDecorator} />
                        <DescrComp label="Descripción"     id={"descr"}  class="form2col" decorator={getFieldDecorator} />
                
                {registro.length > 1 ? ( 
                    <div style={{background: "#39CCCC" , borderRadius: 10, padding: 10}}  className="App">
                        <Icon type="minus-circle-o" onClick={() => remove1(k)} /> 
                    </div>) : null}
                </div>
            </div>
        </Fragment>
    ));

    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            setRegistro(registro)
            registro.map((element) => (
                props.indx.push(element)
                ));
            if(!err) {
                props.submittedValues(props.indx);
                props.isStepFinal === true ? props.handleConfirmButton(props.indx) : props.handleNextButton()
            }
        });
    }
    
    const storeValues = () => {
        const values = getFieldsValue();
        console.log("valores", values)
        props.submittedValues(props.indx);
        props.handleBackButton();
    }

    return (   
        <Form {...layout} name="form" layout="horizontal" onSubmit={validateInput}> 
            {props.verDetalleRAM === true ?
            <div style={{marginLeft: 40, marginRight: 40,}} key={"c"}>
                <div style={{borderRadius: 10,}}>     
                    <InNumComp label="RAM Soportada" class="form2col" id="ram_soportada" text="GB" initialValue={props.ram_soportada} decorator={getFieldDecorator} />
                    <InNumComp label="Número slots"  class="form2col" id="num_slots"     text=""   initialValue={props.num_slots} decorator={getFieldDecorator} />
                </div>
            </div> : null}
            {formuItems}
            <Form.Item {...buttonItemLayout}>
                <Button type="dashed" onClick={add1} icon="plus" style={{ width: '60%' }} > 
                    Agregar {props.nombre}
                </Button>
            </Form.Item> 
               
            <Form.Item {...tailLayout}>
                {props.isStepFinal === true ? 
                    <Button type="primary" style={{marginRight: 3}} htmlType="submit">Guardar</Button> :
                    <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                }
                <Button type="default" onClick={storeValues} >Regresar</Button>
            </Form.Item>
        </Form>
    );
});

export default FormularioDinamico;