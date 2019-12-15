var body = $response.body;
var url = $request.url;
const path1 = "/ucp/index";
const path2 = "/getGlobalData";
const path3 = "/vod/reqplay/";
const path4 = "/vod/show/"
if (url.indexOf(path1) != -1){
  let obj = JSON.parse(body);
  obj.data.uinfo.play_daily_remainders = 666;
  obj.data.uinfo.down_daily_remainders = 777;
  obj.data.uinfo.next_upgrade_need = 0;
  obj.data.uinfo.minivod_play_daily_remainders = 888;
  obj.data.uinfo.minivod_down_daily_remainders = 999;
  obj.data.user.isvip = 1;
  obj.data.user.gicon = "V5";
  obj.data.user.gid = 5;
  body = JSON.stringify(obj);
}

if (url.indexOf(path2) != -1){
  let obj = JSON.parse(body);
  obj.data.app_launch_times_adshow = "0";
  obj.data.adgroups = "";
  obj.data.iOS_adgroups ="";
  body = JSON.stringify(obj);
}

if (url.indexOf(path3) != -1) {
    let obj = JSON.parse(body);
    obj.retcode = "0";
//    if (obj.data.hasOwnProperty("httpurl_preview")) {
//        var playurl = obj.data["httpurl_preview"];
//        obj.data["httpurl"] = playurl;
//    };
    body = JSON.stringify(obj);
}

if (url.indexOf(path4) != -1){
  let obj = JSON.parse(body);
  obj.data.vodrow.limit_free = "0";
  obj.data.vodrow.isvip = "0";
  obj.data.vodrow.islimit = "0";
  obj.data.vodrow.islimitv3 = "0";
  obj.data.vodrow.exclusive = "0";
  body = JSON.stringify(obj);
}

$done({body});
