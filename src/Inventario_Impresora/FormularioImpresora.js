import React from 'react';
import '../App.css';
import {
    Form,
    Select,
    Input,
    Button,
    Layout,
    message
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import AsignarSelect from '../Componentes/AsignarSelect'
import MarcaSelect from '../Componentes/MarcaSelect'
import IpSelect from '../Componentes/IpSelect'
import ComponentePrincipal from '../Componentes/ComponentePrincipal'
import EstadoSelect from '../Componentes/EstadoSelect'
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

class FormularioImpresora extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo: "",
            cinta: "",
            cartucho: "",
            toner: "",
            rodillo: "",
            tinta: "",
            rollo: "",
            encargado_registro: "admin",
            editionMode: false,
            key: "",
            codigo: "",
            id_marca: "",
            estado_operativo: "O",
            ip: undefined,
            componente_principal: undefined,
            asignado: undefined,
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.inicializar_formulario(this.props.data.state.info);
                this.setState({ editionMode: true });
            }
        }
    }



    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.encargado_registro = this.state.encargado_registro;
                if (!this.state.editionMode) {
                    console.log(values);
                    Axios.crear_impresora(values).then(res => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(error => {
                        if (error.response) {
                            message.error(error.response.data.log, 4)
                            .then(() => message.error('No fue posible registrar los datos', 2.5))
                        } else{
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                        }
                    });
                } else {
                    values.key = this.state.key;
                    console.log(values);
                    Axios.editar_impresora(values).then(res => {
                        message.loading({ content: 'Actualizando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro actualizado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(error => {     
                        if (error.response) {
                            message.error(error.response.data.log, 4)
                            .then(() => message.error('No fue posible actualizar los datos', 3))
                        } else{
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                        }
                    });
                }
            }
        });
    }

    inicializar_formulario(info) {
        if (typeof info.tabla_equipo !== 'undefined') {
            let registro = {};
            Axios.impresora_id(info.tabla_equipo).then(res => {
                res.data.forEach(function (dato) {
                    let empleado = "";
                    if (dato.empleado !== null) {
                        empleado = dato.empleado.concat(" ", dato.apellido);
                    }
                    registro.key = dato.id_impresora;
                    registro.numero_serie = dato.numero_serie;
                    registro.asignado = empleado;
                    registro.tipo = dato.tipo;
                    registro.id_marca = dato.id_marca;
                    registro.codigo = dato.codigo;
                    registro.estado_operativo = dato.estado_operativo;
                    registro.modelo = dato.modelo;
                    registro.tinta = dato.tinta;
                    registro.cartucho = dato.cartucho;
                    registro.descripcion = dato.descripcion;
                    registro.toner = dato.toner;
                    registro.rodillo = dato.rodillo;
                    registro.cinta = dato.cinta;
                    registro.rollo = dato.rollo;
                    registro.ip = dato.ip;
                    registro.componente_principal = dato.componente_principal;
                });
                this.cargar_datos(registro);
            }).catch(err => {
                message.error('Problemas de conexión con el servidor, inténtelo más tarde', 4);
            });
        } else {
            this.cargar_datos(info);
        }
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            numero_serie: info.numero_serie,
            codigo: info.codigo,
            modelo: info.modelo,
            descripcion: info.descripcion
        })
        this.setState({ key: info.key });

        this.setState({ id_marca: info.marca });
        this.setState({ estado_operativo: info.estado_operativo });
        if (info.ip !== null) {
            this.setState({ ip: info.ip });
        }
        if (info.componente_principal !== null) {
            this.setState({ componente_principal: info.componente_principal });
        }

        if (info.asignado !== null || info.asignado !== '') {
            this.setState({ asignado: info.asignado });
        }
        this.setState({ tipo: info.tipo });

        if (info.tipo.toLocaleLowerCase() === "matricial") {
            this.setState({ cinta: info.cinta, cartucho: info.cartucho });
        }

        if (info.tipo.toLocaleLowerCase() === "impresora") {
            this.setState({ tinta: info.tinta, cartucho: info.cartucho });
        }

        if (info.tipo.toLocaleLowerCase() === "brazalete") {
            this.setState({ tinta: info.tinta, cartucho: info.cartucho });
            this.setState({ rollo: info.rolloBrazalete, toner: info.toner });
        }

        if (info.tipo.toLocaleLowerCase() === "escáner") {
            this.setState({ rodillo: info.rodillo });
        }

        if (info.tipo.toLocaleLowerCase() === "multifuncional") {
            this.setState({ rodillo: info.rodillo, toner: info.toner });
            this.setState({ cartucho: info.cartucho });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>
                <div className="div-container">
                    <Form {...layout}
                        layout="horizontal"
                        onSubmit={this.handle_guardar}
                    >
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

                        <Form.Item label="Tipo">
                            {getFieldDecorator('tipo', {
                                rules: [{ required: true, message: 'Debe seleccionar el tipo de impresora' }],
                                initialValue: this.state.tipo
                            })(
                                <Select
                                    onChange={(value) => {
                                        this.setState({ tipo: value });
                                    }}>
                                    <Select.Option value="Multifuncional">Multifuncional</Select.Option>
                                    <Select.Option value="Matricial">Matricial</Select.Option>
                                    <Select.Option value="Brazalete">Brazalete</Select.Option>
                                    <Select.Option value="Impresora">Impresora</Select.Option>
                                    <Select.Option value="Escáner">Escáner</Select.Option>
                                </Select>
                            )}
                        </Form.Item>

                        <MarcaSelect
                            class=""
                            id="id_marca"
                            required={true}
                            initialValue={this.state.id_marca}
                            decorator={getFieldDecorator} />

                        <EstadoSelect
                            class=""
                            id="estado_operativo"
                            required={true}
                            initialValue={this.state.estado_operativo}
                            decorator={getFieldDecorator} />

                        <InputComponent
                            class=""
                            label="Modelo"
                            id="modelo"
                            decorator={getFieldDecorator} />

                        {
                            this.state.tipo.toLocaleLowerCase() === "matricial" ?
                                <div>
                                    <Form.Item
                                        label="Cinta">
                                        {getFieldDecorator('cinta', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cinta
                                        })(
                                            <Input
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })(
                                            <Input
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "impresora" ?
                                <div>
                                    <Form.Item
                                        label="Tinta">
                                        {getFieldDecorator('tinta', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.tinta
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "brazalete" ?
                                <div>
                                    <Form.Item
                                        label="Rollo-Brazalete">
                                        {getFieldDecorator('rollo', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.rollo
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Tinta">
                                        {getFieldDecorator('tinta', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.tinta
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Toner">
                                        {getFieldDecorator('toner', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.toner
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "escáner" ?
                                <div>
                                    <Form.Item
                                        label="Rodillo">
                                        {getFieldDecorator('rodillo', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.rodillo
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "multifuncional" ?
                                <div>
                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Toner">
                                        {getFieldDecorator('toner', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.toner
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Rodillo">
                                        {getFieldDecorator('rodillo', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.rodillo
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        <IpSelect class=""
                            required={false}
                            id="ip"
                            initialValue={this.state.ip}
                            decorator={getFieldDecorator} />

                        <ComponentePrincipal class=""
                            required={false}
                            id="componente_principal"
                            initialValue={this.state.componente_principal}
                            decorator={getFieldDecorator} />

                        <AsignarSelect class=""
                            required={false}
                            id="asignado"
                            initialValue={this.state.asignado}
                            decorator={getFieldDecorator} />

                        <Form.Item label="Descripción">
                            {getFieldDecorator('descripcion')(
                                <TextArea />
                            )}
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>

                        </Form.Item>
                    </Form>
                </div>
            </Content >
        );
    }
}
FormularioImpresora = Form.create({})(FormularioImpresora);
export default FormularioImpresora;