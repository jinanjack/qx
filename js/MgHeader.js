var headers = $request.headers;
headers.Cookie = "";
headers["x-r-i"] = "";
headers["x-l-r-i"] = "";
$done({"headers": headers});
