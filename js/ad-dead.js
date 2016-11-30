//让那些百度搜索结果中的推广统统去死吧！
;
$(function() {
	var count = 0;
	var timeId = 0;

	var adDead = {
		checkUrl : function(){
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
				var reg = new RegExp(notDel[i], "g");

				if (reg.test(url)) {
					console.log('This page does not clear ads.');
					break;
				} else {
					if (i == notDel.length - 1) {
						Checkflag = 1;
					}
				}
			}
			
			if (Checkflag == 1) {
				this.clear();
			}
		},
		clear: function() {

			//配置百度推广相关clsname
			var ad_css_name = [
				"PJCsTW",
				"ec_tuiguang_ppouter"
			];
			//指定清空容器idname
			var ad_id_name = [
				'content_left'
			];

			//此处添加广告框类名
			var ad_css_name = [
				"cproIframe_u410704_3",
				"img_ad",
				"hover_btn",
				"iframe_wrapper",
				"j_click_stats"
			];
			//双重清理 先找子节点
			for (var i = 0; i < ad_id_name.length; i++) {
				$('#' + ad_id_name[i] +' > div').each(function(i,obj){
					if($(obj).find('.ec_tuiguang_ppouter').length !=0){
						$(obj).remove()
					}
				});
			}
			//再从子节点入手找父节点
			for (var i = 0; i < ad_css_name.length; i++) {
				$('.' + ad_css_name[i]).closest('div').parent().remove();
			}
		},
		init: function() {
			this.checkUrl();
		}
	}

	$(document).ready(function() {
		function dead(){
			adDead.init();
			//为防止ajax异步延时加载的广告隔1s再清除一次
			timeid = setInterval(function() {
				adDead.init();
				count++;
				if(count > 3){
					clearInterval(timeid);
				}
			}, 1000);
		}
		dead();
		//搜索按钮点击后重新dead
		$('input.s_btn[type="submit"]').bind('click',function(e){
			dead();
		});
	});
})