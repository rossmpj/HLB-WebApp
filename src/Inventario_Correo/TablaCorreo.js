import React from 'react';
import {
    Button, Row, Col, Table, Input, Icon, message, Typography, Popconfirm, Tag
} from 'antd';
import ExcelExportCorreo from './ExcelExportCorreo';
import { Link } from 'react-router-dom';
import AxiosTipo from '../Servicios/AxiosTipo';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
import FunAuxImport from '../Componentes/ImportModals/FunAuxImport';
import ImportModal from '../Componentes/ImportModals/ImportModal';
import ResponseModal from '../Componentes/ImportModals/ResponseModal';

const { Title } = Typography;

class TablaCorreo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0,
            currentDataSource: [],
            loading: false,
            disabelExport: true,
            fileList: [],
            uploading: false,
            visibleModal: false,
            disabledImport: false,
            messageFile: '',
            responseImport: null,
            messageImport: '',
            visibleModalResp: false,
            hiddenBRI: true
        };
    }

    llenar_tabla() {
        let datos = [];
        this.setState({ loading: true });
        AxiosTipo.mostrar_correos().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.id_correo,
                    correo: dato.correo,
                    departamento: dato.departamento,
                    bspi_punto: dato.bspi_punto,
                    estado: dato.estado,
                    empleado: dato.nombre.concat(" ", dato.apellido),
                    asignacion: dato.asignacion,
                    cedula: dato.cedula,
                    contrasena: dato.contrasena
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos, currentDataSource: datos, disabelExport: false, loading: false });
        }).catch(err => {
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    handleUpload = async () => {
        this.setState({
            uploading: true,
            responseImport: null,
            messageImport: '',
            hiddenBRI: true,
            messageFile: ''
        });
        const { fileList } = this.state;
        try {
            const hoja = await FunAuxImport.ExcelToJson(fileList[0]);
            console.log(hoja)
            if (hoja.data.length > 50) {
                this.setState({
                    uploading: false,
                    messageFile: 'El archivo posee mas de 50 registros. No es posible procesar tantos registros.'
                });
                return;
            }
            AxiosTipo.reg_masivo_correos(hoja).then(res => {
                console.log(res.data, 'res')
                this.setState({
                    uploading: false,
                    visibleModal: false,
                    responseImport: res.data,
                    visibleModalResp: true,
                    messageImport: '',
                    hiddenBRI: true,
                    fileList: [],
                    messageFile: ''
                })
            }).catch(err => {
                console.log('err import', err, err.response);
                this.setState({
                    uploading: false,
                    visibleModal: false,
                    messageImport: "Ha ocurrido un error en el servidor. Intentelo mas tarde",
                    visibleModalResp: true,
                    hiddenBRI: true,
                    messageFile: ''
                })
            })
        } catch (e) {
            this.setState({
                messageFile: 'No se pudo procesar el archivo seleccionado',
                uploading: false,
                hiddenBRI: true
            })
        }
    }

    showModal = () => {
        this.setState({
            visibleModal: true,
        });
    };

    handleCancel = () => {
        this.setState({ visibleModal: false });
    };

    handleCancelMR = () => {
        this.setState({
            visibleModalResp: false,
            hiddenBRI: false

        });
    };

    handleOkMR = () => {
        this.setState({
            visibleModalResp: false,
            responseImport: null,
            messageImport: '',
            hiddenBRI: true
        });
    };

    showModalResp = () => {
        this.setState({
            visibleModalResp: true
        })
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    limpiarBusquedas = () => {
        this.setState({
            index: this.state.index + 1
        })
    }

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            index: this.state.index + 1
        });
    };

    handleChange = (pagination, filters, sorter, currentDataSource) => {
        console.log('Various parameters', pagination, filters, sorter, currentDataSource);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
            currentDataSource: currentDataSource.currentDataSource
        });
    };

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

    handleDelete(key) {
        AxiosTipo.eliminar_correo(key).then(res => {
            message.success({ content: 'Correo dado de baja satisfactoriamente', key, duration: 3 });
            this.llenar_tabla();
        }).catch(err => {
            console.log(err.response.data.log)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });
    }

    render() {
        const columns = [
            {
                title: 'Correo',
                dataIndex: 'correo',
                key: 'correo',
                ...this.getColumnSearchProps('correo')
            },
            {
                title: 'Empleado',
                dataIndex: 'empleado',
                key: 'empleado',
                ...this.getColumnSearchProps('empleado')
            },
            {
                title: 'BSPI Punto',
                dataIndex: 'bspi_punto',
                key: 'bspi_punto',
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
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.bspi_punto, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.bspi_punto, b.bspi_punto)
            },
            {
                title: 'Departamento',
                dataIndex: 'departamento',
                key: 'departamento',
                ...this.getColumnSearchProps('departamento')
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'En uso',
                        value: 'EU',
                    },
                    {
                        text: 'Inactivo',
                        value: 'I',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado, b.estado),
                render: (text, value) => (
                    <div >
                        {text === "EU" ? <Tag style={{ margin: 2 }} color="green" key={value}>En Uso</Tag> :
                            <Tag style={{ margin: 2 }} color="red" key={value}>Inactivo</Tag>}
                    </div>
                ),
            },
            {
                title: 'Fecha de asignación',
                dataIndex: 'asignacion',
                key: 'asignacion',
                ...this.getColumnSearchProps('asignacion')
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/sistemas/correo/form',
                            state: {
                                info: record,
                                titulo: "Editar Correo"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} type="primary" size="small" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este correo?"
                            okText="Si" cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}>
                            {record.estado === 'I' ?
                                <Button disabled type="danger" icon="delete" size="small" /> : <Button type="danger" icon="delete" size="small" />}
                        </Popconfirm>

                    </div>
                ),
            },
        ];

        const { uploading, fileList } = this.state;
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
                this.setState({
                    messageFile: ''
                })
            },
            beforeUpload: file => {
                let l_fn = file.name.toLowerCase().split('.');
                let ext = l_fn[l_fn.length - 1];
                if (ext !== 'xlsx') {
                    this.setState({
                        messageFile: '[' + file.name + ']: El archivo debe ser Excel (.xlsx)'
                    })
                }
                else if (fileList.length > 0) {
                    this.setState({
                        messageFile: 'Solo se puede importar un archivo a la vez'
                    })
                }
                else {
                    this.setState({
                        messageFile: ''
                    })
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                    }));
                }
                return false;

            }
        };

        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Inventario de Correos</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/sistemas/correo/form', state: { titulo: "Nuevo Correo" } }} >
                            <Button type="primary" icon="plus">Agregar Correo</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">
                    <div >
                        <Row>
                            <Col className='flexbox'>
                                {/* <ButtonGroup> */}
                                <Button onClick={this.showModal} type="primary" icon="import">Importar</Button>
                                <ExcelExportCorreo data={this.state.currentDataSource} dis={this.state.disabelExport} ></ExcelExportCorreo>
                                <Button hidden={this.state.hiddenBRI} onClick={this.showModalResp} type="primary">Result. Importación</Button>
                                {/* <Button type="primary" icon="cloud-download">Exportar</Button> */}
                                {/* </ButtonGroup> */}
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table loading={this.state.loading} bordered key={this.state.index} onChange={this.handleChange} size="small"
                        scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
                <ImportModal
                    title="Importar Correos"
                    visible={this.state.visibleModal}
                    onOk={this.handleUpload}
                    onCancel={this.handleCancel}
                    fileList={fileList}
                    uploading={uploading}
                    uploadProps={uploadProps}
                    dataFormat={FunAuxImport.dataFormatCorreos()}
                    messageFile={this.state.messageFile}
                    fileName='Formato Correos'
                    sheetName='Correos'
                >
                </ImportModal>
                <ResponseModal
                    title="Importar Correos"
                    visible={this.state.visibleModalResp}
                    onOk={this.handleOkMR}
                    onCancel={this.handleCancelMR}
                    messageImport={this.state.messageImport}
                    response={this.state.responseImport}
                >
                </ResponseModal>
            </div>
        );
    }
}

export default TablaCorreo;