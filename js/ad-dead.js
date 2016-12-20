//让那些百度搜索结果中的推广统统去死吧！
/*global $, chrome , console*/
$(function() {
	var count = 0;
	var toID= 0;

	var adDead = {
		checkUrl : function(){
			var self =  this;
			var Checkflag = 0,
				url = window.location.href;

			//手动添加不需要清除广告的域
			var notDel = [
				'taobao.com',
				'tmall.com',
				'jd.com'
			];

			//正则匹配
			for (var i = 0; i < notDel.length; i++) {
				var reg = new RegExp(notDel[i], 'g');
				if (reg.test(url)) {
					break;
				} else {
					if (i === notDel.length - 1) {
						Checkflag = 1;
					}
				}
			}
			
			if (Checkflag === 1) {
				chrome.storage.sync.get('ad_dead_filter_setting', function(obj){
					self.clear(obj.ad_dead_filter_setting);
				});
			}
		},
		clear: function(setting) {

			//指定清空容器idname
			var adIDName = [
				'content_left'
			];

			//此处添加广告框类名
			var adCssName = [
				'cproIframe_u410704_3',
				'img_ad',
				'hover_btn',
				'iframe_wrapper',
				'j_click_stats',
				'PJCsTW',
				'ec_tuiguang_ppouter'
			];
			var _setting = setting?setting.split(','):[];
			for(var k=0, len=_setting.length; k<len;k++){
				$('.'+_setting[k]).remove();
			}
			//双重清理 先找子节点
			for (var i = 0; i < adIDName.length; i++) {
				$('#' + adIDName[i] +' > div').each(function(i, obj){
					if((/广告/g).test($(obj).html())){
						$(obj).remove();
					}
				});
			}
			
			//再从子节点入手找父节点
			for (var K=0; K < adCssName.length; K++) {
				$('.' + adCssName[K]).closest('div').parent().remove();
			}
		},
		init: function() {
			this.checkUrl();
		}
	};
	window.adDead = adDead;
	$(document).ready(function() {
		function dead(){
			adDead.init();
			//为防止ajax异步延时加载的广告隔1s再清除一次
			toID = setInterval(function() {
				adDead.init();
				count++;
				if(count > 3){
					clearInterval(toID);
				}
			}, 3000);
		}
		//读取配置
		chrome.storage.sync.get('ad_dead_btn_status', function(obj){
			if(obj.ad_dead_btn_status){
				dead();
				//搜索按钮点击后重新dead
				$('input.s_btn[type="submit"]').bind('click', function(){
					dead();
				});
			}
		});
	});
});
