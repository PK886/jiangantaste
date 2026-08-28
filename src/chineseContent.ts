import type {Location} from './data';

type ItemText = {
  name: string;
  highlights: string[];
  note: string;
};

const locationText: Record<string, Pick<Location, 'name' | 'shortName' | 'description'>> = {
  'recommended-restaurants-in-chengdu': {
    name: '成都推荐餐厅',
    shortName: '成都推荐',
    description: '精选成都值得一去的餐厅，涵盖川味特色、日料、火锅和适合聚餐的好店。',
  },
  'small-southwest-gate': {
    name: '小西南门',
    shortName: '小西南门',
    description: '校园街边美食最热闹的一站，夜市感强，选择多，适合想吃点香辣小吃的时候。',
  },
  'canteen-xiyuan': {
    name: '西园食堂',
    shortName: '西园',
    description: '西园区域包含多个食堂和餐饮点，价格实惠、分量扎实，适合日常吃饭。',
  },
  'canteen-dongyuan': {
    name: 'SCUPI 周边外卖',
    shortName: '外卖',
    description: 'SCUPI 周边便捷外卖合集，从饮品、早餐面包到饭类、面类、寿司和饺子都有。',
  },
  'canteen-scupi': {
    name: '匹兹堡学院食堂',
    shortName: '匹兹堡食堂',
    description: '离 SCUPI 很近的校园食堂，方便、便宜，适合课间快速解决一餐。',
  },
  'around-scupi': {
    name: 'SCUPI 周边',
    shortName: '周边',
    description: '散落在匹兹堡学院附近的实用小店，适合想换换口味的时候。',
  },
};

