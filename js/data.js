const PERSONALITY_MAP = {
    ISTJ: { drink: '果粒橙', person: '凌波丽', emoji: '🧃' },
    ESTJ: { drink: '冰红茶', person: '牢大（科比）', emoji: '🍵' },
    ISFP: { drink: '劲凉冰红茶', person: '梅西', emoji: '🧊' },
    ENTP: { drink: '无糖百事可乐', person: '孙笑川', emoji: '🥤' },
    ENFP: { drink: '日本生可乐', person: '冬雪莲', emoji: '🇯🇵' },
    INFP: { drink: '蜜桃乌龙', person: '丁真', emoji: '🍑' },
    ESFP: { drink: '水蜜桃', person: '永雏塔菲', emoji: '🍑' },
    ESTP: { drink: '雪碧', person: '张雪峰', emoji: '🥤' },
    ESFJ: { drink: '西瓜美年达', person: '郝哥', emoji: '🍉' },
    ENTJ: { drink: '统一冰红茶', person: 'C罗', emoji: '🍵' },
    INTJ: { drink: '无糖冰红茶', person: '霍金', emoji: '☕' },
    ISTP: { drink: '黑胡椒牛肉面', person: '电棍', emoji: '🍜' },
    INTP: { drink: '百岁山', person: 'L', emoji: '💧' },
    ENFJ: { drink: '热带冰红茶', person: '谷爱凌', emoji: '🌴' },
    ISFJ: { drink: '南北绿豆', person: '哈基米', emoji: '🫘' },
    INFJ: { drink: '百事可乐', person: '嘎子', emoji: '🥤' }
};

const PERSONALITY_DESCRIPTIONS = {
    ISTJ: '安静、服从、按指令行事，符合绫波丽作为EVA驾驶员的秩序感。',
    ESTJ: '极度自律、好胜心强，典型的实干型领袖。',
    ISFP: '内向、谦逊，用行动和艺术般的球技说话。',
    ENTP: '抽象整活、反应快、嘴炮犀利，充满争议的"点子王"。',
    ENFP: '活泼搞怪，自由奔放，充满感染力的虚拟偶像。',
    INFP: '纯真、理想化，眼神清澈，自带一种与世无争的气质。',
    ESFP: '擅长整活、互动性强，天然的女主播型表演人格。',
    ESTP: '反应迅速、语言犀利，敢于打破常规的实用主义者。',
    ESFJ: '热情好客、注重分享，典型的豪爽大哥形象。',
    ENTJ: '目标明确、极度自律，天生的球场领袖与征服者。',
    INTJ: '深邃的战略思维，以智慧构想宇宙的伟大头脑。',
    ISTP: '前职业选手的技术流，冷静分析中带点抽象操作的实干派。',
    INTP: '理性至上的天才侦探，沉浸于推理解谜的逻辑世界。',
    ENFJ: '阳光自信、感染力强，用热情激励他人的青年榜样。',
    ISFJ: '可爱、治愈且默默陪伴，给人满满安全感（猫设不倒）。',
    INFJ: '内心保留着淳朴与某种"正义感"，却在现实中上演种种戏剧性梗。'
};

const MBTI_TYPE_NAMES = {
    ISTJ: '物流师',
    ESTJ: '总经理',
    ISFP: '探险家',
    ENTP: '辩论家',
    ENFP: '竞选者',
    INFP: '调停者',
    ESFP: '表演者',
    ESTP: '企业家',
    ESFJ: '执政官',
    ENTJ: '指挥官',
    INTJ: '建筑师',
    ISTP: '鉴赏家',
    INTP: '逻辑学家',
    ENFJ: '主人公',
    ISFJ: '守卫者',
    INFJ: '提倡者'
};

const DIMENSION_NAMES = {
    EI: { left: '外向 (E)', right: '内向 (I)', leftShort: 'E', rightShort: 'I' },
    SN: { left: '实感 (S)', right: '直觉 (N)', leftShort: 'S', rightShort: 'N' },
    TF: { left: '思维 (T)', right: '情感 (F)', leftShort: 'T', rightShort: 'F' },
    JP: { left: '判断 (J)', right: '感知 (P)', leftShort: 'J', rightShort: 'P' }
};

