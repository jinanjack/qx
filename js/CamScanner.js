/* 
CamScanner 解锁部分高级特权
hostname = ap*.intsig.net

^https:\/\/api(|-cs)\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/CamScanner.js
*/

let obj = JSON.parse($response.body);
obj = {"data":{"psnl_vip_property":{"expiry":"3742732800"}}};
$done({body: JSON.stringify(obj)});