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
import Axios from '../Servicios/AxiosTipo'
const { Title } = Typography;

class TablaImpresora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
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

    departamentos() {
        let dpto = [];
        Axios.mostrar_departamentos().then(res => {
            res.data.forEach(function (dato) {
                let dict = {
                    text: dato.nombre,
                    value: dato.nombre
                }
                dpto.push(dict);
            });

        }).catch(err => { console.log(err) });
        return dpto;
    }

    llenar_tabla() {
        let datos = [];
        let empleado = ""
        Axios.mostrar_impresoras().then(res => {

            res.data.forEach(function (dato) {
                if (dato.empleado !== null) {
                    empleado = dato.empleado.concat(" ", dato.apellido);
                }
                let impresoras = {
                    key: dato.id_impresora,
                    numero_serie: dato.numero_serie,
                    bspi: dato.bspi_punto,
                    asignado: empleado,
                    dpto: dato.nombre,
                    tipo: dato.tipo,
                    id_marca: dato.marca,
                    codigo: dato.codigo,
                    estado_operativo: dato.estado_operativo,
                    modelo: dato.modelo,
                    tinta: dato.tinta,
                    cartucho: dato.cartucho,
                    descripcion: dato.descripcion,
                    toner: dato.toner,
                    rodillo: dato.rodillo,
                    cinta: dato.cinta,
                    rollo: dato.rollo,
                    ip: dato.direccion_ip
                }
                datos.push(impresoras)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    stringSorter(a, b) {
        let y = a || '';
        let u = b || '';
        return y.localeCompare(u);
    }


    handleDelete(key) {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        message.success("Registro eliminado exitosamente");
        /* message.error("Error al eliminar el registro, inténtelo más tarde"); */
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
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                render: (text, record) => <Link to={{ pathname: '/impresora/view', state: { info: record } }}>{text}</Link>,
                ...this.getColumnSearchProps('codigo')
            },
            {
                title: 'Número de serie',
                dataIndex: 'numero_serie',
                key: 'numero_serie',
                ...this.getColumnSearchProps('numero_serie')
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
                onFilter: (value, record) => record.bspi.indexOf(value) === 0,
                sorter: (a, b) => this.stringSorter(a.bspi, b.bspi)
            },
            {
                title: 'Departamento',
                dataIndex: 'dpto',
                key: 'dpto',
                filters: this.departamentos(),
                onFilter: (value, record) => record.dpto.indexOf(value) === 0,
                sorter: (a, b) => a.dpto.length - b.dpto.length
            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                ...this.getColumnSearchProps('asignado')
            },
            {
                title: 'Tipo',
                dataIndex: 'tipo',
                key: 'tipo',
                filters: [
                    {
                        text: 'Impresora',
                        value: 'Impresora',
                    },
                    {
                        text: 'Matricial',
                        value: 'Matricial',
                    },
                    {
                        text: 'Brazalete',
                        value: 'Brazalete',
                    },
                    {
                        text: 'Escáner',
                        value: 'Escáner',
                    },
                    {
                        text: 'Multifuncional',
                        value: 'Multifuncional',
                    },
                ],
                onFilter: (value, record) => record.tipo.indexOf(value) === 0,
                sorter: (a, b) => a.tipo.length - b.tipo.length

            },
            {
                title: 'Marca',
                dataIndex: 'id_marca',
                key: 'id_marca',
                ...this.getColumnSearchProps('id_marca')
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
                onFilter: (value, record) => record.estado_operativo.indexOf(value) === 0,
                sorter: (a, b) => a.estado_operativo.length - b.estado_operativo.length
            },
            {
                title: 'Modelo',
                dataIndex: 'modelo',
                key: 'modelo',
                ...this.getColumnSearchProps('modelo')
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                key: 'ip',
                ...this.getColumnSearchProps('ip')
            },
            {
                title: 'Tinta',
                dataIndex: 'tinta',
                key: 'tinta',
                ...this.getColumnSearchProps('tinta')
            },
            {
                title: 'Cartucho',
                dataIndex: 'cartucho',
                key: 'cartucho',
                ...this.getColumnSearchProps('cartucho')
            },
            {
                title: 'Toner',
                dataIndex: 'toner',
                key: 'toner',
                ...this.getColumnSearchProps('toner')
            },
            {
                title: 'Rodillo',
                dataIndex: 'rodillo',
                key: 'rodillo',
                ...this.getColumnSearchProps('rodillo')
            },
            {
                title: 'Cinta',
                dataIndex: 'cinta',
                key: 'cinta',
                ...this.getColumnSearchProps('cinta')
            },
            {
                title: 'Rollo/Brazalete',
                dataIndex: 'rollo',
                key: 'rollo',
                ...this.getColumnSearchProps('rollo')
            },
            {
                title: 'Descripción',
                dataIndex: 'descripcion',
                key: 'descripcion'
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/impresora/form',
                            state: {
                                info: record,
                                titulo: "Editar impresora"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} size="small" type="info" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este registro?"
                            okText="Si"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}
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
                    <Col span={12}><Title level={2}>Inventario Impresora</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/impresora/form', state: { titulo: "Nueva Impresora" } }} >
                            <Button type="primary" icon="plus">Agregar Impresora</Button>
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

export default TablaImpresora;