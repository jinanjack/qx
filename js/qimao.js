/*
七猫小说
====================================
[rewrite_local]
# ^https?:\/\/(api-\w+|xiaoshuo)\.wtzw\.com\/api\/v\d\/ url script-response-body http://192.168.2.170:8080/qimao.js

^https?:\/\/(api-\w+|xiaoshuo)\.wtzw\.com\/api\/v\d\/ url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/qimao.js
^https:\/\/api-gw\.wtzw\.com\/welf\/app\/v1\/task\/red-packet$ url reject-dict

[mitm]
hostname = *.wtzw.com
====================================
 */

var body = $response.body;
var url = $request.url;

//https://xiaoshuo.wtzw.com/api/v1/user/get-user-info
if (url.includes('/user/get-user-info')) {
    body = body.replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}

//https://xiaoshuo.wtzw.com/api/v3/user/my-center?
if (url.includes('/user/my-center')) {
    body = body.replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"vip_show_type\"\:\"\d+\"/g, '"vip_show_type":"40"').replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
    let obj = JSON.parse(body);
    delete obj.data.user_area.vip_info;
    obj.data.func_area.length > 0 && (obj.data.func_area = obj.data.func_area.filter(item => item.type == "core_func" || item.type == "other"));
    body = JSON.stringify(obj);
}

//https://api-gw.wtzw.com/api/v2/vip/index?
if (url.includes('/vip/index')) {
    body = body.replace(/\"isvip\"\:\"\d\"/g, '"isvip":"1"').replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"time\"\:\"\d\"/g, '"time":"3742732800"')
}

if (url.includes('/login/tourist')) {
    body = body.replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}

if (url.includes('/user/get-role-adv-vip-info')) {
    body = body.replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"isvip\"\:\"\d\"/g, '"isvip":"1"').replace(/\"isLifetimeVip\"\:\"\d\"/g, '"isLifetimeVip":"1"').replace(/\"type\"\:\"\d+\"/g, '"type":"40"');
}

if (url.includes('/bookshelf-adv/index')) {
    body = body.replace(/\"list\"\:\[.*?\]/g, '"list":[]');
}

if (url.includes('/user/page')) {
    body = body.replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}

if (url.includes('/book/download')) {
    body = body.replace(/\"list\"\:\[.*?\]/g, '"list":[]');
}

if (url.includes('/reader-adv/index')) {
    body = body.replace(/\"reader_chapter_list\"\:\[.*?\]/g, '"reader_chapter_list":[]').replace(/\"reader_getcoin\"\:\[.*?\]/g, '"reader_getcoin":[]').replace(/\"reader_bottom_list\"\:\[.*?\]/g, '"reader_bottom_list":[]').replace(/\"reader_page_turn_list\"\:\[.*?\]/g, '"reader_page_turn_list":[]').replace(/\"reader_noad\"\:\[.*?\]/g, '"reader_noad":[]').replace(/\"reader_inchapter\"\:\[.*?\]/g, '"reader_inchapter":[]').replace(/\"feedback\"\:\[.*?\]/g, '"feedback":[]');
}

if (url.includes('/voice-adv/index')) {
    body = body.replace(/\"voice_top\"\:\[.*?\]/g, '"voice_top":[]').replace(/\"voice_bottom\"\:\[.*?\]/g, '"voice_bottom":[]');
}

if (url.includes('/get-player-info')) {
    body = body.replace(/\"voice_list\"\:\[.*?\]/g, '"voice_list":[]');
}

if (url.includes('/init-adv/index')) {
    body = body.replace(/\"coopenHighList\"\:\[.*?\]/g, '"coopenHighList":[]');
}

if (url.includes('/bookshelf-adv/index')) {
    body = body.replace(/\"bookshelf\"\:\[.*?\]/g, '"bookshelf":[]');
}

$done({body});
