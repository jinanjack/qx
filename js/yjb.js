/*

# 用户信息
APP  https://app-api.yangjibao.com/account
WX   https://wx.yangjibao.com/wxapi/account

# VIP
APP  https://app-api.yangjibao.com/vip_info

# 加cang榜单APP&WX
WX   https://wx.yangjibao.com/wxapi/fund_buy_ranking

# 减cang
WX   https://wx.yangjibao.com/wxapi/fund_sell_ranking

# 持有
APP  https://app-api.yangjibao.com/fund_hold_ranking
WX   https://wx.yangjibao.com/wxapi/fund_hold_ranking

# 飙升榜APP&WX
https://wx.yangjibao.com/wxapi/fund_holdup_ranking

# 切换源APP&WX
APP  https://app-api.yangjibao.com/fund_gz_source
WX   https://wx.yangjibao.com/fund_gz_source

====================================
[rewrite_local]
# 万1开户
^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)app_config$ url reject-dict

# 开户推广
^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)scroll_list$ url reject-dict

# 会员页下部
^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)vip_information\?page=\d$ url reject-200

# 首页广告
^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)unify_ad$ url reject-dict

^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)(account|vip_info|fund_(hold(|up)|buy|sell)_ranking|fund_gz_source) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/yjb.js

[mitm]
hostname = *.yangjibao.com
====================================
 */

var body = $response.body;
var url = $request.url;

if (url.indexOf('/account') != -1 || url.indexOf('/vip_info') != -1) {
	let obj = JSON.parse(body);
	//obj.data.subscribe_status = 1;
	obj.data.vip_label = true;
	obj.data.is_pay = true;
	obj.data.vip_expiry_date = '2088-08-08';
	body = JSON.stringify(obj);
}

if (url.indexOf('_ranking') != -1) {
	let obj = JSON.parse(body);
	obj.data.vip_label = true;
	body = JSON.stringify(obj);
}

//不可用
if (url.indexOf('/fund_gz_source') != -1) {
	body = '{"code":200,"message":"SUCCESS","timestamp":1660536270,"data":{"source":1,"list":[1,2,3]}}';
}

$done({body});
