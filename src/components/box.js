import React from "react";
import { Typography } from "antd"
const { Title } = Typography;

const BoxComponent = (props) => {

    return (
        <>
            <div className='box-header flex-wrap flex-between'>
                <Title style={{ textAlign: 'center', padding: 20 }} level={props.titleLevel}>{props.title}</Title>
                <div className="flex-wrap flex-center">
                    {props.detail}
                </div>
            </div>
            <div style={{ padding: '0 20px 0 40px' }} >{props.children}</div>
        </>
    );
}


export default BoxComponent