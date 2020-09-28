import request from '../utils/request'

//请求逻辑实例化

const Logout = {

    post: (params = {}) => {
        // let { username, password } = params
        let data = request.post(`/_api2/user/logout`)
            .then((response) => {
                return response
            })
        return data
    }
}

export default Logout