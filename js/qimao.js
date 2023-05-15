/*
hostname = *.wtzw.com
# > 七猫小说
^https?:\/\/(api-\w+|xiaoshuo)\.wtzw\.com\/api\/v\d\/ url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/qimao.js

# 抄袭此脚本  https://raw.githubusercontent.com/I-am-R-E/QuantumultX/main/JavaScript/QiMaoXiaoShuo.js
*/

var body = $response.body;
var url = $request.url;
//var obj = JSON.parse(body);

if (url.indexOf('/user/my-center') != -0x1) {
    body = body.replace(/\"year_vip_show\"\:\".*?\"/g, '"year_vip_show":"1"').replace(/\"vip_show_type\"\:\".*?\"/g, '"vip_show_type":"40"').replace(/\"is_vip\"\:\".*?\"/g, '"is_vip":"1"');
} else if (url.indexOf('/login/tourist') != -0x1) {
    body = body.replace(/\"is_vip\"\:\".*?\"/g, '"is_vip":"1"');
} else if (url.indexOf('/user/get-role-adv-vip-info') != -0x1) {
    body = body.replace(/\"year_vip_show\"\:\".*?\"/g, '"year_vip_show":"1"').replace(/\"isvip\"\:\".*?\"/g, '"isvip":"1"').replace(/\"isLifetimeVip\"\:\".*?\"/g, '"isLifetimeVip":"1"').replace(/\"type\"\:\".*?\"/g, '"type":"40"');
} else if (url.indexOf('/bookshelf-adv/index') != -0x1) {
    body = body.replace(/\"list\"\:\[.*?\]/g, '"list":[]');
} else if (url.indexOf('/user/page') != -0x1) {
    body = body.replace(/\"year_vip_show\"\:\".*?\"/g, '"year_vip_show":"1"').replace(/\"is_vip\"\:\".*?\"/g, '"is_vip":"1"');
} else if (url.indexOf('/book/download') != -0x1) {
    body = body.replace(/\"list\"\:\[.*?\]/g, '"list":[]');
} else if (url.indexOf('/reader-adv/index') != -0x1) {
    body = body.replace(/\"reader_chapter_list\"\:\[.*?\]/g, '"reader_chapter_list":[]').replace(/\"reader_getcoin\"\:\[.*?\]/g, '"reader_getcoin":[]').replace(/\"reader_bottom_list\"\:\[.*?\]/g, '"reader_bottom_list":[]').replace(/\"reader_page_turn_list\"\:\[.*?\]/g, '"reader_page_turn_list":[]').replace(/\"reader_noad\"\:\[.*?\]/g, '"reader_noad":[]').replace(/\"reader_inchapter\"\:\[.*?\]/g, '"reader_inchapter":[]').replace(/\"feedback\"\:\[.*?\]/g, '"feedback":[]');
} else if (url.indexOf('/voice-adv/index') != -0x1) {
    body = body.replace(/\"voice_top\"\:\[.*?\]/g, '"voice_top":[]').replace(/\"voice_bottom\"\:\[.*?\]/g, '"voice_bottom":[]');
} else if (url.indexOf('/get-player-info') != -0x1) {
    body = body.replace(/\"voice_list\"\:\[.*?\]/g, '"voice_list":[]');
} else if (url.indexOf('/init-adv/index') != -0x1) {
    body = body.replace(/\"coopenHighList\"\:\[.*?\]/g, '"coopenHighList":[]');
} else if (url.indexOf('/bookshelf-adv/index') != -0x1) {
    body = body.replace(/\"bookshelf\"\:\[.*?\]/g, '"bookshelf":[]');
}
$done({
    'body': body
});
