/* 2018-1-8 08:17:12 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683】 */
L.widget.bindClass(L.widget.BaseWidget.extend({map:null,options:{resources:["view.css"],view:[{type:"append",url:"view.html"}]},create:function(){},winCreateOK:function(t,i){if("append"==t.type){$(".toolBar .widget-btn").each(function(){$(this).click(function(t){var i=$(this).attr("data-widget");haoutil.isutil.isNull(i)||L.widget.activate(i)})})}},activate:function(){},disable:function(){}}));