import axios from 'axios'

export const getUsers = () => {
    return axios
        .get('/api/users/list')
        .then(res => res.data)
        .catch(err => {
            console.log(err)
    })
}