import React from 'react';
import '../App.css';
import {
    Form,
    Input,
    Button,
    Layout,
    message,
    Select
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import AsignarSelect from '../Componentes/AsignarSelect'
import MarcaSelect from '../Componentes/MarcaSelect'
import IpSelect from '../Componentes/IpSelect'
import ComponentePrincipal from '../Componentes/ComponentePrincipal'
import FormularioImpresora from '../Inventario_Impresora/FormularioImpresora'
import FormularioDesktop from '../Inventario_Desktop/FormularioDesktop'
import FormularioRouter from '../Inventario_Router/FormularioRouter'
import FormularioLaptop from '../Inventario_Laptop/FormularioLaptop'

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
            estado: "disponible",
            encargado: "",
            id: "",
            tipo_equipo: "",
            equipos: []
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        var comp = ["Servidor", "UPS", "Impresora", "Cpu", "Router"];
        this.setState({ equipos: comp });
    }


    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                message.success('Registro guardado satisfactoriamente')
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            nserie: info.nserie,
            modelo: info.modelo,
            marca: info.marca,
            ip: info.ip,
            principal: info.principal,
            asignado: info.asignado,
            descripcion: info.descripcion,
            tipo: info.tipo
        })
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const condicional = () => {
            switch (this.state.tipo_equipo.toLocaleLowerCase()) {
                case "impresora":
                    return <FormularioImpresora data={undefined}> </FormularioImpresora>;
                case "cpu":
                    return <FormularioDesktop data={undefined}></FormularioDesktop>;
                case "laptop":
                    return <FormularioLaptop data={undefined}></FormularioLaptop>;
                case "router":
                    return <FormularioRouter data={undefined}> </FormularioRouter>;
                default:
                    return <div className="div-container">
                        <Form {...layout}
                            layout="horizontal"
                            onSubmit={this.handle_guardar}
                        >
                            <InputComponent
                                class=""
                                label="Número de serie"
                                id="nserie"
                                decorator={getFieldDecorator} />

                            <InputComponent
                                class=""
                                label="Modelo"
                                id="modelo"
                                decorator={getFieldDecorator} />

                            <MarcaSelect
                                class=""
                                id="marca"
                                required={true}
                                decorator={getFieldDecorator} />

                            <IpSelect
                                class=""
                                required={false}
                                id="ip"
                                decorator={getFieldDecorator} />

                            <ComponentePrincipal
                                class=""
                                id="principal"
                                required={false}
                                decorator={getFieldDecorator} />

                            <AsignarSelect
                                class=""
                                required={false}
                                id="asignado"
                                decorator={getFieldDecorator} />

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
                    </div>;
            }
        }
        return (
            <Content>
                <div className="div-background">
                    <Form {...layout}
                        layout="horizontal"
                        onSubmit={this.handle_guardar}
                    >
                        <Form.Item
                            label="Tipo de equipo"
                        >
                            {getFieldDecorator('tipo', {
                                rules: [{ required: true, message: 'Debe completar este campo' }]
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={(value) => {
                                        this.setState({ tipo_equipo: value });
                                    }}
                                >
                                    {
                                        this.state.equipos.map(dato =>
                                            <Select.Option key={dato} value={dato}>{dato}</Select.Option>
                                        )
                                    }
                                </Select>
                            )
                            }
                        </Form.Item >
                    </Form>
                </div>
                <div className="div-miniborder-top" >
                    {condicional()}
                </div>
            </Content >
        );
    }
}
FormularioEquipo = Form.create({})(FormularioEquipo);
export default FormularioEquipo;

