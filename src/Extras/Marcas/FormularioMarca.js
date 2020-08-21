import React from 'react';
import '../../App.css';
import { Form, Button, message } from 'antd';
import '../../custom-antd.css';
import InputComponent from '../../Componentes/InputComponent';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Axios from '../../Servicios/AxiosTipo';

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';

class FormularioMarca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "",
            editionMode: false,
            redireccionar: false
        }
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.editionMode) {
                    this.crear_marca(values);
                } else {
                    values.key = this.state.key;
                    this.editar_marca(values);
                }
            }
        });
    }

    crear_marca(values) {
        Axios.crear_marca(values).then(() => {
            message.loading({ content: 'Guardando datos...', key });
            setTimeout(() => {
                message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
            }, 1000);
            this.setState({ redireccionar: true });
        }).catch(error_creacion => {
            if (error_creacion.response) {
                message.error(error_creacion.response.data.log, 4)
                    .then(() => message.error('No fue posible actualizar los datos', 3))
            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }


    cargar_datos(info) {
        this.props.form.setFieldsValue({
            nombre: info.nombre,
        })
        this.setState({ key: info.key });
    }


    editar_marca(values) {
        Axios.editar_marca(values).then(() => {
            message.loading({ content: 'Actualizando datos...', key });
            setTimeout(() => {
                message.success({ content: "Edición realizada satisfactoriamente", key, duration: 3 });
            }, 1000);
            this.setState({ redireccionar: true });
        }).catch(error_edicion => {
            if (error_edicion.response) {
                message.error(error_edicion.response.data.log, 4)
                    .then(() => message.error('No fue posible actualizar los datos', 3))
            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }

    componentDidMount() {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
                this.setState({ editionMode: true });
            }
        }
    }

    redireccionar() {
        if (this.state.redireccionar) {
            return <Redirect to='/sistemas/marca' />
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="div-container">
                {this.redireccionar()}
                <Form {...layout}
                    layout="horizontal"
                    onSubmit={this.handle_guardar}
                >
                    <InputComponent
                        class=""
                        label="Nombre de la marca"
                        id="nombre"
                        decorator={getFieldDecorator} />

                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                        <Link to='/sistemas/marca'>
                            <Button type="primary">Cancelar</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
FormularioMarca = Form.create({})(FormularioMarca);
export default FormularioMarca;