const QUESTIONS = [
    {
        id: 1, dimension: 'EI',
        text: '漫展上看到一位神还原的凌波丽coser，你会：',
        optionA: '主动冲上去问："可以集邮吗？太还原了！"',
        optionB: '不敢上前，给亲友发消息表达激动心情。'
    },
    {
        id: 2, dimension: 'EI',
        text: '群里开始狂刷"牢大"梗图，你更倾向于：',
        optionA: '跟上队形发"孩子们，这并不好笑"然后刷屏。',
        optionB: '潜水围观，默默保存所有新表情包。'
    },
    {
        id: 3, dimension: 'EI',
        text: '张雪峰老师开"高考·考研选择大于努力"线下讲座，你：',
        optionA: '必到现场，甚至想举手提问。',
        optionB: '等录播，拖进度条看完就行。'
    },
    {
        id: 4, dimension: 'EI',
        text: '刚学会一个孙笑川的抽象新活，你会：',
        optionA: '立刻在群里发语音"你吼那么大声干什么嘛"。',
        optionB: '先自己打磨，争取合适时机时一鸣惊人。'
    },
    {
        id: 5, dimension: 'EI',
        text: '冬雪莲直播说"你骂谁罕见！"，你更可能：',
        optionA: '狂刷弹幕"罕见"跟风应援。',
        optionB: '静音观看，偶尔送个礼物但从不说话。'
    },
    {
        id: 6, dimension: 'EI',
        text: '被哈基米的魔性视频洗脑，你会：',
        optionA: '外放公放，拉着朋友一起"哈基米哈基米"。',
        optionB: '戴上耳机，独自扭动身体享受。'
    },
    {
        id: 7, dimension: 'EI',
        text: 'C罗来你的城市参加活动，你：',
        optionA: '挤到前排，和他一起做出标志性"Siuuu"庆祝。',
        optionB: '找个远处天台，用望远镜默默观察。'
    },
    {
        id: 8, dimension: 'EI',
        text: '朋友津津乐道"潘嘎之交"，你：',
        optionA: '立刻接梗："这里水太深，你把握不住"开始角色扮演。',
        optionB: '微笑点头，看他们表演就好。'
    },
    {
        id: 9, dimension: 'SN',
        text: '喝下第一口名贵红茶，你最先想到：',
        optionA: '嗯，和普通红茶比，涩度和回甘有点不一样。',
        optionB: '思考这杯红茶中蕴含的哲理。'
    },
    {
        id: 10, dimension: 'SN',
        text: '丁真那张出圈照片，最吸引你的是：',
        optionA: '他戴着的藏式耳坠和健康黝黑的肤色。',
        optionB: '那种未经雕琢的、野性与纯真交织的眼神。'
    },
    {
        id: 11, dimension: 'SN',
        text: '电棍倾情演唱《浮夸》时，你注意到：',
        optionA: '独特的音调和魔性的节奏感。',
        optionB: '音乐背后对抽象生活的情绪宣泄。'
    },
    {
        id: 12, dimension: 'SN',
        text: '永雏塔菲说"塔菲不知道喵~"，你的重点在：',
        optionA: '她歪头杀的动作和语气上扬的尾音。',
        optionB: '这种"不清楚"反而构成了完美的虚拟角色设定。'
    },
    {
        id: 13, dimension: 'SN',
        text: '看到L蹲坐在椅子上吃甜点，你最先关注：',
        optionA: '他竟然光脚、只吃甜点，这生活习惯太怪了。',
        optionB: '他脑中一定在飞速运转，构建宏大的推理篇章。'
    },
    {
        id: 14, dimension: 'SN',
        text: '品尝果汁时，你倾向于：',
        optionA: '评价果味是否天然，回味如何。',
        optionB: '仿佛看见农民在果园中精心打理果树。'
    },
    {
        id: 15, dimension: 'SN',
        text: '梅西的"给你俩窝窝"梗，你觉得妙在：',
        optionA: '阿根廷口音骂人时的喜感发音和魔性口型。',
        optionB: '这是低调天才用一种很新的幽默回击的艺术。'
    },
    {
        id: 16, dimension: 'SN',
        text: '看到谷爱凌的广告，你第一反应：',
        optionA: '这个广告色调很阳光，谷爱凌的造型很好看。',
        optionB: '感受到一股"人人都能成为冠军"的澎湃能量。'
    },
    {
        id: 17, dimension: 'TF',
        text: '有人严肃批判"牢大"梗是对逝者不敬，你的反应：',
        optionA: '理性分析：梗的本质是解构，并没有恶意。',
        optionB: '理解这种不适，自己以后会注意不去冒犯。'
    },
    {
        id: 18, dimension: 'TF',
        text: '孙笑川因为嘴臭被全网攻击，你的看法：',
        optionA: '玩抽象就要承担反噬，这很合理。',
        optionB: '看他众叛亲离，其实也觉得有点可怜。'
    },
    {
        id: 19, dimension: 'TF',
        text: '电棍"说的道理"被疯狂鬼畜，你：',
        optionA: '仔细分析调音和卡点技术，考虑自己能不能复刻。',
        optionB: '只觉得电棍好可爱，循环看了一整天。'
    },
    {
        id: 20, dimension: 'TF',
        text: '世界杯决赛C罗替补落泪，你更偏向：',
        optionA: '分析教练的换人时机和战术失误在哪。',
        optionB: '为他的不甘心和英雄迟暮感到心酸。'
    },
    {
        id: 21, dimension: 'TF',
        text: '郝哥切开一个西瓜给你分享，你最先关心：',
        optionA: '这瓜保熟吗？到底有多甜，值不值这个价。',
        optionB: '郝哥真热情，感觉像自家大哥一样亲切。'
    },
    {
        id: 22, dimension: 'TF',
        text: '凌波丽为保护真嗣选择自爆，你觉得最震撼的是：',
        optionA: '作为EVA驾驶员，她以最高效率完成了终极任务。',
        optionB: '一个没有感情的人偶学会了爱，并为此牺牲。'
    },
    {
        id: 23, dimension: 'TF',
        text: '有人嘲笑冬雪莲的"塑料日语"，你会：',
        optionA: '客观判断：发音确实不标准，但努力值得肯定。',
        optionB: '替她委屈，觉得嘲笑她的人太过刻薄。'
    },
    {
        id: 24, dimension: 'TF',
        text: '嘎子在直播间眼眶泛红谈及争议，你的第一反应：',
        optionA: '思考这会不会是新的带货剧本。',
        optionB: '感觉他压力山大，有点想安慰他。'
    },
    {
        id: 25, dimension: 'JP',
        text: '你计划周末重温有凌波丽的《EVA》集数，你会：',
        optionA: '提前排好观看顺序：TV版到旧剧场版一气呵成。',
        optionB: '看心情，打开哪集看哪集，也可能先刷解说视频。'
    },
    {
        id: 26, dimension: 'JP',
        text: '想要收集齐感兴趣的多款联名徽章，你的做法是：',
        optionA: '列出清单，规划好便利店路线，一次性扫齐。',
        optionB: '随缘购买，今天碰见一款，明天偶遇另一款。'
    },
    {
        id: 27, dimension: 'JP',
        text: '面对梅西和C罗的生涯成就对比，你的态度更接近：',
        optionA: '综合数据和荣誉，总能得出一个相对客观的结论。',
        optionB: '两人都是GOAT，享受绝代双骄的过程，无需分出高下。'
    },
    {
        id: 28, dimension: 'JP',
        text: '准备做一个"丁真×谷爱凌"的二创视频，你会：',
        optionA: '写好分镜脚本，定好发布日程。',
        optionB: '灵感来了疯狂爆肝，没灵感就无限期鸽置。'
    },
    {
        id: 29, dimension: 'JP',
        text: '你整理电脑里"梗图"文件夹，习惯是：',
        optionA: '严格按"抽象区、萌宠区、体育区"等子文件夹归类。',
        optionB: '全塞在一个文件夹，找图全靠缩略图大海捞针。'
    },
    {
        id: 30, dimension: 'JP',
        text: '玩开放世界游戏，你更偏向：',
        optionA: '按攻略清空地图上的所有问号和每日任务。',
        optionB: '主线是什么？我要去那座看起来最高的山上看看。'
    },
    {
        id: 31, dimension: 'JP',
        text: '写一篇"霍金 vs L 智力对决"的论证小作文，你：',
        optionA: '先列提纲，分"智力、谋略、历史地位"三大项展开。',
        optionB: '打开文档就直接写，想到哪写到哪，最后再理顺。'
    },
    {
        id: 32, dimension: 'JP',
        text: '永雏塔菲临时把直播改到清早，你：',
        optionA: '立刻改闹钟，添加到手机日程提醒。',
        optionB: '醒了就看，睡过了就等录播切片。'
    }
];

const SCORE_LABELS = ['很同意A', '有些同意A', '略微同意A', '中立', '略微同意B', '有些同意B', '很同意B'];
const SCORE_VALUES_A = [3, 2, 1, 0, 0, 0, 0];
const SCORE_VALUES_B = [0, 0, 0, 0, 1, 2, 3];