import React from 'react';
import {
    Form,
    InputNumber
} from 'antd';

function InputNumberComp(props) {
    return (
        <Form.Item
            label={props.label}
            text={props.text!=="" ? `${props.text}` : null}
            className= {props.class!=="" ? `${props.class}` : null}
            //style={{ width: '50%' }}
            >
            {props.decorator(`${props.id}`, {
                rules: [{ required: true, message: 'Debe completar este campo' }],
                initialValue: props.initialValue === undefined ? null : `${props.initialValue}`
            })(
                <InputNumber /> 
            )}
            <span className="ant-form-text"> {props.text}</span>
        </Form.Item>
    )
}
export default InputNumberComp;