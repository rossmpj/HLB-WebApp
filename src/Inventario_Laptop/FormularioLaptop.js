import React from 'react';
import FormGral from '../FormulariosPC/FormGeneral';
import FormSO from '../FormulariosPC/FormSistemaOperativo';
import FormCPU from '../FormulariosPC/FormProcesador';
import FormRAM from '../FormulariosPC/FormularioDinamico.js';
import FormFinal from '../FormulariosPC/FormularioDinamicoDD.js';
import { LaptopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiHardDrive } from "react-icons/fi";
import { FaMemory } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import { Button, Layout, Row, Col, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { Steps } from 'antd';
import Axios from '../Servicios/AxiosLaptop'
import AxiosTipo from '../Servicios/AxiosTipo'

const { Step } = Steps;
const { Content } = Layout;
const { Title } = Typography;
const key = 'updatable';

class FormularioLaptop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            titulo: "",
            disabled: false,
            key: "",
            general_fields: {
                disabled: false,
                codigo: '',
                asignar: undefined,
                marca: undefined,
                modelo: '',
                nserie: '',
                nombre_pc: '',
                usuario_pc: '',
                ip: undefined,
                estado: undefined,
                descripcion: ''
            },
            so_fields: {
                disabled: false,
                so: '',
                tipo_so: '',
                sp1: false,
                licencia: false,
                office: ''
            },
            procesador_fields: {
                disabled: false,
                codigo_proc: '', 
                marca_proc: undefined, 
                modelo_proc: '', 
                nserie_proc: '', 
                frec_proc: 0,
                nucleos_proc: 0,
                marcas: [],
                descr_proc: ''
            },
            memoria_ram: { 
                disabled: false,
                nombre: 'memoria RAM',
                verDetalleRAM: true,
                isStepFinal: false,        
                ram_soportada: 0,
                num_slots: 0,
                datos: [],
                editionMode: false,
                marcas: []
            },
            disco_duro: {
                disabled: false,
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                datos: [],
                editionMode: false,
                marcas: []
            }
        }  
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined') {
        const { info } = this.props.location.state;
        const { titulo } = this.props.location.state;
        const { disabled } = this.props.location.state;
        if (titulo === "Editar laptop" && info !== undefined){
          this.cargar_datos(info);
        }
        if(titulo === "Nueva laptop"){
            this.cargar()
        }
        this.setState({titulo: titulo});        
        this.setState({disabled: disabled})
      }
    }

    cargar() {
        let r = []
        AxiosTipo.mostrar_marcas().then(res => {
            res.data.forEach(function (dato) {
                let users = {
                    id: dato.id_marca,
                    dato: dato.nombre
                }
                r.push(users);
            });
        });
        this.setState({
            memoria_ram: {
                nombre: 'memoria RAM',
                verDetalleRAM: true,
                isStepFinal: false,
                ram_soportada: 0,
                num_slots: 0,
                datos: [], 
                marcas: r,
                editionMode:false
            }, 
                disco_duro: {
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                datos: [], 
                marcas: r,
                editionMode: false
            }
        })
    }

    cargar_datos(info) {
        this.setState({key: info.key})
        let r = []
        AxiosTipo.mostrar_marcas().then(res => {
            res.data.forEach(function (dato) {
                let users = {
                    id: dato.id_marca,
                    dato: dato.nombre
                }
                r.push(users);
            });
        });
    
        Axios.obtenerInfoLaptop(info.key).then(res => {
            let registro = res.data;
            console.log("registro7:",registro);
            let indcx = []
            if(info.rams !== []){
                for (const element in info.rams) {
                    indcx.push({ codigo: info.rams[element].codigo, marca: info.rams[element].id_marca, modelo: info.rams[element].modelo, 
                                 nserie: info.rams[element].numero_serie, capacidad: { cant: info.rams[element].capacidad.split(" ")[0], 
                                 un: info.rams[element].capacidad.split(" ")[1]}, tipo: info.rams[element].tipo, descr: info.rams[element].descripcion})
                }
             }
        
        let inddcx = []
        for (const element in info.discos) {
            inddcx.push({ codigo: info.discos[element].codigo, marca: info.discos[element].id_marca, modelo: info.discos[element].modelo,
                 nserie: info.discos[element].numero_serie, capacidad: {cant: info.discos[element].capacidad.split(" ")[0], 
                 un: info.discos[element].capacidad.split(" ")[1]}, tipo: info.discos[element].tipo, descr: info.discos[element].descripcion})
        }
        this.setState({
            general_fields: {
                disabled: true,
                codigo: info.codigo,
                asignar: registro.general.asignado === null ? undefined : registro.general.asignado,
                marca: registro.general.marca,
                modelo: info.modelo,
                nserie: info.num_serie,
                nombre_pc: info.name_pc,
                usuario_pc: info.user_pc,
                estado: info.estado,
                ip: registro.general.direccion_ip === null ? null : registro.general.direccion_ip,
                descripcion: info.descripcion
            },
            so_fields: {
                disabled: true,
                so: info.so,
                tipo_so: info.so_type,
                sp1: info.servpack === 'Si' ? true : false,
                licencia: info.licencia === 'Si' ? true : false,
                office: info.office
            },
            procesador_fields: {
                disabled: true,
                codigo_proc: registro.procesador.codigo,
                marca_proc: registro.procesador.marca,
                modelo_proc: registro.procesador.modelo,
                nserie_proc: registro.procesador.numero_serie,
                frec_proc: registro.procesador.frecuencia,
                nucleos_proc: registro.procesador.nucleos,
                marcas: r,
                descr_proc: registro.procesador.descripcion
            },
            memoria_ram:{       
                disabled: true, 
                nombre: 'memoria RAM',
                verDetalleRAM: true,
                isStepFinal: false,
                ram_soportada: info.ram_soportada,
                num_slots: info.slots_ram,
                datos: indcx, 
                marcas: r,
                editionMode: true
            },
            disco_duro: {
                disabled: true,
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                datos: inddcx, 
                marcas: r,
                editionMode: true
            }
        })
    })
      }

    handleNextButton = () => {
        const { step } = this.state;
        this.setState({ step: step+1 });
    }
    
    handleBackButton = () => {
        const { step } = this.state;
        this.setState({ step: step-1 })
    }

    handleConfirmButton = (values) => {
        const { disco_duro } = this.state;
        this.setState({ disco_duro: { ...disco_duro, ...values }}, 
                      () => console.log("final",this.state) );
    }

    handle_guardar = () => {
        console.log("valores al guardar:",this.state)
        try{
            if(this.state.titulo === "Editar laptop"){
                Axios.editar_laptop(this.state).then(res => {
                    message.loading({ content: 'Guardando modificaciones...', key });
                    setTimeout(() => {
                    message.success({ content: 'Registro modificado satisfactoriamente', key, duration: 3 });
                    }, 1000);
                    this.props.history.push("/laptop");
                })
            }else{
                console.log("intentando")
                Axios.crear_laptop(this.state).then(res => {
                message.loading({ content: 'Guardando datos...', key });
                setTimeout(() => {
                    message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                }, 1000);
                this.props.history.push("/laptop");
                })
            }
        }catch(error) {
            console.log(error)
            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
        }
    }

    getFormGralValue = (values) => {
        const { general_fields } = this.state;
        this.setState({ general_fields: { ...general_fields, ...values }})
    }

    getFormSOValue = (values) => {
        const { so_fields } = this.state;
        this.setState({ so_fields: { ...so_fields, ...values }})
    }
    
    getFormCPUValue = (values) => {
        const { procesador_fields } = this.state;
        this.setState({ procesador_fields: { ...procesador_fields, ...values }});
    }

    getFormDDValue = (values) => {
        const { disco_duro } = this.state;
        this.setState({ disco_duro: { ...disco_duro, ...values }});
    }

    getFormRAMValue = (values) => {
        const { memoria_ram } = this.state;
        this.setState({ memoria_ram: { ...memoria_ram, ...values }});
    }

    render() {
        const { step, general_fields, so_fields, procesador_fields, disco_duro, memoria_ram } = this.state;
        const steps = [
            {
                title: 'General',
                icon: <LaptopOutlined />,
                content: 
                <div>
                    <Title className="App" level={3}>Información general</Title>
                    <FormGral {...general_fields} handleNextButton={this.handleNextButton} submittedValues={this.getFormGralValue} />
                </div>
            },
            {
                title: 'Sistema operativo',
                icon: <WindowsOutlined />,
                content: 
                <div>
                    <Title className="App" level={3}>Sistema operativo</Title>
                    <FormSO {...so_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormSOValue} />    
                </div>
            },
            {
                title: 'Procesador',
                icon: <GiProcessor />,
                content: 
                <div>
                    <Title className="App" level={3}>Procesador</Title>
                    <FormCPU {...procesador_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormCPUValue} />    
                </div>
            },
            {
                title: 'Memoria RAM',
                icon: <FaMemory />,
                content: 
                <div>
                    <Title className="App" level={3}>Memoria RAM</Title>
                    <FormRAM {...memoria_ram} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormRAMValue} />    
                </div>
            },
            {
                title: 'Disco duro',
                icon: <FiHardDrive />,
                content: 
                <div>
                    <Title className="App" level={3}>Disco duro</Title>
                    <FormFinal {...disco_duro} handleConfirmButton={this.handleConfirmButton} handle_guardar={this.handle_guardar} handleBackButton={this.handleBackButton} submittedValues={this.getFormDDValue} />
                </div>
            },
        ] 

        return(
            <Content>
                <div className="div-container-title">      
                    <Row>
                        <Col span={12}><Title level={2}>{this.state.titulo}</Title></Col>
                        <Col className='flexbox'>
                            <Link to={{ pathname: '/laptop' }} ><Button type="primary" icon="left">Volver</Button></Link>
                        </Col>
                    </Row>  
                    <div className="div-border-top" >
                        <div className="div-container"> 
                            <Steps 
                                size="small"
                                current={step}
                                key={"lap"+step}>
                                {steps.map(item => ( <Step key={item.title} icon={item.icon} title={item.title} /> ))}
                            </Steps>   
                            <div className="steps-content">
                                {steps[step].content}
                            </div>
                        </div>  
                    </div>
                </div> 
            </Content>  
        )  
    }
}

export default FormularioLaptop;