let obj=JSON.parse($response.body)
    obj.result.svip_expired_at = 3742732800;
    obj.result.is_xy_vip = true;
    obj.result.xy_svip_expire = 3742732800;
    obj.result.free_trial = 0;
    obj.result.vip_type = "s";
    //obj.result.wt.vip.is_auto_renewal = flase;
    //obj.result.wt.vip.svip_expired_at = 3742732800;
    obj.result.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNjc0MjI3MTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.wbgfCRp3W9zEvzEYsiWxerta4G-d-b0qlYCcilevOKY";
    //obj.result.is_vip = true;

/*
obj.result['svip_expired_at'] = 3742732800
obj.result['xy_svip_expire'] = 3742732800
//obj.result.wt.vip['svip_expired_at'] = 3742732800
obj.result['is_vip'] = true
obj.result['vip_type'] ='s'

//obj.result['svip_given'] = 1  //默认0
//obj.result['svip_take_effect'] = 1  //SVIP生效
//obj.result.wt.cheat = false  //是否为黑户
*/


$done({body:JSON.stringify(obj)})
