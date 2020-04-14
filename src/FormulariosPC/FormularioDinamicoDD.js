import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Icon, Button, InputNumber, Select } from 'antd';
import InNumComp from '../Componentes/InputNumberComp';
import Axios from '../Servicios/AxiosTipo'

let id = 0;
const tailLayout = {  wrapperCol: { offset: 10, span: 5 } };          
const { Option } = Select;    
const InputGroup = Input.Group;  
const buttonItemLayout = { wrapperCol: {span: 14, offset: 8} };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormularioDinamicoDD = Form.create({
    name:'Dinamico'})( props => {
        const blank = { codigo: '', marca: '', modelo: '', nserie: '', capacidad: {cant: 0, un: "Mb"}, tipo: '', descr: '' };
        var obj = [];
        var r = [];
        const [marca, setMarcas] = useState([]);
        
         useEffect(() => {
        Axios.mostrar_marcas().then(res => {
            res.data.forEach(function (dato) {
                let users = {
                    id: dato.id_marca,
                    dato: dato.nombre
                }
                r.push(users);
            });
            setMarcas(r);   
      }, []);
        
            //console.log("rrrrrrrrrr",marca)
        // }).catch(err => {
        //     console.log(err);
         });
        // console.log("a",props.indx)
        // console.log("b",props.index)
        if (props.editionMode ===false) { 
            obj.push(blank)
        }else{
            if(props.nombre ==="disco duro")
            {
                props.index.map( (elem) =>(
                    obj.push(elem)
                )) 
            }else if (props.nombre==="memoria RAM")
            {
                props.indx.map( (elem) =>(
                obj.push(elem)
            )) 
            }
            
        }
        //obj.push(blank)
        const [registro, setRegistro] = useState(obj);  
    // console.log(registro)
    //     console.log("f",obj)
        const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
        getFieldDecorator('keys1', { initialValue: [0] });
     
        const add1 = () => {
            const { form } = props;
            const keys1 = form.getFieldValue('keys1');
            const nextKeys1 = keys1.concat(id++);
            const values = [...registro];
            values.push(blank);
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
        const op = (index) =>{
             return(
                <Select onSelect={(value, e) => handleInputChange(index, value, 'marca', e)}>
               { marca.map(m=>
                    <Option key={m.id} value={m.id}>{m.dato}</Option>
                )}
             </Select>   

         )
        }

        const selec = (index) => {
            return(
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
                                 op(index)                          
                            )}
                        </Form.Item>   
            )     
        }

        const handleInputChange = (index, value, name, event) => {
            const values = [...registro];
            if (name === 'codigo') {
                values[index].codigo = event.currentTarget.value;
                //console.log(values[index].codigo, event.currentTarget.value, event.currentTarget.name)
            } else if (name ==='marca') {
                values[index].marca = value;
            } else if (name ==='modelo') {
                values[index].modelo = event.currentTarget.value;
            } else if (name ==='numero_serie') {
                values[index].nserie = event.currentTarget.value;
            } else if (name ==='capac') {
                values[index].capacidad.cant = value;
                //console.log("c",values[index].capacidad.cant)
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
                                <Input name='codigo'/>
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
                                    { marca.map(m=>
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
                                    //onChange: e => handleInputChange(index, 'capac', e)
                                })(
                                    //<Input />
                                    <InputNumber onChange={(value, e) => handleInputChange(index, value, 'capac', e)} style={{ width: '70%' }} />
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
                                    <Option value="DDR">DDR</Option>
                                    <Option value="DDR2">DDR2</Option>
                                    <Option value="DDR3">DDR3</Option>
                                    <Option value="DDR3/DDR4">DDR3/DDR4</Option>
                                    <Option value="DDR4">DDR4</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                        label="Descripción" 
                        disabled={false}
                        className="form2col"            
                        >
                            {getFieldDecorator(`descripcion${index}`+props.nombre, {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
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
            //setRegistro(registro)
            //props.indx.push(registro)
            
            console.log("val inp",props.indx)
            //if (registro !== []){
              if (props.nombre ==="memoria RAM"){
                registro.map( function(element, index) {
                    if (props.indx[index].codigo !== undefined && element.codigo !== undefined){
                        if (element.codigo !== props.indx[index].codigo) {
                            obj.push(element);
                            //console.log(element.capacidad.split(" ")[0])
                        } 
                    }    
                    
                         
                    })  
              }else if (props.nombre==="disco duro"){
                registro.map( function(element, index) {
                    if (props.index[index].codigo !== undefined && element.codigo !== undefined){
                        if (element.codigo !== props.index[index].codigo) {
                            obj.push(element);
                            //console.log(element.capacidad.split(" ")[0])
                        } 
                    }    
                    
                         
                    })  
              }
           
       // }
                //console.log("el.cod",element.codigo)
             //  );
            if(!err) {
                if (props.isStepFinal === true){
                    props.handleConfirmButton(obj)
                } else{
                    props.submittedValues(obj)
                    props.handleNextButton()
                } 
            }
        });
    }
    
    const storeValues = () => {
        const values = getFieldsValue();
        //props.indx.push(registro)
        console.log("valores", values)
        //setRegistro(registro)
            //console.log("val inp",registro)
            // registro.map( function(element, index){
            //     if (element.codigo !== obj[index].codigo) {
            //         obj.push(element);
            //      } 
            if(props.nombre==="memoria RAM"){
                registro.map( function(element, index){
                    props.indx.push(element)
                    
         }   )
         
        props.submittedValues(props.indx);
            }else if (props.nombre ==="disco duro"){
                registro.map( function(element, index){
                    props.index.push(element)
                    
         }   )
         
        props.submittedValues(props.index);
        }
            // })
        props.handleBackButton();
    }

    return (   
        <Form {...layout} name="form" layout="horizontal" onSubmit={validateInput}> 
            {props.verDetalleRAM === true ?
            <div style={{marginLeft: 40, marginRight: 40,}} key={props.nombre+"c"}>
                <div style={{borderRadius: 10,}}>     
                    <InNumComp label="RAM Soportada" style={{ width: '70%' }} class="form2col" id="ram_soportada" text="GB" initialValue={props.ram_soportada} decorator={getFieldDecorator} />
                    <InNumComp label="Número slots" style={{ width: '100%' }}  class="form2col" id="num_slots"     text=""   initialValue={props.num_slots} decorator={getFieldDecorator} />
                </div>
            </div> : null}
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
                <Button type="default" onClick={storeValues} >Regresar</Button>
            </Form.Item>
        </Form>
    );
});

export default FormularioDinamicoDD;