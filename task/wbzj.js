/*
# 腕表之家签到
# QX、node测试，其他自测
# 首次进入APP，会获得Cookie，没有获得的，退出再进

hostname = *.xbiao.com
^https:\/\/\w+\.xbiao\.com\/apps\/\w+\/.+/(common\/welcome/|user\/publicKey)$ url script-request-header https://raw.githubusercontent.com/wf021325/qx/master/task/wbzj.js

# 环境变量
# WBZJ_Cookie = '{"url":"https://ios.xbiao.com/apps/Xbiao/ios-Xbiao-9_5-iPhone11_8-828_1792","ck":"userid=xx; userkey=xx","ua":"Xbiao/9.5 (iPhone; iOS 15.6.1; Scale/2.00)"}'
# 环境变量的url   例如：https://ios.xbiao.com/apps/Xbiao/ios-Xbiao-9_5-iPhone11_8-828_1792/user/publicKey   去掉【/user/publicKey】就是环境变量的url

======调试区|忽略======
# ^https:\/\/\w+\.xbiao\.com\/apps\/\w+\/.+/(common\/welcome/|user\/publicKey)$ url script-request-header http://192.168.123.100:8080/wbzj.js
======调试区|忽略======
*/


var CryptoJS=function(t,e){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),"undefined"!=typeof self&&self.crypto&&(r=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(r=globalThis.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&"undefined"!=typeof global&&global.crypto&&(r=global.crypto),!r&&"function"==typeof require)try{r=require("crypto")}catch(t){}var i=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},n=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),o={},s=o.lib={},c=s.Base={extend:function(t){var e=n(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=s.WordArray=c.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||u).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;e[i+o>>>2]|=s<<24-(i+o)%4*8}else for(var c=0;c<n;c+=4)e[i+c>>>2]=r[c>>>2];return this.sigBytes+=n,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=c.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){var r,n=[],o=function(e){e=e;var r=987654321,i=4294967295;return function(){var n=((r=36969*(65535&r)+(r>>16)&i)<<16)+(e=18e3*(65535&e)+(e>>16)&i)&i;return n/=4294967296,(n+=.5)*(t.random()>.5?1:-1)}},s=!1;try{i(),s=!0}catch(t){}for(var c,f=0;f<e;f+=4)s?n.push(i()):(c=987654071*(r=o(4294967296*(c||t.random())))(),n.push(4294967296*r()|0));return new a.init(n,e)}}),f=o.enc={},u=f.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new a.init(r,e/2)}},h=f.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new a.init(r,e)}},p=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},d=s.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r,i=this._data,n=i.words,o=i.sigBytes,s=this.blockSize,c=o/(4*s),f=(c=e?t.ceil(c):t.max((0|c)-this._minBufferSize,0))*s,u=t.min(4*f,o);if(f){for(var h=0;h<f;h+=s)this._doProcessBlock(n,h);r=n.splice(0,f),i.sigBytes-=u}return new a.init(r,u)},clone:function(){var t=c.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),l=(s.Hasher=d.extend({cfg:c.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new l.HMAC.init(t,r).finalize(e)}}}),o.algo={});return o}(Math);function AES_Decrypt(t,e){t=CryptoJS.enc.Utf8.parse(t);var r=CryptoJS.enc.Utf8.parse("6di50aH901duea7d"),i=e;return CryptoJS.AES.decrypt(i,t,{iv:r,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8)}!function(){var t=CryptoJS,e=t.lib.WordArray;t.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<r;o+=3)for(var s=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,c=0;c<4&&o+.75*c<r;c++)n.push(i.charAt(s>>>6*(3-c)&63));var a=i.charAt(64);if(a)for(;n.length%4;)n.push(a);return n.join("")},parse:function(t){var r=t.length,i=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<i.length;o++)n[i.charCodeAt(o)]=o}var s=i.charAt(64);if(s){var c=t.indexOf(s);-1!==c&&(r=c)}return function(t,r,i){for(var n=[],o=0,s=0;s<r;s++)if(s%4){var c=i[t.charCodeAt(s-1)]<<s%4*2,a=i[t.charCodeAt(s)]>>>6-s%4*2;n[o>>>2]|=(c|a)<<24-o%4*8,o++}return e.create(n,o)}(t,r,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),CryptoJS.lib.Cipher||function(t){var e=CryptoJS,r=e.lib,i=r.Base,n=r.WordArray,o=r.BufferedBlockAlgorithm,s=e.enc,c=(s.Utf8,s.Base64),a=e.algo.EvpKDF,f=r.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?g:_}return function(e){return{encrypt:function(r,i,n){return t(i).encrypt(e,r,i,n)},decrypt:function(r,i,n){return t(i).decrypt(e,r,i,n)}}}}()}),u=(r.StreamCipher=f.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),e.mode={}),h=r.BlockCipherMode=i.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),p=u.CBC=function(){var e=h.extend();function r(e,r,i){var n,o=this._iv;o?(n=o,this._iv=t):n=this._prevBlock;for(var s=0;s<i;s++)e[r+s]^=n[s]}return e.Encryptor=e.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize;r.call(this,t,e,n),i.encryptBlock(t,e),this._prevBlock=t.slice(e,e+n)}}),e.Decryptor=e.extend({processBlock:function(t,e){var i=this._cipher,n=i.blockSize,o=t.slice(e,e+n);i.decryptBlock(t,e),r.call(this,t,e,n),this._prevBlock=o}}),e}(),d=(e.pad={}).Pkcs7={pad:function(t,e){for(var r=4*e,i=r-t.sigBytes%r,o=i<<24|i<<16|i<<8|i,s=[],c=0;c<i;c+=4)s.push(o);var a=n.create(s,i);t.concat(a)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},l=(r.BlockCipher=f.extend({cfg:f.cfg.extend({mode:p,padding:d}),reset:function(){var t;f.reset.call(this);var e=this.cfg,r=e.iv,i=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=i.createEncryptor:(t=i.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(i,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),r.CipherParams=i.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),y=(e.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;return(r?n.create([1398893684,1701076831]).concat(r).concat(e):e).toString(c)},parse:function(t){var e,r=c.parse(t),i=r.words;return 1398893684==i[0]&&1701076831==i[1]&&(e=n.create(i.slice(2,4)),i.splice(0,4),r.sigBytes-=16),l.create({ciphertext:r,salt:e})}},_=r.SerializableCipher=i.extend({cfg:i.extend({format:y}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i),o=n.finalize(e),s=n.cfg;return l.create({ciphertext:o,key:r,iv:s.iv,algorithm:t,mode:s.mode,padding:s.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),v=(e.kdf={}).OpenSSL={execute:function(t,e,r,i,o){if(i||(i=n.random(8)),o)s=a.create({keySize:e+r,hasher:o}).compute(t,i);else var s=a.create({keySize:e+r}).compute(t,i);var c=n.create(s.words.slice(e),4*r);return s.sigBytes=4*e,l.create({key:s,iv:c,salt:i})}},g=r.PasswordBasedCipher=_.extend({cfg:_.cfg.extend({kdf:v}),encrypt:function(t,e,r,i){var n=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize,i.salt,i.hasher);i.iv=n.iv;var o=_.encrypt.call(this,t,e,n.key,i);return o.mixIn(n),o},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);var n=i.kdf.execute(r,t.keySize,t.ivSize,e.salt,i.hasher);return i.iv=n.iv,_.decrypt.call(this,t,e,n.key,i)}})}(),CryptoJS.pad.ZeroPadding={pad:function(t,e){var r=4*e;t.clamp(),t.sigBytes+=r-(t.sigBytes%r||r)},unpad:function(t){for(var e=t.words,r=t.sigBytes-1;!(e[r>>>2]>>>24-r%4*8&255);)r--;t.sigBytes=r+1}},function(){var t=CryptoJS,e=t.lib.BlockCipher,r=t.algo,i=[],n=[],o=[],s=[],c=[],a=[],f=[],u=[],h=[],p=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;var r=0,d=0;for(e=0;e<256;e++){var l=d^d<<1^d<<2^d<<3^d<<4;l=l>>>8^255&l^99,i[r]=l,n[l]=r;var y=t[r],_=t[y],v=t[_],g=257*t[l]^16843008*l;o[r]=g<<24|g>>>8,s[r]=g<<16|g>>>16,c[r]=g<<8|g>>>24,a[r]=g;g=16843009*v^65537*_^257*y^16843008*r;f[l]=g<<24|g>>>8,u[l]=g<<16|g>>>16,h[l]=g<<8|g>>>24,p[l]=g,r?(r=y^t[t[t[v^y]]],d^=t[t[d]]):r=d=1}}();var d=[0,1,2,4,8,16,32,64,128,27,54],l=r.AES=e.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,n=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],s=0;s<n;s++)if(s<r)o[s]=e[s];else{var c=o[s-1];s%r?r>6&&s%r==4&&(c=i[c>>>24]<<24|i[c>>>16&255]<<16|i[c>>>8&255]<<8|i[255&c]):(c=i[(c=c<<8|c>>>24)>>>24]<<24|i[c>>>16&255]<<16|i[c>>>8&255]<<8|i[255&c],c^=d[s/r|0]<<24),o[s]=o[s-r]^c}for(var a=this._invKeySchedule=[],l=0;l<n;l++){s=n-l;if(l%4)c=o[s];else c=o[s-4];a[l]=l<4||s<=4?c:f[i[c>>>24]]^u[i[c>>>16&255]]^h[i[c>>>8&255]]^p[i[255&c]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,o,s,c,a,i)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,f,u,h,p,n);r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,o,s,c){for(var a=this._nRounds,f=t[e]^r[0],u=t[e+1]^r[1],h=t[e+2]^r[2],p=t[e+3]^r[3],d=4,l=1;l<a;l++){var y=i[f>>>24]^n[u>>>16&255]^o[h>>>8&255]^s[255&p]^r[d++],_=i[u>>>24]^n[h>>>16&255]^o[p>>>8&255]^s[255&f]^r[d++],v=i[h>>>24]^n[p>>>16&255]^o[f>>>8&255]^s[255&u]^r[d++],g=i[p>>>24]^n[f>>>16&255]^o[u>>>8&255]^s[255&h]^r[d++];f=y,u=_,h=v,p=g}y=(c[f>>>24]<<24|c[u>>>16&255]<<16|c[h>>>8&255]<<8|c[255&p])^r[d++],_=(c[u>>>24]<<24|c[h>>>16&255]<<16|c[p>>>8&255]<<8|c[255&f])^r[d++],v=(c[h>>>24]<<24|c[p>>>16&255]<<16|c[f>>>8&255]<<8|c[255&u])^r[d++],g=(c[p>>>24]<<24|c[f>>>16&255]<<16|c[u>>>8&255]<<8|c[255&h])^r[d++];t[e]=y,t[e+1]=_,t[e+2]=v,t[e+3]=g},keySize:8});t.AES=e._createHelper(l)}();


