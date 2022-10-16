$(function(){
    var form = layui.form
    var layer = layui.layer

    initUserinfo()

    //限制输入的值
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6之间'
            }
        }
    })
    //获取用户信息资料
    function initUserinfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success: function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }
    //重置用户信息
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserinfo()
    })
    //提交表单数据
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success: function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})