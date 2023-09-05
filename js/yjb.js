/*
====================================
[rewrite_local]
^https?:\/\/app-api\.yangjibao\.com url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/yjb.js

[mitm]
hostname = *.yangjibao.com
====================================
 */

var body = $response.body;
var url = $request.url;
$done({body});
