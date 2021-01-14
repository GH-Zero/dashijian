$(function () {
    // 定义数据传入data
    q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    // 判断时间个位数直接改成0+数字
    function num(data) {
        return data = data > 0 ? '0' + data : data;
    }
    // 根据筛选时间格式
    template.defaults.imports.fileName = function (data) {
        var fd = new Date(data);
        var y = fd.getFullYear();
        var m = num(fd.getMonth() + 1);
        var d = num(fd.getDay());

        var h = num(fd.getHours());
        var f = num(fd.getMinutes());
        var mm = num(fd.getSeconds());
        return y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + mm
    }
    // 将数据展示在表格内
    show()
    function show() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layui.layer.msg(res.message);
                var text = template('showData', res);
                $('tbody').html(text)
                pageShow(res.total)
            }
        })
    }
    textShow()
    function textShow() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                var text1 = template('option', res)
                $('#select').html(text1);
                layui.form.render();
            }

        })
    }

    $('body').on('submit', '#formText', function (e) {
        e.preventDefault();
        var cate_id = $('[name= cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        show()
    })

    // 点击删除事件
    $('tbody').on('click', '.del', function () {
        var id = $(this).attr('data_id');
        var num = $('.del').length;
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layui.layer.msg(res.message);
                    if (num == 1 ) {
                        q.pagenum = q.pagenum == 1 ? q.pagenum : q.pagenum - 1;
                    }
                   
                    show();
                }
            })
            layer.close(index);
        });

    })
    // 分页

    function pageShow(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                limit: q.pagesize,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3,5, 6],
                curr: q.pagenum,
                jump: function (obj, first) {
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    if (!first) {
                        show();
                    }
                }
            });
        });
    }
})