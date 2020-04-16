import React, { Component } from 'react';
import FormGral from '../FormulariosPC/FormGeneral';
import FormSO from '../FormulariosPC/FormSistemaOperativo';
import FormEquipo from '../FormulariosPC/FormComponente';
import FormProcess from '../FormulariosPC/FormProcesador';
import FormMainboard from '../FormulariosPC/FormMainboard';
import FormRAM from '../FormulariosPC/FormularioDinamico.js';
import FormDD from '../FormulariosPC/FormularioDinamicoDD.js';
import { Button, Layout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DesktopOutlined, WindowsOutlined } from '@ant-design/icons';
import { GiDesk, GiComputerFan } from "react-icons/gi";
import { FiCpu, FiSpeaker, FiHardDrive } from "react-icons/fi";
import { FaRegKeyboard, FaEthernet, FaMemory, FaPlug } from "react-icons/fa";
import { MdMouse } from "react-icons/md";
import { GoCircuitBoard, GoServer } from "react-icons/go";
import { Steps } from 'antd';
import Axios from '../Servicios/AxiosDesktop'
import AxiosTipo from '../Servicios/AxiosTipo'

const { Step } = Steps;
const { Content } = Layout;
const { Title } = Typography;
const { CamposComunes } = { disabled: false, name: '', codigo: '', marca: '', modelo: '', nserie: '', descripcion: '' };

