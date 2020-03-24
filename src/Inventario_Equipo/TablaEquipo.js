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
const { Title } = Typography;

const datos = [
    {
        key: 1,
        codigo: '0908102940',
        nserie: 's0908102940',
        estado: 'En revisión',
        tipo: 'router',
        modelo: 'GSV10970',
        marca: 'Intel',
        ip: '',
        componente: '',
        asignado: 'Juan Sempere',
        registro: '2020-03-11',
        descripcion: ''
    },
    {
        key: 2,
        codigo: '0908102960',
        nserie: 's0908102960',
        estado: 'Disponible',
        tipo: 'Pluma digital',
        modelo: 'GSV10969',
        marca: 'Intel',
        ip: '',
        componente: '',
        asignado: 'Juan Sempere',
        registro: '2020-03-12',
        descripcion: ''
    },
    {
        key: 3,
        codigo: '0908102990',
        nserie: 's0908102990',
        estado: 'Disponible',
        tipo: 'impresora',
        modelo: 'GSV10968',
        marca: 'Intel',
        ip: '',
        componente: '',
        asignado: 'Juan Sempere',
        registro: '2020-03-10',
        descripcion: ''
    }
]



class TablaEquipo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            info: []
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
        this.setState({ dataSource: datos });
    }

    componentDidMount() {
        this.llenar_tabla();
    }


    cargar_desktop(codigo) {
        let desk = {
            key: '1',
            codigo: 'HLB_COMP_3',
            bspi: 'Hospital León Becerra',
            departamento: 'Financiero',
            empleado: 'Victor Toral',
            name_pc: 'Contador-PC',
            user_pc: 'Contador',
            estado: 'Operativo',
            so: 'Windows 7 Professional',
            so_type: '32 bits',
            servpack: 'No',
            licencia: 'No',
            office: '2013',
            ip: '8',
            monitor: 'HLB_MNT_1',
            teclado: 'HLB_TEC_12',
            mouse: 'HLB_MOU_35',
            parlantes: 'HLB_PAR_23',
            mainboard: 'HLB_MNB_34',
            rams: ['1', 'gfh'],
            discos: ['HLB_DD_4'],
            procesador: 'HLB_PRC',
            tarj_red: 'hlb_tred_1',
            case: 'hlb_cas_4',
            f_alim: 'UPS',
            f_poder: 'HLB_fpod_1',
            descripcion: 'revisar'
        }
        return desk;
    }

    cargar_router(codigo) {
        let router = {
            codigo: '0',
            key: 'num_serie',
            bspi: 'Hogar Inés Chambers',
            departamento: 'Proveeduría',
            asignar: 'Tae woon',
            nombre: 'John Brown',
            pass: 'gjgkd32',
            usuario: 'drgd5547',
            clave: '345',
            marca: 'LG',
            modelo: 'ergr',
            nserie: 23,
            estado: 'Operativo',
            ip: '2',
            penlace: '192.168.1.0',
            descripcion: 'muy bueno'
        }
        return router;
    }


    cargar_laptop(codigo) {
        let lap = {
            key: '1',
            codigo: 'HLB_COMP_1',
            bspi: 'Hospital León Becerra',
            departamento: 'Proveeduría',
            empleado: 'John Villamar',
            marca: 'Lenovo',
            modelo: 'h2343',
            num_serie: 'tftyfBGPGTH1',
            name_pc: 'Admin',
            user_pc: 'UsADmin1',
            estado: 'No Operativo',
            so: 'Windows 10 Home Single Language',
            so_type: '64 bits',
            servpack: 'No',
            licencia: 'Si',
            office: '2010',
            ip: '1',
            nombre_procesador: 'Intel Core i7-5500U',
            frecuencia: '3 GHz',
            nnucleos: 4,
            ram_soportada: '12 GB',
            slots_ram: 2,
            rams: ['HLB_S2', 'GGRGHGDGRGT-1', 'DFGHR22'],
            discos: ['HLB_DD_9', 'HLB_DDD_1'],
            descripcion: 'nn'
        }
        return lap;
    }

    cargar_impresora(codigo) {
        let print = {
            key: '3',
            nserie: '3456',
            bspi: 'Hospital León Becerra',
            asignado: 'Carlos Ruiz Zafón',
            dpto: 'Sistemas',
            tipo: 'brazalete',
            marca: 'Epson',
            codigo: 123,
            estado: 'Operativo',
            modelo: 'RGB-102',
            tinta: 'Z95',
            cartucho: 'H96',
            descripcion: 'Ninguna',
            toner: 'J98',
            rodillo: '',
            cinta: '',
            rolloBrazalete: 'Y97'
        }
        return print;
    }



    handleDelete(key) {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        message.success("Registro eliminado exitosamente");
        /* message.error("Error al eliminar el registro, inténtelo más tarde"); */
    }

    sortString(a, b) {
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
        const tipo_render = (record) => {
            switch (record.tipo) {
                case "impresora":
                    return <Link to={{ pathname: '/impresora/form', state: { info: record, titulo: "Editar impresora" } }}>
                        <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit" />
                    </Link>
                case "cpu":
                    return <Link to={{ pathname: '/', state: { info: record, titulo: "Editar Desktop" } }}>
                        <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit" />
                    </Link>;
                case "laptop":
                    return <Link to={{ pathname: '/', state: { info: record, titulo: "Editar Laptop" } }}>
                        <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit" />
                    </Link>;
                case "router":
                    return <Link to={{ pathname: '/', state: { info: record, titulo: "Editar router" } }}>
                        <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit" />
                    </Link>;
                default:
                    return <Link to={{ pathname: '/otrosequipos/form', state: { info: record, titulo: "Editar equipo" } }}>
                        <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit" />
                    </Link>
            }
        }

        const tipo_link = (record) => {
            switch (record.tipo) {
                case "impresora":
                    return '/impresora/view'
                case "cpu":
                    return '/desktop/view'
                case "laptop":
                    return '/laptop/view'
                case "router":
                    return '/router/view'
                default:
                    return '/equipo/view'
            }
        }

        const tipo_data = (record) => {
            switch (record.tipo) {
                case "impresora":
                    return this.cargar_impresora(record.codigo);
                case "cpu":
                    return this.cargar_desktop(record.codigo);
                case "laptop":
                    return this.cargar_laptop(record.codigo);
                case "router":
                    return this.cargar_router(record.codigo);
                default:
                    return record;
            }
        }

        const columns = [
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                render: (text, record) => <Link to={{ pathname: `${tipo_link(record)}`, state: { info: tipo_data(record) } }}>{text}</Link>,
                ...this.getColumnSearchProps('codigo')
            },
            {
                title: 'Número de serie',
                dataIndex: 'nserie',
                key: 'nserie',
                ...this.getColumnSearchProps('nserie')
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'Operativo',
                        value: 'Operativo',
                    },
                    {
                        text: 'En revisión',
                        value: 'En revisión',
                    }
                ],
                onFilter: (value, record) => record.estado.indexOf(value) === 0,
                sorter: (a, b) => a.estado.length - b.estado.length
            },

            {
                title: 'Tipo',
                dataIndex: 'tipo',
                key: 'tipo',
                ...this.getColumnSearchProps('tipo')
            },
            {
                title: 'Modelo',
                dataIndex: 'modelo',
                key: 'modelo',
                ...this.getColumnSearchProps('modelo')
            },

            {
                title: 'Marca',
                dataIndex: 'marca',
                key: 'marca',
                ...this.getColumnSearchProps('marca')
            },
            {
                title: 'Fecha registro',
                dataIndex: 'registro',
                key: 'registro',
                sorter: (a, b) => this.sortString(a.registro, b.registro)
            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                ...this.getColumnSearchProps('asignado')
            },
            {
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip',
                ...this.getColumnSearchProps('ip')
            },
            {
                title: 'Componente principal',
                dataIndex: 'componente',
                key: 'componente',
                render: text => <a href="/#">{text}</a>,
                ...this.getColumnSearchProps('componente')
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
                        {tipo_render(record)}
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
                    <Col span={12}><Title level={2}>Inventario equipos informáticos</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/otrosequipos/form', state: { titulo: "Nuevo equipo" } }} >
                            <Button type="primary" icon="plus">Agregar tipo de equipo</Button>
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

export default TablaEquipo;