$(function () {
    $.ajax({
        url: '/my/article/cates',
        method: 'get',
        success: function (res) {
            // console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            var text = template('show', res)
            $('#select').html(text);
            layui.form.render();
        }
    })
    // 编辑器初始化
    initEditor()
    // 封面图片
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 点击图片上传
    $('#btn').click(function () {
        $('#files').click();
    })
    $('#files').change(function (e) {
        var file = e.target.files;
        if (file.length == 0) return layui.layer.msg('请选择图片');
        var files = file[0];
        var pic = URL.createObjectURL(files);
        $image.cropper('replace', pic)
    });
    // 点击草稿变成草稿
    var flag = '已发布'
    $('#caogao').click(function () {
        flag = "草稿";
    })
    $('#submits').submit(function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        fd.append('state', flag);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                $.ajax({
                    url: '/my/article/add',
                    method: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layui.layer.msg(res.message)
                        }
                        var a = window.parent.document.querySelector('#a2');
                        a.click();
                    }
                })

            })
        fd.forEach(item => {
            console.log(item);
        })
    })
})