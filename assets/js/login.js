$(function () {
    $('#reg_link').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show();
    })
    $('#login_link').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide();
    })
})
// 判断用户格式
var form = layui.form;
form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须12位，且开头不能为空格'
    ]
})
