const Quiz = {
    questions: [],
    currentIndex: 0,
    answers: {},

    init() {
        this.questions = this._shuffle([...QUESTIONS]);
        this.currentIndex = 0;
        this.answers = {};
    },

    getCurrentQuestion() {
        if (this.currentIndex >= this.questions.length) return null;
        return this.questions[this.currentIndex];
    },

    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.questions.length,
            percentage: Math.round(((this.currentIndex + 1) / this.questions.length) * 100)
        };
    },

    setAnswer(questionId, scoreIndex) {
        this.answers[questionId] = scoreIndex;
    },

    getAnswer(questionId) {
        return this.answers[questionId] !== undefined ? this.answers[questionId] : null;
    },

    next() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    },

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    },

    isComplete() {
        return Object.keys(this.answers).length === this.questions.length;
    },

    calculateResult() {
        const dimensions = {
            EI: { scoreA: 0, scoreB: 0 },
            SN: { scoreA: 0, scoreB: 0 },
            TF: { scoreA: 0, scoreB: 0 },
            JP: { scoreA: 0, scoreB: 0 }
        };

        for (const q of this.questions) {
            const answer = this.answers[q.id];
            if (answer === null || answer === undefined) continue;

            dimensions[q.dimension].scoreA += SCORE_VALUES_A[answer];
            dimensions[q.dimension].scoreB += SCORE_VALUES_B[answer];
        }

        const results = {};
        for (const [dim, scores] of Object.entries(dimensions)) {
            const total = scores.scoreA + scores.scoreB;
            const pctA = total > 0 ? Math.round((scores.scoreA / total) * 100) : 50;
            const pctB = total > 0 ? Math.round((scores.scoreB / total) * 100) : 50;

            results[dim] = {
                ...scores,
                total,
                pctA,
                pctB,
                letter: scores.scoreA > scores.scoreB ? DIMENSION_NAMES[dim].leftShort : DIMENSION_NAMES[dim].rightShort
            };
        }

        const mbti = results.EI.letter + results.SN.letter + results.TF.letter + results.JP.letter;
        const personality = PERSONALITY_MAP[mbti];

        return {
            mbti,
            typeName: MBTI_TYPE_NAMES[mbti],
            drink: personality.drink,
            person: personality.person,
            emoji: personality.emoji,
            description: PERSONALITY_DESCRIPTIONS[mbti],
            dimensions: results
        };
    },

    _shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
};