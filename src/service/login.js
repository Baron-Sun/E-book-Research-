import request from '../utils/request'

//请求逻辑实例化

const Login = {

    post: (params = {}) => {
        let { username, password } = params
        let data = request.post(`/_api2/user/login?id=9&password=${password}&userType=1&username=${username}`, params)
            .then((response) => {
                return response
            })
        return data
    }
}

export default Login