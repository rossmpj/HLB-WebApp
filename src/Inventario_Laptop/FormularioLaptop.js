import React from 'react';
import '../App.css';
import { Form, Button, Layout, Divider, Icon, Select, Skeleton, Switch } from 'antd';
import '../custom-antd.css';
import { Collapse } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import CapacComp from '../Componentes/CapacidadComponent';
import MarcaComp from '../Componentes/MarcaSelect';
import AsignComp from '../Componentes/AsignarSelect';
import IpSelect from '../Componentes/IpSelect';
import EstadComp from '../Componentes/EstadoSelect';
import InNumComp from '../Componentes/InputNumberComp';

let id = 0;
const { Panel } = Collapse;
const { Option } = Select;
const { Content } = Layout;
const tailLayout = { wrapperCol: { offset: 9, span: 5 } };
const buttonItemLayout = { wrapperCol: {span: 14, offset: 8} };

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class FormularioDesktop extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
        tipo: ""
    };
    this.handle_guardar = this.handle_guardar.bind(this);
  }

  state = { loading: true };
  
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  remove1 = k => {
    const { form } = this.props;
    const keys1 = form.getFieldValue('keys1');
    if (keys1.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys1: keys1.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  add1 = () => {
    const { form } = this.props;
    const keys1 = form.getFieldValue('keys1');
    const nextKeys1 = keys1.concat(id++);
    form.setFieldsValue({
      keys1: nextKeys1,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  handle_guardar = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
    });
  }

  onChange = checked => {
    this.setState({ loading: !checked });
  };
  
  render() {
    const { loading } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    getFieldDecorator('keys1', { initialValue: [] });
    const keys1 = getFieldValue('keys1');

    const formItems = keys.map((k, index) => (
      <Collapse key={"colram"+index}>
        <Panel  key={"ramm_"+(index+1)} header={"RAM " + (index+1)} extra = {keys.length > 1 ? ( 
          <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} />) : null} >
          <InputComp label="Código"          id={"codigo_ram"+index} class="form2col" decorator={getFieldDecorator} />
          <MarcaComp required={true}         id={"marca_ram"+index}  class="form2col" decorator={getFieldDecorator} />
          <InputComp label="Modelo"          id={"modelo_ram"+index} class="form2col" decorator={getFieldDecorator} />
          <InputComp label="Número de serie" id={"nserie_ram"+index} class="form2col" decorator={getFieldDecorator} />
          <CapacComp label="Capacidad"       id={"capac_ram"+index}  class="form2col" decorator={getFieldDecorator} />
          <InputComp label="Tipo"            id={"tipo_ram"+index}   class="form2col" decorator={getFieldDecorator} />
          <DescrComp label="Descripción"     id={"descr_ram"+index}  class="form2col" decorator={getFieldDecorator} />
        </Panel>         
      </Collapse>
    ));

    const formuItems = keys1.map((k, index) => (
      <Collapse key={"coldd"+index}>
        <Panel  key={"dd"+(index+1)} header={"Disco duro " + (index+1)} extra = {keys1.length > 1 ? ( 
          <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove1(k)} />) : null} >
          <InputComp label="Código"          id={"codigo_dd"+index} class="form2col" decorator={getFieldDecorator} />
          <MarcaComp required={true}         id={"marca_dd"+index}  class="form2col" decorator={getFieldDecorator} />
          <InputComp label="Modelo"          id={"modelo_dd"+index} class="form2col" decorator={getFieldDecorator} />
          <InputComp label="Número de serie" id={"nserie_dd"+index} class="form2col" decorator={getFieldDecorator} />
          <CapacComp label="Capacidad"       id={"capac_dd"+index}  class="form2col" decorator={getFieldDecorator} />
          <InputComp label="Tipo"            id={"tipo_dd"+index}   class="form2col" decorator={getFieldDecorator} />
          <DescrComp label="Descripción"     id={"descr_dd"+index}  class="form2col" decorator={getFieldDecorator} />
        </Panel>         
      </Collapse>
    ));

    return (
      <Content>
        <div className="div-border-top" >
          <div className="div-container"> 
            <Form {...layout} layout="horizontal" onSubmit={this.handle_guardar} >
              <Divider orientation="left">DATOS GENERALES</Divider>
              <InputComp label="Código Laptop"   id="codigo_laptop" class="form2col"  decorator={getFieldDecorator} />
              <AsignComp required={true}         id="asignar_laptop" class="form2col" decorator={getFieldDecorator} />
              <MarcaComp required={true}         id="marca_laptop"  class="form2col"  decorator={getFieldDecorator} />
              <InputComp label="Modelo"          id="modelo_laptop" class="form2col"  decorator={getFieldDecorator} />
              <InputComp label="Número de serie" id="nserie_laptop" class="form2col"  decorator={getFieldDecorator} />
              <InputComp label="Nombre PC"       id="nombre_laptop"  class="form2col" decorator={getFieldDecorator} />
              <InputComp label="Usuario-PC"      id="usuario_laptop" class="form2col" decorator={getFieldDecorator} />
              <EstadComp required={true}         id="estado_laptop"  class="form2col" decorator={getFieldDecorator} />
              <DescrComp label="Descripción"     id="descr_laptop"  class="form2col"  decorator={getFieldDecorator} />

              <Divider orientation="left">SISTEMA OPERATIVO</Divider>
              <Form.Item className="form2col" label="SO">
                {getFieldDecorator('so', {
                  rules: [{required: true, message: 'Debe completar este campo' }]
                })(
                  <Select>
                    <Select.Option value="win7">Windows 7</Select.Option>
                    <Select.Option value="win10">Windows 10</Select.Option>
                    <Select.Option value="linkali">Linux Kali</Select.Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="form2col" label="Tipo de SO">
                {getFieldDecorator('tipo_so', {
                  rules: [{required: true, message: 'Debe completar este campo' }]
                })(
                  <Select style={{ width: 80 }} >
                    <Option value="x86">32</Option>
                    <Option value="x64">64</Option>
                  </Select>
                )} <span className="ant-form-text">bits</span>
              </Form.Item>
              <Form.Item className="form2col" label="Service pack 1">
                {getFieldDecorator('sp1', {
                  valuePropName: 'checked',
                  initialValue: false,
                  rules: [{required: true, message: 'Debe completar este campo' }]
                })( <Switch checkedChildren="Si" unCheckedChildren="No" /> )}
              </Form.Item>
              <Form.Item className="form2col" label="Licencia">
                {getFieldDecorator('licencia', {
                  valuePropName: 'checked',
                  initialValue: false,
                  rules: [{required: true, message: 'Debe completar este campo' }]
                })( <Switch checkedChildren="Si" unCheckedChildren="No" /> )}
              </Form.Item>
              
              <Form.Item className="form2col" label="Office">
                {getFieldDecorator('office', {
                  rules: [{required: true, message: 'Debe completar este campo' }]
                })(
                  <Select>
                    <Select.Option value="2010">Office 2010</Select.Option>
                    <Select.Option value="2013">Office 2013</Select.Option>
                  </Select>
                )}
              </Form.Item>

              <Divider orientation="left">DIRECCIÓN IP</Divider>
              <Form.Item className="form2col" label="¿Asignar IP?">
                {getFieldDecorator('asign_ip', {
                  valuePropName: 'checked',
                  initialValue: true,
                  rules: [{required: false, message: 'Debe completar este campo' }]
                })( <Switch checkedChildren="Si" unCheckedChildren="No" onChange={this.onChange} /> )}
              </Form.Item>
              <Skeleton loading={loading}> 
                <IpSelect class="form2col" required={!loading} id="ip" decorator={getFieldDecorator} />
              </Skeleton> 
        
              <Divider orientation="left">DATOS DEL PROCESADOR</Divider>
              <InNumComp label="Frecuencia"    class="form2col" id="frec_procesador"    text="GHz" decorator={getFieldDecorator} />
              <InNumComp label="Núcleos"       class="form2col" id="nucleos_procesador" text=""    decorator={getFieldDecorator} />
                        
              <Divider orientation="left">DATOS GENERALES DE MEMORIA RAM</Divider>
              <InNumComp label="RAM Soportada" class="form2col" id="ram_soportada"      text="GB"  decorator={getFieldDecorator} />
              <InNumComp label="Número slots"  class="form2col" id="num_slots"          text=""    decorator={getFieldDecorator} />
              <Collapse>
                <Panel header="Memorias RAM" key="info_ram">
                  {formItems}
                  <Form.Item {...buttonItemLayout}>
                    <Button type="dashed" onClick={this.add} icon="plus" style={{ width: '60%' }} > 
                      Agregar memoria RAM
                    </Button>
                  </Form.Item>
                </Panel>
              </Collapse>

              <Divider orientation="left">DATOS DE DISCO DURO</Divider>
              <Collapse>
                <Panel header="Discos duros" key="info_dd">
                  {formuItems}
                  <Form.Item {...buttonItemLayout}>
                    <Button type="dashed" onClick={this.add1} icon="plus" style={{ width: '60%' }} >
                      Agregar disco duro
                    </Button>
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Form.Item {...tailLayout}>
                <Button style={{marginRight: 7}} type="primary" htmlType="submit">Guardar</Button>   
                <Button type="primary">Cancelar</Button>
              </Form.Item>  
            </Form>
          </div>
        </div>  
      </Content>      
    );
  }
}

FormularioDesktop = Form.create({})(FormularioDesktop);
export default FormularioDesktop;