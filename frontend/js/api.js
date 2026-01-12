const API_URL = 'http://localhost:5000';

const api = {
    async request(endpoint, method = 'GET', body = null) {
        const token = localStorage.getItem('token');
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };
        if (body) options.body = JSON.stringify(body);

        try {
            const response = await fetch(`${API_URL}${endpoint}`, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return { error: true, message: errorData.message || `Error: ${response.status}` };
            }
            return response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            return { error: true, message: 'Could not connect to the server. Please ensure the backend is running.' };
        }
    }
};

const auth = {
    async login(username, password) {
        const res = await api.request('/auth/login', 'POST', { username, password });
        if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            localStorage.setItem('username', res.username);
        }
        return res;
    },
    async register(username, password) {
        return api.request('/auth/register', 'POST', { username, password });
    },
    logout() {
        localStorage.clear();
        window.location.reload();
    }
};
