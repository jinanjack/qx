/*
hostname =  *.yangjibao.com
^https:\/\/(app-api|wx)\.yangjibao\.com\/(account|vip_info|fund_hold_ranking|wxapi\/(account|fund_holdup_ranking)) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/yjb.js
*/

var body = $response.body;
var url = $request.url;

const account = "/account"; //用户信息
const vip_info = "/vip_info"; //用户信息
const wx_account = "/wxapi/account";//用户信息

const rank1 = "/fund_buy_ranking";//加仓榜单
const rank2 = "/wxapi/fund_holdup_ranking";//飙升榜
const gz_source = "/fund_gz_source";//切换源

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

var body_1 = $request.body;
if (url.indexOf(gz_source) != -1) {
    let obj = JSON.parse(body_1);
    var source = obj.data_source;
    var obj1 = {"code":200,"message":"SUCCESS","timestamp":1660536270,"data":{"source":source,"list":[1,2,3]}};
    body = JSON.stringify(obj1);
    
}

$done({body});
