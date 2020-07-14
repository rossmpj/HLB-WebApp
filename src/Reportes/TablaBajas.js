import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon,
    message,
    Typography
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosReporte'
import ModalDownload from '../Componentes/ModalDownload';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import FuncionesAuxiliares from '../FuncionesAuxiliares';

const { Title } = Typography;
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


class TablaBajas extends React.Component {
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
            archivo: ""
        };

    }

    llenar_tabla() {
        let datos = [];
        Axios.reporte_bajas().then(res => {
            res.data.forEach(function (dato) {
                console.log("dq", dato)
                let equipos = {
                    key: dato.id_equipo,
                    tipo_equipo: dato.tipo_equipo,
                    codigo: dato.codigo,
                    marca: dato.marca === null ? '' : dato.marca,
                    modelo: dato.modelo === null ? '' : dato.modelo,
                    estado_operativo: dato.estado_operativo,
                    numero_serie: dato.numero_serie === null ? '' : dato.numero_serie,
                    descripcion: dato.descripcion,
                }
                datos.push(equipos)
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

    resumen_bajas = async () => {
        try {
            const res = await Axios.resumen_bajas();
            return res.data;
        } catch (error) {
            throw new Error('No se pudieron cargar los datos del servidor');
        }
    }

    reporte_bajas = async () => {
        try {
            const res = await Axios.reporte_bajas();
            return res.data;
        } catch (error) {
            throw new Error('No se pudieron cargar los datos del servidor');
        }
    }

    handleOk = async (extension) => {
        let fileExtension = "";
        if (extension === "xlsx") {
            fileExtension = '.xlsx';
            try {
                let datos = []
                let datos2 = []
                const resumen = await this.resumen_bajas();
                const reporte = await this.reporte_bajas();
                reporte.forEach(function (dato) {
                    let equipos = {
                        tipo_equipo: dato.tipo_equipo,
                        codigo: dato.codigo,
                        marca: dato.marca,
                        modelo: dato.modelo,
                        estado_operativo: dato.estado_operativo,
                        numero_serie: dato.numero_serie,
                        descripcion: dato.descripcion,
                    }
                    datos.push(equipos);
                });
                resumen.forEach(function (dato) {
                    let informacion = {
                        tipo_equipo: dato.tipo_equipo,
                        cantidad: dato.cantidad
                    }
                    datos2.push(informacion);
                });
                let wb = XLSX.utils.book_new();
                const ws1 = XLSX.utils.json_to_sheet(datos);
                const ws2 = XLSX.utils.json_to_sheet(datos2);
                XLSX.utils.book_append_sheet(wb, ws1, "Datos");
                XLSX.utils.book_append_sheet(wb, ws2, "Resumen");
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const data = new Blob([excelBuffer], { type: fileType });
                saveAs(data, "equipos_de_baja" + fileExtension);
            } catch (error) {
                message.error(error.message)
                    .then(() => message.error('No fue posible generar el archivo', 2.5))
            }

        } else {
            message.error('Debe seleccionar un formato de descarga');
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
                    return '/impresora/view/' + record.key;
                case "desktop":
                    return '/desktop/view/' + record.key;
                case "laptop":
                    return '/laptop/view/' + record.key;
                case "router":
                    return '/router/view/' + record.key;
                default:
                    return '/equipo/view/' + record.key;
            }
        }
        const columns = [
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
                render: (text, record) => <Link to={{ pathname: `${tipo_link(record)}` }}>{text}</Link>,
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
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado_operativo, b.estado_operativo)
            },
            {
                title: 'Descripción',
                dataIndex: 'descripcion',
                key: 'descripcion',
                ...this.getColumnSearchProps('descripcion')
            }
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={3}>Reporte de equipos informáticos de baja</Title></Col>
                    <Col className='flexbox'>
                        <ButtonGroup>
                            <Button type="primary" icon="cloud-download" onClick={this.showModal}>Exportar</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <div className="div-container">
                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table bordered key={this.state.index} onChange={this.handleChange} size="middle"
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

export default TablaBajas;