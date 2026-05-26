const Auth = {
    STORAGE_KEY: 'mbti_users',
    CURRENT_USER_KEY: 'mbti_current_user',

    getUsers() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },

    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    register(username, password) {
        if (!username || !password) {
            return { success: false, message: '用户名和密码不能为空' };
        }
        if (username.length < 2 || username.length > 20) {
            return { success: false, message: '用户名长度需在2-20个字符之间' };
        }
        if (password.length < 4) {
            return { success: false, message: '密码长度不能少于4位' };
        }

        const users = this.getUsers();
        if (users[username]) {
            return { success: false, message: '该用户名已被注册' };
        }

        users[username] = {
            password: this._hashPassword(password),
            createdAt: new Date().toISOString(),
            testHistory: []
        };

        this.saveUsers(users);
        return { success: true, message: '注册成功！请登录' };
    },

    login(username, password) {
        if (!username || !password) {
            return { success: false, message: '请输入用户名和密码' };
        }

        const users = this.getUsers();
        const user = users[username];

        if (!user) {
            return { success: false, message: '用户不存在' };
        }

        if (user.password !== this._hashPassword(password)) {
            return { success: false, message: '密码错误' };
        }

        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify({
            username,
            loginTime: new Date().toISOString()
        }));

        return { success: true, message: '登录成功！', username };
    },

    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    },

    getCurrentUser() {
        const data = localStorage.getItem(this.CURRENT_USER_KEY);
        return data ? JSON.parse(data) : null;
    },

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    saveTestResult(result) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;

        const users = this.getUsers();
        if (!users[currentUser.username]) return;

        users[currentUser.username].testHistory.push({
            date: new Date().toISOString(),
            mbti: result.mbti,
            drink: result.drink,
            person: result.person,
            dimensions: result.dimensions
        });

        if (users[currentUser.username].testHistory.length > 20) {
            users[currentUser.username].testHistory = users[currentUser.username].testHistory.slice(-20);
        }

        this.saveUsers(users);
    },

    getTestHistory() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return [];

        const users = this.getUsers();
        if (!users[currentUser.username]) return [];

        return users[currentUser.username].testHistory || [];
    },

    _hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'mbti_' + Math.abs(hash).toString(36);
    }
};