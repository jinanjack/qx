/*

# 用户信息
/account

# VIP
/vip_info

# 加cang榜单
/fund_buy_ranking

# 减cang
/fund_sell_ranking

# 持有
/fund_hold_ranking

# 飙升榜
/fund_holdup_ranking

# 切换源
/fund_gz_source

# 会员页下部
/vip_information?page=1

====================================
[rewrite_local]
# 会员_万1开户
^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)app_config$ url reject-dict

# 我的_开户推广
^https?:\/\/(app-api|wx)\.yangjibao\.com\/(|wxapi\/)scroll_list$ url reject-dict

# 持有_顶部广告
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

//会员页下部信息 [vip_info 包含 vip_information]
if (url.indexOf('/vip_information') != -1) {
	let obj = JSON.parse(body);
	obj.data.list = [];
	body = JSON.stringify(obj);
}
//不可用
if (url.indexOf('/fund_gz_source') != -1) {
	body = '{"code":200,"message":"SUCCESS","timestamp":1660536270,"data":{"source":1,"list":[1,2,3]}}';
}

$done({body});