class FormularioDesktop extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        step: 0,
        titulo: "",
        general: { disabled: false, codigo: '', asignar: undefined, nombre_pc: '', usuario_pc: '', ip: undefined, estado: undefined, descripcion: '' },
        so: { disabled: false, so: '', tipo_so: '', sp1: false, licencia: false, office: '' },
        monitor: { CamposComunes }, 
        teclado: { CamposComunes }, 
        mouse: { CamposComunes }, 
        parlantes: { CamposComunes },
        procesador: { disabled: false, codigo_proc: '', marca_proc: '', modelo_proc: '', nserie_proc: '', frec_proc: 0, nucleos_proc: 0, descr_proc: '' },
        mainboard: { disabled: false, codigo: '', marca: '', modelo: '', nserie: '', ram_soportada: '', num_slots: '', conexiones_dd: '', descripcion: '' },
        tarjeta_red: { CamposComunes },
        carcasa: { CamposComunes },
        fuente_poder: { CamposComunes },
        fuente_alimentacion: { disabled: false, name: '', tipo: '', codigo: '', marca: '', modelo: '', nserie: '', descripcion: '' },
        ram_fields: { 
            disabled: false, 
            nombre: 'memoria RAM',
            verDetalleRAM: true,
            isStepFinal: false, 
            indx:[],      
            marcas: [],
            editionMode:false 
        },
        disco_duro_fields: {
            disabled: false, 
            nombre: 'disco duro',
            verDetalleRAM: false,
            isStepFinal: true,
            indx: [],
            marcas: [],
            editionMode:false
        }
    }
}

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined') {
            const { info } = this.props.location.state;
            const { titulo } = this.props.location.state;
            if (titulo === "Editar computadora" && info !== undefined){
                this.cargar_datos(info);
            }
            if(titulo === "Nueva computadora"){
                this.cargar()
            }
            this.setState({titulo: titulo});
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
        this.setState({ram_fields: {
                        nombre: 'memoria RAM',
                        verDetalleRAM: false,
                        isStepFinal: false,
                        indx: [{ codigo: '', marca: '', modelo: '', nserie: '', capacidad: {cant: 0, un: "Mb"}, tipo: '', descr: '' }], 
                        marcas: r,
                        editionMode:false
                    }, 
                     disco_duro_fields: {
                        nombre: 'disco duro',
                        verDetalleRAM: false,
                        isStepFinal: true,
                        index: [], 
                        marcas: r,
                        editionMode: false
                    }})
    }
    cargar_datos(info) {
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
        console.log("infoo",info);
        Axios.obtenerInfoDesktop(info.key).then(res => {
            let registro = res.data;
            console.log("registro:",registro);
            let indcx = []
            if(info.rams !== []){
                for (const element in info.rams) {
                    console.log("ramfgg",info.rams[element].capacidad.split(" ")[1], info.rams[element].capacidad.split(" ")[0])
                    indcx.push({ codigo: info.rams[element].codigo, marca: info.rams[element].marca, modelo: info.rams[element].modelo, 
                                 nserie: info.rams[element].numero_serie, capacidad: { cant: info.rams[element].capacidad.split(" ")[0], 
                                 un: info.rams[element].capacidad.split(" ")[1]}, tipo: info.rams[element].tipo, descr: info.rams[element].descripcion})
                }
             }
        
        console.log("objram",indcx)
        let inddcx = []
        for (const element in info.discos) {
            //console.log(info.rams[element])
            inddcx.push({ codigo: info.discos[element].codigo, marca: info.discos[element].marca, modelo: info.discos[element].modelo,
                 nserie: info.discos[element].numero_serie, capacidad: {cant: info.discos[element].capacidad.split(" ")[0], 
                 un: info.discos[element].capacidad.split(" ")[1]}, tipo: info.discos[element].tipo, descr: info.discos[element].descripcion})
        }
        console.log("objdd",inddcx)
        
            registro.f_alim === undefined ? this.setState({fuente: "n", fuente_alimentacion:
                {tipo: "Ninguno"}}) : 
            this.setState({
                fuente_alimentacion:
                {     
                disabled: true,
                name: 'fuente_alimentacion', 
                tipo: registro.f_alim.tipo_equipo, 
                codigo: registro.f_alim.codigo, 
                marca: registro.f_alim.marca, 
                modelo: registro.f_alim.modelo, 
                nserie: registro.f_alim.numero_serie, 
                descripcion: registro.f_alim.descripcion }
        })        
        this.setState({
            general: {
                disabled: true,
                codigo: registro.general.codigo,
                asignar: info.empleado,
                nombre_pc: info.name_pc,
                usuario_pc: info.user_pc,
                estado: info.estado,
                ip: info.ip,
                descripcion: info.descripcion
            },
            so: {
                disabled: true,
                so: info.so,
                tipo_so: registro.so.tipo_so,
                sp1: info.servpack === 'Si' ? true : false,
                licencia: info.licencia === 'Si' ? true : false,
                office: info.office
            },
            monitor: {
                disabled: true,
                name: 'monitor',
                codigo: registro.monitor.codigo,
                marca: registro.monitor.marca,
                modelo: registro.monitor.modelo,
                nserie: registro.monitor.numero_serie,
                descripcion: registro.monitor.descripcion
            },
            teclado: {
                disabled: true,
                name: 'teclado',
                codigo: registro.teclado.codigo,
                marca: registro.teclado.marca,
                modelo: registro.teclado.modelo,
                nserie: registro.teclado.numero_serie,
                descripcion: registro.teclado.descripcion
            },
            mouse: {
                disabled: true,
                name: 'mouse',
                codigo: registro.mouse.codigo,
                marca: registro.mouse.marca,
                modelo: registro.mouse.modelo,
                nserie: registro.mouse.numero_serie,
                descripcion: registro.mouse.descripcion
            },
            parlantes: {
                disabled: true,
                name: 'parlantes',
                codigo: registro.parlantes.codigo,
                marca: registro.parlantes.marca,
                modelo: registro.parlantes.modelo,
                nserie: registro.parlantes.numero_serie,
                descripcion: registro.parlantes.descripcion
            },
            mainboard: {
                disabled: true,
                name: 'tarjeta_madre',
                codigo: registro.tarjeta_madre.codigo,
                marca: registro.tarjeta_madre.marca,
                modelo: registro.tarjeta_madre.modelo,
                nserie: registro.tarjeta_madre.numero_serie,
                ram_soportada: registro.tarjeta_madre.ram_soportada,
                num_slots: registro.tarjeta_madre.numero_slots,
                conexiones_dd: registro.tarjeta_madre.conexiones_dd,
                descripcion: registro.tarjeta_madre.descripcion
            },
            tarjeta_red: {
                disabled: true,
                name: 'tarjeta_red',
                codigo: registro.tarjeta_red.codigo,
                marca: registro.tarjeta_red.marca,
                modelo: registro.tarjeta_red.modelo,
                nserie: registro.tarjeta_red.numero_serie,
                descripcion: registro.tarjeta_red.descripcion
            },
            carcasa: {   
                disabled: true,             
                name: 'case',
                codigo: registro.case.codigo,
                marca: registro.case.marca,
                modelo: registro.case.modelo,
                nserie: registro.case.numero_serie,
                descripcion: registro.case.descripcion
            },
            fuente_poder: {
                disabled: true,
                name: 'fuente_poder',
                codigo: registro.fuente_poder.codigo,
                marca: registro.fuente_poder.marca,
                modelo: registro.fuente_poder.modelo,
                nserie: registro.fuente_poder.numero_serie,
                descripcion: registro.fuente_poder.descripcion
            },
            procesador: {
                disabled: true,
                codigo_proc: registro.procesador.codigo,
                marca_proc: registro.procesador.marca,
                modelo_proc: registro.procesador.modelo,
                nserie_proc: registro.procesador.numero_serie,
                frec_proc: registro.procesador.frecuencia,
                nucleos_proc: registro.procesador.nucleos,
                descr_proc: registro.procesador.descripcion
            },
            ram_fields:{ 
                disabled: true,       
                nombre: 'memoria RAM',
                verDetalleRAM: false,
                isStepFinal: false,
                indx: indcx, 
                marcas: r,
                editionMode: true
            },
            disco_duro_fields: {
                disabled: true,
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                index: inddcx, 
                marcas: r,
                editionMode: true
            }
        })
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

    getStepFalimValue = (values) => {
        const { fuente_alimentacion } = this.state;
        this.setState({ fuente_poder: { ...fuente_alimentacion, ...values }});
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
            ram_fields, disco_duro_fields, fuente_alimentacion } = this.state;
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
                        <FormEquipo {...fuente_alimentacion} handleConfirmButton={this.confirm} handleNextButton={this.next} submittedValues={this.getStepFalimValue} />
                    </div>
                    
            },   
            {
                icon: <FaMemory />,
                content: 
                <div>
                    <Title className="App" level={3}>Memoria RAM</Title>
                    <FormRAM {...ram_fields}  handleNextButton={this.next} handleBackButton={this.back} submittedValues={this.getFormRAMValue} />    
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
        ] 

        return(
            <Content id={"conteniht"}>
                <div id={"contenth1"} className="div-container-title">      
                    <Row>
                        <Col span={12}><Title level={2}>{this.state.titulo}</Title></Col>
                        <Col className='flexbox'>
                            <Link to={{ pathname: '/desktop' }} ><Button type="primary" icon="left">Volver</Button></Link>
                        </Col>
                    </Row>  
                    <div id={"styleform1"} className="div-border-top" >
                        <div id={"conth1"} className="div-container"> 
                            <Steps id={"srhe"}
                            key={step+"fht"}
                                size="small"
                                current={step}>  
                                {steps.map((item,index) => (
                                    <Step key={index} icon={item.icon} title={item.title} />
                                ))}
                            </Steps>           
                            <div id={"rtg"} className="steps-content">
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