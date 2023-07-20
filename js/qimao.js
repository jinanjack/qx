/*
七猫小说
====================================
[rewrite_local]
^https?:\/\/(api-\w+|xiaoshuo)\.wtzw\.com\/api\/v\d\/ url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/qimao.js

[mitm]
hostname = *.wtzw.com
====================================
 */

var body = $response.body;
var url = $request.url;

if (url.indexOf('/user/get-user-info') != -1) {
	body = body.replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}
if (url.indexOf('/user/my-center') != -1) {
	body = body.replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"vip_show_type\"\:\"\d+\"/g, '"vip_show_type":"40"').replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}
if (url.indexOf('/login/tourist') != -1) {
	body = body.replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}
if (url.indexOf('/user/get-role-adv-vip-info') != -1) {
	body = body.replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"isvip\"\:\"\d\"/g, '"isvip":"1"').replace(/\"isLifetimeVip\"\:\"\d\"/g, '"isLifetimeVip":"1"').replace(/\"type\"\:\"\d+\"/g, '"type":"40"');
}
if (url.indexOf('/bookshelf-adv/index') != -1) {
	body = body.replace(/\"list\"\:\[.*?\]/g, '"list":[]');
}
if (url.indexOf('/user/page') != -1) {
	body = body.replace(/\"year_vip_show\"\:\"\d\"/g, '"year_vip_show":"1"').replace(/\"is_vip\"\:\"\d\"/g, '"is_vip":"1"');
}
if (url.indexOf('/book/download') != -1) {
	body = body.replace(/\"list\"\:\[.*?\]/g, '"list":[]');
}
if (url.indexOf('/reader-adv/index') != -1) {
	body = body.replace(/\"reader_chapter_list\"\:\[.*?\]/g, '"reader_chapter_list":[]').replace(/\"reader_getcoin\"\:\[.*?\]/g, '"reader_getcoin":[]').replace(/\"reader_bottom_list\"\:\[.*?\]/g, '"reader_bottom_list":[]').replace(/\"reader_page_turn_list\"\:\[.*?\]/g, '"reader_page_turn_list":[]').replace(/\"reader_noad\"\:\[.*?\]/g, '"reader_noad":[]').replace(/\"reader_inchapter\"\:\[.*?\]/g, '"reader_inchapter":[]').replace(/\"feedback\"\:\[.*?\]/g, '"feedback":[]');
}
if (url.indexOf('/voice-adv/index') != -1) {
	body = body.replace(/\"voice_top\"\:\[.*?\]/g, '"voice_top":[]').replace(/\"voice_bottom\"\:\[.*?\]/g, '"voice_bottom":[]');
}
if (url.indexOf('/get-player-info') != -1) {
	body = body.replace(/\"voice_list\"\:\[.*?\]/g, '"voice_list":[]');
}
if (url.indexOf('/init-adv/index') != -1) {
	body = body.replace(/\"coopenHighList\"\:\[.*?\]/g, '"coopenHighList":[]');
}
if (url.indexOf('/bookshelf-adv/index') != -1) {
	body = body.replace(/\"bookshelf\"\:\[.*?\]/g, '"bookshelf":[]');
}
$done({body});
