document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

function setupEventListeners() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            btn.innerHTML = 'Signing in...';
            const res = await auth.login(
                document.getElementById('login-username').value,
                document.getElementById('login-password').value
            );
            btn.innerHTML = 'Sign In';
            if (res.token) checkAuth();
            else alert(res.message || 'Login failed');
        });
    }

    const regForm = document.getElementById('register-form');
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const res = await auth.register(
                document.getElementById('reg-username').value,
                document.getElementById('reg-password').value
            );
            alert(res.message || 'Action completed');
            if (!res.error) showView('login-view');
        });
    }

    document.getElementById('global-search')?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterContent(query);
    });
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('register-view').classList.add('hidden');
        document.getElementById('dashboard-layout').classList.remove('hidden');

        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');
        document.getElementById('user-info').innerHTML = `Logged as <strong>${username}</strong> (${role})`;

        if (role === 'Admin') document.getElementById('admin-links').classList.remove('hidden');
        handleNav('home');
    } else {
        showView('login-view');
    }
}

function showView(viewId) {
    ['login-view', 'register-view', 'dashboard-layout'].forEach(v => {
        document.getElementById(v).classList.add('hidden');
    });
    document.getElementById(viewId).classList.remove('hidden');
}

function handleNav(view) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    // Set active link visually (logic could be better but simplified)

    const content = document.getElementById('content-area');
    const title = document.getElementById('view-title');
    content.innerHTML = '<div class="glass-card">Loading...</div>';

    switch (view) {
        case 'home':
            title.textContent = 'Dashboard Overview';
            renderHome();
            break;
        case 'stores':
            title.textContent = 'Partner Stores';
            renderStores();
            break;
        case 'parts':
            title.textContent = 'NHTSA Public Catalog';
            renderParts();
            break;
        case 'categories':
            title.textContent = 'Manage Categories';
            renderAdminTable('categories');
            break;
        case 'users':
            title.textContent = 'User Management';
            renderAdminTable('users');
            break;
    }
}

async function renderHome() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="grid-auto">
            <div class="glass-card" style="background: linear-gradient(135deg,rgba(59,130,246,0.2), transparent);">
                <h3>Welcome to Roomparts</h3>
                <p style="margin-top:1rem; color:var(--text-dim);">Seamlessly connecting local store inventory with international public catalogs.</p>
            </div>
            <div class="glass-card" onclick="handleNav('parts')" style="cursor:pointer">
                <h1 id="count-parts">...</h1>
                <p>Public Manufacturers Found</p>
            </div>
        </div>
    `;
    const data = await api.request('/spareparts');
    document.getElementById('count-parts').textContent = data.length || 0;
}

async function renderParts() {
    const data = await api.request('/spareparts');
    const content = document.getElementById('content-area');
    content.innerHTML = `<div class="grid-auto">${data.map(p => `
        <div class="glass-card animate-in">
            <span style="font-size: 0.7rem; color:var(--primary); font-weight:bold; text-transform:uppercase;">${p.brand}</span>
            <h3 style="margin: 0.5rem 0;">${p.name}</h3>
            <div class="flex-between" style="border-top:1px solid var(--border); padding-top:1rem; margin-top:1rem;">
                <span style="font-weight:700; color:var(--accent);">Rp ${p.price.toLocaleString()}</span>
                <span style="font-size:0.8rem; color:var(--text-dim);">${p.stock} units</span>
            </div>
        </div>
    `).join('')}</div>`;
}

async function renderStores() {
    const data = await api.request('/stores');
    const content = document.getElementById('content-area');
    content.innerHTML = `<div class="grid-auto">${data.map(s => `
        <div class="glass-card">
            <h3>${s.name}</h3>
            <p style="color:var(--text-dim); margin-top:0.5rem; font-size:0.9rem;">📍 ${s.address}</p>
            <p style="color:var(--text-dim); font-size:0.9rem;">📞 ${s.phone}</p>
        </div>
    `).join('')}</div>`;
}

async function renderAdminTable(type) {
    const data = await api.request(`/${type}`);
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="glass-card">
            <table style="width:100%; text-align:left; border-collapse:collapse;">
                <thead style="color:var(--text-dim); font-size:0.8rem; text-transform:uppercase;">
                    <tr>${Object.keys(data[0] || { name: '' }).map(k => `<th style="padding:1rem;">${k}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr style="border-top:1px solid var(--border);">
                            ${Object.values(row).map(v => `<td style="padding:1rem;">${v}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}
