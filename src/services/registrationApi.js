import axios from 'axios';

export default {
    users: {
        getRegisteredUsers: payload =>
            axios
                .get(`/sessions/${payload.id}/all`, {
                    headers: {
                        Authorization: sessionStorage.getItem('token'),
                    },
                })
                .then(res => res.data),
    },
};
