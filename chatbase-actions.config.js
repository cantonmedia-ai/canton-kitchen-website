// Edit this file when you want to change AI quick action labels or messages.
// Add unlimited new actions by copying one object and changing id, label, hint, and message.
window.CK_CHATBASE_ACTIONS = {
  default: [
    {
      id: "signature",
      label: "推荐菜品",
      hint: "第一次来这样问",
      message: "请推荐老招牌招牌菜"
    },
    {
      id: "soup",
      label: "今日炭火煲汤",
      hint: "了解今天汤品",
      message: "请介绍今天的炭火慢煲汤"
    },
    {
      id: "family",
      label: "家庭聚餐推荐",
      hint: "4位 RM300",
      message: "我们4位用餐，预算RM300，请推荐菜品"
    },
    {
      id: "event",
      label: "宴会预订",
      hint: "包厢 / 宴会厅",
      message: "我想了解宴会厅预订方案"
    },
    {
      id: "menu",
      label: "查看菜单",
      hint: "快速找菜",
      message: "请推荐适合第一次到访顾客的菜品"
    },
    {
      id: "baijiu",
      label: "白酒体验",
      hint: "舍得体验活动",
      message: "请介绍舍得白酒体验活动"
    },
    {
      id: "diyBirdnest",
      label: "DIY燕窝",
      hint: "Nourish7 配套",
      message: "请介绍现炖燕窝和DIY燕窝配套"
    }
  ],
  pages: {
    menu: [
      {
        id: "firstVisitMenu",
        label: "第一次到访推荐",
        hint: "不用自己慢慢选",
        message: "请推荐适合第一次到访顾客的菜品"
      },
      {
        id: "familyMenu",
        label: "家庭聚餐推荐",
        hint: "按人数预算配菜",
        message: "我们4位用餐，预算RM300，请推荐菜品"
      },
      {
        id: "kidsElder",
        label: "小孩长辈适合",
        hint: "少辣、好分享",
        message: "请推荐适合小孩和长辈的老招牌菜品，口味不要太辣"
      }
    ],
    nourish7: [
      {
        id: "nourishPackage",
        label: "现炖燕窝配套",
        hint: "瓶装 / 6瓶装",
        message: "请介绍现炖燕窝配套"
      },
      {
        id: "tasteHelp",
        label: "帮我选口味",
        hint: "按用途推荐",
        message: "我想选择Nourish7现炖燕窝口味，请根据年龄、用途和口味偏好帮我推荐"
      },
      {
        id: "diyBirdnest",
        label: "DIY燕窝",
        hint: "在家自己炖",
        message: "请介绍DIY燕窝配套"
      }
    ],
    paste: [
      {
        id: "pasteSelect",
        label: "选料理酱",
        hint: "鸡 / 鱼 / 海鲜",
        message: "我想了解老招牌出品料理酱，请根据我想煮的菜推荐"
      },
      {
        id: "pasteRecipe",
        label: "食谱灵感",
        hint: "怎样煮最好吃",
        message: "请推荐老招牌料理酱的家常食谱"
      }
    ],
    eventHall: [
      {
        id: "eventPlan",
        label: "宴会厅方案",
        hint: "包厢 / 聚餐 / 活动",
        message: "请介绍包厢与宴会厅方案"
      },
      {
        id: "eventBooking",
        label: "我要预订",
        hint: "人数日期安排",
        message: "我想了解宴会厅预订方案，请问需要提供什么资料？"
      }
    ],
    soup: [
      {
        id: "todaySoup",
        label: "今日炭火煲汤",
        hint: "口味与适合谁喝",
        message: "请介绍今天的炭火慢煲汤"
      }
    ],
    top10: [
      {
        id: "top10Recommend",
        label: "10大招牌推荐",
        hint: "第一次来必点",
        message: "请推荐老招牌10大招牌菜，适合第一次到访顾客"
      }
    ]
  }
};
