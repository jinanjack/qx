var headers = $request.headers;
delete headers['Cookie'];
delete headers['x-r-i'];
delete headers['x-l-r-i'];
$done({headers});