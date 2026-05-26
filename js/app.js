const App = {
    init() {
        this.bindEvents();
        if (Auth.isLoggedIn()) {
            this.showHomePage();
        } else {
            this.showAuthPage();
        }
    },

    bindEvents() {
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuth();
        });

        document.getElementById('switch-auth').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAuthMode();
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            Auth.logout();
            this.showAuthPage();
        });

        document.getElementById('start-quiz-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            Quiz.prev();
            this.renderQuiz();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            const current = Quiz.getCurrentQuestion();
            if (!current) return;
            const answer = Quiz.getAnswer(current.id);
            if (answer === null || answer === undefined) {
                this.showToast('请先选择一个选项');
                return;
            }
            if (Quiz.currentIndex >= Quiz.questions.length - 1) {
                this.submitQuiz();
            } else {
                Quiz.next();
                this.renderQuiz();
            }
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('home-btn').addEventListener('click', () => {
            this.showHomePage();
        });

        document.querySelectorAll('.score-option').forEach(opt => {
            opt.addEventListener('click', function () {
                const question = Quiz.getCurrentQuestion();
                if (!question) return;
                const scoreIndex = parseInt(this.dataset.score);
                Quiz.setAnswer(question.id, scoreIndex);
                document.querySelectorAll('.score-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    },

    toggleAuthMode() {
        const form = document.getElementById('auth-form');
        const title = document.getElementById('auth-title');
        const submitBtn = document.getElementById('auth-submit');
        const switchDiv = document.getElementById('switch-auth');
        const confirmGroup = document.getElementById('confirm-group');

        if (form.dataset.mode === 'login') {
            title.textContent = '注册账号';
            submitBtn.textContent = '注册';
            switchDiv.innerHTML = '已有账号？<a href="#">点此登录</a>';
            confirmGroup.style.display = 'block';
            form.dataset.mode = 'register';
        } else {
            title.textContent = '登录账号';
            submitBtn.textContent = '登录';
            switchDiv.innerHTML = '没有账号？<a href="#">点此注册</a>';
            confirmGroup.style.display = 'none';
            form.dataset.mode = 'login';
        }
    },

    handleAuth() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const form = document.getElementById('auth-form');
        const mode = form.dataset.mode || 'login';

        if (mode === 'register') {
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                this.showToast('两次输入的密码不一致');
                return;
            }
            const result = Auth.register(username, password);
            this.showToast(result.message);
            if (result.success) {
                form.reset();
                this.toggleAuthMode();
            }
        } else {
            const result = Auth.login(username, password);
            if (result.success) {
                this.showHomePage();
            } else {
                this.showToast(result.message);
            }
        }
    },

    showAuthPage() {
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById('auth-page').classList.remove('hidden');

        const form = document.getElementById('auth-form');
        form.reset();
        form.dataset.mode = 'login';
        document.getElementById('auth-title').textContent = '登录账号';
        document.getElementById('auth-submit').textContent = '登录';
        document.getElementById('switch-auth').innerHTML = '没有账号？<a href="#">点此注册</a>';
        document.getElementById('confirm-group').style.display = 'none';
    },

    showHomePage() {
        const user = Auth.getCurrentUser();
        if (!user) {
            this.showAuthPage();
            return;
        }

        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById('home-page').classList.remove('hidden');
        document.getElementById('user-display').textContent = user.username;

        const history = Auth.getTestHistory();
        const historyContainer = document.getElementById('history-list');
        if (history.length > 0) {
            historyContainer.innerHTML = history.slice().reverse().map(h => `
                <div class="history-item">
                    <span class="history-date">${new Date(h.date).toLocaleDateString('zh-CN')}</span>
                    <span class="history-type">${h.mbti} - ${MBTI_TYPE_NAMES[h.mbti]}</span>
                    <span class="history-drink">${h.drink} - ${h.person}</span>
                </div>
            `).join('');
        } else {
            historyContainer.innerHTML = '<p class="no-history">暂无测试记录，快来测一测吧！</p>';
        }
    },

    startQuiz() {
        Quiz.init();
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById('quiz-page').classList.remove('hidden');
        this.renderQuiz();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderQuiz() {
        const question = Quiz.getCurrentQuestion();
        if (!question) return;

        const progress = Quiz.getProgress();
        const answer = Quiz.getAnswer(question.id);
        const dimNames = { EI: '外向/内向', SN: '实感/直觉', TF: '思维/情感', JP: '判断/感知' };

        document.getElementById('dimension-badge').textContent = dimNames[question.dimension] || '';
        document.getElementById('question-text').textContent = `第 ${progress.current} 题 / 共 ${progress.total} 题`;
        document.getElementById('question-content').textContent = question.text;
        document.getElementById('option-a-text').textContent = question.optionA;
        document.getElementById('option-b-text').textContent = question.optionB;
        document.getElementById('progress-fill').style.width = progress.percentage + '%';

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.style.visibility = Quiz.currentIndex === 0 ? 'hidden' : 'visible';
        nextBtn.innerHTML = Quiz.currentIndex >= Quiz.questions.length - 1 ? '提交结果 ✨' : '下一题 →';

        const scoreOptions = document.querySelectorAll('.score-option');
        scoreOptions.forEach(opt => {
            opt.classList.remove('selected');
            if (parseInt(opt.dataset.score) === answer) {
                opt.classList.add('selected');
            }
        });
    },

    submitQuiz() {
        if (!Quiz.isComplete()) {
            this.showToast('请完成所有题目后再提交');
            return;
        }

        const result = Quiz.calculateResult();
        Auth.saveTestResult(result);
        this.showResultPage(result);
    },

    showResultPage(result) {
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById('result-page').classList.remove('hidden');

        document.getElementById('result-emoji').textContent = result.emoji;
        document.getElementById('result-drink').textContent = result.drink;
        document.getElementById('result-person').textContent = result.person;
        document.getElementById('result-mbti').textContent = `${result.mbti} - ${result.typeName}`;
        document.getElementById('result-description').textContent = result.description;

        const dimensions = ['EI', 'SN', 'TF', 'JP'];
        const barsContainer = document.getElementById('dimension-bars');
        barsContainer.innerHTML = dimensions.map(dim => {
            const d = result.dimensions[dim];
            const name = DIMENSION_NAMES[dim];
            return `
                <div class="dimension-bar-group">
                    <div class="dimension-labels">
                        <span class="dim-label dim-label-left">${name.left}</span>
                        <span class="dim-label dim-label-right">${name.right}</span>
                    </div>
                    <div class="dimension-bar-track">
                        <div class="dimension-bar-fill left-fill" style="width: ${d.pctA}%">
                            <span class="dim-pct">${d.pctA}%</span>
                        </div>
                        <div class="dimension-bar-fill right-fill" style="width: ${d.pctB}%">
                            <span class="dim-pct">${d.pctB}%</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        setTimeout(() => {
            document.getElementById('result-page').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});