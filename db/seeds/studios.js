'use strict';
const datas = require('./seed_data');
const knex = require('../knex');

exports.seed = function (knex, Promise) {
  return Promise.join(
    knex.table('studios').insert(
      {
        active: true,
        name: "Rostart邏思起子",
        created_at: new Date(),
        updated_at: new Date(),
        description: "我們是一群熱血的年輕人，充滿著對這個世界的奇思妙想。現在我們成立『邏思起子』，希望把我們對生活中覺得有趣、酷炫的idea一點一滴的實現出來。如同一個簡單的羅賴把配上螺絲釘可以組裝起一間夢想城堡。在這個夢想空間中 我們想與玩家一起分享我們的創意、快樂與感動。因為你們的快樂就是我們的快樂。",
        slug: "rostart",
        links: {
          website: "http://rostart0720.wixsite.com/rostart",
          facebook: "https://www.facebook.com/RoStarT.Game/"
        }
      }
    ),
    knex.table('studios').insert(
      {
        active: true,
        name: "4funBase創意基地",
        created_at: new Date(),
        updated_at: new Date(),
        description: "2014年初，四個熱愛體驗生活，腦子裡總是充滿各種稀奇古怪點子的同窗好友創立了4funBase。不為了什麼，單純地希望能在人人低頭滑手機的現在，創造出更多「有溫度」真實互動的可能。\n秉持著4funBase的成立宗旨:「Fun for you！ 帶給玩家歡樂的基地！」，2014年4月底，首款實境遊戲【奪寶令】正式上市，推出甫兩個月就已有近千人爭相來挑戰。「緊張刺激、超好玩、鬥智鬥力、超多驚喜....」體驗後的玩家一句句的好評都不斷地激勵著我們精益求精，也再再證明我們的理念和方向是正確的。\n未來4funBase將不改初衷，專注於打造更多高品質的新型態娛樂，不論是實境或桌上遊戲、為企業團體量身訂做的活動、甚至可能是大型的戶外型體驗，都會是我們努力的方向。期盼4funBase帶給大家的不只是歡樂，更是最完美的生活體驗。",
        slug: "4funbase",
        links: {
          website: "https://4funbase.wixsite.com/realgame",
          facebook: "https://www.facebook.com/4funbase/"
        }
      }
    )
  );
};