const $ = new Env("腕表之家");
const _key = 'WBZJ_KEY';
var WBZJ_Cookie = $.getdata(_key) || ($.isNode() ? process.env.WBZJ_KEY : '');
const notify = $.isNode() ? require('./sendNotify') : '';

var message = "";
var publicKey, key, _ua, _url, _cookie

!(async() => {
    if (typeof $request != "undefined") {
        getCookie();
        return;
    }
    if (WBZJ_Cookie != undefined) {
        let obj = JSON.parse(WBZJ_Cookie); _url = obj.url, _ua = obj.ua, _cookie = obj.ck;
		await checkIn();
		await signin();
		console.log(message);//node,青龙日志
		await SendMsg(message);
    }else{
		$.msg($.name, '', '❌请先获取Cookie🎉');
	}
})()
    .catch((e) => {
        $.log("", `❌失败! 原因: ${e}!`, "");
    })
    .finally(() => {
        $.done();
    });

function getCookie() {
    if ($request && $request.method != 'OPTIONS') {
		let head = $request.headers;
        if($request.url.includes('/user/publicKey')){
            var session = {};
            session.url = $request.url.split('/user/publicKey')[0];
            head.hasOwnProperty('Cookie') ? session.ck = head['Cookie'] : session.ck = head['cookie'];
            $.setdata(JSON.stringify(session), _key);
        }
        if($request.url.includes('/common/welcome/')){
            session = JSON.parse($.getdata(_key));
            head.hasOwnProperty('User-Agent') ? session.ua = head['User-Agent'] : session.ua = head['user-agent'];
            $.setdata(JSON.stringify(session), _key);
            $.msg($.name, '获取Cookie成功🎉', JSON.stringify(session));
        }

    }
}

