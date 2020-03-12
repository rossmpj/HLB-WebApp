import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';



const datos=[
    {
        key: 1,
        tipo:'Impresora',
        ip:'si'
    },
    {
        key: 2,
        tipo:'Router',
        ip:'si'
    },
    {
        key: 3,
        tipo:'Teclado',
        ip:'no'
    },

]
 

class TablaTipo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
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
                title: 'Tipo de equipo',
                dataIndex: 'tipo',
                key: 'tipo',
                ...this.getColumnSearchProps('tipo')
            },
            {
                title: '¿Usa Ip?',
                dataIndex: 'ip',
                key: 'ip',
                filters: [
                    {
                        text: 'si',
                        value: 'si',
                    },
                    {
                        text: 'no',
                        value: 'no',
                    }
                ],
                onFilter: (value, record) => record.ip.indexOf(value) === 0
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div>
                        <Button style={{ marginRight: '7px' }} type="info" icon="edit" />
                        <Button type="error" icon="delete" />
                    </div>
                ),
            },
        ];
        return (
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
                <Table size="medium" columns={columns} dataSource={datos}></Table>
            </div>
        );
    }
}

export default TablaTipo;