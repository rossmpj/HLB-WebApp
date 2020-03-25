import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon,
    Popconfirm,
    message,
    Typography
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';
const { Title } = Typography;

/* const ips = [
    {
        key: '1',
        ip: '192.168.1.1',
        estado: 'En uso',
        asignacion: '2020-01-01',
        hostname: 'Procyon',
        subred: '192.168.0.0',
        fortigate: 'Recepcion',
        maquinas: 5,
        asignado: 'Fermín Romero',
        encargado: 'admin',
        observacion: 'ninguna'

    },
    {
        key: '2',
        ip: '192.168.1.2',
        estado: 'Libre',
        asignacion: '2020-01-02',
        hostname: 'Antares',
        subred: '192.168.0.1',
        fortigate: 'Recepcion',
        maquinas: 1,
        asignado: 'Juan Sempere',
        encargado: 'yo',
        observacion: 'ninguna'

    },
    {
        key: '3',
        ip: '192.168.1.3',
        estado: 'Libre',
        asignacion: '2020-01-02',
        hostname: 'Betelgeuse',
        subred: '192.168.0.0',
        fortigate: 'Farmacia',
        maquinas: 7,
        asignado: 'Alicia Sempere',
        encargado: 'yo',
        observacion: 'ninguna'

    }


] */


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
            dataSource: []
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
                    observacion: dato.observacion,
                    asignacion: dato.created_at
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    componentDidMount() {
        this.llenar_tabla();
    }


    handleDelete(key) {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        message.success("Registro eliminado exitosamente");
        /* message.error("Error al eliminar el registro, inténtelo más tarde"); */
    }

    stringSorter(a, b) {
        return a.localeCompare(b);
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
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
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
                render: (text, record) => <Link to={{ pathname: '/ip/detail', state: { info: record } }}>{text}</Link>,
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
                onFilter: (value, record) => record.estado.indexOf(value) === 0,
                sorter: (a, b) => a.estado.length - b.estado.length
            },
            {
                title: 'Fecha asignación',
                dataIndex: 'asignacion',
                key: 'asignacion',
                sorter: (a, b) => this.stringSorter(a.asignacion, b.asignacion)
            },
            {
                title: 'Hostname',
                dataIndex: 'hostname',
                key: 'hostname',
                sorter: (a, b) => this.stringSorter(a.hostname, b.hostname)

            },
            {
                title: 'Subred',
                dataIndex: 'subred',
                key: 'subred',
                sorter: (a, b) => this.stringSorter(a.subred, b.subred)
            },
            {
                title: 'Fortigate',
                dataIndex: 'fortigate',
                key: 'fortigate',
                sorter: (a, b) => a.fortigate.length - b.fortigate.length
            },
            {
                title: 'Máquinas adicionales',
                dataIndex: 'maquinas',
                key: 'maquinas',
                sorter: (a, b) => a.maquinas.length - b.maquinas.length

            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                sorter: (a, b) => a.asignado.length - b.asignado.length

            },
            {
                title: 'Encargado',
                dataIndex: 'encargado',
                key: 'encargado',
                sorter: (a, b) => a.encargado.length - b.encargado.length
            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/ip/form',
                            state: {
                                info: record,
                                titulo: "Editar dirección IP"
                            }
                        }} >
                            <Button style={{ marginRight: '7px' }} size="small" type="info" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este registro?"
                            okText="Si"
                            cancelText="No"
                        /* onConfirm={} */
                        >
                            <Button size="small" type="error" icon="delete" />
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
                    <Table size="medium" tableLayout={undefined} scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
            </div>
        );
    }
}

export default TablaIp;