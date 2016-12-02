/*
* @Author: shine
* @Date:   2016-12-02 09:40:47
* @Last Modified by:   hs
* @Last Modified time: 2016-12-02 12:29:02
*/

'use strict';
$(function(){

  //check setting status
  function checkStatus(){
  	chrome.storage.sync.get('ad_dead_btn_status',function(obj){
  		$('.cbtn')[0].checked = obj.ad_dead_btn_status;
  	});
  	chrome.storage.sync.get('ad_dead_filter_setting',function(obj){
  		$('#rules').val(obj.ad_dead_filter_setting?obj.ad_dead_filter_setting.replace(/\，/g,','):'');
  	});
  }

  //save setting
  function saveStatus(){
  	chrome.storage.sync.set({'ad_dead_btn_status':$('.cbtn').is(":checked")});
  	chrome.storage.sync.set({'ad_dead_filter_setting':$('#rules').val().replace(/\，/g,',')});
  }

  $('.button').on('click',function(e){
  	saveStatus();
  	//TODO
  	// chrome.extension.sendMessage({cmd: "getNewsArr"},function(response) {
    //      console.log(response.arr);
    //  });
  });

  //listener
  function bindEvent(){
  	$('#rules,.cbtn').on('change',function(e){
  		saveStatus();
  	});
  }

  //initialize
  function init(){
  	bindEvent();
  	checkStatus();
  }
  init();
})