import React from 'react';
import {
    Form
} from 'antd';
import Inputselectoption from './InputWithSelectOption'       

function CapacidadComponent(props) {
    return (
        <Form.Item
            label={props.label}
            className= {props.class!=="" ? `${props.class}` : null}
            >
            {props.decorator(`${props.id}`, {
                initialValue: { number: 16, currency: 'gb' },
                rules: [{ required: true, message: 'Ingrese la capacidad' }],
            })(
                <Inputselectoption />  
            )}
        </Form.Item>
    )
}
export default CapacidadComponent;