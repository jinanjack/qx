/* 
# 来源 https://github.com/RuCu6/QuanX/blob/main/Rewrites/Cube/smzdm.snippet
#!name = 什么值得买
#!desc = 适用 10.4.25 及以下版本
#!author = RuCu6 blackmatrix7
#!update = 2023-02-15 13:15

# 开屏去广告
^https:\/\/app-api\.smzdm\.com\/util\/loading url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

# 百科去广告
^https:\/\/baike-api\.smzdm\.com\/home_v3\/list url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

# 好价去广告
^https:\/\/haojia-api\.smzdm\.com\/home\/list url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

# 好价详情页去广告,红包小助手,Wiki(618晒物活动推广，将来可能不是广告)
^https:\/\/haojia\.m\.smzdm\.com\/detail_modul\/(other|user_related|wiki_related)_modul url reject

# 好价详情页去广告
^https:\/\/haojia\.m\.smzdm\.com\/detail_modul\/article_releated_modul url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

# 首页去广告
^https:\/\/homepage-api\.smzdm\.com\/v3\/home url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

# 搜索标签去广告,搜索结果去广告
^https:\/\/s-api\.smzdm\.com\/sou\/(filter\/tags\/hot_tags|list_v10) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

# 值会员权益中心banner广告
^https:\/\/zhiyou\.m\.smzdm\.com\/user\/vip\/ajax_get_banner url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/smzdm.js

hostname = app-api.smzdm.com, baike-api.smzdm.com, haojia-api.smzdm.com, haojia.m.smzdm.com, homepage-api.smzdm.com, s-api.smzdm.com, zhiyou.m.smzdm.com

 */


 
// 2023-02-11 22:30
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (obj.data) {
  // 什么值得买-开屏广告
  if (url.includes("app-api.smzdm.com/util/loading")) {
    obj.data.forEach((element) => {
      element.start_date = "2040-01-01 00:00:00";
      element.end_date = "2040-01-01 23:59:59";
      element.unix_start_date = "2208960000"; // 什么值得买 Unix 时间戳 2040-01-01 00:00:00
      element.unix_end_date = "2209046399"; // 什么值得买 Unix 时间戳 2040-01-01 23:59:59
      element.is_show_ad = "0";
    });
  } else if (url.includes("baike-api.smzdm.com/home_v3/list")) {
    // 什么值得买-百科广告
    obj.data.rows = obj.data.rows.filter(
      (element) =>
        !element.hasOwnProperty("ad_banner_id") || element.ad_banner_id === ""
    );
  } else if (url.includes("haojia-api.smzdm.com/home/list")) {
    // 什么值得买-好价广告
    let bigBanner = obj.data.banner.big_banner.filter(
      (element) => element.ad_banner_id === ""
    );
    obj.data.banner.big_banner = bigBanner;
    let rows = obj.data.rows.filter(
      (element) => !element.hasOwnProperty("ad_banner_id")
    );
    // 什么值得买 红包相关
    obj.data.banner.hongbao_banner = [];
    obj.data.banner.module_banner.hongbao = {};
    // 什么值得买 不显示皮肤
    // 什么值得买 obj.data.banner.skin = {};
    obj.data.rows = rows;
  } else if (url.includes("/detail_modul/article_releated_modul")) {
    // 什么值得买-好价详情页广告
    obj.data.lanmu_qikan = {};
  } else if (url.includes("homepage-api.smzdm.com/v3/home")) {
    // 什么值得买-首页广告
    let component = [];
    obj.data.component.forEach((element) => {
      if (element.zz_type === "banner") {
        let bannerList = element.zz_content.filter(
          (banner) => banner.tag !== "广告"
        );
        element.zz_content = bannerList;
        // 什么值得买 去除信息流中的广告
      } else if (element.zz_type === "list") {
        let contentList = element.zz_content.filter(
          (content) => content.zz_content.model_type !== "ads"
        );
        element.zz_content = contentList;
        // 什么值得买 去除首页背景颜色
      } else if (element.zz_type === "circular_banner") {
        element.zz_content.circular_banner_option.background = "1";
        element.zz_content.circular_banner_option.color_card = "#ffffff";
        element.zz_content.circular_banner_option.img = "";
      }
      // 什么值得买 最顶部的banner和红包不显示
      if (element.zz_type !== "top_banner" && element.zz_type !== "hongbao") {
        component.push(element);
      }
    });
    obj.data.component = component;
  } else if (url.includes("s-api.smzdm.com/sou/filter/tags/hot_tags")) {
    // 什么值得买-搜索标签广告
    obj.data.hongbao = {};
  } else if (url.includes("s-api.smzdm.com/sou/list_v10")) {
    // 什么值得买-搜索结果广告
    obj.data.rows = obj.data.rows.filter(
      (element) => element.article_tag !== "广告"
    );
  } else if (url.includes("/user/vip/ajax_get_banner")) {
    // 什么值得买-会员权益中心banner广告
    obj.data.big_banner = obj.data.big_banner.filter(
      (element) => element.logo_title !== "广告"
    );
  }
}

$done({ body: JSON.stringify(obj) });