import React from 'react';
import '../../App.css';
import {
    Form,
    Button,
    Switch,
    message
} from 'antd';
import '../../custom-antd.css';
import InputComponent from '../../Componentes/InputComponent';
import { Link } from 'react-router-dom';
import AxiosTipo from '../../Servicios/AxiosTipo';

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';

class FormularioTipo extends React.Component {

    constructor(props) {
        super(props);

        this.handle_guardar = this.handle_guardar.bind(this);
    }

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let valor;
                if (values.ip) {
                    valor = "s";
                } else {
                    valor = "n";
                }
                let tipo = {
                    tipo: values.tipo.toLocaleLowerCase(),
                    usa_ip: valor
                }
                AxiosTipo.almacenar_datos(tipo).then(res => {
                    message.loading({ content: 'Guardando datos...', key });
                    setTimeout(() => {
                        message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                    }, 1000);
                }).catch(err => {
                    message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                });
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            tipo: info.tipo,
        })
        if (info.ip === 'n') {
            this.props.form.setFieldsValue({
                ip: false
            })
        } else {
            this.props.form.setFieldsValue({
                ip: true
            })

        }
    }

    componentDidMount() {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
            }
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="div-container">
                <Form {...layout}
                    layout="horizontal"
                    onSubmit={this.handle_guardar}
                >
                    <InputComponent
                        class=""
                        label="Tipo de equipo"
                        id="tipo"
                        decorator={getFieldDecorator} />

                    <Form.Item label="¿Utiliza dirección IP?">
                        {getFieldDecorator('ip', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(<Switch checkedChildren="Si" unCheckedChildren="No"></Switch>)}
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                        <Link to='/tipo'>
                            <Button type="primary">Cancelar</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
FormularioTipo = Form.create({})(FormularioTipo);
export default FormularioTipo;