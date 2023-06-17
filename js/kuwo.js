/* 
// @ScriptName        酷我音乐10.4.6、酷我音乐纯净版[ SVIP+净化 ]
//解决酷我发热问题，在本地添加下面的分流或者关闭广告终结者Anti分流
//host-suffix, kuwo.cn, direct

[mtim]
hostname = *.kuwo.cn, *.lrts.me


[rewrite_local]
# > 酷我音乐_通用广告请求
https?:\/\/vip1\.kuwo\.cn\/vip\/activity\/kwMemberDay url reject-200
# > 酷我音乐_屏蔽热词
https?:\/\/hotword\.kuwo\.cn\/hotword\.s url reject-dict
# > 酷我音乐_通用广告请求
https?:\/\/vip1\.kuwo\.cn\/vip_adv\/ url reject-dict
# > 酷我音乐_通用广告请求
https?:\/\/wapi\.kuwo\.cn\/openapi\/v1\/app\/pasterAdvert url reject-200
# > 酷我音乐_应用内弹窗及右下角
^https?:\/\/mobilead\.kuwo\.cn\/ url reject-200
# > 酷我音乐_开屏广告
https?:\/\/rich\.kuwo\.cn\/AdService url reject-200

# > 酷我音乐_搜索框处理
https?:\/\/searchrecterm\.kuwo\.cn\/recterm\.s url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js
# > 酷我音乐_去除首页轮播广告和tips
https?:\/\/mgxhtj\.kuwo\.cn\/mgxh\.s url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js
# > 酷我音乐_去除会员页广告
https?:\/\/appi\.kuwo\.cn\/kuwopay\/vip-tab\/page\/cells url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js
# > 酷我音乐_去除会员页顶部广告tab
https?:\/\/appi\.kuwo\.cn\/kuwopay\/vip-tab\/setting url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js

# > 酷我音乐_听书权限接口1
^https?:\/\/.*\.(kuwo|lrts)\.(cn|me)\/a\.p url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js
# > 酷我音乐_听书权限接口2
^https?:\/\/.*\.kuwo\.cn\/v2\/api\/pay\/vip\/extraVipStatus url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js

# > 酷我音乐_新版vip接口1-----------------------
^https?:\/\/vip1\.kuwo\.cn\/vip\/enc\/user\/vip\?op=ui url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js

# > 酷我音乐_新版vip接口2
^https?:\/\/vip1\.kuwo\.cn\/vip\/v2\/userbase\/vip\?op=get url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js
# > 酷我音乐_旧版vip接口
^https?:\/\/vip1\.kuwo\.cn\/vip\/v2\/user\/vip($|\?op=ui) url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js

# > 酷我音乐_皮肤解锁
^https?:\/\/vip1\.kuwo\.cn\/vip\/v2\/theme url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js

# > 酷我音乐_数字专辑
^https?:\/\/musicpay\.kuwo\.cn\/music\.pay\?newver url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js
# > 酷我音乐_无损下载[限纯净版]
^https?:\/\/musicpay\.kuwo\.cn\/music\.pay\?ui url script-request-header https://raw.githubusercontent.com/wf021325/qx/master/js/kuwo.js 
*/




/* const isQuanX = typeof $task !== "undefined";
!isQuanX && $done({}); */

let method = $request.method;
let url = $request.url;
var body = $response.body;


/* //去除首页轮播广告和tips
 if (url.indexOf("mgxhtj.kuwo.cn") != -1) {
	 body = body.replace(/\<userinfolabel.*?\/\>/g, "").replace(/\<ad.*?\/\>/g, "");
	 $done({"body": body});
} */

/* //搜索框处理
if (url.indexOf("searchrecterm.kuwo.cn") != -1) {
	let obj = {"content": [{"query_word": "搜索","desc": ""}]};
	body = JSON.stringify(obj);
	$done({"body": body});
} */

/* //去除会员页广告
if (url.indexOf("kuwopay/vip-tab/page/cells") != -1) {
	let obj = JSON.parse(body);
	obj.data.filter(Element => {
		if (Element.type != "AdvertBanner" && Element.type != "Welfare") return true;
		else return false;
	});
	if (obj.data && obj.data[0] ? .["type"] == "VipCard") obj.data[0].data.noVip = ["https://t.me/ddgksf2021"];
	body = JSON.stringify(obj);
	$done({"body": body});
} */

/* //去除会员页顶部广告tab
if (url.indexOf("kuwopay/vip-tab/setting") != -1) {
	let obj = JSON.parse(body);
	obj.data ? .["tab"] ? .["vipTypes"] && (obj.data.tab.vipTypes = [{
		"_id": "63bd4b1002539ab74ca789df",
		"title": "会员",
		"type": "svip",
		"description": "会员",
		"topics": [{"mainBgColor": "#3C2D08","title": "精选","navId": "63bd4b1002539ab74ca789df","deputyBgColor": "#111111","url": "https://m.kuwo.cn/viptab/"}]
	}]);
	body = JSON.stringify(obj);
	$done({"body": body});
} */

/* //开屏广告
if (url.indexOf("rich.kuwo.cn/AdService") != -1) {
	body = body.replace(/"url"/g, "\"URL\"").replace(/last_time":\d+/g, "last_time\":1");\
	console.log("开屏广告");
} */

/* //皮肤解锁
if (/vip\/v2\/theme/.test(url)) {
	let obj = JSON.parse(body);
	obj.data.vipTheme.type = "free";
	obj.data.needBieds = [];
	body = JSON.stringify(obj);
	$done({"body": body});
} */

