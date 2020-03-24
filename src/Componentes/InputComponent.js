import React from 'react';
import {
    Form,
    Input
} from 'antd';

function InputComponent(props) {
    return (
        <Form.Item
            label={props.label}
            disabled={props.disabled}
            className= {props.class!=="" ? `${props.class}` : null}
            >
            {props.decorator(`${props.id}`, {
                rules: [{ required: true, message: 'Debe completar este campo' }],
            })(
                <Input disabled={props.disabled}
                />
            )}
        </Form.Item>
    )
}
export default InputComponent;