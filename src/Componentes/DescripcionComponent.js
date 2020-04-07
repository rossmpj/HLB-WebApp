import React from 'react';
import {
    Form,
    Input
} from 'antd';

const { TextArea } = Input;

function DescripcionComponent(props) {
    return (
        <Form.Item
            label={props.label}
            className= {props.class!=="" ? `${props.class}` : null}
            >
            {props.decorator(`${props.id}`, {
                rules: [{ required: false }],
                initialValue: props.initialValue === undefined ? null : `${props.initialValue}`,
            })(
                <TextArea />
            )}
        </Form.Item>
    )
}
export default DescripcionComponent;