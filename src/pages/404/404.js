import React from "react";
import { Result, Button } from "antd"
import { withRouter } from "react-router-dom";

const Page404 = (props) => {
    return (
        <Result
            status="403"
            title="需要重新登陆"
            subTitle="抱歉，刷新后无法保存进度 请返回主页重新登录"
            extra={<Button type="primary" onClick={() => props.history.push('/')}>返回主页</Button>}
        />
    )
}

export default withRouter(Page404)