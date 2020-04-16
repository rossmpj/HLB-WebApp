import React from 'react';
import {
    Button, Row, Col, Table, Input, Icon, message, Typography, Modal, Radio
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosReporte'
const { Title } = Typography;

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
        });
    };


    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    tipo_archivo = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            archivo: e.target.value,
        });
    };



    render() {
        const { visible, confirmLoading } = this.state;
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
                <Modal
                    title="Descargar reporte general de equipos asignados"
                    visible={visible}
                    cancelText="Cancelar"
                    okText="Descargar"
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div style={{ textAlign: "center" }}>
                        <img className="center" src="/save.png" alt=":)"></img>
                        <p>Seleccione un formato de descarga</p>
                        <Radio.Group defaultValue="xlsx" buttonStyle="solid"
                            onChange={this.tipo_archivo}>
                            <Radio.Button value="xlsx">.XLSX</Radio.Button>
                            <Radio.Button value="csv">.CSV</Radio.Button>
                        </Radio.Group>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default TablaReporte;