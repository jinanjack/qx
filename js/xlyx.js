/* 

小蓝医学，解锁VIP 仅QX测试
软件下载链接：https://apps.apple.com/cn/app/id1642455052


密钥来源频道：https://t.me/chxm1023
密钥来源链接：https://t.me/chxm1023/318
====================================
[rewrite_local]
^https:\/\/edu\.lezaitizhong\.com\/(vod|tiku)\/(class_list|getclassifychapter)\? url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/xlyx.js

[mitm]
hostname = edu.lezaitizhong.com
====================================

======调试区|忽略======
# ^https:\/\/edu\.lezaitizhong\.com\/(vod|tiku)\/(class_list|getclassifychapter)\? url script-response-body http://192.168.123.100:8080/xlyx.js
======调试区|忽略======
 */

var CryptoJS=CryptoJS||function(t,e){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),"undefined"!=typeof self&&self.crypto&&(r=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(r=globalThis.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&"undefined"!=typeof global&&global.crypto&&(r=global.crypto),!r&&"function"==typeof require)try{r=require("crypto")}catch(t){}var i=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},n=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),o={},c=o.lib={},s=c.Base={extend:function(t){var e=n(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=c.WordArray=s.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||u).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var c=r[o>>>2]>>>24-o%4*8&255;e[i+o>>>2]|=c<<24-(i+o)%4*8}else for(var s=0;s<n;s+=4)e[i+s>>>2]=r[s>>>2];return this.sigBytes+=n,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){var r,n=[],o=function(e){e=e;var r=987654321,i=4294967295;return function(){var n=((r=36969*(65535&r)+(r>>16)&i)<<16)+(e=18e3*(65535&e)+(e>>16)&i)&i;return n/=4294967296,(n+=.5)*(t.random()>.5?1:-1)}},c=!1;try{i(),c=!0}catch(t){}for(var s,f=0;f<e;f+=4)c?n.push(i()):(s=987654071*(r=o(4294967296*(s||t.random())))(),n.push(4294967296*r()|0));return new a.init(n,e)}}),f=o.enc={},u=f.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new a.init(r,e/2)}},p=f.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new a.init(r,e)}},h=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(p.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return p.parse(unescape(encodeURIComponent(t)))}},d=c.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r,i=this._data,n=i.words,o=i.sigBytes,c=this.blockSize,s=o/(4*c),f=(s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0))*c,u=t.min(4*f,o);if(f){for(var p=0;p<f;p+=c)this._doProcessBlock(n,p);r=n.splice(0,f),i.sigBytes-=u}return new a.init(r,u)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),y=(c.Hasher=d.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new y.HMAC.init(t,r).finalize(e)}}}),o.algo={});return o}(Math);!function(){var t=CryptoJS,e=t.lib.WordArray;t.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<r;o+=3)for(var c=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,s=0;s<4&&o+.75*s<r;s++)n.push(i.charAt(c>>>6*(3-s)&63));var a=i.charAt(64);if(a)for(;n.length%4;)n.push(a);return n.join("")},parse:function(t){var r=t.length,i=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<i.length;o++)n[i.charCodeAt(o)]=o}var c=i.charAt(64);if(c){var s=t.indexOf(c);-1!==s&&(r=s)}return function(t,r,i){for(var n=[],o=0,c=0;c<r;c++)if(c%4){var s=i[t.charCodeAt(c-1)]<<c%4*2,a=i[t.charCodeAt(c)]>>>6-c%4*2;n[o>>>2]|=(s|a)<<24-o%4*8,o++}return e.create(n,o)}(t,r,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),CryptoJS.lib.Cipher||function(t){var e=CryptoJS,r=e.lib,i=r.Base,n=r.WordArray,o=r.BufferedBlockAlgorithm,c=e.enc,s=(c.Utf8,c.Base64),a=e.algo.EvpKDF,f=r.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?g:v}return function(e){return{encrypt:function(r,i,n){return t(i).encrypt(e,r,i,n)},decrypt:function(r,i,n){return t(i).decrypt(e,r,i,n)}}}}()}),u=(r.StreamCipher=f.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),e.mode={}),p=r.BlockCipherMode=i.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),h=u.CBC=function(){var e=p.extend();function r(e,r,i){var n,o=this._iv;o?(n=o,this._iv=t):n=this._prevBlock;for(var c=0;c<i;c++)e[r+c]^=n[c]}return e.Encryptor=e.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize;r.call(this,t,e,n),i.encryptBlock(t,e),this._prevBlock=t.slice(e,e+n)}}),e.Decryptor=e.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize,o=t.slice(e,e+n);i.decryptBlock(t,e),r.call(this,t,e,n),this._prevBlock=o}}),e}(),d=(e.pad={}).Pkcs7={pad:function(t,e){for(var r=4*e,i=r-t.sigBytes%r,o=i<<24|i<<16|i<<8|i,c=[],s=0;s<i;s+=4)c.push(o);var a=n.create(c,i);t.concat(a)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},y=(r.BlockCipher=f.extend({cfg:f.cfg.extend({mode:h,padding:d}),reset:function(){var t;f.reset.call(this);var e=this.cfg,r=e.iv,i=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=i.createEncryptor:(t=i.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(i,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),r.CipherParams=i.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),l=(e.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;return(r?n.create([1398893684,1701076831]).concat(r).concat(e):e).toString(s)},parse:function(t){var e,r=s.parse(t),i=r.words;return 1398893684==i[0]&&1701076831==i[1]&&(e=n.create(i.slice(2,4)),i.splice(0,4),r.sigBytes-=16),y.create({ciphertext:r,salt:e})}},v=r.SerializableCipher=i.extend({cfg:i.extend({format:l}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i),o=n.finalize(e),c=n.cfg;return y.create({ciphertext:o,key:r,iv:c.iv,algorithm:t,mode:c.mode,padding:c.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),_=(e.kdf={}).OpenSSL={execute:function(t,e,r,i,o){if(i||(i=n.random(8)),o)c=a.create({keySize:e+r,hasher:o}).compute(t,i);else var c=a.create({keySize:e+r}).compute(t,i);var s=n.create(c.words.slice(e),4*r);return c.sigBytes=4*e,y.create({key:c,iv:s,salt:i})}},g=r.PasswordBasedCipher=v.extend({cfg:v.cfg.extend({kdf:_}),encrypt:function(t,e,r,i){var n=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize,i.salt,i.hasher);i.iv=n.iv;var o=v.encrypt.call(this,t,e,n.key,i);return o.mixIn(n),o},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);var n=i.kdf.execute(r,t.keySize,t.ivSize,e.salt,i.hasher);return i.iv=n.iv,v.decrypt.call(this,t,e,n.key,i)}})}(),function(){var t=CryptoJS,e=t.lib.BlockCipher,r=t.algo,i=[],n=[],o=[],c=[],s=[],a=[],f=[],u=[],p=[],h=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;var r=0,d=0;for(e=0;e<256;e++){var y=d^d<<1^d<<2^d<<3^d<<4;y=y>>>8^255&y^99,i[r]=y,n[y]=r;var l=t[r],v=t[l],_=t[v],g=257*t[y]^16843008*y;o[r]=g<<24|g>>>8,c[r]=g<<16|g>>>16,s[r]=g<<8|g>>>24,a[r]=g;g=16843009*_^65537*v^257*l^16843008*r;f[y]=g<<24|g>>>8,u[y]=g<<16|g>>>16,p[y]=g<<8|g>>>24,h[y]=g,r?(r=l^t[t[t[_^l]]],d^=t[t[d]]):r=d=1}}();var d=[0,1,2,4,8,16,32,64,128,27,54],y=r.AES=e.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,n=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],c=0;c<n;c++)if(c<r)o[c]=e[c];else{var s=o[c-1];c%r?r>6&&c%r==4&&(s=i[s>>>24]<<24|i[s>>>16&255]<<16|i[s>>>8&255]<<8|i[255&s]):(s=i[(s=s<<8|s>>>24)>>>24]<<24|i[s>>>16&255]<<16|i[s>>>8&255]<<8|i[255&s],s^=d[c/r|0]<<24),o[c]=o[c-r]^s}for(var a=this._invKeySchedule=[],y=0;y<n;y++){c=n-y;if(y%4)s=o[c];else s=o[c-4];a[y]=y<4||c<=4?s:f[i[s>>>24]]^u[i[s>>>16&255]]^p[i[s>>>8&255]]^h[i[255&s]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,o,c,s,a,i)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,f,u,p,h,n);r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,o,c,s){for(var a=this._nRounds,f=t[e]^r[0],u=t[e+1]^r[1],p=t[e+2]^r[2],h=t[e+3]^r[3],d=4,y=1;y<a;y++){var l=i[f>>>24]^n[u>>>16&255]^o[p>>>8&255]^c[255&h]^r[d++],v=i[u>>>24]^n[p>>>16&255]^o[h>>>8&255]^c[255&f]^r[d++],_=i[p>>>24]^n[h>>>16&255]^o[f>>>8&255]^c[255&u]^r[d++],g=i[h>>>24]^n[f>>>16&255]^o[u>>>8&255]^c[255&p]^r[d++];f=l,u=v,p=_,h=g}l=(s[f>>>24]<<24|s[u>>>16&255]<<16|s[p>>>8&255]<<8|s[255&h])^r[d++],v=(s[u>>>24]<<24|s[p>>>16&255]<<16|s[h>>>8&255]<<8|s[255&f])^r[d++],_=(s[p>>>24]<<24|s[h>>>16&255]<<16|s[f>>>8&255]<<8|s[255&u])^r[d++],g=(s[h>>>24]<<24|s[f>>>16&255]<<16|s[u>>>8&255]<<8|s[255&p])^r[d++];t[e]=l,t[e+1]=v,t[e+2]=_,t[e+3]=g},keySize:8});t.AES=e._createHelper(y)}();var key=CryptoJS.enc.Utf8.parse("lanjiyin20500423"),iv=CryptoJS.enc.Utf8.parse("lanjiyin20500423");function AES_Encrypt(t){var e=CryptoJS.enc.Utf8.parse(t);return CryptoJS.AES.encrypt(e,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}).toString()}function AES_Decrypt(t){var e=t;return CryptoJS.AES.decrypt(e,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8)}

let body = $response.body;
body = AES_Decrypt(body);
body = body.replace(/\"is_unlock\"\:\"0\"/g,'"is_unlock":"1"');
body = AES_Encrypt(body);
$done({body});
