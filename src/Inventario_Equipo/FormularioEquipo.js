import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, message, Select, InputNumber } from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import AsignarSelect from '../Componentes/AsignarSelect'
import MarcaSelect from '../Componentes/MarcaSelect'
import IpSelect from '../Componentes/IpSelect'
import EstadoSelect from '../Componentes/EstadoSelect'
import ComponentePrincipal from '../Componentes/ComponentePrincipal'
import { Redirect } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';
import Auth from '../Login/Auth';

const { Content } = Layout;
const { TextArea } = Input;
const InputGroup = Input.Group;

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
            encargado_registro: Auth.getDataLog().user.username,
            tipo_equipo: "",
            equipos: [],
            editionMode: false,
            codigo: "",
            numero_serie: "",
            modelo: "",
            id_marca: "",
            estado_operativo: "O",
            ip: undefined,
            componente_principal: undefined,
            asignado: undefined,
            descripcion: "",
            key: "",
            capacidad: 0,
            unidad: "Mb",
            frecuencia: 0,
            nucleo: 0,
            tipo_mem: "",
            redireccionar: false
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
                    this.crear_equipo(values);
                } else {
                    values.key = this.state.key;
                    this.editar_equipo(values);
                }
            }
        });
    }


    crear_equipo(values) {
        Axios.crear_otro_equipo(values).then(() => {
            message.loading({ content: 'Guardando datos...', key });
            setTimeout(() => {
                message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
            }, 1000);
            this.setState({ redireccionar: true });
        }).catch(error => {
            if (error.response) {
                message.error(error.response.data.log, 4)
                    .then(() => message.error('No fue posible registrar los datos', 3))
            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }

    cargar_datos(info) {
        this.setState({ tipo_equipo: info.tipo_equipo, });
        this.props.form.setFieldsValue({
            codigo: info.codigo,
            modelo: info.modelo,
            tipo_equipo: info.tipo_equipo,
            descripcion: info.descripcion,
            numero_serie: info.numero_serie
        });
        this.setState({ key: info.key });
        this.setState({ estado_operativo: info.estado_operativo });
        this.setState({ id_marca: info.marca });

        if (info.componente_principal !== null) {
            this.setState({ componente_principal: info.componente_principal });
        }
        if (info.asignado !== null || info.asignado !== '') {
            this.setState({ asignado: info.asignado });
        }
        if (info.ip !== null) {
            this.setState({ ip: info.ip });
        }

        if (info.tipo_equipo === 'memoria_ram' || info.tipo_equipo === 'disco_duro' || info.tipo_equipo === 'ram'
            || info.tipo_equipo === 'procesador') {
            Axios.info_extra(info.key).then(res => {
                let registro = {};
                res.data.forEach(function (dato) {
                    if (dato.campo === "capacidad") {
                        registro.campo1 = "Capacidad"
                        registro.dato1 = dato.dato
                    }
                    if (dato.campo === "tipo") {
                        registro.campo2 = "Tipo"
                        registro.dato2 = dato.dato

                    }
                    if (dato.campo === "nucleos") {
                        registro.campo1 = "Núcleos"
                        registro.dato1 = dato.dato
                    }
                    if (dato.campo === "frecuencia") {
                        registro.campo2 = "Frecuencia"
                        registro.dato2 = dato.dato
                    }
                });

                if (registro.campo1 === "Capacidad") {
                    this.setState({ capacidad: registro.dato1 })
                } else {
                    this.setState({ nucleo: registro.dato1 })
                }
                if (registro.campo2 === "Tipo") {
                    this.setState({ tipo_mem: registro.dato2 })
                }
                if (registro.campo2 === "Frecuencia") {
                    this.setState({ frecuencia: registro.dato2 })
                }
            })
        }

    }

    editar_equipo(values) {
        Axios.editar_equipo(values).then(res => {
            message.loading({ content: 'Actualizando datos...', key });
            setTimeout(() => {
                message.success({ content: "Edición realizada satisfactoriamente", key, duration: 3 });
            }, 1000);
            this.setState({ redireccionar: true });
        }).catch(er => {
            if (er.response) {
                message.error(er.response.data.log, 4)
                    .then(() => message.error('No fue posible actualizar los datos', 3))
            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }

    redireccionar() {
        if (this.state.redireccionar) {
            return <Redirect to='/sistemas/otrosequipos' />
        }
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>
                {this.redireccionar()}
                <div className="div-container">
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
                                    }}>
                                    {
                                        this.state.equipos.map((dato, index) =>
                                            <Select.Option key={index} value={dato}>{dato}</Select.Option>
                                        )
                                    }
                                </Select>
                            )
                            }
                        </Form.Item >

                        {this.state.tipo_equipo.toLocaleLowerCase() === "otro" ?
                            <InputComponent
                                class=""
                                label="Tipo de equipo"
                                id="tipo"
                                decorator={getFieldDecorator} />
                            : null
                        }


                        <Form.Item
                            label="Código">
                            {getFieldDecorator('codigo', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.codigo
                            })
                                (<Input disabled={this.state.editionMode} />)}
                        </Form.Item>

                        <Form.Item
                            label="Número de serie">
                            {getFieldDecorator('numero_serie', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.numero_serie
                            })
                                (<Input />)}
                        </Form.Item>

                        <Form.Item
                            label="Modelo">
                            {getFieldDecorator('modelo', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.modelo
                            })
                                (<Input />)}
                        </Form.Item>

                        <MarcaSelect
                            class=""
                            id="id_marca"
                            required={true}
                            decorator={getFieldDecorator}
                            initialValue={this.state.id_marca} />

                        <EstadoSelect
                            class=""
                            id="estado_operativo"
                            required={true}
                            decorator={getFieldDecorator}
                            initialValue={this.state.estado_operativo} />

                        {this.state.tipo_equipo.toLocaleLowerCase() === "memoria_ram" || this.state.tipo_equipo.toLocaleLowerCase() === "disco_duro" ||
                            this.state.tipo_equipo.toLocaleLowerCase() === "ram" || this.state.tipo_equipo.toLocaleLowerCase() === "discoduro" ?
                            <div>
                                <Form.Item label="Capacidad">
                                    <InputGroup compact>
                                        {getFieldDecorator('capacidad', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.capacidad,
                                        })(<InputNumber min={0} ></InputNumber>)}
                                        {getFieldDecorator('un', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.unidad,
                                        })(<Select >
                                            <Select.Option value="Mb">Mb</Select.Option>
                                            <Select.Option value="GB">GB</Select.Option>
                                            <Select.Option value="TB">TB</Select.Option>
                                        </Select>)}
                                    </InputGroup>
                                </Form.Item>
                                <Form.Item label="Tipo">
                                    {getFieldDecorator('tipo_mem', {
                                        rules: [{ required: true, message: 'Debe completar este campo' }],
                                        initialValue: this.state.tipo_mem,
                                    })(<Select>
                                        <Select.Option value="DDR">DDR</Select.Option>
                                        <Select.Option value="DDR2">DDR2</Select.Option>
                                        <Select.Option value="DDR3">DDR3</Select.Option>
                                        <Select.Option value="DDR3/DDR4">DDR3/DDR4</Select.Option>
                                        <Select.Option value="DDR4">DDR4</Select.Option>
                                    </Select>)}
                                </Form.Item>
                            </div>
                            : null
                        }
                        {this.state.tipo_equipo.toLocaleLowerCase() === "procesador" ?
                            <div>
                                <Form.Item label="Frecuencia">
                                    {getFieldDecorator('frecuencia',
                                        {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.frecuencia
                                        })(
                                            <InputNumber
                                                min={0}
                                            />
                                        )}
                                </Form.Item>
                                <Form.Item label="Núcleos">
                                    {getFieldDecorator('nucleo',
                                        {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.nucleo
                                        })(
                                            <InputNumber
                                                min={0}
                                            />
                                        )}
                                </Form.Item>
                            </div>
                            : null
                        }

                        <IpSelect
                            class=""
                            required={false}
                            id="ip"
                            decorator={getFieldDecorator}
                            initialValue={this.state.ip} />

                        <ComponentePrincipal
                            class=""
                            id="componente_principal"
                            required={false}
                            decorator={getFieldDecorator}
                            initialValue={this.state.componente_principal} />

                        <AsignarSelect
                            class=""
                            required={false}
                            id="asignado"
                            decorator={getFieldDecorator}
                            initialValue={this.state.asignado} />

                        <Form.Item label="Descripción">
                            {getFieldDecorator('descripcion', { initialValue: this.state.descripcion })
                                (<TextArea />)}
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
FormularioEquipo = Form.create({})(FormularioEquipo);
export default FormularioEquipo;

