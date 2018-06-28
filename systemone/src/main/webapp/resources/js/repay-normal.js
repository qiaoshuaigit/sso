/*
 * 还款类型：正常还款
 */
$("#repay-btn").click(function(){
    $("#mainForm").ajaxSubmit({
        url: "/repayrecord/normalRepay",
        data: $("#mainForm").serialize(),
        dataType: "json",
        type: "post",
        //async:false,
        success: function (data) {
            if (data.flag == 'SUCCESS') {
                var message = data.message == null ? "操作成功" : data.message;
                swal({
                        title: message,
                        text: "",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "关闭",
                        closeOnConfirm: false
                    }, function () {
                         window.parent.closeCurrentPage();
                        window.parent.ParentMenuItem({
                            attr: function () {
                                return "/repayrecord/toIndex";
                            },
                            text: function () {
                                return "正常还款";
                            },
                            data: function () {
                                return new Date().getTime();
                            }
                        });
                    }
                );
            } else {
                var message = data.message == null ? "还款异常" : data.message;
                swal({
                    title: message,
                    text: "",
                    type: "error"
                });
            }

        },
        error: function () {
            swal({
                title: "还款异常",
                text: "",
                type: "error",
            });
        }
    });
});
