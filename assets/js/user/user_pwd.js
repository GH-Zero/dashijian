$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        oldPwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        mewPwd: function (value) {
            if (value == $('.old').val()) {
                return '旧密码和新密码一样'
            }
        },
        regPwd: function (value) {
            if (value !== $('.new')) {
                return '两次新密码不一样'
            }
        }
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })
})