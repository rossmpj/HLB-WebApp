import React from 'react';
import { Button, Row, Col, Table, Input, Icon, message, Popconfirm, Typography } from 'antd';
import { Link } from 'react-router-dom';
import AxiosPrograma from '../../Servicios/AxiosPrograma';
import FuncionesAuxiliares from '../../FuncionesAuxiliares'
const { Title } = Typography;
const key = 'updatable';

class TablaPrograma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            index: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    recargar_datos(){
        this.llenar_tabla();
      }

    llenar_tabla() {
        let datos = [];
        AxiosPrograma.listado_programas().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.id_programa,
                    nombre: dato.nombre,
                    codigo: dato.codigo,
                    version: dato.version,
                    editor: dato.editor,
                    observacion: dato.observacion
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

    handleClick() {
        this.setState({
          showComponent: true,
          showTable: false,
        });     
      }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
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

    handleDelete(id) {
        console.log("clave a eliminar",id)
        AxiosPrograma.eliminar_programa(id).then(res => {
          message.success({ content: 'Registro eliminado satisfactoriamente', key, duration: 3 });
          this.recargar_datos();
        }).catch(err => {
          message.error("Ha ocurrido un error al procesar la petición, inténtelo más tarde", 4);
        });
      }

    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                fixed: 'left',
                ...this.getColumnSearchProps('codigo'),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.codigo, b.codigo),
                sortOrder: sortedInfo.columnKey === 'codigo' && sortedInfo.order,
            },
            {
                title: 'Programa',
                dataIndex: 'nombre',
                key: 'nombre',
                width: 300,
                ...this.getColumnSearchProps('nombre'),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.nombre, b.nombre),
                sortOrder: sortedInfo.columnKey === 'nombre' && sortedInfo.order,
            },
            {
                title: 'Versión',
                dataIndex: 'version',
                key: 'version',
                width: 180,
                ...this.getColumnSearchProps('version')
            },
            {
                title: 'Editor',
                dataIndex: 'editor',
                key: 'editor',
                width: 250,
                ...this.getColumnSearchProps('editor')
            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion',
                width: 280,
                ...this.getColumnSearchProps('observacion')
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div style={{alignContent: 'center'}}>
                        <Link to={{
                            pathname: '/programa/form',
                            state: {
                                info: record,
                                titulo: "Editar programa"
                            }
                        }} >
                            <Button style={{marginRight: '2px'}} type="primary" size="small" icon="edit" />
                        </Link>
                        <Popconfirm placement="topRight" 
                            title="¿Desea eliminar este registro?" 
                            okText="Si" cancelText="No" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type="danger" icon="delete" size="small" />
                        </Popconfirm>
                    </div>
                ),
            },
        ];
        return (
            <div>
                <div className="div-container-title">
                    <Row>
                        <Col span={12}><Title level={2}>Inventario de programas</Title></Col>
                        <Col className='flexbox'>
                            <Link to={{ pathname: '/programa/form', state: { titulo: "Nuevo programa" } }} >
                                <Button type="primary" icon="plus">Agregar programa</Button>
                            </Link>
                        </Col>
                    </Row>
                    <div className="div-container">
                        <Table bordered key={this.state.index} onChange={this.handleChange} size="small"
                        scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TablaPrograma;