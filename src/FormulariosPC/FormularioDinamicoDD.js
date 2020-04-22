import React, { Fragment, useState } from 'react';
import { Form, Input, Icon, Button, InputNumber, Select } from 'antd';

let id = 0;
const tailLayout = {  wrapperCol: { offset: 11, span: 5 } };          
const { Option } = Select;    
const InputGroup = Input.Group;  
const buttonItemLayout = { wrapperCol: {span: 14, offset: 8} };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormularioDinamicoDD = Form.create({
    name:'Dinamico'})( props => {
        const disco = { codigo: '', marca: '', modelo: '', nserie: '', capacidad: {cant: 0, un: "Mb"}, tipo: '', descr: '' };
        var obj = [];
        if (props.editionMode ===false) { 
            obj.push(disco)
        }else{
            props.datos.map( (elem) =>(
                obj.push(elem)
            ))  
        }
        const [registro, setRegistro] = useState(obj);  
        const { getFieldDecorator, validateFields } = props.form;
        getFieldDecorator('keys1', { initialValue: [0] });
     
        const add1 = () => {
            const { form } = props;
            const keys1 = form.getFieldValue('keys1');
            const nextKeys1 = keys1.concat(id++);
            const values = [...registro];
            values.push(disco);
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

        const handleInputChange = (index, value, name, event) => {
            const values = [...registro];
            if (name === 'codigo') {
                values[index].codigo = event.currentTarget.value;
            } else if (name ==='marca') {
                values[index].marca = value;
            } else if (name ==='modelo') {
                values[index].modelo = event.currentTarget.value;
            } else if (name ==='numero_serie') {
                values[index].nserie = event.currentTarget.value;
            } else if (name ==='capac') {
                values[index].capacidad.cant = value;
            }else if (name ==='un') {
                values[index].capacidad.un = value;
            } else if (name ==='tipo') {
                values[index].tipo = value;
            } else if (name ==='descripcion') {
                values[index].descr = event.currentTarget.value;
            } 
            setRegistro(values);
        };

        const formuItems = registro.map((k, index) => (
            <Fragment key={props.nombre+`${k}~${index}`}>
                <div style={{marginLeft: 40, marginRight: 40, marginBottom: 40, }} key={props.nombre+"coldd"+index}>
                    <div style={{paddingTop: 35,borderRadius: 10, borderColor: "#39CCCC" , borderWidth: 1 ,borderStyle: "solid", }}>
                        <Form.Item
                        label="Código" 
                        disabled={false}
                        className="form2col"
                        >
                            {getFieldDecorator(`codigo${index}`+props.nombre, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro[index].codigo,
                                onChange: (e) => handleInputChange(index, null, 'codigo', e)
                            })(
                                <Input disabled={props.disabled} />
                            )}
                        </Form.Item>    
                        <Form.Item
                        label="Modelo" 
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`modelo${index}`+props.nombre, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro[index].modelo,
                                onChange: e => handleInputChange(index, null, 'modelo', e)
                            })(
                                <Input />
                            )}
                        </Form.Item>  
                        <Form.Item
                        label="Marca" 
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`marca${index}`+props.nombre, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro[index].marca,
                                validateTrigger: ["onChange", "onBlur"], 
                            })(
                                <Select onSelect={(value, e) => handleInputChange(index, value, 'marca', e)}>
                                    { props.marcas.map(m=>
                                            <Option key={m.id} value={m.id}>{m.dato}</Option>
                                        )}
                                </Select>                      
                            )}
                        </Form.Item> 
                        <Form.Item
                        label="Número de serie" 
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`nserie${index}`+props.nombre, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro[index].nserie,
                                onChange: e => handleInputChange(index, null, 'numero_serie', e)
                            })(
                                <Input />
                            )}
                        </Form.Item> 
                        <Form.Item
                        label="Capacidad" 
                        disabled={false}
                        className="form2col"            
                        >
                            <InputGroup compact>
                                {getFieldDecorator(`capac${index}`+props.nombre, {
                                    rules: [{ required: true, message: 'Debe completar este campo' }],
                                    initialValue: registro[index].capacidad.cant,
                                })(
                                    <InputNumber 
                                    min={0}
                                    onChange={(value, e) => handleInputChange(index, value, 'capac', e)} 
                                    style={{ width: '70%' }} />
                                )}
                                {getFieldDecorator(`un${index}`+props.nombre, {
                                    rules: [{ required: true, message: 'Debe completar este campo' }],
                                    initialValue: registro[index].capacidad.un,
                                    validateTrigger: ["onChange", "onBlur"],
                                })( 
                                    <Select onSelect={(value, e) => handleInputChange(index, value, 'un', e)} style={{ width: '30%' }} >
                                        <Option value="Mb">Mb</Option>
                                        <Option value="GB">GB</Option>
                                        <Option value="TB">TB</Option>
                                    </Select>
                                )}
                            </InputGroup>
                        </Form.Item>
                        <Form.Item
                        label="Tipo"
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`tipo${index}`+props.nombre, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: registro[index].tipo,
                            })(
                                <Select onSelect={(value, e) => handleInputChange(index, value, 'tipo', e)} style={{ width: '100%' }}>
                                    <Option value="HDD">HDD</Option>
                                    <Option value="SSD">SSD</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                        label="Descripción" 
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`descripcion${index}`+props.nombre, {
                                rules: [{ required: false, message: 'Debe completar este campo' }],
                                initialValue: registro[index].descr,
                                onChange: e => handleInputChange(index, null, 'descripcion', e)
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    {(registro.length > 1) && (props.editionMode===false) ? ( 
                        <div style={{background: "#39CCCC" , borderRadius: 10, padding: 10}}  className="App">
                            <Button  onClick={() => remove1(k)}  ><Icon type="minus-circle-o" /> Quitar</Button>
                        </div> 
                        ) : null}
                </div>
            </div>
        </Fragment>
    ));

    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if(props.editionMode === false){
                registro.forEach( element => {
                    props.datos.push(element)
                })    
            }
            if(!err) {
                if (props.isStepFinal === true){
                    props.handleConfirmButton(registro);
                    props.handle_guardar()
                } else{
                    props.submittedValues(registro)
                    props.handleNextButton()
                } 
            }
        });
    }
    
    // const storeValues = () => {
    //     const values = getFieldsValue();
    //     console.log("valores", values)
    //     if(props.editionMode === false){
    //         registro.forEach( element =>{
    //             props.datos.push(element)
    //         })
    //         props.submittedValues(props.datos)
    //     }         
    //     props.submittedValues(registro);
    //     props.handleBackButton();
    // }

    return (   
        <Form {...layout} name="form" layout="horizontal" onSubmit={validateInput}> 
            {formuItems}
            {props.editionMode===false ?
            <Form.Item {...buttonItemLayout}>
                <Button type="dashed" onClick={add1} icon="plus" style={{ width: '60%' }} > 
                    Agregar {props.nombre}
                </Button>
            </Form.Item> :null }               
            <Form.Item {...tailLayout}>
                {props.isStepFinal === true ? 
                    <Button type="primary" style={{marginRight: 3}} htmlType="submit">Guardar</Button> :
                    <Button type="primary" style={{marginRight: 3}} onClick={validateInput}>Siguiente</Button>
                }
                {/* <Button type="default" onClick={storeValues} >Regresar</Button> */}
            </Form.Item>
        </Form>
    );
});

export default FormularioDinamicoDD;