/**
 * Created by admin on 2017/12/25.
 */
function signUpValidator() {
    var ret = true;
   // if(!validator.isMobilePhone($("#phone").val(),'zh-CN')){
    //     alert("手机号码格式不正确");
    //     ret = false;
    //     $("#phone").val(" ");
    //     $("#phone").focus();
    //     return
    // };

    if(isNaN($("#loginName").val())) {
        if(!validator.isEmail($("#loginName").val(), 'zh-CN'))
        {
            ret = false;
            //alert("邮箱格式不正确！");
            $("#loginName-err").html("邮箱格式不正确！");
            $("#loginName").addClass("form-control-err");
            $("#loginName").focus();
        }
    } else
    {
        if(!validator.isMobilePhone($("#loginName").val(), 'zh-CN'))
        {
            ret = false;
            $("#loginName-err").html("手机格式不正确！");
            $("#loginName-err").css("color","red");
            $("#loginName").focus();
            return
        }
    }
    if(!validator.isLength($("#pwd").val(),{min:6, max:12})){
        alert("密码长度6~12位字符");
        ret = false;
        $("#pwd").focus();
        return
    }
    if($("#pwd").val()!== $("#inputPassword4").val()){
        alert("两次输入的密码不相等");
        ret = false;
        $("#inputPassword4").focus();
        return
    }
    if( ($("#captcha").val()).trim().length!=4) {
        ret = false;
        alert("验证码不正确");
        $("#repwd").focus();
        return
    }
    return ret
}

//检查登录名的唯一性

function checkedLoginName() {
$("#loginName-err").html("");
    var para = "loginName="+$("#loginName").val();
    $.ajax({
        url:'/checked-login-name',
        type: 'POST',
        async:true,
        data:para,
        success: function(data)
        {

            if(parseInt(data.code)== 0)
            {
                // $("#ErrorMsg,#ErrorMsg-panle").show();
                // $("#ErrorMsg").html(data.msg);
                alert(data.msg);
            }

            if(parseInt(data.code)==1)
            {
                alert(data.msg);

            }
        }

    })

}








function signInValidator() {
    var ret = true;
    if(!validator.isMobilePhone($("#inputTel").val(),'zh-CN')){
        alert("手机号码格式不正确");
        ret = false;
        $("#inputTel").val(" ");
        $("#inputTel").focus();
        return
    };
    if(!validator.isLength($("#inputPassword3").val(),{min:6, max:12})){
        alert("密码长度6~12位字符");
        ret = false;
        $("#inputPassword3").focus();
        return
    }
    if( ($("#inputPassword5").val()).trim().length!=4)
    {
        ret = false;
        alert("验证码不正确");
        $("#inputPassword5").focus();
        return
    }
}