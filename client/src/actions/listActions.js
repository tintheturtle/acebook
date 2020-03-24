import axios from 'axios'

export const getUsers = (userData) => {
    axios
        .get('/api/users/list', userData)
        .then(res => {
                return res
            }
        )
        .catch(err => {
            console.log('did not go through')
            console.log(err)
        })
}