$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击按钮弹出选照片框
    var layer = layui.layer;
    $('#btn').click(function (e) {
        e.preventDefault();
        $('#fles').click();
    });
    $('#fles').change(function (e) {
        var fles = e.target.files;
        if (fles.length == 0) {
            return layer.msg('请选择图片')
        }
        var file = fles[0];
        var newPic = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newPic)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });
    // 点击上传图片时，发起post请求
    $('#sure').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                window.parent.show();
            }
        })
    })
})