const itemText: Record<string, ItemText> = {
  'chengdu-bin-sushi': {
    name: '滨寿司',
    highlights: ['人均 80 元', '日料连锁', '三文鱼新鲜'],
    note: '性价比不错的日料连锁，食材新鲜，套餐稳定，三文鱼尤其值得点。',
  },
  'chengdu-wanshijia': {
    name: '万食家韩式料理',
    highlights: ['人均 38 元', '韩式料理', '炸物口感好'],
    note: '很稳的韩式小店，尤其适合想吃炸物的时候。味道轻松、下饭，也适合和朋友一起分着吃。',
  },
  'chengdu-yuehuayin': {
    name: '悦华吟和牛自助',
    highlights: ['人均 150 元', '和牛自助', '寿司、烤串和鳗鱼'],
    note: '适合想吃丰盛一点的时候，和牛、寿司、烤串、鹅肝寿司和鳗鱼都有，聚餐或庆祝比较合适。',
  },
  'chengdu-xiaolongkan-hotpot': {
    name: '小龙坎火锅',
    highlights: ['人均 70-90 元', '成都火锅', '知名连锁'],
    note: '经典川味火锅，氛围热闹，味道辨识度高。想体验成都火锅又不想踩雷时可以选它。',
  },
  'chengdu-yongjiang-seafood-casserole': {
    name: '甬江烟火海鲜煲',
    highlights: ['人均 70-90 元', '海鲜煲', '鲜香暖胃'],
    note: '海鲜煲味道温暖扎实，食材比较新鲜，想吃浓郁但不想吃火锅时很合适。',
  },
  'chengdu-dadalong-sushi-canteen': {
    name: '大大龙寿司食堂',
    highlights: ['人均 70-90 元', '寿司与小食', '靠近 CY Park'],
    note: '靠近 CY Park 的寿司和小食店，周边适合散步，适合轻松吃一顿再逛一逛。',
  },
  'swg-baiduren': {
    name: '摆渡人泰式小馆',
    highlights: ['人均 70 元', '泰式料理', '环境舒服'],
    note: '环境比较精致的泰式餐厅，口味鲜明，适合想吃得舒服一点的时候。',
  },
  'swg-fuyou-bistro': {
    name: '福佑小馆',
    highlights: ['人均 45 元', '中式料理', '摆盘好看'],
    note: '一家有氛围感的中式餐厅，菜品呈现比较漂亮，价格也还算友好。',
  },
  'swg-mangesuo': {
    name: '蛮格索',
    highlights: ['人均 40 元', '新疆风味', '椒麻鸡突出'],
    note: '新疆风味很有记忆点，椒麻鸡是招牌，味道鲜明，值得专门去试。',
  },
  'swg-1': {
    name: '藤椒抄手',
    highlights: ['人均 12 元', '麻辣清爽', '本地小吃'],
    note: '经典本地小吃，藤椒的麻香很突出，入口清爽又带劲。',
  },
  'swg-2': {
    name: '奇味干锅',
    highlights: ['人均 35 元', '分量足', '性价比高'],
    note: '分量很足，整体性价比不错，不过口味偏咸，油也稍微重一点。',
  },
  'swg-3': {
    name: '剪刀土豆',
    highlights: ['人均 10 元', '外脆里软', '经典街边小吃'],
    note: '小西南门必试小吃之一，土豆炸得外脆里软，简单但很香。',
  },
  'swg-4': {
    name: '蚝蛋烧',
    highlights: ['人均 10 元', '蚝肉鲜香', '蛋香浓'],
    note: '咸香热乎的小吃，海鲜的鲜味和鸡蛋的香味组合得很好，适合快速垫一口。',
  },
  'swg-5': {
    name: '锅包肉',
    highlights: ['人均 10 元', '酸甜口', '口感酥脆'],
    note: '酸甜味比较正，外层酥脆，不过一份可能不太够吃饱。',
  },
  'swg-6': {
    name: '南昌拌粉',
    highlights: ['人均 10 元', '配料丰富', '酱香浓'],
    note: '花生和酱料给得比较足，味道不错，虽然不一定完全正宗，但作为校园小吃很顺口。',
  },
  'swg-7': {
    name: '烤面筋',
    highlights: ['人均 8 元', '有嚼劲', '辣酱偏重'],
    note: '标准款烤面筋，口感有嚼劲。默认辣酱会刷得比较多，不太能吃辣可以提前说。',
  },
  'swg-8': {
    name: '牛杂煲',
    highlights: ['人均 20 元', '热乎管饱', '调味偏温和'],
    note: '外卖版味道比堂食弱一些，调味偏淡，但热乎、管饱。',
  },
  'swg-9': {
    name: '炒饭/炒粉',
    highlights: ['人均 15 元', '锅气足', '适合吃饱'],
    note: '闻起来很香，味道也不错。肉量不算多，但一份基本能吃饱。',
  },
  'swg-11': {
    name: '冰粉',
    highlights: ['人均 8 元', '配料丰富', '清凉解辣'],
    note: '虽然不算最有名那家，但味道仍然不错，配料给得很大方，夏天或吃辣后很舒服。',
  },
  'swg-13': {
    name: '肉夹馍',
    highlights: ['人均 10 元', '肉量很足', '强烈推荐'],
    note: '很推荐，肉给得特别满，一口下去很满足，价格也合理。',
  },
  'swg-14': {
    name: '北村炸鸡',
    highlights: ['人均 30 元', '韩式饭类', '奶油火鸡面'],
    note: '小西南门附近很好吃的韩式选择，拌饭和奶油火鸡面都很浓郁，比较容易推荐。',
  },
  'swg-15': {
    name: '四蛋炒饭',
    highlights: ['人均 20 元', '蛋香明显', '简单管饱'],
    note: '很扎实的炒饭选择，蛋香足，不花哨但便宜、管饱，适合快速吃一餐。',
  },
  'xiyuan-first-dining-hall': {
    name: '西园一餐',
    highlights: ['人均 15-30 元', '米粉与套餐', 'Biangbiang 面'],
    note: '菜单适合日常校园餐：米粉、小炒、拌饭、Biangbiang 面、轻食和套餐都有。Biangbiang 面比较有特色，其余主打方便和管饱。',
  },
  'xiyuan-second-dining-hall': {
    name: '西园二餐',
    highlights: ['人均 15-30 元', '东北菜与粤式菜', '冒菜和卤味'],
    note: '选择很多，包括东北菜、粤式饭、土豆泥饭、冬阴功米线、自选小炒、泡面、轻食、冒菜和卤味。适合想要多选择的时候。',
  },
  'xiyuan-food-plaza': {
    name: '西园美食广场',
    highlights: ['人均 12-30 元', '韩式拌饭', '现煮粥粉面'],
    note: '二楼美食广场适合快速吃饭，泡面、韩式拌饭、拌粉和现煮粥粉面都有。韩式拌饭大约 12 元，蔬菜和鸡蛋都比较新鲜。',
  },
  'xiyuan-jiangyuan-restaurant': {
    name: '江源餐厅',
    highlights: ['人均 15-30 元', '面食', '米线和冒菜'],
    note: '主打细面、米线和冒菜这类热乎简餐。味道不算特别惊艳，但方便、快，适合想吃饱的时候。',
  },
  'xiyuan-xinyuan-restaurant': {
    name: '馨园餐厅',
    highlights: ['人均 20-30 元', '点菜和自选菜', '适合多人吃'],
    note: '既有点菜也有自选菜，可能是西园食堂里味道比较好的一处。价格略高一些，但适合朋友一起吃。',
  },
  'xiyuan-chuanyun-canteen': {
    name: '川云食堂',
    highlights: ['人均 15-30 元', '韩式盖饭', '炒饭炒面'],
    note: '主打韩式盖饭、炒饭、面类和其他主食，适合日常吃，便宜管饱但不算特别出彩。',
  },
  'takeout-mstand': {
    name: 'M Stand 咖啡',
    highlights: ['人均 20 元', '甜口饮品', '甜品感咖啡'],
    note: '味道不错但偏甜，更像一杯甜品咖啡。适合想喝浓郁饮品的时候。',
  },
  'takeout-cantonese-roast-goose': {
    name: '广式烧鹅饭',
    highlights: ['人均 20 元', '招牌烧鸭', '性价比不错'],
    note: '比较标准的烧鸭饭，味道和分量都还可以，是 SCUPI 附近较实用的外卖选择。',
  },
  'takeout-salmon-craft-studio': {
    name: '福得嘎三文鱼工坊',
    highlights: ['人均 50 元', '三文鱼新鲜', '包装精致'],
    note: '包装比较好看，三文鱼也新鲜。比普通校园餐贵一些，但想吃清爽一点时值得试。',
  },
  'takeout-peach-bond-manor': {
    name: '桃园日料',
    highlights: ['人均 40 元', '日式料理', '鹅肝炒饭'],
    note: '鹅肝铁板炒饭香味足，吃起来满足，不过底部可能略咸、略油。',
  },
  'takeout-wiki-burger': {
    name: 'WIKI Burger',
    highlights: ['人均 25 元', '盖饭', '牛肉和鸡腿排'],
    note: '牛肉饼很香，鸡腿排也嫩，茄子酱和炸土豆丝拌饭增加了口感。',
  },
  'takeout-hula-noodle': {
    name: '呼啦面馆',
    highlights: ['人均 20 元', '重庆小面', '豌杂面'],
    note: '豌杂面味道浓，豌豆泥能中和辣肉酱，整体很香、很有饱腹感。',
  },
  'takeout-yuen-kee-dumpling': {
    name: '袁记云饺',
    highlights: ['人均 25 元', '饺子', '红油抄手'],
    note: '稳定的快餐选择，饺子和抄手都方便。红油款香味明显，口感也不错。',
  },
  'takeout-yxiix': {
    name: 'yxiix 面包',
    highlights: ['人均 30 元', '早餐面包', '早八友好'],
    note: '面包比食堂早餐更精致一点，简单、管饱，适合上课前买。',
  },
  'takeout-huanshi': {
    name: '环食轻食',
    highlights: ['人均 30 元', '轻食', '健康管饱'],
    note: '相对清爽健康的外卖选择，想吃得不那么油但又需要能量时很适合。',
  },
  'scupi-environment': {
    name: '就餐区',
    highlights: ['人均 15-20 元', '位置方便', '座位宽敞'],
    note: '就餐区干净明亮，离上课地点近。食物不算惊艳，但胜在方便。',
  },
  'scupi-stir-fry-window': {
    name: '小炒窗口',
    highlights: ['人均 15-20 元', '适合配米饭', '出餐快'],
    note: '最适合快速午餐的窗口。味道普通但便宜、能吃饱，也方便按自己口味搭配。',
  },
  'scupi-stewed-dishes-window': {
    name: '炖菜窗口',
    highlights: ['人均 15-20 元', '热菜', '家常简餐'],
    note: '炖菜热乎，适合配米饭。味道比较温和，不惊艳但实用。',
  },
  'scupi-cold-dishes-window': {
    name: '凉菜窗口',
    highlights: ['人均 15-20 元', '清爽选择', '配菜方便'],
    note: '想吃清爽一点或临时加个小菜时可以选，调味直接，主打方便。',
  },
  'scupi-breakfast-window': {
    name: '早餐窗口',
    highlights: ['人均 15-20 元', '早餐主食', '赶课方便'],
    note: '适合早课前快速解决早餐，选择简单、便宜，虽然不精致但够用。',
  },
  'as-1': {
    name: '白家甄子饭',
    highlights: ['人均 25 元', '现炒热菜', '招牌肉豆花'],
    note: '在西门外，炒肉很香，肉豆花也有特色，整体性价比不错。',
  },
  'as-2': {
    name: '毛姐子肥肠粉',
    highlights: ['人均 24 元', '麻辣鲜香', '粉条有嚼劲'],
    note: '很受欢迎的一家，汤底鲜辣，粉条吸满味道，吃起来很满足。',
  },
  'as-3': {
    name: '热干面味道',
    highlights: ['人均 16 元', '快速简餐', '西门位置'],
    note: '位置方便，但面和做法不算特别正宗，整体味道一般。',
  },
  'as-4': {
    name: '烤清江鱼',
    highlights: ['人均 35 元', '刺少', '焦香明显'],
    note: '很推荐，鱼肉嫩，外层有焦香，刺也不多，价格不算高。',
  },
  'as-5': {
    name: '鸡兔干锅',
    highlights: ['人均 35 元', '香辣酥脆', '适合聚餐'],
    note: '很稳的干锅选择，肉类调味足，配菜也入味，值得试。',
  },
  'as-6': {
    name: '猪蹄烧鸭双拼饭',
    highlights: ['人均 17 元', '猪蹄软糯', '适合一人食'],
    note: '亮点是有三到四种自助蔬菜可以无限加，搭配主食很实用。',
  },
  'as-7': {
    name: '15 元小炒',
    highlights: ['人均 30-40 元', '15 元自助管饱', '现炒热菜'],
    note: 'SCUPI 周边很推荐的一家，15 元自助能吃饱，也能点现炒菜，味道和性价比都不错。',
  },
  'as-8': {
    name: '兄弟厨房',
    highlights: ['人均 30-40 元', '川菜', '日常聚餐友好'],
    note: 'SCUPI 附近比较稳的川菜小店，味道热闹，适合想吃得比食堂更有滋味的时候。',
  },
};

export function applyChineseContent(locations: Record<string, Location>) {
  Object.entries(locationText).forEach(([id, text]) => {
    if (locations[id]) {
      Object.assign(locations[id], text);
    }
  });

  Object.values(locations).forEach((location) => {
    location.items.forEach((item) => {
      const text = itemText[item.id];
      if (text) {
        Object.assign(item, text);
      }
    });
  });
}
