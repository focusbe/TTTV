var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz))}function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz))}function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz))}function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data))}function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data))}function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data))}function md5_vm_test(){return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72"}function core_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t)}function core_hmac_md5(key,data){var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C}var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128)}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function str2binl(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin}function binl2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str}function binl2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF)}return str}function binl2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F)}}return str}
var key_17={
	base64:function(str){var c1,c2,c3,c4;var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);var i=0,len=str.length,string="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&255]}while(i<len&&c1==-1);if(c1==-1){break}do{c2=base64DecodeChars[str.charCodeAt(i++)&255]}while(i<len&&c2==-1);if(c2==-1){break}string+=String.fromCharCode((c1<<2)|((c2&48)>>4));do{c3=str.charCodeAt(i++)&255;if(c3==61){return string}c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1){break}string+=String.fromCharCode(((c2&15)<<4)|((c3&60)>>2));do{c4=str.charCodeAt(i++)&255;if(c4==61){return string}c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1){break}string+=String.fromCharCode(((c3&3)<<6)|c4)}return string},
	 basea17kdv:function(e,$key) {
	$key =hex_md5($key);
	$key_length = $key["length"];
	var $string = key_17.base64(e);
	$string_length = $string["length"];
	$rndkey = new window["Array"]();
	$box = new window["Array"]();
	$result = '';
	for ($i = 0; $i <= 255; $i++) {
		$rndkey[$i] = $key["charCodeAt"]($i % $key_length);
		$box[$i] = $i
	}
	for ($j = $i = 0; $i < 256; $i++) {
		$j = ($j + $box[$i] + $rndkey[$i]) % 256;
		$tmp = $box[$i];
		$box[$i] = $box[$j];
		$box[$j] = $tmp
	}
	for ($a = $j = $i = 0; $i < $string_length; $i++) {
		$a = ($a + 1) % 256;
		$j = ($j + $box[$a]) % 256;
		$tmp = $box[$a];
		$box[$a] = $box[$j];
		$box[$j] = $tmp;
		$result += window["String"]["fromCharCode"]($string["charCodeAt"]([$i]) ^ ($box[($box[$a] + $box[$j]) % 256]))
	}
	if ($result["substr"](0, 8) == hex_md5($result["substr"](8) + $key)["substr"](0, 8)) {
		if (!e) {
			videodata = $result["substr"](8)
		} else {
			return $result["substr"](8)
		}
	}
},Base64:function () {
 // private property
 _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 // public method for encoding
 this.encode = function (input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = _utf8_encode(input);
  while (i < input.length) {
   chr1 = input.charCodeAt(i++);
   chr2 = input.charCodeAt(i++);
   chr3 = input.charCodeAt(i++);
   enc1 = chr1 >> 2;
   enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
   enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
   enc4 = chr3 & 63;
   if (isNaN(chr2)) {
    enc3 = enc4 = 64;
   } else if (isNaN(chr3)) {
    enc4 = 64;
   }
   output = output +
   _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
   _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
 }
 // public method for decoding
 this.decode = function (input) {
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
   enc1 = _keyStr.indexOf(input.charAt(i++));
   enc2 = _keyStr.indexOf(input.charAt(i++));
   enc3 = _keyStr.indexOf(input.charAt(i++));
   enc4 = _keyStr.indexOf(input.charAt(i++));
   chr1 = (enc1 << 2) | (enc2 >> 4);
   chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
   chr3 = ((enc3 & 3) << 6) | enc4;
   output = output + String.fromCharCode(chr1);
   if (enc3 != 64) {
    output = output + String.fromCharCode(chr2);
   }
   if (enc4 != 64) {
    output = output + String.fromCharCode(chr3);
   }
  }
  output = _utf8_decode(output);
  return output;
 }
 // private method for UTF-8 encoding
 _utf8_encode = function (string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
   var c = string.charCodeAt(n);
   if (c < 128) {
    utftext += String.fromCharCode(c);
   } else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
   } else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
   }
  }
  return utftext;
 }
 // private method for UTF-8 decoding
 _utf8_decode = function (utftext) {
  var string = "";
  var i = 0;
  var c = c1 = c2 = 0;
  while ( i < utftext.length ) {
   c = utftext.charCodeAt(i);
   if (c < 128) {
    string += String.fromCharCode(c);
    i++;
   } else if((c > 191) && (c < 224)) {
    c2 = utftext.charCodeAt(i+1);
    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    i += 2;
   } else {
    c2 = utftext.charCodeAt(i+1);
    c3 = utftext.charCodeAt(i+2);
    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    i += 3;
   }
  }
  return string;
 }
},post_:function(url,key,t,key_a,p)
	{
		
		var data;$.ajax({url: './?a=get_api&url=' + url + '&key=' + key + '&t=' + t+'&u='+key_a+'&p='+p,type: "POST",dataType: "json",async: false,success: function(a){data=a;document.getElementById("guid").value =a.key;}});
	
return data;
	}
	}
	eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0 6=2.3(7).5;0 1=4.8(2.3(9).5);0 a=4.b(6,1);',12,12,'var|key_data|document|getElementById|key_17|value|data_17|mk1|base64|mk2|url_data|basea17kdv'.split('|'),0,{}))
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 0=5 6.7();1=0.2(1);3=0.2(3);',8,8,'b|url_data|encode|key_data|var|new|key_17|Base64'.split('|'),0,{}))	


	



