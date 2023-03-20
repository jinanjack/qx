let obj=JSON.parse($response.body)

obj.result.svip_expired_at = 4096483190
obj.result.xy_svip_expire = 4096483190
obj.result.wt.vip.svip_expired_at = 4096483190
obj.result.is_vip = true
obj.result.vip_type ='s'

# obj.result.svip_given = 1
# 默认0

# obj.result.svip_take_effect = 1
# SVIP生效

# obj.result.wt.cheat = false
# 是否为黑户

$done({body:JSON.stringify(obj)})
