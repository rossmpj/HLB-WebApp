import React from 'react';
import '../App.css';
import {
  Form,
  Select,
  Input,
  Button,
  Layout,
  InputNumber,
  Divider,
  Icon,
  Switch
} from 'antd';
import '../custom-antd.css';
import { Collapse } from 'antd';
import MarcaSelect from '../Componentes/MarcaSelect';
import InputComponent from '../Componentes/InputComponent';
import AsignarSelect from '../Componentes/AsignarSelect';
import IpSelect from '../Componentes/IpSelect';

let id = 0;
const { Panel } = Collapse;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 9, span: 5 }
};

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 8 },
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

  handle_guardar = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  }

  state = {
    loading: true,
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <Collapse>
        <Panel header={"RAM " + (k + 1)} key={k + 1}
          extra={keys.length > 1 ? (<Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} />) : null}
        >
          <Form.Item className="form-item-2columns" label="Código">
            <Input />
          </Form.Item>
          <Form.Item className="form-item-2columns" label="Marca">
            <Select>
              <Select.Option value="demo">LG</Select.Option>
              <Select.Option value="dmo">Xiaomi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className="form-item-2columns" label="Modelo">
            <Input />
          </Form.Item>
          <Form.Item className="form-item-2columns" label="Número de serie">
            <Input />
          </Form.Item>
          <Form.Item className="form-item-2columns" label="Capacidad">
            <InputNumber />
            <Select style={{ width: 80 }} >
              <Option value="rmb">MB</Option>
              <Option value="dollar">GB</Option>
              <Option value="dollar">TB</Option>
            </Select>
          </Form.Item>
          <Form.Item className="form-item-2columns" label="Tipo">
            <Input />
          </Form.Item>
          <Form.Item className="form-item-2columns" label="Descripción">
            <TextArea />
          </Form.Item>
        </Panel>
      </Collapse>
    ));

    return (
      <Content>
        <div className="div-border-top" >
          <div className="div-container">
            <Form {...layout}
              layout="horizontal"
            >
              <Divider orientation="left">DATOS GENERALES</Divider>
              <InputComponent label="Código PC"  id="codigo"   class="form-item-2columns" decorator={getFieldDecorator} />
              <AsignarSelect  required={true}    id="asignado" class="form-item-2columns" decorator={getFieldDecorator} />
              <IpSelect       required={true}    id="ip"       class="form-item-2columns" decorator={getFieldDecorator} />
              <InputComponent label="Nombre PC"  id="nombrepc" class="form-item-2columns" decorator={getFieldDecorator} />
              <InputComponent label="Usuario-PC" id="nombrepc" class="form-item-2columns" decorator={getFieldDecorator} />
              <Form.Item className="form-item-2columns" label="Estado" >
                <Select>
                  <Select.Option value="demo">LG</Select.Option>
                  <Select.Option value="dmo">Xiaomi</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Descripción general">
                <TextArea />
              </Form.Item>

              <Divider orientation="left">SISTEMA OPERATIVO</Divider>
              <Form.Item className="form-item-2columns" label="SO">
                <Select>
                  <Select.Option value="demo">LG</Select.Option>
                  <Select.Option value="dmo">Xiaomi</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Service pack">
                <Select>
                  <Select.Option value="demo">LG</Select.Option>
                  <Select.Option value="dmo">Xiaomi</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Licencia">
                <Switch checkedChildren="Si" unCheckedChildren="No" />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Tipo de SO">
                <Select style={{ width: 80 }} >
                  <Option value="rmb">x32</Option>
                  <Option value="dollar">x64</Option>
                </Select>
                bits
              </Form.Item>

              <Divider orientation="left">PERIFÉRICOS</Divider>
              <Collapse >
                <Panel header="Monitor" key="1">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>
                  <MarcaSelect 
                    class="form-item-2columns"
                    id="mmonitor"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse >
                <Panel header="Teclado" key="2">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mteclado"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse >
                <Panel header="UPS" key="3">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mups"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse >
                <Panel header="Mouse" key="4">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mmouse"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Divider orientation="left">CPU</Divider>
              <Collapse >
                <Panel header="Tarjeta Madre" key="1">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mcpu"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="RAM Soportada">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de slots">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Conexiones para Disco Duro">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse>
                <Panel header="Memoria RAM" key="2">
                  {formItems}
                  {/*<Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Marca">
                    <Select>
                      <Select.Option value="demo">LG</Select.Option>
                      <Select.Option value="dmo">Xiaomi</Select.Option>
                    </Select>
                  </Form.Item >
                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Capacidad">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Tipo">
                    <Select>
                      <Select.Option value="demo">LG</Select.Option>
                      <Select.Option value="dmo">Xiaomi</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>*/}
                  <Form.Item {...buttonItemLayout}>
                    <Button
                      type="dashed"
                      onClick={this.add}
                      icon="plus"
                      style={{ width: '60%' }}
                    >
                      Agregar memoria RAM
                    </Button>
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse>
                <Panel header="Disco duro" key="3">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mdisco"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Capacidad">
                    <InputNumber />
                    <Select style={{ width: 80 }} >
                      <Option value="rmb">MB</Option>
                      <Option value="dollar">GB</Option>
                      <Option value="dollar">TB</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Tipo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse>
                <Panel header="Procesador" key="4">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mprocesador"
                    required={false}
                    decorator={getFieldDecorator} />

                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Frecuencia">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de núcleos">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse>
                <Panel header="Tarjeta de red" key="5">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>

                  <MarcaSelect
                    class="form-item-2columns"
                    id="mred"
                    required={false}
                    decorator={getFieldDecorator} />


                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse>
                <Panel header="Case" key="6">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Marca">
                    <Select>
                      <Select.Option value="demo">LG</Select.Option>
                      <Select.Option value="dmo">Xiaomi</Select.Option>
                    </Select>
                  </Form.Item >
                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
                </Panel>
              </Collapse>
              <br />
              <Collapse>
                <Panel header="Fuente de poder" key="7">
                  <Form.Item className="form-item-2columns" label="Código">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Marca">
                    <Select>
                      <Select.Option value="demo">LG</Select.Option>
                      <Select.Option value="dmo">Xiaomi</Select.Option>
                    </Select>
                  </Form.Item >
                  <Form.Item className="form-item-2columns" label="Modelo">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Número de serie">
                    <Input />
                  </Form.Item>
                  <Form.Item className="form-item-2columns" label="Descripción">
                    <TextArea />
                  </Form.Item>
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