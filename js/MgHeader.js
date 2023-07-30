var h = $request.headers;
delete h['Cookie'];
delete h['x-r-i'];
delete h['x-l-r-i'];
$done({h});