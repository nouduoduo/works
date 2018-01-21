//获取URL中的参数值
//name为URL中参数名，返回相应的参数值
function getURLPara(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}


//复选框全选与取消全选
//class="check_one" 引用于成员复选框中，class="check_all"引用于全选复选框
	$(function(){
		$('.check_all').click(function(){
			if($(this).prop('checked')){
				$('.check_one').prop('checked',true);
			}else{
				$('.check_one').prop('checked',false);
			}
		});
	});
	
	$(function(){
		$('.check_one').click(function(){	
			if($('.check_one:checked').length == $('.check_one').length)
			{
			 $('.check_all').prop('checked',true);
			}
			else
			{
			  $('.check_all').prop('checked',false);
			}
		});
	});
  //复选框全选与取消全选End

//时间戳格式化
function getLocalTime(timestr) {     
    return new Date(parseInt(timestr) * 1000).toLocaleString().substr(0,20)
}     

function dateFormat(datsStr)
        {
            const myDate = new Date(datsStr);
            myDate.getYear();        //获取当前年份(2位)
            const year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            const month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
            const date = myDate.getDate();        //获取当前日(1-31)
            myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
            myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
            const hour = myDate.getHours();       //获取当前小时数(0-23)
            const minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
            const seconds = myDate.getSeconds();     //获取当前秒数(0-59)
            
            return year+'-'+month+'-'+date+" "+hour+":"+minutes+":"+seconds;
 }
  
//设置前台当前页链接高亮
function setActionHref(path) {
    $("#navbar a").each(function () {
        var _href = $(this).attr('href');
        if(path===_href)
        {
            $(this).parent().addClass('active');
        }
    });

    $("#right-nav a").each(function () {
        var _href = $(this).attr('href');
        if(path===_href)
        {
            $(this).addClass('active');
        }
    });
}

//设置后台当前页链接高亮
function setManageActionHref(path) {
    $(".sidebar a").each(function () {
        var _href = $(this).attr('href');
        if(path===_href)
        {
            $(this).parent().addClass('active');
        }
    });

    $(".navbar-right a").each(function () {
        var _href = $(this).attr('href');
        if(path===_href)
        {
            $(this).parent().addClass('active');
        }
    });
}


