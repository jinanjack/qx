let obj=JSON.parse($response.body)
    //obj.result.svip_expired_at = 3742732800;
    //obj.result.is_xy_vip = true;
    //obj.result.xy_svip_expire = 3742732800;
    //obj.result.free_trial = 0;
    //obj.result.vip_type = "s";
    obj.result.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNjc0MjI3MTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.wbgfCRp3W9zEvzEYsiWxerta4G-d-b0qlYCcilevOKY";

$done({body:JSON.stringify(obj)})
