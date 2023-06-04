/* 
Nicegram
====================================
[rewrite_local]
^https:\/\/restore-access\.indream\.app\/restoreAccess\?id=\d{5,10} url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/Nicegram.js

[mtim]
hostname = restore-access.indream.app
====================================
 */
var body = $response.body;
body = '{"data":{"premiumAccess":true}}';
$done({body});