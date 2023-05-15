/*
hostname =  *.yangjibao.com

# 不带切换源
^https:\/\/(app-api|wx)\.yangjibao\.com\/(account|vip_info|fund_hold_ranking|wxapi\/(account|fund_holdup_ranking)) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/yjb.js

# 带切换源
^https:\/\/(app-api|wx)\.yangjibao\.com\/(account|vip_info|fund_hold_ranking|fund_gz_source|wxapi\/(account|fund_holdup_ranking)) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/yjb.js
*/

var body = $response.body;
var url = $request.url;

const account = "/account"; //账户
const vip_info = "/vip_info"; //VIP
const wx_account = "/wxapi/account";//WX_账户

const rank1 = "/fund_buy_ranking";//加仓榜单
const rank2 = "/wxapi/fund_holdup_ranking";//飙升榜

const gz_source = "/fund_gz_source";//切换源,貌似不可用

if (url.indexOf(account) != -1||url.indexOf(vip_info) != -1||url.indexOf(wx_account) != -1){
  let obj = JSON.parse(body);
      //obj.data.subscribe_status = 1;
      obj.data.vip_label = true;
      obj.data.is_pay = true;
      obj.data.vip_expiry_date = "2088-08-08";
  body = JSON.stringify(obj);
}

if (url.indexOf(rank1) != -1||url.indexOf(rank2) != -1) {
    let obj = JSON.parse(body);
        obj.data.vip_label = true;
    body = JSON.stringify(obj);
}

if (url.indexOf(gz_source) != -1) {
    body = `{"code":200,"message":"SUCCESS","timestamp":1660536270,"data":{"source":1,"list":[1,2,3]}}`;
}

$done({body});
