import React from 'react';
import FormGral from '../FormulariosPC/FormGeneral';
import FormSO from '../FormulariosPC/FormSistemaOperativo';
import FormMonitor from '../FormulariosPC/FormMonitor';
import FormTeclado from '../FormulariosPC/FormTeclado';
import FormMouse from '../FormulariosPC/FormMouse';
import FormParlantes from '../FormulariosPC/FormParlantes';
import FormTred from '../FormulariosPC/FormTred';
import FormFalim from '../FormulariosPC/FormFalim';
import FormFpod from '../FormulariosPC/FormFpod';
import FormCase from '../FormulariosPC/FormCase';
import FormProcess from '../FormulariosPC/FormProcesador'
import FormMainboard from '../FormulariosPC/FormMainboard';
import FormRAM from '../FormulariosPC/FormularioDinamico.js';
import FormDD from '../FormulariosPC/FormularioDinamicoDD.js';
import { Layout, Typography, message, Steps, Spin } from 'antd';
import { DesktopOutlined, WindowsOutlined } from '@ant-design/icons';
import { GiDesk, GiComputerFan } from "react-icons/gi";
import { FiCpu, FiSpeaker, FiHardDrive } from "react-icons/fi";
import { FaRegKeyboard, FaEthernet, FaMemory, FaPlug } from "react-icons/fa";
import { MdMouse } from "react-icons/md";
import { GoCircuitBoard, GoServer } from "react-icons/go";
import Axios from '../Servicios/AxiosDesktop'
import AxiosTipo from '../Servicios/AxiosTipo'
import VistaFormulario from '../Componentes/VistaFormulario'
import Auth from '../../src/Login/Auth';

const { Step } = Steps;
const { Content } = Layout;
const { Title } = Typography;
const key = "updatable"

