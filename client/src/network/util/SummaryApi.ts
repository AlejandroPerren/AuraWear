const backendDomain: string = import.meta.env.VITE_backendDomain || "http://localhost:8000/api/"


const summaryApi = {
    SignUp: {
        url: `${backendDomain}/auth/register`,
        method: 'post'
    },
    Login: {
        url: `${backendDomain}/auth/login`,
        method: 'post'
    },
}

export default summaryApi;