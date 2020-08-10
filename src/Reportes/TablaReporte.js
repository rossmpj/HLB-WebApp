import React from 'react';
import {
    Button, Row, Col, Table, Input, Icon, message, Typography, Tag
} from 'antd';
import ExcelExportMasivo from './ExcelExportMasivo';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosReporte'
import ModalDownload from '../Componentes/ModalDownload';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
import Auth from '../Login/Auth';
/* import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx'; */

const { Title } = Typography;
/* const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'; */

class TablaReporte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            info: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0,
            visible: false,
            confirmLoading: false,
            archivo: "",
            currentDataSource:[],
            loading: false,
            disabelExport:true,
            data_detallada:{},
            isNotSistemas: Auth.isNotSistemas()
        };

    }

    transform_data_detallada(detalles){
        let desktop = FuncionesAuxiliares.transform_data_desktop(detalles.desktop);
        let laptop = FuncionesAuxiliares.transform_data_laptop(detalles.laptop);
        let impresora = FuncionesAuxiliares.transform_data_impresora(detalles.impresora);
        let router = FuncionesAuxiliares.transform_data_router(detalles.router);
        let otros = FuncionesAuxiliares.transform_data_otros(detalles.otros);
        this.setState({
            data_detallada:{
                'desktop': desktop,
                'laptop': laptop,
                'impresora': impresora,
                'router':router,
                'otros': otros
            }
        })
    }

    llenar_tabla() {
        let datos = [];
        this.setState({loading: true});
        Axios.reporte_general().then(res => {
            res.data.equipos.forEach(function (dato) {
                let registro = {
                    key: dato.id_equipo,
                    id_equipo:dato.id_equipo,
                    departamento: dato.departamento,
                    bspi: dato.bspi_punto,
                    empleado: dato.empleado.concat(" ", dato.apellido),
                    tipo_equipo: dato.tipo_equipo,
                    codigo: dato.codigo,
                    marca: dato.marca === null ? '' : dato.marca,
                    modelo: dato.modelo === null ? '' : dato.modelo,
                    numero_serie: dato.numero_serie === null ? '' :  dato.numero_serie,
                    ip: dato.direccion_ip,
                    estado_operativo: dato.estado_operativo
                }
                datos.push(registro)
            });
            this.transform_data_detallada(res.data.detalles);
            this.setState({ dataSource:datos, currentDataSource:datos, disabelExport:false, loading: false});
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, revise la conexión con el servidor', 4);
            this.setState({loading: false});
        });
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    handleChange = (pagination, filters, sorter, currentDataSource) => {
        console.log('Various parameters', pagination, filters, sorter, currentDataSource);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
          currentDataSource: currentDataSource.currentDataSource
        });
      };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            index: this.state.index + 1
        });
    };

    limpiarBusquedas = () => {
        this.setState({
            index: this.state.index + 1
        })
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    busqueda_array(arr, dataIndex, value) {
        if (arr[dataIndex] !== null) {
            return arr[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node }
                    }
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Buscar
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => this.busqueda_array(record, dataIndex, value),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    /* Métodos del modal */
    showModal = () => {
        this.setState({
            visible: true,
            archivo: ""
        });
    };


    handleOk = (extension) => {
        console.log("Función por completar");
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    tipo_archivo = e => {

        this.setState({
            archivo: e.target.value,
        });
    };



    render() {
        const tipo_link = (record) => {
            let route = this.state.isNotSistemas ? '/finanzas' : '/sistemas'
            switch (record.tipo_equipo.toLowerCase()) {
                case "impresora":
                    return route+'/impresora/view/'+record.key;
                case "desktop":
                    return route+'/desktop/view/'+record.key;
                case "laptop":
                    return route+'/laptop/view/'+record.key
                case "router":
                    return route+'/router/view/'+record.key;
                default:
                    return route+'/equipo/view/'+record.key;
            }
        }
        const columns = [
            {
                title: 'Departamento',
                dataIndex: 'departamento',
                key: 'departamento',
                fixed: 'left',
                ...this.getColumnSearchProps('departamento')
            },
            {
                title: 'BSPI Punto',
                dataIndex: 'bspi',
                key: 'bspi',
                filters: [
                    {
                        text: 'Hogar Inés Chambers',
                        value: 'Hogar Inés Chambers',
                    },
                    {
                        text: 'Hospital León Becerra',
                        value: 'Hospital León Becerra',
                    },
                    {
                        text: 'Residencia Mercedes Begue',
                        value: 'Residencia Mercedes Begue',
                    },
                    {
                        text: 'Unidad Educativa San José del Buen Pastor',
                        value: 'Unidad Educativa San José del Buen Pastor',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.bspi, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.bspi, b.bspi)
            },
            {
                title: 'Empleado',
                dataIndex: 'empleado',
                key: 'empleado',
                ...this.getColumnSearchProps('empleado')
            },
            {
                title: 'Equipo',
                dataIndex: 'tipo_equipo',
                key: 'tipo_equipo',
                ...this.getColumnSearchProps('tipo_equipo')
            },
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                render: (text, record) => <Link to={{ pathname: `${tipo_link(record)}`}}>{text}</Link>,
                ...this.getColumnSearchProps('codigo')
            },
            {
                title: 'Marca',
                dataIndex: 'marca',
                key: 'marca',
                ...this.getColumnSearchProps('marca')
            },
            {
                title: 'Modelo',
                dataIndex: 'modelo',
                key: 'modelo',
                ...this.getColumnSearchProps('modelo')
            },
            {
                title: 'Número de serie',
                dataIndex: 'numero_serie',
                key: 'numero_serie',
                ...this.getColumnSearchProps('numero_serie')
            },
            {
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip',
                ...this.getColumnSearchProps('ip')
            },
            {
                title: 'Estado',
                dataIndex: 'estado_operativo',
                key: 'estado_operativo',
                filters: [
                    {
                        text: 'Disponible',
                        value: 'D',
                    },
                    {
                        text: 'Operativo',
                        value: 'O',
                    },
                    {
                        text: 'En revisión',
                        value: 'ER',
                    },
                    {
                        text: 'Reparado',
                        value: 'R',
                    },
                    {
                        text: 'De baja',
                        value: 'B',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado_operativo, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado_operativo, b.estado_operativo),
                render: (text, value) => (
                    <div >
                        {text==="D" ? <Tag style={{margin: 2}} color="green" key={value}>Disponible</Tag> : 
                        text==="O" ?  <Tag style={{margin: 2}} color="blue" key={value}>Operativo</Tag> :
                        text==="ER" ?  <Tag style={{margin: 2}} color="orange" key={value}>En revisión</Tag> :
                        text==="R" ?  <Tag style={{margin: 2}} color="magenta" key={value}>Reparado</Tag> :
                                        <Tag style={{margin: 2}} color="red" key={value}>De baja</Tag> }
                    </div>
                  ),
            }
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={3}>Reporte de equipos informáticos asignados</Title></Col>
                    <Col className='flexbox'>
                        {/* <ButtonGroup>
                            <Button type="primary" icon="cloud-download" onClick={this.showModal}>Exportar</Button>
                        </ButtonGroup> */}
                        <ExcelExportMasivo data={this.state.currentDataSource} data_detallada = {this.state.data_detallada} dis = {this.state.disabelExport}></ExcelExportMasivo>

                    </Col>
                </Row>
                <div className="div-container">
                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table loading={this.state.loading} bordered key={this.state.index} onChange={this.handleChange} size="small"
                        scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
                <ModalDownload
                    title="Descargar reporte de equipos dados de baja"
                    visible={this.state.visible}
                    onOk={() => this.handleOk(this.state.archivo)}
                    onCancel={this.handleCancel}
                    onChange={this.tipo_archivo}
                    value={this.state.archivo}
                ></ModalDownload>
            </div>
        );
    }
}

export default TablaReporte;