import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, message, Select } from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import AsignarSelect from '../Componentes/AsignarSelect'
import MarcaSelect from '../Componentes/MarcaSelect'
import IpSelect from '../Componentes/IpSelect'
import EstadoSelect from '../Componentes/EstadoSelect'
import ComponentePrincipal from '../Componentes/ComponentePrincipal'
import FormularioImpresora from '../Inventario_Impresora/FormularioImpresora'
import FormularioDesktop from '../Inventario_Desktop/FormularioDesktop'
import FormularioRouter from '../Inventario_Router/FormularioRouter'
import FormularioLaptop from '../Inventario_Laptop/FormularioLaptop'
import Axios from '../Servicios/AxiosTipo'

const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';

class FormularioEquipo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            encargado_registro: "admin",
            id: "",
            tipo_equipo: "",
            equipos: [],
            editionMode: false,
            codigo: "",
            numero_serie: "",
            modelo: "",
            id_marca: "",
            ip: "",
            key:""
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        this.mostrar_tipo_equipos();
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
                this.setState({ editionMode: true });
            }
        }
    }

    mostrar_tipo_equipos() {
        let tipo = [];
        Axios.mostrar_tipo_equipo().then(res => {
            res.data.forEach(function (dato) {
                tipo.push(dato.tipo_equipo);
            });
            tipo.push("Otro");
            this.setState({ equipos: tipo });
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, revise la conexión con el servidor', 4);
        });
    }


    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.encargado_registro = this.state.encargado_registro;
                if (!this.state.editionMode) {
                    Axios.crear_otro_equipo(values).then(res => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        console.log(err)
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                    });
                } else {
                    console.log(values);
                    values.key=this.state.key;
                     Axios.editar_equipo(values).then(res => {
                        message.loading({ content: 'Actualizando datos...', key });
                        setTimeout(() => {
                            message.success({ content: res.data.log, key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        console.log(err);
                    }); 
                }
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
             estado_operativo: info.estado_operativo,
            codigo: info.codigo, 
            tipo_equipo: info.tipo_equipo,
             id_marca: info.marca,
            modelo: info.modelo,
            descripcion: info.descripcion,
            numero_serie: info.numero_serie,
            componente_principal: info.componente_principal,
            asignado: info.asignado,
            ip: info.ip
        });
        this.setState({ key: info.key });
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
                            {this.state.tipo_equipo.toLocaleLowerCase() === "otro" ?
                                <InputComponent
                                    class=""
                                    label="Tipo de equipo"
                                    id="tipo"
                                    decorator={getFieldDecorator} />
                                : null
                            }


                            <InputComponent
                                class=""
                                label="Código"
                                id="codigo"
                                decorator={getFieldDecorator} />

                            <InputComponent
                                class=""
                                label="Número de serie"
                                id="numero_serie"
                                decorator={getFieldDecorator} />

                            <InputComponent
                                class=""
                                label="Modelo"
                                id="modelo"
                                decorator={getFieldDecorator} />

                            <MarcaSelect
                                class=""
                                id="id_marca"
                                required={true}
                                decorator={getFieldDecorator} />

                            <EstadoSelect
                                class=""
                                id="estado_operativo"
                                required={true}
                                decorator={getFieldDecorator} />

                            <IpSelect
                                class=""
                                required={false}
                                id="ip"
                                decorator={getFieldDecorator} />

                            <ComponentePrincipal
                                class=""
                                id="componente_principal"
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
                            label="Seleccione el tipo de equipo"
                        >
                            {getFieldDecorator('tipo_equipo', {
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
                                        this.state.equipos.map((dato, index) =>
                                            <Select.Option key={index} value={dato}>{dato}</Select.Option>
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