var maxsizs = $(window).height();
$(document).ready(function() {
  $(".dplayer .dplayer-video-wrap").css("height", maxsizs);
});
function maxscreen() {
  $(".dplayer .dplayer-video-wrap").css("height", "100%");
}
function sscreen() {
  $(".dplayer .dplayer-video-wrap").css("height", maxsizs);
}
var play = key_17.post_(
  url_data,
  key_data,
  "Cjf2pTR+a3AIKSdkn7Q085ZsC3OaKkaZ3ScsAUX+VM2+3SZE6Yk",
  "TW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDUuMDsgU00tRzkwMFAgQnVpbGQvTFJYMjFUKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNjMuMC4zMjM5LjEzMiBNb2JpbGUgU2FmYXJpLzUzNy4zNg==",
  returnCitySN["cip"]
);
var play_config = {
  play_display: function(p) {
    if (navigator.userAgent.match(/.*Mobile.*/)) {
      var json_data = key_17.basea17kdv(play.data, key_17.base64(play.key));
      json_data = JSON.parse(key_17.base64(json_data));
      if (json_data.a == "") {
        var wap = json_data.f;
      } else {
        var wap = json_data.a;
      }
      json_data.a = encodeURIComponent(json_data.a);
      var params = {
        bgcolor: "#FFF",
        allowFullScreen: true,
        allowScriptAccess: "always",
        wmode: "transparent"
      };
      var video = [wap];
      var flashvars = json_data;
      CKobject.embed(
        "./baiyug_ck/baiyug_ck.swf?v=20150316",
        "a1",
        "ckplayer_a1",
        "100%",
        "99.9%",
        false,
        flashvars,
        video,
        params
      );
      play_config.wap_video_img("ckplayer_a1", json_data.apkey);
    } else {
      if (p == "dpay") {
        var dp3 = new DPlayer({ confis: { b: play.data } });
        var ui = document.getElementById("a1");
        ui.style.display = "none";
        play_config.wap_video_img("dplayer-video");
      }
      if (p == "ckpay") {
        var json_data = key_17.basea17kdv(play.data, key_17.base64(play.key));
        json_data = JSON.parse(key_17.base64(json_data));
        var wap = json_data.a;
        json_data.a = encodeURIComponent(json_data.a);
        var params = {
          bgcolor: "#FFF",
          allowFullScreen: true,
          allowScriptAccess: "always",
          wmode: "transparent"
        };
        var video = [wap];
        var flashvars = json_data;
        CKobject.embed(
          "./baiyug_ck/baiyug_ck.swf?v=20150316",
          "a1",
          "ckplayer_a1",
          "100%",
          "99.9%",
          false,
          flashvars,
          video,
          params
        );
        play_config.wap_video_img("ckplayer_a1", json_data.apkey);
      }
    }
  },
  wap_video_img: function(id, akey) {
    if (navigator.userAgent.match(/.*Mobile.*/)) {
      // 来自手机
      document.getElementById(id).poster = "";
      var auto_play = "null";
      if (auto_play != "null") {
        document.getElementById(id).autoplay = "null";
      }
      document
        .getElementById("ckplayer_a1")
        .addEventListener("click", function(ev) {
          copy(akey);
        });
    }
  }
};
play_config.play_display(play.play);
function copy(str) {
  var save = function(e) {
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  };
  document.addEventListener("copy", save);
  document.execCommand("copy");
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
var skin = getQueryString("skin");
var skinSettings = {
  "47ks": {
    cptdef:
      "0x2a2a2a,0xff7800,100,10,0xFFFFFF,0xffffff,10,10,1,3,自动,12,MicrosoftYaHei|微软雅黑,0x2a2a2a,10,100,5,5,5,10,15,0x2a2a2a,0x2a2a2a,100,10,0xFFFFFF,0xff7800,10,10,1,3,12,MicrosoftYaHei|微软雅黑,28,0x000000,0,0,0,0",
    cptdefopt: "definition.swf,2,2,-240,-35,2,1|",
    pm_mylogo: "1,1,-465,-300"
  },
  youku: {
    cptdef: "",
    cptdefopt: "",
    pm_mylogo: "1,1,-100,-55"
  }
};
function ckcpt() {
  var cpt = "";
  if (skin && typeof skinSettings[skin] != "undefined") {
    if (skinSettings[skin].cptdefopt) {
      cpt += skinSettings[skin].cptdefopt;
    }
  } else {
    cpt += "definition.swf,2,2,-260,-30,2,1|";
  }
  cpt += "downloadspeeds.swf,2,2,-380,-30,2,1|"; //xz
  //t += 'speed.swf,2,2,-305,-31,2,1|'; //xz
  cpt += "definition.swf,2,2,-240,-33,2,1|"; //qxd
  cpt += "time.swf,2,0,-110,45,0,0|"; //time
  cpt += "scaling.swf,0,0,0,0,2,0|";

  return cpt;
}
function ckstyle() {
  var ck = {
    cpath: skin ? "skin_" + skin + ".swf" : "",
    language: "",
    flashvars: "",
    setup:
      "1,1,1,1,1,2,0,1,2,0,0,1,200,0,2,1,0,1,1,1,1,10,3,0,1,2,3000,0,0,0,0,1,1,1,1,1,1,250,0,90,0,0,0",
    pm_bg: "0x000000,100,230,180",
    mylogo: "logo.swf", //LOGO
    pm_mylogo: "1,1,-465,-300",
    pm_logo: "2,0,-100,20",
    control_rel: "related.swf,ckplayer/related.xml,0",
    control_pv: "Preview.swf,105,2000",
    pm_repc: "",
    pm_spac: "|",
    pm_fpac: "file->f",
    pm_advtime: "2,0,-110,10,0,300,0",
    pm_advstatus: "1,2,2,-200,-40",
    pm_advjp: "1,1,2,2,-100,-40",
    pm_padvc: "2,0,-13,-13",
    pm_advms: "2,2,-46,-67",
    pm_zip: "1,1,-20,-8,1,0,0",
    pm_advmarquee: "1,2,50,-70,50,20,0,0x000000,50,0,20,1,30,2000",
    pm_glowfilter: "1,0x01485d, 100, 6, 3, 10, 1, 0, 0",
    advmarquee: escape(""),
    mainfuntion: "",
    flashplayer: "",
    calljs: "ckplayer_status,ckadjump,playerstop,ckmarqueeadv",
    myweb: escape(""),
    cpt_lights: "0",
    cpt_share: "",
    cpt_definition_text: "标清,高清,超清,蓝光",
    cpt_definition:
      skin && typeof skinSettings[skin] != "undefined"
        ? skinSettings[skin].cptdef
        : "0x2a2a2a,0xff7800,100,10,0xFFFFFF,0xffffff,10,10,1,3,自动,12,MicrosoftYaHei|微软雅黑,0x2a2a2a,10,100,5,5,5,10,15,0x2a2a2a,0x2a2a2a,100,10,0xFFFFFF,0xff7800,10,10,1,3,12,MicrosoftYaHei|微软雅黑,28,0x000000,0,0,0,0",
    cpt_list: ckcpt()
  };
  return ck;
}
(function() {
  var CKobject = {
    _K_: function(d) {
      return document.getElementById(d);
    },
    _T_: false,
    _M_: false,
    _G_: false,
    _Y_: false,
    _I_: null,
    _J_: 0,
    _O_: {},
    _Q_: "CDEFGHIJKLMNOPQRSTUVWXYZcdefghijklmnopqrstuvwxyz",
    _S_: "value",
    uaMatch: function(
      u,
      rMsie,
      rFirefox,
      rOpera,
      rChrome,
      rSafari,
      rSafari2,
      mozilla,
      mobile
    ) {
      var match = rMsie.exec(u);
      if (match != null) {
        return {
          b: "IE",
          v: match[2] || "0"
        };
      }
      match = rFirefox.exec(u);
      if (match != null) {
        return {
          b: match[1] || "",
          v: match[2] || "0"
        };
      }
      match = rOpera.exec(u);
      if (match != null) {
        return {
          b: match[1] || "",
          v: match[2] || "0"
        };
      }
      match = rChrome.exec(u);
      if (match != null) {
        return {
          b: match[1] || "",
          v: match[2] || "0"
        };
      }
      match = rSafari.exec(u);
      if (match != null) {
        return {
          b: match[2] || "",
          v: match[1] || "0"
        };
      }
      match = rSafari2.exec(u);
      if (match != null) {
        return {
          b: match[1] || "",
          v: match[2] || "0"
        };
      }
      match = mozilla.exec(u);
      if (match != null) {
        return {
          b: match[1] || "",
          v: match[2] || "0"
        };
      }
      match = mobile.exec(u);
      if (match != null) {
        return {
          b: match[1] || "",
          v: match[2] || "0"
        };
      } else {
        return {
          b: "unknown",
          v: "0"
        };
      }
    },
    browser: function(e) {
      var u = navigator.userAgent,
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
        rFirefox = /(firefox)\/([\w.]+)/,
        rOpera = /(opera).+version\/([\w.]+)/,
        rChrome = /(chrome)\/([\w.]+)/,
        rSafari = /version\/([\w.]+).*(safari)/,
        rSafari2 = /(safari)\/([\w.]+)/,
        mozilla = /(mozilla)\/([\w.]+)/,
        mobile = /(mobile)\/([\w.]+)/;
      var c = u.toLowerCase();
      var defaultUA =
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1696.137 Safari/537.36";
      var d = this.uaMatch(
        c,
        rMsie,
        rFirefox,
        rOpera,
        rChrome,
        rSafari,
        rSafari2,
        mozilla,
        mobile
      );
      if (d.b) {
        b = d.b;
        v = d.v;
      }
      if (e != "" && (mozilla.exec(c) || rOpera.exec(c))) {
        return {
          B: this._K_(this._Q_.split("")[32]),
          V: /Chrome\/([\w.]+)/i
            .exec(mozilla.test(e) ? e : defaultUA)[1]
            .split(".")
        };
      }
      return {
        B: b,
        V: v
      };
    },
    Platform: function() {
      var w = "";
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var b = {
        iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1,
        iPad: u.indexOf("iPad") > -1,
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        webKit: u.indexOf("AppleWebKit") > -1,
        trident: u.indexOf("Trident") > -1,
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
        presto: u.indexOf("Presto") > -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
        webApp: u.indexOf("Safari") == -1
      };
      for (var k in b) {
        if (b[k]) {
          w = k;
          break;
        }
      }
      return w;
    },
    isHTML5: function() {
      return !!document.createElement("video").canPlayType;
    },
    getType: function() {
      return this._T_;
    },
    getVideo: function() {
      var v = "";
      var s = this._E_["v"];
      if (s && s.length > 1) {
        for (var i = 0; i < s.length; i++) {
          var a = s[i].split("->");
          if (a.length >= 1 && a[0] != "") {
            v += '<source src="' + a[0] + '"';
          }
          if (a.length >= 2 && a[1] != "") {
            v += ' type="' + a[1] + '"';
          }
          v += ">";
        }
      }
      return v;
    },
    getVars: function(k) {
      var o = this._A_;
      if (typeof o == "undefined") {
        return null;
      }
      if (k in o) {
        return o[k];
      } else {
        return null;
      }
    },
    getParams: function() {
      var p = "";
      if (this._A_) {
        if (parseInt(this.getVars("p")) == 1) {
          p += 'loop webkit-playsinline preload="auto"';
        }
        if (parseInt(this.getVars("e")) == 1) {
          // p += ' loop="loop"';
        }
        if (parseInt(this.getVars("p")) == 2) {
          //  p += ' preload="auto"';
        }
        if (this.getVars("i")) {
          p += ' poster="' + this.getVars("i") + '"';
        }
      }
      return p;
    },
    getpath: function(z) {
      var f = this._Q_;
      var w = z.substr(0, 1);
      if (
        f.indexOf(w) > -1 &&
        (z.substr(0, 4) == w + "://" || z.substr(0, 4) == w + ":\\")
      ) {
        return z;
      }
      var d = unescape(window.location.href).replace("file:///", "");
      var k = parseInt(document.location.port);
      var u = document.location.protocol + "//" + document.location.hostname;
      var l = "",
        e = "",
        t = "";
      var s = 0;
      var r = unescape(z).split("//");
      if (r.length > 0) {
        l = r[0] + "//";
      }
      var h = "http|https|ftp|rtsp|mms|ftp|rtmp|file";
      var a = h.split("|");
      if (k != 80 && k) {
        u += ":" + k;
      }
      for (i = 0; i < a.length; i++) {
        if (a[i] + "://" == l) {
          s = 1;
          break;
        }
      }
      if (s == 0) {
        if (z.substr(0, 1) == "/") {
          t = u + z;
        } else {
          e = d.substring(0, d.lastIndexOf("/") + 1).replace("\\", "/");
          var w = z.replace("../", "./");
          var u = w.split("./");
          var n = u.length;
          var r = w.replace("./", "");
          var q = e.split("/");
          var j = q.length - n;
          for (i = 0; i < j; i++) {
            t += q[i] + "/";
          }
          t += r;
        }
      } else {
        t = z;
      }
      return t;
    },
    getXhr: function() {
      var x;
      try {
        x = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          x = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          x = false;
        }
      }
      if (!x && typeof XMLHttpRequest != "undefined") {
        x = new XMLHttpRequest();
      }
      return x;
    },
    getX: function() {
      var f = "ckstyle()";
      if (this.getVars("x") && parseInt(this.getVars("c")) != 1) {
        f = this.getVars("x") + "()";
      }
      try {
        if (typeof eval(f) == "object") {
          this._X_ = eval(f);
        }
      } catch (e) {
        try {
          if (typeof eval(ckstyle) == "object") {
            this._X_ = ckstyle();
          }
        } catch (e) {
          this._X_ = ckstyle();
        }
      }
    },
    getSn: function(s, n) {
      if (n >= 0) {
        return this._X_[s].split(",")[n];
      } else {
        return this._X_[s];
      }
    },
    getUrl: function(L, B) {
      var C = this;
      var b = ["get", "utf-8"];
      if (L && L.length == 2) {
        var a = L[0];
        var c = L[1].split("/");
        if (c.length >= 2) {
          b[0] = c[1];
        }
        if (c.length >= 3) {
          b[1] = c[2];
        }
        this.ajax(b[0], b[1], a, function(s) {
          if (s && s != "error") {
            var d = "",
              e = s;
            if (s.indexOf("}") > -1) {
              var f = s.split("}");
              for (var i = 0; i < f.length - 1; i++) {
                d += f[i] + "}";
                var h = f[i].replace("{", "").split("->");
                if (h.length == 2) {
                  C._A_[h[0]] = h[1];
                }
              }
              e = f[f.length - 1];
            }
            C._E_["v"] = e.split(",");
            if (B) {
              C.showHtml5();
            } else {
              C.changeParams(d);
              C.newAdr();
            }
          }
        });
      }
    },
    getflashvars: function(s) {
      var v = "",
        i = 0;
      if (s) {
        for (var k in s) {
          if (i > 0) {
            v += "&";
          }
          if (k == "f" && s[k] && !this.getSn("pm_repc", -1)) {
            s[k] = this.getpath(s[k]);
            if (s[k].indexOf("&") > -1) {
              s[k] = encodeURIComponent(s[k]);
            }
          }
          if (k == "y" && s[k]) {
            s[k] = this.getpath(s[k]);
          }
          v += k + "=" + s[k];
          i++;
        }
      }
      return v;
    },
    getparam: function(s) {
      var w = "",
        v = "",
        o = {
          allowScriptAccess: "always",
          allowFullScreen: true,
          quality: "high",
          bgcolor: "#000"
        };
      if (s) {
        for (var k in s) {
          o[k] = s[k];
        }
      }
      for (var e in o) {
        w += e + '="' + o[e] + '" ';
        v += '<param name="' + e + '" value="' + o[e] + '" />';
      }
      w = w.replace("movie=", "src=");
      return {
        w: w,
        v: v
      };
    },
    getObjectById: function(s) {
      var C = this;
      if (C._T_) {
        C._V_ = C._K_(s);
        return C;
      }
      var x = null,
        y = C._K_(s),
        r = "embed";
      if (y && y.nodeName == "OBJECT") {
        if (typeof y.SetVariable != "undefined") {
          x = y;
        } else {
          var z = y.getElementsByTagName(r)[0];
          if (z) {
            x = z;
          }
        }
      }
      return x;
    },
    ajax: function(b, u, s, f) {
      var x = this.getXhr();
      var a = [],
        m = "";
      if (b == "get") {
        if (s.indexOf("?") > -1) {
          m = s + "&t=" + new Date().getTime();
        } else {
          m = s + "?t=" + new Date().getTime();
        }
        x.open("get", m);
      } else {
        a = s.split("?");
        (s = a[0]), (m = a[1]);
        x.open("post", s, true);
      }
      x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      x.setRequestHeader("charset", u);
      if (b == "post") {
        x.send(m);
      } else {
        x.send(null);
      }
      x.onreadystatechange = function() {
        if (x.readyState == 4) {
          var g = x.responseText;
          if (g != "") {
            f(g);
          } else {
            f(null);
          }
        }
      };
    },
    addListener: function(e, f) {
      var o = this._V_;
      switch (e) {
        case "time":
          e = "timeupdate";
          this.AT = f;
          f = this.addListenerTime;
          break;
        case "totaltime":
          this.ATAll = f;
          return;
          break;
        default:
          break;
      }
      if (typeof f == "string") {
        f = eval(f);
      }
      if (o.addEventListener) {
        try {
          o.addEventListener(e, f, false);
        } catch (e) {
          this.getNot();
        }
      } else if (o.attachEvent) {
        try {
          o.attachEvent("on" + e, f);
        } catch (e) {
          this.getNot();
        }
      } else {
        o["on" + e] = f;
      }
    },
    removeListener: function(e, f) {
      var o = this._V_;
      switch (e) {
        case "time":
          e = "timeupdate";
          this.AT = null;
          break;
        case "totaltime":
          this.ATAll = null;
          return;
          break;
        default:
          break;
      }
      if (typeof f == "string") {
        f = eval(f);
      }
      if (o.removeEventListener) {
        try {
          o.removeEventListener(e, f, false);
        } catch (e) {
          this.getNot();
        }
      } else if (o.detachEvent) {
        try {
          o.detachEvent("on" + e, f);
        } catch (e) {
          this.getNot();
        }
      } else {
        o["on" + e] = null;
      }
    },
    Flash: function() {
      var f = false,
        v = 0;
      if (
        document.all ||
        this.browser("")
          ["B"].toLowerCase()
          .indexOf("ie") > -1
      ) {
        try {
          var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          f = true;
          var z = s.GetVariable("$version");
          v = parseInt(z.split(" ")[1].split(",")[0]);
        } catch (e) {}
      } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
          var s = navigator.plugins["Shockwave Flash"];
          if (s) {
            f = true;
            var w = s.description.split(" ");
            for (var i = 0; i < w.length; ++i) {
              if (isNaN(parseInt(w[i]))) {
                continue;
              }
              v = parseInt(w[i]);
            }
          }
        }
      }
      return {
        f: f,
        v: v
      };
    },
    embed: function(f, d, i, w, h, b, v, e, p, j) {
      var s = ["all"];
      if (b) {
        if (this.isHTML5()) {
          this.embedHTML5(d, i, w, h, e, v, s, j);
        } else {
          this.embedSWF(f, d, i, w, h, v, p);
        }
      } else {
        if (this.Flash()["f"] && parseInt(this.Flash()["v"]) > 10) {
          this.embedSWF(f, d, i, w, h, v, p);
        } else if (this.isHTML5()) {
          this.embedHTML5(d, i, w, h, e, v, s, j);
        } else {
          this.embedSWF(f, d, i, w, h, v, p);
        }
      }
    },
    embedSWF: function(C, D, N, W, H, V, P) {
      if (!N) {
        N = "ckplayer_a1";
      }
      if (!P) {
        P = {
          bgcolor: "#FFF",
          allowFullScreen: true,
          allowScriptAccess: "always",
          wmode: "transparent"
        };
      }
      this._A_ = V;
      this.getX();
      var u = "undefined",
        g = false,
        j = document,
        r = "http://www.macromedia.com/go/getflashplayer",
        t =
          '<a href="' +
          r +
          '" target="_blank">请点击此处下载安装最新的flash插件</a>',
        error = {
          w: "您的网页不符合w3c标准，无法显示播放器",
          f: "您没有安装flash插件，无法播放视频，" + t,
          v: "您的flash插件版本过低，无法播放视频，" + t
        },
        w3c =
          typeof j.getElementById != u &&
          typeof j.getElementsByTagName != u &&
          typeof j.createElement != u,
        i = 'id="' + N + '" name="' + N + '" ',
        s = "",
        l = "";
      P["movie"] = C;
      P["flashvars"] = this.getflashvars(V);
      if (W == -1) {
        d = true;
        this._K_(D).style.width = "100%";
        W = "100%";
      }
      s += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ';
      s += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
      s +=
        'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ';
      s += 'width="' + W + '" ';
      s += 'height="' + H + '" ';
      s += i;
      s += 'align="middle">';
      s += this.getparam(P)["v"];
      s += "<embed ";
      s += this.getparam(P)["w"];
      s +=
        ' width="' +
        W +
        '" height="' +
        H +
        '" name="' +
        N +
        '" id="' +
        N +
        '" align="middle" ' +
        i;
      s += 'type="application/x-shockwave-flash" pluginspage="' + r + '" />';
      s += "</object>";
      if (!w3c) {
        l = error["w"];
        g = true;
      } else {
        if (!this.Flash()["f"]) {
          l = error["f"];
          g = true;
        } else {
          if (this.Flash()["v"] < 11) {
            l = error["v"];
            g = true;
          } else {
            l = s;
            this._T_ = false;
          }
        }
      }
      if (l) {
        this._K_(D).innerHTML = l;
      }
      if (g) {
        this._K_(D).style.color = "#0066cc";
        this._K_(D).style.lineHeight = this._K_(D).style.height;
        this._K_(D).style.textAlign = "center";
      }
    },
    embedHTML5: function(C, P, W, H, V, A, S, J) {
      this._E_ = {
        c: C,
        p: P,
        w: W,
        h: H,
        v: V,
        s: S,
        j: J == undefined || J ? true : false
      };
      this._A_ = A;
      this.getX();
      (b = this.browser("")["B"]),
        (v = this.browser("")["V"]),
        (x = v.split(".")),
        (t = x[0]),
        (m = b + v),
        (n = b + t),
        (w = ""),
        (s = false),
        (f = this.Flash()["f"]),
        (a = false);
      if (!S) {
        S = ["iPad", "iPhone", "ios"];
      }
      for (var i = 0; i < S.length; i++) {
        w = S[i];
        if (w.toLowerCase() == "all") {
          s = true;
          break;
        }
        if (w.toLowerCase() == "all+false" && !f) {
          s = true;
          break;
        }
        if (w.indexOf("+") > -1) {
          w = w.split("+")[0];
          a = true;
        } else {
          a = false;
        }
        if (this.Platform() == w || m == w || n == w || b == w) {
          if (a) {
            if (!f) {
              s = true;
              break;
            }
          } else {
            s = true;
            break;
          }
        }
      }
      if (s) {
        if (V) {
          var l = V[0].split("->");
          if (l && l.length == 2 && l[1].indexOf("ajax") > -1) {
            this.getUrl(l, true);
            return;
          }
        }
        this.showHtml5();
      }
    },
    status: function() {
      this._H_ = parseInt(this.getSn("setup", 20));
      var f = "ckplayer_status";
      if (this.getSn("calljs", 0) != "") {
        f = this.getSn("calljs", 0);
      }
      try {
        if (typeof eval(f) == "function") {
          this._L_ = eval(f);
          this._M_ = true;
          return true;
        }
      } catch (e) {
        try {
          if (typeof eval(ckplayer_status) == "function") {
            this._L_ = ckplayer_status;
            this._M_ = true;
            return true;
          }
        } catch (e) {
          return false;
        }
      }
      return false;
    },
    showHtml5: function() {
      var C = this;
      var p = C._E_["p"],
        a = C._E_["v"],
        c = C._E_["c"],
        j = "",
        b = false;
      var s = this._E_["v"];
      var w = C._E_["w"],
        h = C._E_["h"];
      var d = false;
      var r = "";
      if (s.length == 1) {
        r = ' src="' + s[0].split("->")[0] + '"';
      }
      if (w == -1) {
        d = true;
        C._K_(c).style.width = "100%";
        w = "100%";
      }
      if (w.toString().indexOf("%") > -1) {
        w = "100%";
      }
      if (h.toString().indexOf("%") > -1) {
        h = "100%";
      }
      if (C._E_["j"]) {
        j = ' controls="controls"';
      }
      var v =
        "<video" +
        j +
        r +
        ' id="' +
        p +
        '" width="' +
        w +
        '" height="' +
        h +
        '"' +
        C.getParams() +
        " webkit-playsinline type=video/mp4>" +
        C.getVideo() +
        "</video>";
      C._K_(c).innerHTML = v;
      C._K_(c).style.backgroundColor = "#000";
      C._V_ = C._K_(p);
      if (!d) {
        C._K_(c).style.width =
          C._E_["w"].toString().indexOf("%") > -1
            ? C._K_(c).offsetWidth * parseInt(C._E_["w"]) * 0.01 + "px"
            : C._V_.width + "px";
        C._K_(c).style.height =
          C._E_["h"].toString().indexOf("%") > -1
            ? C._K_(c).offsetHeight * parseInt(C._E_["h"]) * 0.01 + "px"
            : C._V_.height + "px";
      }
      C._P_ = false;
      C._T_ = true;
      if (C.getVars("loaded") != "") {
        var f = C.getVars("loaded") + "()";
        try {
          if (typeof eval(f) == "function") {
            eval(f);
          }
        } catch (e) {
          try {
            if (typeof eval(loadedHandler) == "function") {
              loadedHandler();
            }
          } catch (e) {}
        }
      }
      C.status();
      C.addListener("play", C.playHandler);
      C.addListener("pause", C.playHandler);
      C.addListener("error", C.errorHandler);
      C.addListener("emptied", C.errorHandler);
      C.addListener("loadedmetadata", C.loadedMetadataHandler);
      C.addListener("ended", C.endedHandler);
      C.addListener("volumechange", C.volumeChangeHandler);
      if (
        (C.getVars("m") != "" && C.getVars("m") != null) ||
        parseInt(C.getSn("setup", 0)) > 0
      ) {
        C._K_(c).style.cursor = "pointer";
      }
      if (
        (C.getVars("m") != "" && C.getVars("m") != null) ||
        parseInt(C.getSn("setup", 1)) == 1
      ) {
        C.addListener("click", C.html5Click);
      }
    },
    addListenerTime: function() {
      var C = CKobject;
      if (C.AT) {
        C.AT(C._V_["currentTime"]);
      }
    },
    videoPlay: function() {
      if (this._T_) {
        this._V_.play();
      }
    },
    videoPause: function() {
      if (this._T_) {
        this._V_.pause();
      }
    },
    playOrPause: function() {
      if (this._T_) {
        if (this._V_.paused) {
          this._V_.play();
        } else {
          this._V_.pause();
        }
      }
    },
    fastNext: function() {
      if (this._T_) {
        this._V_["currentTime"] = this._V_["currentTime"] + 10;
      }
    },
    fastBack: function() {
      if (this._T_) {
        this._V_["currentTime"] = this._V_["currentTime"] - 10;
      }
    },
    changeVolume: function(n) {
      if (n < 0 || n > 100) {
        return;
      }
      if (this._T_) {
        this._V_["volume"] = n * 0.01;
      }
    },
    videoSeek: function(t) {
      if (this._T_) {
        this._V_["currentTime"] = t;
      }
    },
    newAddress: function(u) {
      var s = [];
      if (u) {
        s = this.isHtml5New(u);
      } else {
        return;
      }
      if (s && this._T_) {
        this.changeParams(u);
        var l = s[0].split("->");
        if (l && l.length == 2 && l[1].indexOf("ajax") > -1) {
          this.getUrl(l, false);
          return;
        }
        this._E_["v"] = s;
        this.newAdr();
      }
    },
    quitFullScreen: function() {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    },
    changeStatus: function(n) {
      this._H_ = n;
    },
    newAdr: function() {
      var s = this._E_["v"];
      this._V_.pause();
      if (s.length == 1) {
        this._V_.src = s[0].split("->")[0];
      } else {
        this._V_["innerHTML"] = this.getVideo();
      }
      this._V_.load();
    },
    isHtml5New: function(s) {
      if (s.indexOf("html5") == -1) {
        return false;
      }
      var a = s.replace(/{/g, "");
      var b = a.split("}");
      var c = "";
      for (var i = 0; i < b.length; i++) {
        if (b[i].indexOf("html5") > -1) {
          c = b[i].replace("html5->", "").split(",");
          break;
        }
      }
      return c;
    },
    changeParams: function(f) {
      if (f) {
        var a = f.replace(/{/g, "");
        var b = a.split("}");
        var c = "";
        for (var i = 0; i < b.length; i++) {
          var d = b[i].split("->");
          if (d.length == 2) {
            switch (d[0]) {
              case "p":
                if (parseInt(d[1]) == 1) {
                  this._V_.autoplay = true;
                } else if (parseInt(d[1]) == 2) {
                  this._V_.preload = "metadata";
                } else {
                  this._V_.autoplay = false;
                  if (this._I_ != null) {
                    clearInterval(this._I_);
                    this._I_ = null;
                  }
                }
                break;
              case "e":
                if (parseInt(d[1]) == 1) {
                  this._V_.loop = true;
                } else {
                  this._V_.loop = false;
                }
                break;
              case "i":
                this._V_.poster = d[1];
                break;
              default:
                break;
            }
          }
        }
      }
    },
    frontAdPause: function(s) {
      this.getNot();
    },
    frontAdUnload: function() {
      this.getNot();
    },
    changeFace: function(s) {
      this.getNot();
    },
    plugin: function(a, b, c, d, e, f, g) {
      this.getNot();
    },
    videoClear: function() {
      this.getNot();
    },
    videoBrightness: function(s) {
      this.getNot();
    },
    videoContrast: function(s) {
      this.getNot();
    },
    videoSaturation: function(s) {
      this.getNot();
    },
    videoSetHue: function(s) {
      this.getNot();
    },
    videoWAndH: function(a, b) {
      this.getNot();
    },
    videoWHXY: function(a, b, c, d) {
      this.getNot();
    },
    changeFlashvars: function(a) {
      this.getNot();
    },
    changeMyObject: function(a, b) {
      this.getNot();
    },
    getMyObject: function(a, b) {
      this.getNot();
    },
    changeeFace: function() {
      this.getNot();
    },
    changeStyle: function(a, b) {
      this.getNot();
    },
    promptLoad: function() {
      this.getNot();
    },
    promptUnload: function() {
      this.getNot();
    },
    marqueeLoad: function(a, b) {
      this.getNot();
    },
    marqueeClose: function(s) {
      this.getNot();
    },
    videoError: function(s) {
      this.getNot();
    },
    formatUrl: function(s) {
      this.getNot();
    },
    sendJS: function(s) {
      this.getNot();
    },
    plugAttribute: function(s) {
      this.getNot();
    },
    errorTextShow: function(s) {
      this.getNot();
    },
    openUrl: function(s) {
      window.open(s);
    },
    jsonParse: function(s) {
      this.getNot();
    },
    promptShow: function(s, x, y) {
      this.getNot();
    },
    screenShot: function(s, x, y, x2, y2) {
      this.getNot();
    },
    fullScreen: function() {
      this.getNot();
    },
    allowFull: function() {
      this.getNot();
    },
    loadButton: function() {
      this.getNot();
    },
    getFile: function() {
      this.getNot();
    },
    textBoxShow: function() {
      this.getNot();
    },
    loadElement: function() {
      this.getNot();
    },
    textBoxClose: function() {
      this.getNot();
    },
    textBoxTween: function() {
      this.getNot();
    },
    getNot: function() {
      var s = "The ckplayer's API for HTML5 does not exist";
      return s;
    },
    volumeChangeHandler: function() {
      var C = CKobject;
      if (C._V_.muted) {
        C.returnStatus("volumechange:0", 1);
        C._O_["volume"] = 0;
        C._O_["mute"] = true;
      } else {
        C._O_["mute"] = false;
        C._O_["volume"] = C._V_["volume"] * 100;
        C.returnStatus("volumechange:" + C._V_["volume"] * 100, 1);
      }
    },
    endedHandler: function() {
      var C = CKobject;
      var e = parseInt(C.getVars("e"));
      C.returnStatus("ended", 1);
      if (C._I_) {
        clearInterval(C._I_);
        C._I_ = null;
      }
      if (e != 0 && e != 4 && e != 6) {
        return;
      }
      if (e == 6) {
        this.quitFullScreen();
      }
      var f = "playerstop()";
      if (C.getSn("calljs", 2) != "") {
        f = C.getSn("calljs", 2) + "()";
      }
      try {
        if (typeof eval(f) == "function") {
          eval(f);
          return;
        }
      } catch (e) {
        try {
          if (typeof eval(playerstop) == "function") {
            playerstop();
            return;
          }
        } catch (e) {
          return;
        }
      }
    },
    loadedMetadataHandler: function() {
      var C = CKobject;
      C.returnStatus("loadedmetadata", 1);
      C._O_["totalTime"] = C._V_["duration"];
      C._O_["width"] = C._V_["width"];
      C._O_["height"] = C._V_["height"];
      C._O_["awidth"] = C._V_["videoWidth"];
      C._O_["aheight"] = C._V_["videoHeight"];
      if (C._V_.defaultMuted) {
        C.returnStatus("volumechange:0", 1);
        C._O_["mute"] = true;
        C._O_["volume"] = 0;
      } else {
        C._O_["mute"] = false;
        C._O_["volume"] = C._V_["volume"] * 100;
        C.returnStatus("volumechange:" + C._V_["volume"] * 100, 1);
      }
      if (parseInt(C.getVars("p")) == 1) {
        C.playHandler();
      }
      if (C.ATAll) {
        C.ATAll(C._V_["duration"]);
      }
    },
    errorHandler: function() {
      CKobject.returnStatus("error", 1);
    },
    playHandler: function() {
      var C = CKobject;
      if (C._V_.paused) {
        C.returnStatus("pause", 1);
        C.addO("play", false);
        if (C._I_ != null) {
          clearInterval(C._I_);
          C._I_ = null;
        }
      } else {
        C.returnStatus("play", 1);
        C.addO("play", true);
        if (!C._P_) {
          C.returnStatus("play", 1);
          C._P_ = true;
        }
        C._I_ = setInterval(C.playTime, parseInt(C.getSn("setup", 37)));
        if (!C._G_) {
          C._G_ = true;
          for (var k in C._A_) {
            if (k == "g" && C._A_[k]) {
              var g = parseInt(C._A_[k]);
              C.videoSeek(g);
            }
          }
        }
        if (!C._Y_) {
          C._Y_ = true;
          for (var k in C._A_) {
            if (k == "j" && C._A_[k]) {
              var j = parseInt(C._A_[k]);
              if (j > 0) {
                C._J_ = j;
              } else {
                C._J_ = parseInt(C._O_["totalTime"]) + j;
              }
            }
          }
        }
      }
    },
    html5Click: function() {
      var C = CKobject;
      if (C.getVars("m") != "" && C.getVars("m") != null) {
        window.open(C.getVars("m"));
      }
    },
    returnStatus: function(s, j) {
      var h = s;
      if (this._H_ == 3) {
        h = this._E_["p"] + "->" + h;
      }
      if (this._M_ && j <= this._H_) {
        this._L_(h);
      }
    },
    addO: function(s, z) {
      this._O_[s] = z;
    },
    getStatus: function() {
      return this._O_;
    },
    playTime: function() {
      var C = CKobject;
      var t = C._V_["currentTime"];
      C._O_["time"] = t;
      if (C._J_ > 0 && t > C._J_) {
        C._J_ = 0;
        C.videoSeek(C._O_["totaltime"]);
      }
      C.returnStatus("time:" + t, 1);
    }
  };
  window.CKobject = CKobject;
})();
//alert(document.getElementById(mk2).value);
