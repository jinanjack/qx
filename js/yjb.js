/*
hostname =  app-api.yangjibao.com , wx.yangjibao.com

# 用户信息
# APP  https://app-api.yangjibao.com/account
# WX   https://wx.yangjibao.com/wxapi/account

# VIP
# APP  https://app-api.yangjibao.com/vip_info

# 加仓榜单APP&WX
# WX   https://wx.yangjibao.com/wxapi/fund_buy_ranking

# 减仓
# WX   https://wx.yangjibao.com/wxapi/fund_sell_ranking

# 持有
# APP  https://app-api.yangjibao.com/fund_hold_ranking
# WX   https://wx.yangjibao.com/wxapi/fund_hold_ranking

# 飙升榜APP&WX
#   https://wx.yangjibao.com/wxapi/fund_holdup_ranking

# 切换源APP&WX
# APP  https://app-api.yangjibao.com/fund_gz_source
# WX   https://wx.yangjibao.com/fund_gz_source


#最完美最全的正则匹配，将来有可能出现的也包含了
#^https:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)(account|vip_info|fund_(hold(|up)|buy|sell)_ranking|fund_gz_source)

^https:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)(account|vip_info|fund_(hold(|up)|buy|sell)_ranking|fund_gz_source) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/yjb.js

*/


var body = $response.body;
var url = $request.url;

const account = "/account"; //账户
const vip_info = "/vip_info"; //VIP
//const wx_account = "/wxapi/account";//WX_账户

//懒得一个个精确匹配，直接匹配_ranking
//const rank1 = "/fund_buy_ranking";//加仓榜单
//const rank2 = "/wxapi/fund_holdup_ranking";//飙升榜

const gz_source = "/fund_gz_source";//切换源,貌似不可用

if (url.indexOf(account) != -1||url.indexOf(vip_info) != -1){
  let obj = JSON.parse(body);
      //obj.data.subscribe_status = 1;
      obj.data.vip_label = true;
      obj.data.is_pay = true;
      obj.data.vip_expiry_date = "2088-08-08";
  body = JSON.stringify(obj);
}

if (url.indexOf('_ranking') != -1) {
    let obj = JSON.parse(body);
        obj.data.vip_label = true;
    body = JSON.stringify(obj);
}

if (url.indexOf(gz_source) != -1) {
    body = `{"code":200,"message":"SUCCESS","timestamp":1660536270,"data":{"source":1,"list":[1,2,3]}}`;
}

$done({body});
