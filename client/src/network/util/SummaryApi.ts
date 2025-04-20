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
    GetAllProducts: {
        url: `${backendDomain}/products`,
        method: 'get'
    },
    GetProductById: {
        url: `${backendDomain}/products`,
        method: 'get'
    },
    CreateProducts: {
        url: `${backendDomain}/products`,
        method: 'post'
    },
    UpdateProducts: {
        url: `${backendDomain}/products`,
        method: 'put'
    },
    DeleteProducts: {
        url: `${backendDomain}/products`,
        method: 'delete'
    },


}

export default summaryApi;