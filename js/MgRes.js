/* 
# > 芒果vip

# https://mobile.api.mgtv.com/v7/playlist/list
# https://mobile.api.mgtv.com/v1/video/album
# https://mobile.api.mgtv.com/v8/video/relative
# https://mobile.api.mgtv.com/v9/video/list
# ^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header http://192.168.2.170:8080/MgHeader.js

# https://mobile.api.mgtv.com/v8/video/getSource
# VIP https://nuc.api.mgtv.com/GetUserInfo
# 我的 https://me.bz.mgtv.com/v3/module/list
# ^https?:\/\/.*mgtv\.com\/(v\d+\/(video\/getSource|module\/list)|GetUserInfo) url script-response-body http://192.168.2.170:8080/MgRes.js


====================================
[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/wf021325/qx/master/js/MgHeader.js
^https?:\/\/.*mgtv\.com\/(v\d+\/(video\/getSource|module\/list)|GetUserInfo) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/MgRes.js
&src\=mgtv&suuid\=.*&testversion\=&ticket\=[A-Z0-9]{32} url 302 &src=mgtv&testversion=&ticket=84122092810F360BA056B85869F9F51A
^https?:\/\/nuc\.api\.mgtv.com\/Logout url reject-dict
^https?:\/\/pcvideoyd\.titan\.mgtv\.com\/pb\/ url reject-dict
^https?:\/\/mob\.bz\.mgtv\.com\/odin\/c1\/channel\/ads\?_ url reject-dict
^https?:\/\/mobile\.da\.mgtv\.com\/json\/app\/bdboot url reject-dict

# 【小芒】
^https?:\/\/mobile\.api\.mgtv\.com\/mobile\/config\?_support url reject-dict

# 底部会员LOGO叠加ICON
^https?:\/\/mob\.bz\.mgtv\.com\/odin\/c1\/skin\/config url reject-dict

# 文件太大了，屏蔽暂未发现副作用https://dc.bz.mgtv.com/dynamic/v1/dsl/list/10101001/0/5/0?
# ^https?:\/\/dc\.bz\.mgtv\.com\/dynamic\/v1\/dsl\/list\/ url reject-dict

#加入会员 跳过广告https://vip.bz.mgtv.com/client/dynamic_entry
^https?:\/\/vip\.bz\.mgtv\.com\/client\/dynamic_entry url reject-dict

#我的积分 余额 5 https://credits.bz.mgtv.com/credits/url
^https?:\/\/credits\.bz\.mgtv\.com\/credits\/url url reject-dict


[mitm] 
hostname = *.mgtv.com
====================================
 */
var body = $response.body;
var url = $request.url;

//https://mobile.api.mgtv.com/v8/video/getSource
url.includes('/v8/video/getSource') && (body = body.replace(/"text":"[^"]+/g, "\"text\": \"尊敬的SVIP会员,您正在观看SVIP尊享内容").replace(/尊敬的V\d会员/g, "尊敬的SVIP会员"));

var obj = JSON.parse(body);

//VIP https://nuc.api.mgtv.com/GetUserInfo
if (url.includes('/GetUserInfo')) {
    //obj.data.nickname = "";
	obj.data.isVip = 1;
    obj.data.vipExpiretime = 324938345490000;
    obj.data.vipinfo.isvip = 1;
    obj.data.vipinfo.vip_end_time = "2088-08-08 00:00:00";
    obj.data.vipinfo.type = "2";
    obj.data.vipinfo.growth.level = 9;
    body = JSON.stringify(obj);
}

//我的 https://me.bz.mgtv.com/v3/module/list
//1=顶部模块  2=用户信息模块 3=推荐位模块 4=追剧助手  5=大芒计划/我的小芒  6=banner图模块  7=我的服务  8=运营商专区/兴趣中心/推荐功能
if (url.includes('/module/list')) {
    var obj = JSON.parse(body);
    obj.data.list = obj.data.list.filter(item => item.id == 1 || item.id == 2 || item.id == 4 || item.id == 5 || item.id == 7);
    body = JSON.stringify(obj);
}

$done({body});
