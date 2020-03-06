import React from 'react';
import {
    Form,
    Input
} from 'antd';

function InputComponent(props) {
    return (
        <Form.Item
            label={props.label}
            className= {props.class!=="" ? `${props.class}` : null}
            >
            {props.decorator(`${props.name}`, {
                rules: [{ required: true, message: 'Debe completar este campo' }],
            })(
                <Input
                />
            )}
        </Form.Item>
    )
}
export default InputComponent;