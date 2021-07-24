import axios from 'axios';

export default {
    users: {
        getRegisteredUsers: payload =>
            axios
                .get(`/getRegisterCitizen?mobileNumber=${payload}`)
                .then(res => res.data),
    },
    centers: {
        getCenters: () =>
            axios
                .get(`/getCentersList`)
                .then(res => res.data),
    },
    sessions: {
        submit: payload =>
            axios
                .post(
                    `/sessions`,
                    {
                        ...payload,
                    })
                .then(res => res.data),
        update: payload =>
            axios
                .put(
                    `/sessions/${payload.id}`,
                    {
                        ...payload,
                    })
                .then(res => res.data),
        delete: payload =>
            axios
                .delete(
                    `/sessions/${payload.id}`,

                    {
                        headers: {
                            Authorization: sessionStorage.getItem('token'),
                        },
                        data: {
                            ...payload,
                        },
                    }
                )
                .then(res => res.data),
        getAll: payload =>
            axios
                .get('/sessions/allList')
               // .get('/sessions/all?page=3&pageSize=5')
                .then(res => res.data),
    },
};
