/*
hostname = biz.caiyunapp.com , biz.cyapi.cn ,
# 旧版   biz.caiyunapp.com
# 新版   biz.cyapi.cn

# https://biz.cyapi.cn/v2/user?app_name=weather
# https://biz.cyapi.cn/v1/visitors

# https://biz.cyapi.cn/v3/login_by_code 登录



# 正则匹配 ^https:\/\/biz.(caiyunapp\.com|cyapi\.cn)\/v(2\/user\?app_name=weather|1/visitors|3\/login_by_code)$

^https:\/\/biz.(caiyunapp\.com|cyapi\.cn)\/v(2\/user\?app_name=weather|1\/visitors)$ url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/caiyun.js
*/



let obj = JSON.parse($response.body)

if(url.indexOf('/v2/user') != -1||url.indexOf('/v1/visitors') != -1){
    //obj.result.svip_expired_at = 3742732800;
    //obj.result.is_xy_vip = true;
    //obj.result.xy_svip_expire = 3742732800;
    //obj.result.free_trial = 0;
    //obj.result.vip_type = "s";
    obj.result.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNjc0MjI3MTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.wbgfCRp3W9zEvzEYsiWxerta4G-d-b0qlYCcilevOKY';
	
}

if (url.indexOf('/v3/login_by_code') != -1){
	//{"status": "failed", "error": "Missing request parameters", "rc": -400}
	obj = {"status":"ok","result":{"token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNjc0MjI3MTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.wbgfCRp3W9zEvzEYsiWxerta4G-d-b0qlYCcilevOKY'},"rc":0}
}	

$done({body:JSON.stringify(obj)})
