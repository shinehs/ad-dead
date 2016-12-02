/*
* @Author: shine
* @Date:   2016-12-02 10:52:57
* @Last Modified by:   hs
* @Last Modified time: 2016-12-02 11:39:58
*/

'use strict';
$(document).ready(function(){
    var setting = "";
    function locStore(name,item,exp){
      var res = true;
      if(window.localStorage){
          item && localStorage.setItem(''+name,item);
          !item && (res = localStorage.getItem(''+name));
      }else{
          item && $.cookie(''+name,item,exp);
          !item && (res = $.cookie(''+name));
      }
      return res;
  	}
    try{
    	setting = locStore('ad_dead_filter_setting');
    }catch(c){
    	console.log(c);
    }
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
       sendResponse({'arr':locStore('ad_dead_filter_setting')});
    })
});