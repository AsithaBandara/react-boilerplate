import axios from 'axios';

export default {
    otp: {
        requestOTP: payload =>
            axios.post(`/admin/sendOTP`, { ...payload }).then(res => res.data),
        verifyOtp: payload =>
            axios.post(`/admin/otpValidation`, { ...payload }).then(res => res.data),
    },
};
