/* 
Nicegram
====================================
[rewrite_local]
^https:\/\/restore-access\.indream\.app\/restoreAccess\?id=\d{5,10} url script-echo-response https://raw.githubusercontent.com/wf021325/qx/master/js/Nicegram.js

[mtim]
hostname = restore-access.indream.app
====================================

const res = {
	status : 'HTTP/1.1 200 OK',
	headers : {'Content-Type':'application/json'},
	body : '{"data": {"premiumAccess": true}}'
}
$done(res);