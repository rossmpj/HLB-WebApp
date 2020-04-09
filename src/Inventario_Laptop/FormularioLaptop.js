import React, { Component } from 'react';
import FormGral from '../FormulariosPC/FormGeneral';
import FormSO from '../FormulariosPC/FormSistemaOperativo';
import FormCPU from '../FormulariosPC/FormProcesador';
import FormDD from '../FormulariosPC/FormularioDinamico.js';
import { LaptopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiHardDrive } from "react-icons/fi";
import { FaMemory } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import { Button, Layout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Steps } from 'antd';
import Axios from '../Servicios/AxiosLaptop'

const { Step } = Steps;
const { Content } = Layout;
const { Title } = Typography;

class FormularioLaptop extends Component {
  state = {
    step: 0,
    titulo: "",
    general_fields: {
        codigo: '',
        asignar: '',
        marca: null,
        modelo: '',
        nserie: '',
        nombre_pc: '',
        usuario_pc: '',
        ip: '',
        estado: '',
        descripcion: ''
    },
    so_fields: {
        so: '',
        tipo_so: '',
        sp1: false,
        licencia: false,
        office: ''
    },
    procesador_fields: {
        codigo_proc: '', 
        marca_proc: undefined, 
        modelo_proc: '', 
        nserie_proc: '', 
        frec_procesador: 0,
        nucleos_proc: 0,
        descr_proc: ''
    },
    ram_fields: { 
        nombre: 'memoria RAM',
        verDetalleRAM: true,
        isStepFinal: false,        
        ram_soportada: 0,
        num_slots: 0,
        indx:[] 
    },
    disco_duro_fields: {
        nombre: 'disco duro',
        verDetalleRAM: false,
        isStepFinal: true,
        indx: []
    }
    }

    componentDidMount = () => {
      if (typeof this.props.location !== 'undefined') {
        const { info } = this.props.location.state;
        const { titulo } = this.props.location.state;
        if (titulo === "Editar laptop" && info !== undefined){
          this.cargar_datos(info);
        }   
        this.setState({titulo: titulo});
      }
    }
    cargar_datos(info) {
        console.log(info.rams);
        let indcx = []
        for (const element in info.rams) {
            //console.log(info.rams[element])
            indcx.push({ codigo: info.rams[element], marca: 1, modelo: "fgfgrgt", nserie: "rgrgtrtg", capacidad: 110, tipo: "sss", descr: ""})
        }
        let inddcx = []
        for (const element in info.discos) {
            //console.log(info.rams[element])
            inddcx.push({ codigo: info.discos[element], marca: 1, modelo: "fgfgrgt", nserie: "rgrgtrtg", capacidad: 110, tipo: "sss", descr: ""})
        }
        console.log("indx", indcx)
        Axios.obtenerInfoLaptop(info.key).then(res => {
            let registro = res.data;
            console.log("registro:",registro);
        this.setState({
            general_fields: {
                codigo: info.codigo,
                asignar: info.empleado,
                marca: registro.id_marca,
                modelo: info.modelo,
                nserie: info.num_serie,
                nombre_pc: info.name_pc,
                usuario_pc: info.user_pc,
                estado: info.estado,
                ip: info.ip,
                descripcion: info.descripcion
            },
            so_fields: {
                so: info.so,
                tipo_so: info.so_type,
                sp1: info.servpack === 'Si' ? true : false,
                licencia: info.licencia === 'Si' ? true : false,
                office: info.office
            },
            procesador_fields: {
                codigo_proc: info.id_procesador,
                marca_proc: registro.pc_procesador.id_marca,
                modelo_proc: registro.pc_procesador.modelo,
                nserie_proc: registro.pc_procesador.numero_serie,
                frec_proc: info.frecuencia,
                nucleos_proc: info.nnucleos,
                descr_proc: registro.pc_procesador.descripcion
            },
            ram_fields:{        
                nombre: 'memoria RAM',
                verDetalleRAM: true,
                isStepFinal: false,
                ram_soportada: info.ram_soportada,
                num_slots: info.slots_ram,
                indx: indcx
            },
            disco_duro_fields: {
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                indx: inddcx
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
        const { disco_duro_fields } = this.state;
        this.setState({ disco_duro_fields: { ...disco_duro_fields, ...values }}, 
                      () => console.log(this.state) );
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
        const { disco_duro_fields } = this.state;
        this.setState({ disco_duro_fields: { ...disco_duro_fields, ...values }});
    }

    getFormRAMValue = (values) => {
        const { ram_fields } = this.state;
        this.setState({ ram_fields: { ...ram_fields, ...values }});
    }

    render() {
        const { step, general_fields, so_fields, procesador_fields, disco_duro_fields, ram_fields } = this.state;
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
                    <FormDD {...ram_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormRAMValue} />    
                </div>
            },
            {
                title: 'Disco duro',
                icon: <FiHardDrive />,
                content: 
                <div>
                    <Title className="App" level={3}>Disco duro</Title>
                    <FormDD {...disco_duro_fields} handleConfirmButton={this.handleConfirmButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormDDValue} />
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
                                current={step}>
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