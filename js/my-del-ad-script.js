//注入页面的脚本文件
;
$(function() {

	var clearAd = {
		//由于manifest文件匹配规则只有通配没有非功能，所以可在此处添加不想删除广告的页面
		checkUrl: function() {
			var Checkflag = 0,
				url = window.location.href;

			//手动添加不需要清除广告的域
			var notDel = [
				"taobao.com",
				"tmall.com",
				"jd.com"
			];

			//正则匹配
			for (var i = 0; i < notDel.length; i++) {
				var reg = new RegExp(notDel[i], "g");

				if (reg.test(url)) {
					console.log('非百度相关页面，请放心浏览！');
					break;
				} else {
					if (i == notDel.length - 1) {
						Checkflag = 1;
					}
				}
			}
			
			if (Checkflag == 1) {
				this.clear();
				this.findSomeAdPossible();
			}
		},
		clear: function() {
			console.log('去死吧，推广！');

			//去掉百度推广
			var ad_css_name = [
				"PJCsTW",
				"ec_tuiguang_ppouter"
			];


			for (var i = 0; i < ad_css_name.length; i++) {
				$('.' + ad_css_name[i]).closest('.TNEOpc,.szGBIy').remove();
			}
		},
		//简单的智能算法
		findSomeAdPossible: function() {
			var sap = $('div iframe'),
				ad_img = $('div script').parent().find('img,embed'),
				float_img = $('div object').parent().find('img,embed');

			this.arrayDel(sap, 360, 200);
			this.arrayDel(ad_img, 350, 150);
			this.arrayDel(float_img, 350, 150);
		},
		arrayDel: function(arr, conWidth, conHeight) {
			var len = arr.length;

			for (var i = 0; i < len; i++) {
				var self = arr.eq(i);

				if (self.width() <= conWidth || self.height() <= conHeight) {
					self.remove();
				}

			}
		},
		init: function() {
			this.checkUrl();
		}
	}

	$(document).ready(function() {
		clearAd.init();

		//为防止ajax异步延时加载的广告隔4s再清除一次
		setTimeout(function() {
			clearAd.init();
		}, 4000)
	});
})