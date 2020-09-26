import React from "react";
import { connect } from "react-redux";
import { PageHeader } from "antd"
import MenuComponent from './Menu'

const Nav = (props) => {
  const { user = {} } = props;

  return (
    <PageHeader
      className="site-page-header"
      backIcon={false}
      title="Books View"
      extra={
        <MenuComponent />
      }
    >
    </PageHeader>
  );
}


export default connect(
  ({ authUser, users }) => ({
    user: users[authUser]
  })
)(Nav);