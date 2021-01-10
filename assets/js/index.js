$(function () {
    var layer = layui.layer;
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            $('.hello').html(res.data.username)
            if (res.data.user_pic !== null) {
                $('.geren').hide()
                $('.layui-nav-img').attr('str', res.data.user_pic).show();
            } else {
                var text = res.data.username
                $('.geren').html(text[0].toUpperCase()).show();
                $('.layui-nav-img').hide();
            }
        }
    })

    // 点击退出
    $('.tui').click(function () {
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = 'login.html'
        });
    })
    g
})