class FormularioDesktop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            titulo: "",
            disabled: false,
            loading: false,
            key: "",
            general: { disabled: false, codigo: '', asignar: undefined, nombre_pc: '', usuario_pc: '', ip: undefined, estado: undefined, descripcion: '', encargado_registro: Auth.getDataLog().user.username },
            so: { disabled: false, so: '', tipo_so: '', sp1: false, licencia: false, office: [] },
            monitor: { disabled: false, nombre: 'monitor', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' }, 
            teclado: { disabled: false, nombre: 'teclado', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' },
            mouse: { disabled: false, nombre: 'mouse', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' },
            parlantes: { disabled: false, nombre: 'parlantes', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' },
            procesador: { disabled: false, codigo_proc: '', marca_proc: undefined, modelo_proc: '', nserie_proc: '', frec_proc: 0, nucleos_proc: 0, descr_proc: '' },
            mainboard: { disabled: false, nombre: 'tarjeta_madre', codigo: '', marca: undefined, modelo: '', nserie: '', descripcion: '' },
            tarjeta_red: { disabled: false, nombre: 'tarjeta_red', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' },
            carcasa: { disabled: false, nombre: 'case', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' },
            fuente_poder: { disabled: false, nombre: 'fuente_poder', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '' },
            fuente_alimentacion: { disabled: false, nombre: 'fuente_alimentacion', tipo: '', codigo: '', marca: undefined, modelo: '', nserie: '', descr: '',
            editionMode:false  },
            memoria_ram: { 
                disabled: false,  
                nombre: 'memoria RAM',
                verDetalleRAM: true,
                isStepFinal: false,   
                datos:[],    
                ram_soportada: 1, 
                num_slots: 1, 
                editionMode:false 
            },
            disco_duro: {
                disabled: false, 
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                datos: [],
                marcas: [],
                conexiones_dd: 1, 
                editionMode:false
            }
        }
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined') {
            if(typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.info !== 'undefined'){
                const { info } = this.props.location.state;
                const { titulo } = this.props.location.state;
                const { disabled } = this.props.location.state;
                if (titulo === "Editar computadora" && info !== undefined){
                    this.cargar_datos(info);
                }
                if(titulo === "Nueva computadora"){
                    this.cargar()
                    this.setState({loading: false})
                }
                this.setState({titulo: titulo});    
                this.setState({disabled: disabled})
            }
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
            loading: false,
            fuente_alimentacion: {
                tipo: "ups", 
                nombre: 'fuente_alimentacion', 
                codigo: '', 
                marca: undefined, 
                modelo: '', 
                nserie: '', 
                descr: '', 
                editionMode:false
            },
            memoria_ram: {
                nombre: 'memoria RAM',
                verDetalleRAM: false,
                isStepFinal: false,
                datos: [], 
                marcas: r,
                ram_soportada: 1,
                num_slots: 1,
                editionMode:false
            }, 
            disco_duro: {
                nombre: 'disco duro',
                verDetalleRAM: false,
                isStepFinal: true,
                datos: [], 
                marcas: r,
                conexiones_dd: 1, 
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
        Axios.obtenerInfoDesktop(info.key).then(res => {
            let registro = res.data;
            this.setState({ loading: true})
            console.log("registro7 :",registro);
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
            let id_programas = []
            for (const programa in registro.programas){
                id_programas.push(registro.programas[programa].id_programa)
            }
            console.log("rtg", registro.programas)
            registro.f_alim === undefined ? 
            this.setState({
                fuente_alimentacion: {
                    disabled: true,
                    tipo: "ninguno", 
                    nombre: 'fuente_alimentacion', 
                    codigo: null, 
                    marca: null, 
                    modelo: null, 
                    nserie: null, 
                    descr: null, 
                    editionMode: true 
                }
            }) : 
            this.setState({
                fuente_alimentacion: {     
                    disabled: true,
                    nombre: 'fuente_alimentacion', 
                    tipo: registro.f_alim.tipo_equipo, 
                    codigo: registro.f_alim.codigo, 
                    marca: registro.f_alim.marca, 
                    modelo: registro.f_alim.modelo, 
                    nserie: registro.f_alim.numero_serie, 
                    descr: registro.f_alim.descripcion, 
                    editionMode:true  
                }
            })        
            this.setState({
                general: {
                    disabled: true,
                    codigo: info.codigo,
                    encargado_registro: Auth.getDataLog().user.username,
                    asignar: registro.general.asignado === null ? undefined : registro.general.asignado,
                    nombre_pc: info.name_pc,
                    usuario_pc: info.user_pc,
                    estado: info.estado,
                    ip: registro.general.direccion_ip === null ? null : registro.general.direccion_ip,
                    descripcion: info.descripcion
                },
                so: {
                    disabled: true,
                    so: info.so,
                    tipo_so: registro.so.tipo_so,
                    sp1: info.servpack === 'Si' ? true : false,
                    licencia: info.licencia === 'Si' ? true : false,
                    office: id_programas
                },
                monitor: {
                    disabled: true,
                    nombre: 'monitor',
                    codigo: registro.monitor.codigo,
                    marca: registro.monitor.marca,
                    modelo: registro.monitor.modelo,
                    nserie: registro.monitor.numero_serie,
                    descr: registro.monitor.descripcion
                },
                teclado: {
                    disabled: true,
                    nombre: 'teclado',
                    codigo: registro.teclado.codigo,
                    marca: registro.teclado.marca,
                    modelo: registro.teclado.modelo,
                    nserie: registro.teclado.numero_serie,
                    descr: registro.teclado.descripcion
                },
                mouse: {
                    disabled: true,
                    nombre: 'mouse',
                    codigo: registro.mouse.codigo,
                    marca: registro.mouse.marca,
                    modelo: registro.mouse.modelo,
                    nserie: registro.mouse.numero_serie,
                    descr: registro.mouse.descripcion
                },
                parlantes: {
                    disabled: true,
                    nombre: 'parlantes',
                    codigo: registro.parlantes.codigo,
                    marca: registro.parlantes.marca,
                    modelo: registro.parlantes.modelo,
                    nserie: registro.parlantes.numero_serie,
                    descr: registro.parlantes.descripcion
                },
                mainboard: {
                    disabled: true,
                    nombre: 'tarjeta_madre',
                    codigo: registro.tarjeta_madre.codigo,
                    marca: registro.tarjeta_madre.marca,
                    modelo: registro.tarjeta_madre.modelo,
                    nserie: registro.tarjeta_madre.numero_serie,
                    descr: registro.tarjeta_madre.descripcion
                },
                tarjeta_red: {
                    disabled: true,
                    nombre: 'tarjeta_red',
                    codigo: registro.tarjeta_red.codigo,
                    marca: registro.tarjeta_red.marca,
                    modelo: registro.tarjeta_red.modelo,
                    nserie: registro.tarjeta_red.numero_serie,
                    descr: registro.tarjeta_red.descripcion
                },
                carcasa: {   
                    disabled: true,             
                    nombre: 'case',
                    codigo: registro.case.codigo,
                    marca: registro.case.marca,
                    modelo: registro.case.modelo,
                    nserie: registro.case.numero_serie,
                    descr: registro.case.descripcion
                },
                fuente_poder: {
                    disabled: true,
                    nombre: 'fuente_poder',
                    codigo: registro.fuente_poder.codigo,
                    marca: registro.fuente_poder.marca,
                    modelo: registro.fuente_poder.modelo,
                    nserie: registro.fuente_poder.numero_serie,
                    descr: registro.fuente_poder.descripcion
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
                memoria_ram:{ 
                    disabled: true,       
                    nombre: 'memoria RAM',
                    verDetalleRAM: false,
                    isStepFinal: false,
                    datos: indcx, 
                    marcas: r,
                    ram_soportada: registro.tarjeta_madre.ram_soportada,
                    num_slots: registro.tarjeta_madre.numero_slots,
                    editionMode: true
                },
                disco_duro: {
                    disabled: true,
                    nombre: 'disco duro',
                    verDetalleRAM: false,
                    isStepFinal: true,
                    datos: inddcx, 
                    marcas: r,
                    conexiones_dd: registro.tarjeta_madre.conexiones_dd,
                    editionMode: true
                }
            })
        })
        this.setState({loading: false})
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
        this.setState( { disco_duro: { ...disco_duro, ...values }}, () => console.log("giarfar",JSON.stringify(this.state)) );
    }

    handle_guardar = () => {
        console.log("valores al guardar:",this.state)
        try{
            message.loading({ content: 'Espere un momento por favor, estamos procesando su solicitud...', key });
            if(this.state.titulo === "Editar computadora"){
                console.log('ingresé a edicion')
                Axios.editar_desktop(this.state).then(res => {
                    message.loading({ content: 'Guardando modificaciones...', key });
                    setTimeout(() => {
                    message.success({ content: 'Registro modificado satisfactoriamente', key, duration: 3 });
                    }, 1000);
                    this.props.history.push("/sistemas/desktop");
                }).catch(err =>{
                    if (err.response) {
                        message.error(err.response.data.log, 4)
                        .then(() => message.error('No fue posible actualizar los datos', 3))
                    } else{
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                    }
                })    
            }else{
                console.log("intentando")
                Axios.crear_desktop(this.state).then(res => {
                message.loading({ content: 'Guardando datos...', key });
                setTimeout(() => {
                    message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                }, 1000);
                this.props.history.push("/sistemas/desktop");
                }).catch(err =>{
                    if (err.response) {
                        message.error(err.response.data.log, 4)
                        .then(() => message.error('No fue posible registrar los datos', 3))
                    } else{
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                    }
                })
            }
        }catch(error) {
            console.log(error)
            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
        }
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
        this.setState({ fuente_alimentacion: { ...fuente_alimentacion, ...values }});
    }

    getFormProcessValue = (values) => {
        const { procesador } = this.state;
        this.setState({ procesador: { ...procesador, ...values }});
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
        const { step, general, so, monitor, teclado, mouse, parlantes, mainboard, procesador, tarjeta_red, fuente_poder, carcasa,
            memoria_ram, disco_duro, fuente_alimentacion } = this.state;
        const steps = [
            {           
                icon: <GiDesk />,
                content: 
                    <div>
                        <Title className="App" level={3}>General</Title>      
                        <FormGral {...general} handleNextButton={this.handleNextButton} submittedValues={this.getFormGralValue} />
                    </div>
            },
            {
                icon: <WindowsOutlined />,
                content: 
                    <div>
                        <Title className="App" level={3}>Sistema operativo</Title>
                        <FormSO {...so} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormSOValue} />
                    </div>
            },
            {
                icon: <DesktopOutlined />,
                content: 
                    <div>
                        <Title className="App" level={3}>Monitor</Title>
                        <FormMonitor {...monitor} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormMonitorValue} />    
                    </div>
            },
            {
                icon: <FaRegKeyboard />,
                content: 
                    <div>
                        <Title className="App" level={3}>Teclado</Title>
                        <FormTeclado {...teclado} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepTecladoValue} />    
                    </div>
            },
            {
                icon: <MdMouse />,
                content: 
                    <div>
                        <Title className="App" level={3}>Mouse</Title>
                        <FormMouse {...mouse} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepMouseValue} />    
                    </div>
            },
            {           
                icon: <FiSpeaker />,
                content: 
                    <div>
                        <Title className="App" level={3}>Parlantes</Title>
                        <FormParlantes {...parlantes} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepParlantesValue} />
                    </div>
            },
            {            
                icon: <GoCircuitBoard />,
                content: 
                <div>
                    <Title className="App" level={3}>Tarjeta madre</Title>
                    <FormMainboard {...mainboard} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton}  submittedValues={this.getFormMainboardValue} />
                </div>
            },  
            {
                icon: <FiCpu />,
                content: 
                <div>
                    <Title className="App" level={3}>Procesador</Title>
                    <FormProcess {...procesador} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormProcessValue} />    
                </div>
            },
            {
                icon: <GoServer />,
                content: 
                    <div>
                        <Title className="App" level={3}>Case</Title>
                        <FormCase {...carcasa} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepCaseValue} />    
                    </div>
            },
            {
                icon: <GiComputerFan />,
                content: 
                    <div>
                        <Title className="App" level={3}>Fuente de poder</Title>
                        <FormFpod {...fuente_poder} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepFpoderValue} />    
                    </div>
            },
            {           
                icon: <FaEthernet />,
                content: 
                    <div>
                        <Title className="App" level={3}>Tarjeta de red</Title>
                        <FormTred {...tarjeta_red} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepTredValue} />
                    </div>
            }, 
            {          
                icon: <FaPlug />,
                content: 
                <div>
                        <Title className="App" level={3}>UPS/Regulador</Title>
                        <FormFalim {...fuente_alimentacion} handleBackButton={this.handleBackButton} handleNextButton={this.handleNextButton} submittedValues={this.getStepFalimValue} />
                    </div>
                    
            },   
            {
                icon: <FaMemory />,
                content: 
                <div>
                    <Title className="App" level={3}>Memoria RAM</Title>
                    <FormRAM {...memoria_ram}  handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getFormRAMValue} />    
                </div>
            },
            {
                icon: <FiHardDrive />,
                content: 
                <div>
                    <Title className="App" level={3}>Disco duro</Title>
                    <FormDD {...disco_duro} handleConfirmButton={this.handleConfirmButton} handle_guardar={this.handle_guardar} handleBackButton={this.handleBackButton} submittedValues={this.getFormDDValue} />    
                </div>
            },
        ] 

        return(
            <Content id={"conteniht"}>
                <div id={"contenth1"} className="div-container-title">      
                    <VistaFormulario enlace='/sistemas/desktop' titulo={this.state.titulo}></VistaFormulario> 
                    <div id={"styleform1"} className="div-border-top" >
                        <div id={"conth1"} className="div-container"> 
                            <Steps id={"srhe"}
                            key={step+"r"}
                            size="small"
                            current={step}>
                                {steps.map((item,index) => (
                                <Step key={index} icon={item.icon} title={item.title} />
                                ))}
                            </Steps>  
                            <Spin spinning={!this.state.loading && this.state.titulo === "Editar computadora"} tip="Cargando datos, espere un momento por favor...">          
                                <div id={"rtg"} className="steps-content">
                                    {steps[step].content}
                                </div>
                            </Spin>
                        </div>  
                    </div>
                </div> 
            </Content>  
        ) 
    }
}

export default FormularioDesktop;