import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const columns = [
    {
        title: 'Tipo de equipo',
        dataIndex: 'tipo',
        key: 'tipo',
        render: text => <a href="/#">{text}</a>
    },
    {
        title: '¿Usa Ip?',
        dataIndex: 'ip',
        key: 'ip'
    },
    {
        title: 'Acción',
        key: 'accion',
        render: (text, record) => (
            <div>
                <Button style={{ marginRight: '7px' }} size="medium" type="success" icon="eye" />
                <Button style={{ marginRight: '7px' }} size="medium" type="info" icon="edit" />
                <Button size="medium" type="error" icon="delete" />
            </div>
        ),
    },
];

/* const data=[
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
 */

class TablaTipo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
    }

    render() {
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
                <Table size="medium" columns={columns}></Table>
            </div>
        );
    }
}

export default TablaTipo;