/* //新版vip接口2
//https://vip1.kuwo.cn/vip/v2/userbase/vip?op=iosWeChatPay&uid=554118269&sid=1947646089&deviceId=2561741100&fromsrc=box_noPic_download&source=kwplayersimple_ip_1.0.2.0_TJ.ipa
//{"data":{"isWeiChatUser":0},"ctime":1685948067301,"meta":{"desc":"成功","code":200}} 
if (/vip\/v2\/userbase\/vip/.test(url)) {
	let obj = JSON.parse(body);
	obj.data ? .["vipui"] && (obj.data.vipui = {
		"vipIcon": "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png",
		"iconJumpUrl": "http://vip1.kuwo.cn/vip/vue/anPay/pay/index.html?pageType=avip&MBOX_WEBCLOSE=1&FULLHASARROW=1",
		"growthValue": "21600",
		"vipTag": "VIP6",
		"vipOverSeasExpire": "0",
		"time": "4000000000000",
		"goSvipPage": "1",
		"isNewUser": "1",
		"vipmIcon": "https://image.kuwo.cn/fe/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png",
		"svipIcon": "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png",
		"vipmExpire": "4000000000000",
		"biedSong": "0",
		"luxuryIcon": "https://image.kuwo.cn/fe/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png",
		"userType": "3",
		"isYearUser": "2",
		"vip3Expire": "0",
		"experienceExpire": "0",
		"luxAutoPayUser": "2",
		"biedAlbum": "1",
		"vipLuxuryExpire": "4000000000000",
		"vipmAutoPayUser": "2",
		"svipAutoPayUser": "2",
		"vipExpire": "4000000000000",
		"svipExpire": "4000000000000"
	});
	obj.data ? .["tsui"] && (obj.data.tsui = "{\"timestamp\":1674205529,\"packs\":{\"type\":0,\"end\":4000000000,\"period\":1,\"bought_vip\":1,\"bought_vip_end\":4000000000},\"result\":\"ok\"}");
	body = JSON.stringify(obj);
	$done({"body": body});
} */

//旧版vip接口
//http://vip1.kuwo.cn/vip/v2/user/vip?op=ui&uid=554118269&sid=522951498&signver=new
if (/vip\/v2\/user\/vip/.test(url)) {
	let obj = JSON.parse(body);
	obj.data.isNewUser = "2";
	obj.data.vipLuxuryExpire = "4000000000000";
	obj.data.time = "1961170340993";
	obj.data.isYearUser = "2";
	obj.data.vipmExpire = "4000000000000";
	obj.data.vipOverSeasExpire = "4000000000000";
	obj.data.vipExpire = "4000000000000";
	obj.data.vip3Expire = "4000000000000";
	body = JSON.stringify(obj);
	$done({"body": body});
}

/* //听书权限接口1
if (/a\.p/.test(url)) {
	body = body.replace(/"type":\d+/g, "\"type\":2").replace(/"end":\d+/g, "\"end\":4811209694").replace(/"period":\d+/g, "\"period\":111").replace(/"bought_vip":\d+/g, "\"bought_vip\":1").replace(/"bought_vip_end":\d+/g, "\"bought_vip_end\":4811209694").replace(/"limitfree":\d+/g, "\"limitfree\":1").replace(/"playable":\d+/g, "\"playable\":1").replace(/"downable":\d+/g, "\"downable\":1").replace(/"playright":\d+/g, "\"playright\":1").replace(/"downright":\d+/g, "\"downright\":1").replace(/"policytype":\d+/g, "\"policytype\":1").replace(/"policy":\d+/g, "\"policy\":1");
	$done({"body": body});
} */

/* //听书权限接口2
if (/v2\/api\/pay\/vip\/extraVipStatus/.test(url)) {
	let obj = JSON.parse(body);
	obj.data.isbuyVip = 1;
	body = JSON.stringify(obj);
	$done({"body": body});
} */

/* //新版vip接口1
if (/vip\/enc\/user/.test(url)) {
	body = "Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ==";
	$done({"body": body});
} */


/* //数字专辑
if (/music\.pay/.test(url)) {
	if (method == "POST" && body.includes("audio")) {
		let obj = JSON.parse(body);
		obj.songs[0].audio.forEach(Element => {
			Element.st = 0;
		});
		let audio = obj.songs[0].audio[0];
		obj.user[0] = {
			"info": obj.songs[0],
			"id": obj.songs[0].id,
			"pid": audio.pid,
			"price": audio.price,
			"type": audio.policy,
			"name": audio.policy + "_1",
			"categray": audio.policy + "_1",
			"order": 375787919,
			"final": [],
			"buy": 1657425321,
			"begin": 1657425321,
			"end": 4180305321,
			"CurEnd": 0,
			"playCnt": 0,
			"playUpper": 300,
			"downCnt": 0,
			"downUpper": 300,
			"playVideoCnt": 0,
			"playVideoUpper": 3000,
			"downVideoCnt": 0,
			"downVideoUpper": 3000,
			"period": 1000,
			"feetype": 0
		};
		body = JSON.stringify(obj);
		$done({"body": body});
	}
} */


//无损下载[限纯净版]
//http://musicpay.kuwo.cn/music.pay?uid=554118269&sid=522951498&ver=kwplayersimple_ip_1.0.2.0&src=kwplayersimple_ip_1.0.2.0_TJ.ipa&op=bought&ptype=vip&ids=0&deviceUID=c8a56b3ea42c432b8a0bd886656c1e37&signver=new&newver=3
if (/music\.pay\?uid=\d+/.test(url)) {
	url = url.replace(/uid=\d+/g, "uid=6");
	$done({"url": url});
}
