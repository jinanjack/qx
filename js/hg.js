/* 
hostname = api88.awk2.work
^https://api88.awk2.work/domain/list$ url script-response-body 
https://raw.githubusercontent.com/wf021325/qx/master/js/hg.js
*/
let obj = JSON.parse($response.body);
obj.data[0].viewVideo= obj.data[0].viewVideo2
$done({body: JSON.stringify(obj)});
