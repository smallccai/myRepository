$.ajaxPrefilter(function(option){
    //拼接根路径
    option.url='http://www.liulongbin.top:3007'+option.url
    //统一为有权限的访问设置请求头
    if(option.url.indexOf('/my/')!==-1){
        option.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }
    //统一设置访问客户权限的回调函数
    option.complete = function (res) {
        console.log(res)
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})