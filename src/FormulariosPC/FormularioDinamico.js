import React, { Fragment, useState } from 'react';
import { Form, Input, Icon, Button, InputNumber, Select } from 'antd';

let id = 0;
const tailLayout = {  wrapperCol: { offset: 11, span: 5 } };          
const { Option } = Select;    
const InputGroup = Input.Group;  
const buttonItemLayout = { wrapperCol: {span: 14, offset: 8} };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const FormularioDinamico = Form.create({
    name:'Dinamico'})( props => {
        const [nSlotsValido, setNSlotsValido] = useState(true);
        const [capacidadValida, setCapacidadValida] = useState(true);
        //const [ramValida, setRamValida] = useState(true);
        const ram = { codigo: '', marca: '', modelo: '', nserie: '', capacidad: {cant: 0, un: "Mb"}, tipo: '', descr: '' };
        var obj = [];   
        if (props.editionMode === false) {
            obj.push(ram)
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
            values.push(ram);
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

        const ramValidator = (value) => {       
            const { getFieldValue } = props.form;
            const values = [...registro];
            let ram_soportada = getFieldValue('ram_soportada');
            if(ram_soportada.length > 4){
                ram_soportada = getFieldValue('ram_soportada').split(" ")[0]
            }
            console.log(ram_soportada)
            var suma = 0;
            for (let index = 0; index < values.length; index++) {
                let element = values[index].capacidad.cant;
                let unidad = values[index].capacidad.un;
                if(unidad === "Mb"){
                    element = element/1024;
                }
                suma += element;
            }
            if (suma <= ram_soportada){
                console.log("exito")
                setCapacidadValida(true)
                return true;
            }else{
                console.log("error")
                setCapacidadValida(false)
                return false;
            }
        }

        const slotsValidator = (value) => {       
            let num_slots = value;
            if (num_slots >= registro.length) {
                console.log("exito")
                setNSlotsValido(true)
                return true;
            }else{
                console.log("error")
                setNSlotsValido(false)
                return false;
            }
        }
       
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
                setCapacidadValida(ramValidator(value));        
            }else if (name ==='un') {
                values[index].capacidad.un = value;
            } else if (name ==='tipo') {
                values[index].tipo = value;
            } else if (name ==='descripcion') {
                values[index].descr = event.currentTarget.value;
            } 
            setRegistro(values);
        };

        const handleSlotsChange = (value, name, e) => {
            const { form } = props;
            setNSlotsValido(slotsValidator(value));
            const fvalue = value;
            form.setFieldsValue({
                'num_slots': fvalue
            });
        };
        // const handleRamChange = (value, name, e) => {
        //     const { form } = props;
        //     //setRamValida(ramValidator(value));
        //     const fvalue = value;
        //     form.setFieldsValue({
        //         'ram_soportada': fvalue
        //     });
        // };

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
                                        <Select.Option key={m.id} value={m.id}>{m.dato}</Select.Option>
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
                        className="form2col" hasFeedback
                        help="La capacidad debe ser menor a la RAM soportada" 
                        validateStatus={!capacidadValida ? 'error' :  'success' }
         
                        >
                            <InputGroup compact>
                                {getFieldDecorator(`capac${index}`+props.nombre, {
                                    rules: [{ required: true, message: 'Debe completar este campo' }],
                                    initialValue: registro[index].capacidad.cant,
                                })(
                                    <InputNumber 
                                    min={1}
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
                                rules: [{ required: false, message: 'Debe completar este campo' }],
                                initialValue: registro[index].descr,
                                onChange: e => handleInputChange(index, null, 'descripcion', e)
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    {(registro.length > 1) && (props.editionMode===false) ? ( 
                        <div style={{background: "#39CCCC" , borderRadius: 10, padding: 10}}  className="App">
                            <Button disabled onClick={() => remove1(k)}  ><Icon type="minus-circle-o" /> Quitar</Button>
                        </div> 
                        ) : null}
                </div>
            </div>
        </Fragment>
    ));

    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (nSlotsValido && capacidadValida) {
                if(props.editionMode === false){
                    registro.forEach(element =>{
                        props.datos.push(element)
                    })
                }
                console.log("val inp",props.datos)
                if(!err) {
                    if (props.isStepFinal === true){
                        props.handleConfirmButton(registro)
                    } else{
                        let ram_soportada = values.ram_soportada;
                        if(ram_soportada.toString().length <= 3 && !ram_soportada.toString().includes("GB")){
                            ram_soportada = values.ram_soportada.toString().concat(" GB")
                        }
                        props.submittedValues( {"ram_soportada": ram_soportada, "num_slots": values.num_slots}, registro)
                        props.handleNextButton()
                    } 
                }
            }
        });
    }
    
    // const storeValues = () => {
    //     setRegistro(registro)
    //     props.submittedValues(registro)
    //     props.handleBackButton();
    // }

    return (   
        <Form {...layout} name="form" layout="horizontal" onSubmit={validateInput}> 
            {/* {props.verDetalleRAM === true ? */}
            <div style={{marginLeft: 40, marginRight: 40,}} key={props.nombre+"c"}>
                <div style={{borderRadius: 10,}}>     
                    {/* <InNumComp label="RAM Soportada" style={{ width: '70%' }} class="form2col" id="ram_soportada" text="GB" initialValue={props.ram_soportada} decorator={getFieldDecorator} />
                    <InNumComp label="Número slots" style={{ width: '100%' }}  class="form2col" id="num_slots"  text=" "  initialValue={props.num_slots} decorator={getFieldDecorator} /> */}
                    <Form.Item 
                        className="form2col"   label="RAM Soportada" 
                        // hasFeedback help="El número de memorias RAM agregadas no debe exceder el número de slots" 
                        // validateStatus={!ramValida ? 'error' :  'success' }
                        >
                        {getFieldDecorator('ram_soportada', {
                        rules: [{ required: true, message: 'Debe completar este campo. ' }],
                        initialValue: props.ram_soportada
                        })( <InputNumber min={1} max={32} style={{ width: '85%' }} 
                        // onChange={(value, e) => handleRamChange(value, 'ram_soportada', e)}
                        /> )}
                            <span className="ant-form-text">GB</span>
                    </Form.Item>
                    <Form.Item 
                        className="form2col" label="Número slots" hasFeedback help="El número de memorias RAM agregadas no debe exceder el número de slots" 
                        validateStatus={!nSlotsValido ? 'error' :  'success' }>
                        {getFieldDecorator('num_slots', {
                        rules: [{ required: true, message: 'Debe completar este campo. ' }],
                        initialValue: props.num_slots
                        })( <InputNumber min={1} max={8} style={{ width: '100%' }} onChange={(value, e) => handleSlotsChange(value, 'num_slots', e)}/> )}
                    </Form.Item>
                </div>
            </div>
              {/* : null} */}
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

export default FormularioDinamico;