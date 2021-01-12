$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: [
            /^[\S]{2,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    show1()
    function show1() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                form.val('hehe', res.data)
            }
        })
    }
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.show();
            }
        })
    });
    $('.layui-btn-primary').click(function (e) {
        e.preventDefault();
        show1()
    })
})