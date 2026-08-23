/* 卡拉彼丘 (Calabiyau / Strinova) — roster 26SP4
   Character names, awaken II/III, weapons, gadgets from biliwiki + parent 26SP4 lock.
   Do not invent names. */
window.KPQ_DATA = {
  version: "26SP4",
  asOf: "2026-08-23",
  sources: [
    "https://wiki.biligame.com/klbq/角色筛选",
    "https://wiki.biligame.com/klbq/武器筛选",
    "https://wiki.biligame.com/klbq/角色阵营",
    "https://zh.moegirl.org.cn/卡拉彼丘",
    "https://strinova.org/wiki/Characters"
  ],
  notes: {
    sides: "剪刀手=进攻-only，欧泊=防守-only，乌尔比诺=双方。晶源体不入爆破选人。",
    gadgets: "标准战术道具9种；雪球为季节/活动道具，未列入。",
    uncertain: []
  },
  characters: [
    { id:"michele", name:"米雪儿", side:"defender", faction:"欧泊", primary:"警探", awaken2:"猫咪守护", awaken3:"猫咪羁绊", portrait:"assets/portraits/michele.png" },
    { id:"xin", name:"信", side:"defender", faction:"欧泊", primary:"审判官", awaken2:"曝影之眼", awaken3:"脉冲跃迁", portrait:"assets/portraits/xin.png" },
    { id:"xinxia", name:"心夏", side:"defender", faction:"欧泊", primary:"空境", awaken2:"群甲复苏", awaken3:"守护卫戍", portrait:"assets/portraits/xinxia.png" },
    { id:"yvette", name:"伊薇特", side:"defender", faction:"欧泊", primary:"幻霜", awaken2:"熊熊打雪仗", awaken3:"熊熊护卫", portrait:"assets/portraits/yvette.png" },
    { id:"flavia", name:"芙拉薇娅", side:"defender", faction:"欧泊", primary:"独舞", awaken2:"幻蝶乍现", awaken3:"化甲幻蝶", portrait:"assets/portraits/flavia.png" },
    { id:"youwu", name:"忧雾", side:"defender", faction:"欧泊", primary:"绝对执行", awaken2:"腐毒蔓延", awaken3:"重雾毒烟", portrait:"assets/portraits/youwu.png" },
    { id:"leona", name:"蕾欧娜", side:"defender", faction:"欧泊", primary:"校准仪", awaken2:"连结固垒", awaken3:"棱爆回震", portrait:"assets/portraits/leona.png" },
    { id:"chiyo", name:"千代", side:"defender", faction:"欧泊", primary:"枫鸣", awaken2:"裂华残响", awaken3:"绽华陷阱", portrait:"assets/portraits/chiyo.png" },

    { id:"ming", name:"明", side:"attacker", faction:"剪刀手", primary:"逆焰", awaken2:"破甲吸收", awaken3:"雷电充能", portrait:"assets/portraits/ming.png" },
    { id:"lawine", name:"拉薇", side:"attacker", faction:"剪刀手", primary:"影袭", awaken2:"捕影牢笼", awaken3:"脉冲回响", portrait:"assets/portraits/lawine.png" },
    { id:"meredith", name:"梅瑞狄斯", side:"attacker", faction:"剪刀手", primary:"隼", awaken2:"护体沙暴", awaken3:"飞沙走石", portrait:"assets/portraits/meredith.png" },
    { id:"ling", name:"令", side:"attacker", faction:"剪刀手", primary:"破晓", awaken2:"审判光幕", awaken3:"近光漫散", portrait:"assets/portraits/ling.png" },
    { id:"kanami", name:"香奈美", side:"attacker", faction:"剪刀手", primary:"谢幕曲", awaken2:"震撼律动", awaken3:"旋律鼓舞", portrait:"assets/portraits/kanami.png" },
    { id:"eika", name:"艾卡", side:"attacker", faction:"剪刀手", primary:"鸣火", awaken2:"热焰袭卷", awaken3:"复原之焰", portrait:"assets/portraits/eika.png" },
    { id:"fragrans", name:"珐格兰丝", side:"attacker", faction:"剪刀手", primary:"绽放", awaken2:"复合香调", awaken3:"衔芳持香", portrait:"assets/portraits/fragrans.png" },
    { id:"mara", name:"玛拉", side:"attacker", faction:"剪刀手", primary:"夜镰", awaken2:"扼魂锁魄", awaken3:"传魂溢灵", portrait:"assets/portraits/mara.png" },
    { id:"nono", name:"诺诺", side:"attacker", faction:"剪刀手", primary:"雨晦", awaken2:"弦能余烬", awaken3:"全视之眼", portrait:"assets/portraits/nono.png" },

    { id:"audrey", name:"奥黛丽", side:"both", faction:"乌尔比诺", primary:"卫冕", awaken2:"自动机枪", awaken3:"无限火力", portrait:"assets/portraits/audrey.png" },
    { id:"maddelena", name:"玛德蕾娜", side:"both", faction:"乌尔比诺", primary:"彩绘", awaken2:"颜料封锁", awaken3:"阻碍泡泡", portrait:"assets/portraits/maddelena.png" },
    { id:"fuchsia", name:"绯莎", side:"both", faction:"乌尔比诺", primary:"齿锋", awaken2:"魔鲨再临", awaken3:"追猎恐惧", portrait:"assets/portraits/fuchsia.png" },
    { id:"xinghui", name:"星绘", side:"both", faction:"乌尔比诺", primary:"北极星", awaken2:"闪耀星光", awaken3:"星能强注", portrait:"assets/portraits/xinghui.png" },
    { id:"baimo", name:"白墨", side:"both", faction:"乌尔比诺", primary:"自由意志", awaken2:"彩墨冲锋！", awaken3:"戏敌无影！", portrait:"assets/portraits/baimo.png" },
    { id:"galatea", name:"加拉蒂亚", side:"both", faction:"乌尔比诺", primary:"欺诈师", awaken2:"瞬闪隐迹", awaken3:"王车易位", portrait:"assets/portraits/galatea.png" },
    { id:"xi", name:"汐", side:"both", faction:"乌尔比诺", primary:"潮音", awaken2:"舍御破阵", awaken3:"盾心合一", portrait:"assets/portraits/xi.png" }
  ],
  secondaries: [
    { id:"xuexiao", name:"雪鸮", icon:"assets/icons/xuexiao.svg" },
    { id:"zhongyan", name:"重焰", icon:"assets/icons/zhongyan.svg" },
    { id:"fenyan", name:"焚焰者", icon:"assets/icons/fenyan.svg" },
    { id:"xiaomifeng", name:"小蜜蜂", icon:"assets/icons/xiaomifeng.svg" }
  ],
  melees: [
    { id:"ninjato", name:"忍锋", icon:"assets/icons/ninjato.svg" },
    { id:"zhankian", name:"战镰", icon:"assets/icons/zhankian.svg" },
    { id:"dajian", name:"大剑", icon:"assets/icons/dajian.svg" }
  ],
  gadgets: [
    { id:"fengchang", name:"风场雷", icon:"assets/icons/fengchang.svg" },
    { id:"fangdan", name:"防弹屏障", icon:"assets/icons/fangdan.svg" },
    { id:"shan", name:"闪光弹", icon:"assets/icons/shan.svg" },
    { id:"jingbao", name:"警报器", icon:"assets/icons/jingbao.svg" },
    { id:"popa", name:"手雷", icon:"assets/icons/popa.svg" },
    { id:"yanwu", name:"烟雾弹", icon:"assets/icons/yanwu.svg" },
    { id:"zhiliao", name:"治疗雷", icon:"assets/icons/zhiliao.svg" },
    { id:"lanjie", name:"拦截者", icon:"assets/icons/lanjie.svg" },
    { id:"jiansu", name:"减速雷", icon:"assets/icons/jiansu.svg" }
  ]
};
