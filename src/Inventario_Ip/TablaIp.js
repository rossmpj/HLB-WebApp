import React from 'react';
import {Button,Row,Col,Table,Input,Icon,Popconfirm,message,Typography} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
const { Title } = Typography;

class TablaIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            data: [],
            pagination: {},
            loading: false,
            searchText: '',
            dataSource: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
    }

    llenar_tabla() {
        let datos = [];
        Axios.ver_ips().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.id_ip,
                    ip: dato.direccion_ip,
                    estado: dato.estado,
                    hostname: dato.hostname,
                    subred: dato.subred,
                    fortigate: dato.fortigate,
                    maquinas: dato.maquinas_adicionales,
                    asignado: dato.nombre_usuario,
                    encargado: dato.encargado_registro,
                    observacion: dato.observacion
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    handleChange = (filters, sorter) => {
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


    handleDelete(key) {
        Axios.eliminar_ip(key).then(res => {
            message.success({ content: 'Registro eliminado satisfactoriamente', key, duration: 3 });
        }).catch(err => {
            console.log(err)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
                    style={{ width: 90, marginRight: 8 }}>
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



    render() {
        const columns = [
            {
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip',
                fixed: 'left',
                render: (text, record) => <Link to={{ pathname: '/ip/detail/'+record.key}}>{text}</Link>,
                ...this.getColumnSearchProps('ip')
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'En uso',
                        value: 'En uso',
                    },
                    {
                        text: 'Libre',
                        value: 'Libre',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado, b.estado)
            },
            {
                title: 'Hostname',
                dataIndex: 'hostname',
                key: 'hostname',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.hostname, b.hostname)

            },
            {
                title: 'Subred',
                dataIndex: 'subred',
                key: 'subred',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.subred, b.subred)
            },
            {
                title: 'Fortigate',
                dataIndex: 'fortigate',
                key: 'fortigate',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.fortigate, b.fortigate)
            },
            {
                title: 'Máquinas adicionales',
                dataIndex: 'maquinas',
                key: 'maquinas',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.maquinas, b.maquinas)

            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.asignado, b.asignado)

            },
            {
                title: 'Encargado',
                dataIndex: 'encargado',
                key: 'encargado',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.encargado, b.encargado)
            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/ip/form',
                            state: {
                                info: record,
                                titulo: "Editar dirección IP"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} size="small" type="primary" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este registro?"
                            okText="Si"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}>
                            <Button size="small" type="danger" icon="delete" />
                        </Popconfirm>
                    </div>
                ),
            },
        ];

        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Inventario IP</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/ip/form', state: { titulo: "Nueva dirección IP" } }} >
                            <Button type="primary" icon="plus">Agregar dirección IP</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">
                    <div >
                        <Row>
                            <Col className='flexbox'>
                                <ButtonGroup style={{ align: 'right' }}>
                                    <Button type="primary" icon="import">Importar</Button>
                                    <Button type="primary" icon="cloud-download">Exportar</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table bordered key={this.state.index} onChange={this.handleChange} size="small"
                     scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
            </div>
        );
    }
}

export default TablaIp;