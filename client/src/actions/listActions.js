import axios from 'axios'

export const getUsers = (userData) => {
    axios
        .get('/api/users/list', userData)
        .then(res => console.log(res))
        .catch(err => {
            console.log('did not go through')
            console.log(err)
    })
}