import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, message, InputNumber, Select } from 'antd';
import '../custom-antd.css';
import InputComp from '../Componentes/InputComponent';
import AxiosTipo from '../Servicios/AxiosTipo';
import { Link } from 'react-router-dom';
import AxiosAuth from '../Servicios/AxiosAuth'
import VistaFormulario from '../Componentes/VistaFormulario'
import Auth from '../Login/Auth'

const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = { wrapperCol: { offset: 9, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 }, };
const key = 'updatable';

class FormularioUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            username: '',
            editionMode: false,
            roles: [],
            dptos: []

        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    strongValidator = (rule, value, callback) => {
        try {
            if (!value.match('(([a-z A-Z 1-9])(?=.*[A-Z][a-z])).{7,15}')) {
                throw new Error("Su contaseña debe tener entre 7 y 15 caracteres, incluya al menos una mayúscula, minúscula y un número");
            }
        } catch (err) {
            callback(err);
        }
    }

    IDValidator = (rule, value, callback) => {
        try {
            if (value.length < 10) {
                throw new Error("La cedula Ingresada no es valida");
            }
        } catch (err) {
            callback(err);
        }
    }

    cargar_dptos() {
        AxiosTipo.mostrar_dep_org().then(res => {
            console.log(res.data)
            this.setState({ dptos: res.data });
        }).catch(err => {
            console.log(err);
        });
    }
    cargar_roles() {
        AxiosTipo.mostrar_roles().then(res => {
            console.log(res.data)
            this.setState({ roles: res.data });
        }).catch(err => {
            console.log(err);
        });
    }




    componentDidMount = () => {
        this.cargar_dptos();
        this.cargar_roles();
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                const { info } = this.props.data.state;
                const { titulo } = this.props.data.state;
                if (info !== undefined) {
                    this.cargar_datos(info);
                    this.setState({ editionMode: true })
                    this.setState({ titulo: titulo })
                }
            }
        }
    }

    handle_guardar = e => {
        e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (this.state.titulo === 'Nuevo router'){
        //         if (this.state.codigos.includes(values.codigo)){
        //             message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
        //         }
        //     }
        //         if (!err) {
        //             console.log("valores al guardar:",values)
        //             let router = {
        //                 id_equipo: this.state.id_equipo_router,
        //                 codigo: values.codigo,
        //                 tipo_equipo: "Router",
        //                 id_marca: values.marca,
        //                 modelo: values.modelo,
        //                 numero_serie: values.nserie,
        //                 asignado: values.asignar,
        //                 encargado_registro: 'admin',
        //                 componente_principal: null,
        //                 ip: values.ip,
        //                 nombre: values.nombre,
        //                 pass: values.pass,
        //                 usuario: values.usuario,
        //                 clave: values.clave,
        //                 estado_operativo: values.estado,
        //                 puerta_enlace: values.penlace,
        //                 descripcion: values.descripcion,
        //                 fecha_registro: '2020-03-26'
        //             }
        //             console.log("El router", router)
        //             try{
        //                 if(this.state.titulo === "Editar router"){
        //                     AxiosRouter.editar_equipo_router(router).then(res => {
        //                     message.loading({ content: 'Guardando modificaciones...', key });
        //                     setTimeout(() => {
        //                         message.success({ content: 'Registro modificado satisfactoriamente', key, duration: 3 });
        //                     }, 1000);
        //                     this.props.history.push("/router");
        //                     })
        //                 }else{
        //                     AxiosRouter.crear_equipo_router(router).then(res => {
        //                     message.loading({ content: 'Guardando datos...', key });
        //                     setTimeout(() => {
        //                         message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
        //                     }, 1000);
        //                     this.props.history.push("/router");
        //                     })
        //                 }
        //             }
        //             catch(error) {
        //                 console.log(error)
        //                 message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
        //             }
        //         }

        // });
    }

    cargar_datos(info) {
        console.log("record:", info);
        this.props.form.setFieldsValue({
            cedula: info.cedula,
            nombre: info.nombre,
            username: info.username,
            apellido: info.apellido,
            id_departamento: info.id_departamento,
            id_rol: info.id_rol,
        })

    }

    crear_user(values) {
        AxiosAuth.registrar_user_web(values).then(res => {
            message.loading({ content: 'Guardando datos...', key });
            setTimeout(() => {
                message.success({ content: 'Usuario creado satisfactoriamente', key, duration: 3 });
            }, 1000);
        }).catch(err => {
            if (err.response) {
                message.error(err.response.data.log, 2)
                    .then(() => message.error('No fue posible registrar los datos', 2.5))
            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>

                <div className="div-container">
                    <Form {...layout}
                        layout="horizontal"
                        onSubmit={this.handle_guardar}
                        action={this.state.titulo}
                        id={this.state.titulo}
                    >


                        <InputComp label="Nombres" id="nombre" decorator={getFieldDecorator} />
                        <InputComp label="Apellidos" id="apellido" decorator={getFieldDecorator} />
                        <InputComp label="Cedula" id="cedula" decorator={getFieldDecorator} />
                        <InputComp label="Usuario" id="username" decorator={getFieldDecorator} />
                        <Form.Item disabled={this.state.editionMode} label="Contraseña">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }, { validator: this.strongValidator }],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item
                            label="Seleccione Departamento"

                        >
                            {getFieldDecorator('id_departamento', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.id_departamento
                            })(
                                <Select
                                    //disabled={this.state.editionMode ? true : false}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Select.Option key="0" value={null}>----</Select.Option>
                                    {
                                        this.state.dptos.map(dato =>
                                            <Select.Option key={dato.id_departamento} value={dato.id_departamento}>{dato.nombre + " (" + dato.bspi_punto + ")"}</Select.Option>
                                        )
                                    }
                                </Select>
                            )
                            }
                        </Form.Item >
                        <Form.Item
                            label="Seleccione Rol"

                        >
                            {getFieldDecorator('id_rol', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.id_rol
                            })(
                                <Select
                                    //disabled={this.state.editionMode ? true : false}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Select.Option key="0" value={null}>----</Select.Option>
                                    {
                                        this.state.roles.map(dato =>
                                            <Select.Option key={dato.id_rol} value={dato.id_rol}>{dato.nombre}</Select.Option>
                                        )
                                    }
                                </Select>
                            )
                            }
                        </Form.Item >


                        <Form.Item {...tailLayout}>
                            <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                            <Link to={{ pathname: '/router' }} ><Button type="primary">Cancelar</Button></Link>
                        </Form.Item>
                    </Form>
                </div>

            </Content>
        );
    }
}

FormularioUser = Form.create({})(FormularioUser);
export default FormularioUser;