import React from 'react';
import '../App.css';
import { Form, Select, Button, Layout, Divider, Skeleton, Icon, Switch, Collapse, Radio } from 'antd';
import '../custom-antd.css';
import MarcaComp from '../Componentes/MarcaSelect';
import InputComp from '../Componentes/InputComponent';
import AsignComp from '../Componentes/AsignarSelect';
import IpSelect from '../Componentes/IpSelect';
import EstadComp from '../Componentes/EstadoSelect';
import DescrComp from '../Componentes/DescripcionComponent';
import CapacComp from '../Componentes/CapacidadComponent';
import InNumComp from '../Componentes/InputNumberComp';

let id = 0;
const { Panel } = Collapse;
const { Content } = Layout;
const { Option } = Select;
const tailLayout = { wrapperCol: { offset: 9, span: 5 } };
const buttonItemLayout = {   wrapperCol: { span: 14, offset: 8 } };

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
  state = {
    value: 'Noaplica',
    activo: false,
  };

  onChangeRadio = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      activo: true
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

  state = { loading: true, };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  remove1 = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys1 = form.getFieldValue('keys1');
    // We need at least one passenger
    if (keys1.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys1: keys1.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  add1 = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys1 = form.getFieldValue('keys1');
    const nextKeys1 = keys1.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
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
        <Panel  key={"ram_"+(index+1)} header={"RAM " + (index+1)} extra = {keys.length > 0 ? ( 
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
        <Panel  key={"dd"+(index+1)} header={"Disco duro " + (index+1)} extra = {keys1.length > 0 ? ( 
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
              <InputComp label="Código PC"           id="codigo_pc"  class="form2col" decorator={getFieldDecorator} />
              <AsignComp required={true}             id="asignar_pc" class="form2col" decorator={getFieldDecorator} />
              {/* <IpSelect  required={true}             id="ip_pc"      class="form2col" decorator={getFieldDecorator} /> */}
              <InputComp label="Nombre PC"           id="nombre_pc"  class="form2col" decorator={getFieldDecorator} />
              <InputComp label="Usuario-PC"          id="usuario_pc" class="form2col" decorator={getFieldDecorator} />
              <EstadComp required={true}             id="estado_pc"  class="form2col" decorator={getFieldDecorator} />
              <DescrComp label="Descripción general" id= "descr_grl" class="form2col" decorator={getFieldDecorator} />

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
                  rules: [{required: true, message:  'Debe completar este campo' }]
                })(
                  <Select style={{ width: 80 }} >
                  <Option value="x86">32</Option>
                  <Option value="x64">64</Option>
                </Select>
                )} <span className="ant-form-text"> bits</span>
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
                {getFieldDecorator('dir_ip', {
                  valuePropName: 'checked',
                  initialValue: true,
                  rules: [{required: false, message: 'Debe completar este campo' }]
                })( <Switch checkedChildren="Si" unCheckedChildren="No" onChange={this.onChange} /> )}
              </Form.Item>
              <Skeleton active size="small" loading={loading}> 
                <IpSelect class="form2col" required={!loading} id="ip" decorator={getFieldDecorator} />
              </Skeleton> 

              <Divider orientation="left">PERIFÉRICOS</Divider>
              <Collapse accordion key="collapse_perifericos"> 
                <Panel header="Monitor" key="info_monitor">
                  <InputComp label="Código"          id="codigo_monitor" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_monitor"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_monitor" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_monitor" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_monitor"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse> 
                
              <br />*/}
              {/* <Collapse key="collapse_teclado"> */}
                <Panel header="Teclado" key="info_teclado">
                  <InputComp label="Código"          id="codigo_teclado" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_teclado"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_teclado" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_teclado" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_teclado"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse> 
              <br />*/}

              {/* <Collapse key="collapse_parlantes"> */}
                <Panel header="Parlantes" key="info_partantes">
                  <InputComp label="Código"          id="codigo_parlantes" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_parlantes"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_parlantes" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_parlantes" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_parlantes"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse> 
              <br />*/}

              {/* <Collapse key="collapse_mouse"> */}
                <Panel header="Mouse" key="info_mouse">
                  <InputComp label="Código"          id="codigo_mouse" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_mouse"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_mouse" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_mouse" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_mouse"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              </Collapse>
              <br />
              <Divider orientation="left">SISTEMA DE ALIMENTACIÓN</Divider>
              <Radio.Group checked={this.state.activo} defaultValue={['Noaplica']} onChange={this.onChangeRadio} value={this.state.value}>
                <Radio value='UPS'>UPS</Radio>
                <Radio value='Regulador'>Regulador</Radio>
                <Radio value="Noaplica">No aplica</Radio>
              </Radio.Group>
              <br /><br />
              {this.state.value !== 'Noaplica' && this.state.activo === true?  
                <Collapse key="collapse_alimentacion"> 
                  <Panel header={this.state.value} key="info_alimentacion">
                    <InputComp label="Código"          id={"codigo_"+this.state.value} class="form2col" decorator={getFieldDecorator} />
                    <MarcaComp required={true}         id={"marca_"+this.state.value}  class="form2col" decorator={getFieldDecorator} />
                    <InputComp label="Modelo"          id={"modelo_"+this.state.value} class="form2col" decorator={getFieldDecorator} />
                    <InputComp label="Número de serie" id={"nserie_"+this.state.value} class="form2col" decorator={getFieldDecorator} />
                    <DescrComp label="Descripción"     id={"descr_"+this.state.value}  class="form2col" decorator={getFieldDecorator} />
                  </Panel>
                </Collapse> : null
              }

              <Divider orientation="left">CPU</Divider>
              <Collapse accordion key="collapse_cpu">
                <Panel header="Tarjeta Madre" key="info_tarjetamadre">
                  <InputComp label="Código"                     id="codigo_tarjetamadre" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={false}                   id="marca_tarjetamadre"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"                     id="modelo_tarjetamadre" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie"            id="nserie_tarjetamadre" class="form2col" decorator={getFieldDecorator} />  
                  <InNumComp label="RAM Soportada"              id="ram_soportada"       class="form2col" decorator={getFieldDecorator} text="GB" />
                  <InNumComp label="Número slots"               id="num_slots"           class="form2col" decorator={getFieldDecorator} text=""  />
                  <InNumComp label="Conexiones para disco duro" id="conexiones_dd"       class="form2col" decorator={getFieldDecorator} text=""  />
                  <DescrComp label="Descripción"                id="descr_tarjetamadre"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse>
              <br /> 
              <Collapse key="collapse_ram">*/}
                <Panel header="Memoria RAM" key="info_ram">
                  <InputComp label="Código"          id={"codigo_ram"} class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id={"marca_ram"}  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id={"modelo_ram"} class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id={"nserie_ram"} class="form2col" decorator={getFieldDecorator} />
                  <CapacComp label="Capacidad"       id={"capac_ram"}  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Tipo"            id={"tipo_ram"}   class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id={"descr_ram"}  class="form2col" decorator={getFieldDecorator} />
                  {formItems}
                  <Form.Item {...buttonItemLayout}>
                    <Button type="dashed" onClick={this.add} icon="plus"  style={{ width: '60%' }} > Agregar memoria RAM </Button>
                  </Form.Item>
                </Panel>
              {/* </Collapse>
              <br />
              <Collapse key="collapse_dd"> */}
                <Panel header="Disco duro" key="info_dd">
                  <InputComp label="Código"          id={"codigo_dd"} class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id={"marca_dd"}  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id={"modelo_dd"} class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id={"nserie_dd"} class="form2col" decorator={getFieldDecorator} />
                  <CapacComp label="Capacidad"       id={"capac_dd"}  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Tipo"            id={"tipo_dd"}   class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id={"descr_dd"}  class="form2col" decorator={getFieldDecorator} />
                  {formuItems}
                  <Form.Item {...buttonItemLayout}>
                    <Button type="dashed" onClick={this.add1} icon="plus"  style={{ width: '60%' }} > Agregar disco duro </Button>
                  </Form.Item>
                </Panel>
              {/* </Collapse>
              <br />
              <Collapse key="collapse_procesador"> */}
                <Panel header="Procesador" key="info_procesador">
                  <InputComp label="Código"          id="codigo_procesador" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={false}        id="marca_procesador"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_procesador" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_procesador" class="form2col" decorator={getFieldDecorator} />
                  <InNumComp label="Frecuencia"      id="frec_procesador"   class="form2col" decorator={getFieldDecorator} text="GHz" />
                  <InNumComp label="Núcleos"         id="num_nucleos"       class="form2col" decorator={getFieldDecorator} text="" />
                  <DescrComp label="Descripción"     id="descr_procesador"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse>
              <br />
              <Collapse key="collapse_tarjetared"> */}
                <Panel header="Tarjeta de red" key="info_tarjetared">
                  <InputComp label="Código"          id="codigo_tarjetared" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_tarjetared"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_tarjetared" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_tarjetared" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_tarjetared"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse>
              <br />
              <Collapse key="collapse_case"> */}
                <Panel header="Case" key="info_case">
                  <InputComp label="Código"          id="codigo_case" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_case"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_case" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_case" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_case"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              {/* </Collapse>
              <br />
              <Collapse key="collapse_fuentepoder"> */}
                <Panel header="Fuente de poder" key="info_fuentepoder">
                  <InputComp label="Código"          id="codigo_fuentepoder" class="form2col" decorator={getFieldDecorator} />
                  <MarcaComp required={true}         id="marca_fuentepoder"  class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Modelo"          id="modelo_fuentepoder" class="form2col" decorator={getFieldDecorator} />
                  <InputComp label="Número de serie" id="nserie_fuentepoder" class="form2col" decorator={getFieldDecorator} />
                  <DescrComp label="Descripción"     id="descr_fuentepoder"  class="form2col" decorator={getFieldDecorator} />
                </Panel>
              </Collapse>
              <br />

              <Form.Item {...tailLayout}>
                <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
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