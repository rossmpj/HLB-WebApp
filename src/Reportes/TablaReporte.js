import React from 'react';
import {
    Button, Row, Col, Table, Input, Icon, message, Typography
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosReporte'
import ModalDownload from '../Componentes/ModalDownload';
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
            archivo: ""
        };

    }

    llenar_tabla() {
        let datos = [];
        Axios.reporte_general().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.id_equipo,
                    departamento: dato.departamento,
                    bspi: dato.bspi_punto,
                    empleado: dato.empleado.concat(" ", dato.apellido),
                    tipo_equipo: dato.tipo_equipo,
                    codigo: dato.codigo,
                    marca: dato.marca,
                    modelo: dato.modelo,
                    numero_serie: dato.numero_serie,
                    ip: dato.direccion_ip,
                    estado_operativo: dato.estado_operativo
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, revise la conexión con el servidor', 4);
        });
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
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

    stringSorter(a, b) {
        let y = a || '';
        let u = b || '';
        return y.localeCompare(u);
    }

    filtrar_array(arr, value) {
        if (arr !== null) {
            return arr.indexOf(value) === 0;
        }
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
       /*  let fileExtension = ""; */
        switch (extension) {
            case "xlsx":
                /* fileExtension = '.xlsx';
               let datos = [];
                let wb = XLSX.utils.book_new();
                 Axios.reporte_bajas().then(res => {
                    res.data.forEach(function (dato) {
                        let equipos = {
                            tipo_equipo: dato.tipo_equipo,
                            codigo: dato.codigo,
                            marca: dato.marca,
                            modelo: dato.modelo,
                            estado_operativo: dato.estado_operativo,
                            numero_serie: dato.numero_serie,
                            descripcion: dato.descripcion,
                        }
                        datos.push(equipos)
                    });
                    let ws1 = XLSX.utils.json_to_sheet(datos);
                    XLSX.utils.book_append_sheet(wb, ws1, "Datos");

                    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                    const data = new Blob([excelBuffer], { type: fileType });
                    saveAs(data, "equipos_de_baja" + fileExtension);
                }).catch(err => {
                    message.error('No se pudieron cargar los datos, revise la conexión con el servidor', 4);
                }); 
                let registro={
                    empleado: "empleado",
                    departamento: "departamento",
                    tipo_equipo: "tipo_equipo",
                    marca: "marca",
                    modelo: "modelo",
                    numero_serie: "numero_serie",
                    direccion_ip: "direccion_ip",
                    so: "so",
                    services_pack: "services_pack",
                    licencia: "licencia",
                    tipo_so: "tipo_so",
                    nombre_pc: "nombre_pc",
                    usuario_pc: "usuario_pc",
                    office: "office",
                    estado_operativo: "estado_operativo",
                    descripcion: "descripcion" 
                }*/
                break;
            default:
                message.error('Debe seleccionar un formato de descarga');
                break;
        }
        this.setState({
            visible: false
        });
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
            switch (record.tipo_equipo.toLowerCase()) {
                case "impresora":
                    return '/impresora/view'
                case "desktop":
                    return '/desktop/view'
                case "laptop":
                    return '/laptop/view'
                case "router":
                    return '/router/view'
                default:
                    return '/equipo/view'
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
                onFilter: (value, record) => this.filtrar_array(record.bspi, value),
                sorter: (a, b) => this.stringSorter(a.bspi, b.bspi)
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
                render: (text, record) => <Link to={{ pathname: `${tipo_link(record)}`, state: { info: record } }}>{text}</Link>,
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
                onFilter: (value, record) => this.filtrar_array(record.estado_operativo, value),
                sorter: (a, b) => this.stringSorter(a.estado_operativo, b.estado_operativo)
            }
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={3}>Reporte de equipos informáticos asignados</Title></Col>
                    <Col className='flexbox'>
                        <ButtonGroup>
                            <Button type="primary" icon="cloud-download" onClick={this.showModal}>Exportar</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <div className="div-container">
                    {/* <div >
                        <Row>
                           
                        </Row>
                    </div> 
                    <br />*/}
                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table bordered key={this.state.index} onChange={this.handleChange} size="small"
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