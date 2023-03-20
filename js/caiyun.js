let obj=JSON.parse($response.body)
# obj.result["xy_svip_expire"]=4096483190.9612898827

obj.result.wt.vip['svip_expired_at'] = 4096483190
obj.result['is_vip'] = true
obj.result['vip_type'] ='s'
obj.result.wt.cheat = false


$done({body:JSON.stringify(obj)})