function checkIn() {
    return new Promise((resove) => {
        checkurl = _url +'/user/publicKey'
        headers = {'User-Agent': _ua,'Cookie': _cookie,}
        const rest = {url: checkurl,headers: headers};
        $.get(rest, (err, resp, data) => {
            try {
                resp.headers.hasOwnProperty('Set-Cookie') ? ck = JSON.stringify(resp.headers['Set-Cookie']) : ck = JSON.stringify(resp.headers['set-cookie'])
                //console.log(ck)
                publicKey = ck.split(';')[0].split('=')[1];
                key = decodeURIComponent(publicKey);
                key= key.slice(0,5) + key.slice(-11);
                //console.log(key)//密钥
                //message += `密钥:${key}\n`;
                return key
            } catch (e) {
                $.logErr(e,"❌查询：请重新登陆更新Cookie");
            } finally {
                resove()
            }
        })
    })
}

function signin() {
    return new Promise((resolve) => {
        headers = {'User-Agent': _ua, 'Cookie': `publicKey=${publicKey}; ${_cookie}`,}
        signurl = _url + '/sign/today';
        const rest = {url:signurl, headers:headers};
        $.get(rest, (error, response, data) => {
            try {
                //console.log('签到密文：'+data);
                data = AES_Decrypt(key,data)
                //console.log('签到明文：'+data);
                var obj = JSON.parse(data);
                //console.log(obj?.message)// 签到结果
                //console.log('金币：' + obj?.gold)
                message += `签到:${obj?.message}\n`;
            } catch (e) {
                $.logErr(e,"❌请重新登陆更新Cookie");
            } finally {
                resolve();
            }
        });
    });
}



//通知
async function SendMsg(message){$.isNode()?await notify.sendNotify($.name,message):$.msg($.name,"",message);}

//*****************************
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
