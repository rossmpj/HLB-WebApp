import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, message, Typography, Row, Col, Select } from 'antd';
import '../custom-antd.css';
import InputComp from '../Componentes/InputComponent';
import AxiosTipo from '../Servicios/AxiosTipo';
import { Link } from 'react-router-dom';
import AxiosAuth from '../Servicios/AxiosAuth'
import VistaFormulario from '../Componentes/VistaFormulario'
import Auth from '../Login/Auth'

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const tailLayout = { wrapperCol: { offset: 9, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 }, };
const key = 'updatable';

class FormularioUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "Perfil De Usario",
            username: Auth.getDataLog().user.username,
            esEmpleado: Auth.getDataLog().user.rol.toLowerCase().indexOf('empleado') > -1,
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
        this.cargar_datos(this.state.username);
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

    cargar_datos(username) {
        AxiosAuth.mostrar_usuario_det(username).then(respuesta => {
            let res = respuesta.data
            console.log(res)
            this.props.form.setFieldsValue({
                cedula: res.cedula,
                username: res.username,
                nombre: res.nombre,
                apellido: res.apellido,
                id_departamento: res.id_departamento,
                id_rol: res.id_rol,
            })
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>
                <div className="div-container-title">

                    <Row>
                        <Col span={12}><Title level={2}>{this.state.titulo}</Title></Col>
                        <Col className='flexbox'>
                            <Button type="primary" icon="left" onClick={this.props.history.goBack} >Volver</Button>
                        </Col>
                    </Row>
                    <div className="div-border-top" >
                        <div className="div-container">
                            <Form {...layout}
                                layout="horizontal"
                                onSubmit={this.handle_guardar}
                                action={this.state.titulo}
                                id={this.state.titulo}
                            >
                                <InputComp label="Nombres" id="nombre" decorator={getFieldDecorator} />
                                <InputComp label="Apellidos" id="apellido" decorator={getFieldDecorator} />
                                <InputComp disabled={true} label="Cedula" id="cedula" decorator={getFieldDecorator} />
                                <InputComp label="Usuario" id="username" decorator={getFieldDecorator} />
                                <Form.Item label="Contraseña">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }, { validator: this.strongValidator }],
                                    })(<Input.Password disabled={true} />)}
                                </Form.Item>
                                <Form.Item
                                    label="Seleccione Departamento"

                                >
                                    {getFieldDecorator('id_departamento', {
                                        rules: [{ required: true, message: 'Debe completar este campo' }]
                                    })(
                                        <Select
                                            disabled={this.state.esEmpleado}
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
                                        rules: [{ required: true, message: 'Debe completar este campo' }]
                                    })(
                                        <Select
                                            disabled={this.state.esEmpleado}
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
                                    <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar Cambios</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}

FormularioUser = Form.create({})(FormularioUser);
export default FormularioUser;