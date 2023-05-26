/*
hostname = biz.caiyunapp.com , biz.cyapi.cn ,
# 旧版   biz.caiyunapp.com
# 新版   biz.cyapi.cn

# https://biz.cyapi.cn/v2/user?app_name=weather
# https://biz.cyapi.cn/v1/visitors

# https://biz.cyapi.cn/v3/login_by_code 登录



# 正则匹配 ^https:\/\/biz.(caiyunapp\.com|cyapi\.cn)\/v\d\/(user\?app_name=weather|visitors|login_by_code)$

^https:\/\/biz.(caiyunapp\.com|cyapi\.cn)\/v\d\/(user\?app_name=weather|visitors|login_by_code)$ url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/caiyun.js
 */

var body = $response.body;
var url = $request.url;
// 此处Token 需要是真实VIP客户提取
let Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNjc0MjI3MTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.wbgfCRp3W9zEvzEYsiWxerta4G-d-b0qlYCcilevOKY";

if (url.indexOf('/user') != -1 || url.indexOf('/visitors') != -1) {
	let obj = JSON.parse(body)
		//obj.result.svip_expired_at = 3742732800;
		//obj.result.is_xy_vip = true;
		//obj.result.xy_svip_expire = 3742732800;
		//obj.result.free_trial = 0;
		//obj.result.vip_type = "s";
		obj.result.token = Token;
	body = JSON.stringify(obj);
}

//随便输入账号，验证码，点击登录
if (url.indexOf('/login_by_code') != -1) {
	//let obj = JSON.parse(body)
	let obj = {
    "status": "ok",
    "result": {
        "is_login": true,
        //"phone_num": "18888888888",
        "is_phone_verified": true,
        "token": Token
    },
    "rc": 0
}
	body = JSON.stringify(obj);
}

$done({body});
