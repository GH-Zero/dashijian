$(function () {
    showText()
    function showText() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                var temText = template('text', res);
                $('tbody').html(temText)
            }
        })
    }
    // 点击添加弹出框
    var item = null;
    $('#addBtn').click(function () {
        item = layui.layer.open({
            type: 1,
            title: '添加类型',
            area: ['500px', '300px'],
            content: $('#add').html(),
        });

    })
    // 添加
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                showText()
                layui.layer.close(item)
            }
        })
    })
    // 修改
    var item1 = null;
    $('body').on('click', '#exit', function () {
        item1 = layui.layer.open({
            type: 1,
            title: '添加类型',
            area: ['500px', '300px'],
            content: $('#exits').html(),
        });
        var id = $(this).attr('data_id');
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'get',
            success: function (res) {
                layui.form.val('text1', res.data)
            }
        })
        $('body').on('submit', '#exitForm', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/my/article/updatecate',
                method: 'post',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message);
                    showText();
                    layui.layer.close(item1)
                }
            })
        })

    })
    // 点击删除事件
    $('body').on('click', '#del', function (e) {
        var id = $(this).attr('data_id');
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'get',
                success: function (res) {
                    if (res.status !== 0) {
                        layui.layer.msg(res.message);
                    }
                    layui.layer.msg(res.message);
                    showText();
                }
            })
            layer.close(index);
        });
    })

})