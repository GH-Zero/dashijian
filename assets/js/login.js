$(function () {
    $('#reg_link').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show();
    })
    $('#login_link').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide();
    })
    // 判断用户格式
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须12位，且开头不能为空格'
        ],
        re_pwd: function (value) { //value：表单的值、item：表单的DOM对象
            if (value != $('#password').val()) {
                return '两次密码不一致，请重新输入';
            }
        }
    })
    // 点击事件
    $('#login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功');
                // console.log(res);
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })
    $('#reg').on('submit', function (e) {
        e.preventDefault();
        // 'http://api-breakingnews-web.itheima.net'
        $.post('/api/reguser', { username: $('#reg [name=username]').val(), password: $('#reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#login_link').click();
        })
    })
})
