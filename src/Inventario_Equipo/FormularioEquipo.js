import React from 'react';
import '../App.css';
import {
    Form,
    Input,
    Button,
    Layout
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import AsignarSelect from '../Componentes/AsignarSelect'
import MarcaSelect from '../Componentes/MarcaSelect'
import IpSelect from '../Componentes/IpSelect'
import ComponentePrincipal from '../Componentes/ComponentePrincipal'
import TipoSelect from '../Componentes/TipoSelect'



const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class FormularioEquipo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo: "",
            estado: "disponible",
            encargado: "",
            id: ""
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


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>
                <div className="div-border-top" >
                    <div className="div-container">
                        <Form {...layout}
                            layout="horizontal"
                            onSubmit={this.handle_guardar}
                        >
                            <InputComponent class="" label="Código" name="codigo" decorator={getFieldDecorator} />
                            {/*  <Form.Item label="Estado">
                                {getFieldDecorator('estado', {
                                    rules: [{ required: true, message: 'Debe seleccionar el estado' }],
                                })(
                                    <Select>
                                        <Select.Option value="disponible">Disponible</Select.Option>
                                        <Select.Option value="revision">En revisión</Select.Option>
                                        <Select.Option value="reparado">Reparado</Select.Option>
                                        <Select.Option value="baja">De baja</Select.Option>
                                    </Select>
                                )}
                            </Form.Item> */}

                            <InputComponent class="" label="Número de serie" name="nserie" decorator={getFieldDecorator} />

                            <TipoSelect required={true} decorator={getFieldDecorator} />

                            <InputComponent class="" label="Modelo" name="modelo" decorator={getFieldDecorator} />

                            <MarcaSelect required={true} decorator={getFieldDecorator} />

                            <IpSelect required={false} decorator={getFieldDecorator}></IpSelect>

                            <ComponentePrincipal required={false} decorator={getFieldDecorator}></ComponentePrincipal>

                            <AsignarSelect required={false} decorator={getFieldDecorator}></AsignarSelect>

                            <Form.Item label="Descripción">
                                {getFieldDecorator('descripcion')(
                                    <TextArea />
                                )}
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                                <Button type="primary">Cancelar</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content >
        );
    }
}
FormularioEquipo = Form.create({})(FormularioEquipo);
export default FormularioEquipo;