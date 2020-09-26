import React from "react";
import { Row, Col, Divider } from 'antd';
import Box from './box'

const style = { background: '#fff', padding: '8px 0', textAlign: 'center', height: 100 };


const ProductList = (props) => {

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div className="flex-wrap flex-center flex-middle" style={style}>Product pic</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="flex-wrap flex-center flex-middle" style={style}>Product pic</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="flex-wrap flex-center flex-middle" style={style}>Product pic</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="flex-wrap flex-center flex-middle" style={style}>Product pic</div>
      </Col>
    </Row>
  );
}


export default ProductList