import React, { Component } from 'react';
import FormGral from '../FormulariosPC/FormGeneral';
import FormSO from '../FormulariosPC/FormSistemaOperativo';
import FormEquipo from '../FormulariosPC/FormComponente';
import FormProcess from '../FormulariosPC/FormProcesador';
import FormMainboard from '../FormulariosPC/FormMainboard';
import FormDD from '../FormulariosPC/FormularioDinamico.js';
import { Button, Layout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, WindowsOutlined } from '@ant-design/icons';
import { GiDesk, GiComputerFan } from "react-icons/gi";
import { FiCpu, FiSpeaker, FiHardDrive } from "react-icons/fi";
import { FaRegKeyboard, FaEthernet, FaMemory, FaPlug } from "react-icons/fa";
import { MdMouse } from "react-icons/md";
import { GoCircuitBoard, GoServer } from "react-icons/go";
import { Steps } from 'antd';

const { Step } = Steps;
const { Content } = Layout;
const { Title } = Typography;
const { CamposComunes } = { codigo: '', marca: '', modelo: '', nserie: '', descripcion: '' };

class FormularioDesktop extends Component {
    state = {
        step: 0,
        titulo: "",
        general: { codigo: '', asignar: '', nombre_pc: '', usuario_pc: '', ip: '', estado: '', descripcion: '' },
        sistop: { so: '', tipo_so: '', sp1: false, licencia: false, office: '' },
        monitor: { CamposComunes }, 
        teclado: { CamposComunes }, 
        mouse: { CamposComunes }, 
        parlantes: { CamposComunes },
        procesador: { codigo_proc: '', marca_proc: '', modelo_proc: '', nserie_proc: '', frec_proc: 0, nucleos_proc: 0, descr_proc: '' },
        mainboard: { codigo: '', marca: '', modelo: '', nserie: '', ram_soportada: '', num_slots: '', conexiones_dd: '', descripcion: '' },
        tarjeta_red: { CamposComunes },
        carcasa: { CamposComunes },
        fuente_poder: { CamposComunes },
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
            if (titulo === "Editar computadora" && info !== undefined){
                this.cargar_datos(info);
            }   
            this.setState({ titulo: titulo });
        }
    }

    cargar_datos(info) {
        let indcx = []
        for (const element in info.rams) {
            indcx.push({ codigo: element, marca: 1, modelo: "fgfgrgt", nserie: "rgrgtrtg", capacidad: 110, tipo: "sss", descr: ""})
        }
        this.setState({
            general: {
                codigo: info.codigo,
                asignar: info.empleado,
                nombre_pc: info.name_pc,
                usuario_pc: info.user_pc,
                estado: info.estado,
                ip: info.ip,
                descripcion: info.descripcion
            },
            so: {
                so: info.so,
                tipo_so: info.so_type,
                sp1: info.servpack === 'Si' ? true : false,
                licencia: info.licencia === 'Si' ? true : false,
                office: info.office
            },
            monitor: {
                name: 'monitor',
                codigo: info.monitor,
                marca: 'm',
                modelo: 'm',
                nserie: 'm',
                descripcion: 'm'
            },
            teclado: {
                name: 'teclado',
                codigo: info.teclado,
                marca: 'mmmm',
                modelo: 'mmmm',
                nserie: 'mmmm',
                descripcion: 'mmmmmm'
            },
            mouse: {
                name: 'mouse',
                codigo: info.mouse,
                marca: 'ww',
                modelo: 'ww',
                nserie: 'ww',
                descripcion: 'ww'
            },
            parlantes: {
                codigo: info.parlantes,
                marca: 'ee',
                modelo: 'ee',
                nserie: 'ee',
                descripcion: 'ee'
            },
            mainboard: {
                codigo: info.mainboard,
                marca: 'tt',
                modelo: 'tt',
                nserie: 'tt',
                ram_soportada: 'tt',
                num_slots: 'tt',
                conexiones_dd: 'tt',
                descripcion: 'tt'
            },
            procesador: {
                codigo_proc: info.procesador,
                marca_proc: 'rr',
                modelo_proc: 'rr',
                nserie_proc: 'rr',
                frec_proc: info.frecuencia,
                nucleos_proc: 0,
                descr_proc: 'rr'
            },
            tarjeta_red: {
                name: 'tarjeta_red',
                codigo: info.tarj_red,
                marca: 'rr',
                modelo: 'rr',
                nserie: 'rr',
                descripcion: 'rr'
            },
            carcasa: {                
                name: 'case',
                codigo: info.case,
                marca: 'rr',
                modelo: 'r',
                nserie: 'rrr',
                descripcion: 'rr'
            },
            fuente_poder: {
                name: 'fuente_poder',
                codigo: info.f_poder,
                marca: 'rr',
                modelo: 'rr',
                nserie: 'rr',
                descripcion: 'rr'
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
                indx: indcx
            }
        })
        
      }

    next = () => {
        const { step } = this.state;
        this.setState({ step: step+1 });
    }
    
    back = () => {
        const { step } = this.state;
        this.setState({ step: step-1 })
    }

    confirm = (values) => {
        const { step_final_fields } = this.state;
        this.setState( { step_final_fields: { ...step_final_fields, ...values }}, () => console.log(this.state) );
    }

    getFormGralValue = (values) => {
        const { general } = this.state;
        console.log(values);
        this.setState({ general: { ...general, ...values }})
    }

    getFormSOValue = (values) => { 
        const { so } = this.state;
        this.setState({ so: { ...so, ...values }})
    }

    getFormMonitorValue = (values) => {
        const { monitor } = this.state;
        this.setState({ monitor: { ...monitor, ...values }});
    }

    getStepTecladoValue = (values) => {
        const { teclado } = this.state;
        this.setState({ teclado: { ...teclado, ...values }});
    }
    
    getStepMouseValue = (values) => {
        const { mouse } = this.state;
        this.setState({ mouse: { ...mouse, ...values }});
    }

    getStepParlantesValue = (values) => {
        const { parlantes } = this.state;
        this.setState({ parlantes: { ...parlantes, ...values }});
    }

    getFormMainboardValue = (values) => {
        const { mainboard } = this.state;
        this.setState({ mainboard: { ...mainboard, ...values }});
    }
    
    getStepCaseValue = (values) => {
        const { carcasa } = this.state;
        this.setState({ carcasa: { ...carcasa, ...values }});
    }

    getStepTredValue = (values) => {
        const { tarjeta_red } = this.state;
        this.setState({ tarjeta_red: { ...tarjeta_red, ...values }});
    }

    getStepFpoderValue = (values) => {
        const { fuente_poder } = this.state;
        this.setState({ fuente_poder: { ...fuente_poder, ...values }});
    }

    getFormProcessValue = (values) => {
        const { procesador } = this.state;
        this.setState({ procesador: { ...procesador, ...values }});
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
        const { step, general, so, monitor, teclado, mouse, parlantes, mainboard, procesador, tarjeta_red, fuente_poder, carcasa,
            ram_fields, disco_duro_fields } = this.state;
        const steps = [
            {           
                icon: <GiDesk />,
                content: 
                    <div>
                        <Title className="App" level={3}>General</Title>      
                        <FormGral {...general} handleNextButton={this.next} submittedValues={this.getFormGralValue} />
                    </div>
            },
            {
                icon: <WindowsOutlined />,
                content: 
                    <div>
                        <Title className="App" level={3}>Sistema operativo</Title>
                        <FormSO {...so} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getFormSOValue} />
                    </div>
            },
            {
                icon: <DesktopOutlined />,
                content: 
                    <div>
                        <Title className="App" level={3}>Monitor</Title>
                        <FormEquipo {...monitor} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getFormMonitorValue} />    
                    </div>
            },
            {
                icon: <FaRegKeyboard />,
                content: 
                    <div>
                        <Title className="App" level={3}>Teclado</Title>
                        <FormEquipo {...teclado} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getStepTecladoValue} />    
                    </div>
            },
            {
                icon: <MdMouse />,
                content: 
                    <div>
                        <Title className="App" level={3}>Mouse</Title>
                        <FormEquipo {...mouse} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getStepMouseValue} />    
                    </div>
            },
            {           
                icon: <FiSpeaker />,
                content: 
                    <div>
                        <Title className="App" level={3}>Parlantes</Title>
                        <FormEquipo {...parlantes} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getStepParlantesValue} />
                    </div>
            },
            {            
                icon: <GoCircuitBoard />,
                content: 
                <div>
                    <Title className="App" level={3}>Tarjeta madre</Title>
                    <FormMainboard {...mainboard} handleNextButton={this.next} handleBackButton={this.back}  submittedValues={this.getFormMainboardValue} />
                </div>
            },  
            {
                icon: <FiCpu />,
                content: 
                <div>
                    <Title className="App" level={3}>Procesador</Title>
                    <FormProcess {...procesador} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getFormProcessValue} />    
                </div>
            },
            {
                icon: <FaMemory />,
                content: 
                <div>
                    <Title className="App" level={3}>Memoria RAM</Title>
                    <FormDD {...ram_fields}  handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getFormRAMValue} />    
                </div>
            },
            {
                icon: <FiHardDrive />,
                content: 
                <div>
                    <Title className="App" level={3}>Disco duro</Title>
                    <FormDD {...disco_duro_fields} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getFormDDValue} />    
                </div>
            },
            {
                icon: <GoServer />,
                content: 
                    <div>
                        <Title className="App" level={3}>Case</Title>
                        <FormEquipo {...carcasa} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getStepCaseValue} />    
                    </div>
            },
            {
                icon: <GiComputerFan />,
                content: 
                    <div>
                        <Title className="App" level={3}>Fuente de poder</Title>
                        <FormEquipo {...fuente_poder} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getStepFpoderValue} />    
                    </div>
            },
            {           
                icon: <FaEthernet />,
                content: 
                    <div>
                        <Title className="App" level={3}>Tarjeta de red</Title>
                        <FormEquipo {...tarjeta_red} handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getStepTredValue} />
                    </div>
            }, 
            {          
                icon: <FaPlug />,
                content: 
                    <div>
                        <Title className="App" level={3}>UPS/Regulador</Title>
                        <FormGral {...general} handleConfirmButton={this.confirm} handleNextButton={this.next} submittedValues={this.getFormGralValue} />
                    </div>
            },   
        ] 

        return(
            <Content id={"contenit"}>
                <div id={"content"} className="div-container-title">      
                    <Row>
                        <Col span={12}><Title level={2}>{this.state.titulo}</Title></Col>
                        <Col className='flexbox'>
                            <Link to={{ pathname: '/desktop' }} ><Button type="primary" icon="left">Volver</Button></Link>
                        </Col>
                    </Row>  
                    <div id={"styleform"} className="div-border-top" >
                        <div id={"cont"} className="div-container"> 
                            <Steps id={"sre"}
                                size="small"
                                current={step}>  
                                {steps.map((item,index) => (
                                    <Step key={item.title+index} icon={item.icon} title={item.title} />
                                ))}
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

export default FormularioDesktop;