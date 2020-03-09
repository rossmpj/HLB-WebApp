import React from 'react';
import '../App.css';
import { Form, Button, Layout, InputNumber, Divider, Icon } from 'antd';
import '../custom-antd.css';
import { Collapse } from 'antd';
import InputComp from '../Componentes/InputComponent';
import DescrComp from '../Componentes/DescripcionComponent';
import CapacComp from '../Componentes/CapacidadComponent';
import MarcaComp from '../Componentes/MarcaSelect';

let id = 0;
const { Panel } = Collapse;
const { Content } = Layout;

const tailLayout = {
  wrapperCol: { offset: 9, span: 5 }
};

const buttonItemLayout = {
  wrapperCol: {span: 14, offset: 8},
};

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
    loading: true,
  };
  
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
    // can use data-binding to get
    const keys1 = form.getFieldValue('keys1');
    // We need at least one passenger
    if (keys1.length === 1) {
      return;
    }

    // can use data-binding to set
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
              <InputComp label="Código Laptop"   id="codigo_laptop" class="form2col" decorator={getFieldDecorator} />
              <MarcaComp required={true}         id="marca_laptop"  class="form2col" decorator={getFieldDecorator} />
              <InputComp label="Modelo"          id="modelo_laptop" class="form2col" decorator={getFieldDecorator} />
              <InputComp label="Número de serie" id="nserie_laptop" class="form2col" decorator={getFieldDecorator} />
              <DescrComp label="Descripción"     id="descr_laptop"  class="form2col" decorator={getFieldDecorator} />
        
              <Divider orientation="left">DATOS DEL PROCESADOR</Divider>
              <Form.Item className="form2col" label="Frecuencia">
                {getFieldDecorator('frecuencia', { rules: [{ required: true, message: 'Debe completar este campo' }],
                })( <InputNumber /> )}<span className="ant-form-text"> GHz</span> 
              </Form.Item>
              <Form.Item className="form2col" label="Núcleos">
                {getFieldDecorator('nucleos', { rules: [{ required: true, message: 'Debe completar este campo' }],
                })( <InputNumber /> )}
              </Form.Item>
          
              <Divider orientation="left">DATOS GENERALES DE MEMORIA RAM</Divider>
              <Form.Item className="form2col" label="RAM Soportada">
                {getFieldDecorator('ram_soportada', { rules: [{ required: true, message: 'Debe completar este campo' }],
                })( <InputNumber /> )}<span className="ant-form-text"> GB</span> 
              </Form.Item>
              <Form.Item className="form2col" label="Número de slots">
                {getFieldDecorator('nslots', { rules: [{ required: true, message: 'Debe completar este campo' }],
                })( <InputNumber /> )}
              </Form.Item>
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