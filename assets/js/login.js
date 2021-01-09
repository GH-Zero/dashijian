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
