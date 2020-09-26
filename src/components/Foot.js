import React from "react";
import { Typography, Space } from "antd"
import { Link } from "react-router-dom";
import { PieChartOutlined, AreaChartOutlined, FundOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Footer = (props) => {

  return (
    <div className="footer-box flex-wrap flex-middle flex-direction-column" style={{ width: "100%" }}>
      <Title style={{ textAlign: 'center', padding: 20 }} level={4}>What we have is more than you expected</Title>
      <div className="flex-wrap flex-middle" style={{ padding: 20 }}>
        <Space size={100}>
          <div className='text-center'>
            <PieChartOutlined style={{ fontSize: 50 }} />
            <div>
              icon1
            </div>
          </div>
          <div className='text-center'>
            <AreaChartOutlined style={{ fontSize: 50 }} />
            <div>
              icon2
            </div>
          </div>
          <div className='text-center'>
            <FundOutlined style={{ fontSize: 50 }} />
            <div>
              icon3
            </div>
          </div>


        </Space>
      </div>
      <div className='footer-bottom' style={{ background: 'rgb(214, 216, 218)', padding: '50px 50px 10px' }}>
        <Title style={{ textAlign: 'center' }} level={2}>Bringing Game to Everyone Life</Title>
        <div className='flex-wrap flex-between' style={{ marginTop: 40 }}>
          <div className='footer-left'>
            <Space size="middle">
              <span>
                <Link to="/">
                  Home
              </Link>
              </span>
              <span>
                <Link to="/Market">
                  Market
              </Link>
              </span>
              <span>
                <Link to="/myAccount">
                  My account
              </Link>
              </span>
              <span>
                <Link to="/contact">
                  contact
              </Link>
              </span>
            </Space>

          </div>
          <div className='footer-right'>
            Follow us
          </div>
        </div>
      </div>
    </div>
  );
}


export default Footer