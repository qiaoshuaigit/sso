/*
 * 放款
 */

$(document).ready(function(){
   //还款计划、放款状态校验
    if(!'${message}'){
        $("#save_btn").attr("disabled","disabled");
        $("label[for='_upload_box']").attr("disabled","disabled");
        swal({
            title:"获取还款计划异常",
            text:"",
            type:"error"
        });
    }

    //checkMessage();

});


$("#save_btn").click(function () {
    if (!$("#updateStatus").val()) {
        swal({
            title: "放款状态不能为空",
            text: "",
            type: "warning"
        });
        return false;
    }
    if (!$("#payDate").val()) {
        swal({
            title: "实际放款日期不能为空",
            text: "",
            type: "warning"
        });
        return false;
    }
    if (!$("#paySuccessAmt").val()) {
        swal({
            title: "放款成功金额不能为空",
            text: "",
            type: "warning"
        });
        return false;
    }
    var payamtsuccess = parseInt($("#paiedSuccessAmt").val());
    var payamt = parseInt($("#payAmt").val());
    var paySuccessAmt = parseInt($("#paySuccessAmt").val());
    if (paySuccessAmt + payamtsuccess == payamt) {
        if ($("#repaymentDateMode").val() == -1) {
            swal({
                title: "还款日规则不能为空",
                text: "",
                type: "warning"
            });
            return false;
        }
        if (!$("#repayDay").val()) {
            swal({
                title: "账单日不能为空",
                text: "",
                type: "warning"
            });
            return false;
        }

    }
    $("#table-plan tr").each(function (i, v) {
        if ($("#table-plan tr").length <= 1) {
            swal({
                title: "还款计划不完整",
                text: "",
                type: "warning"
            });
            return false;
        }
        $(this).find("td").each(function (i, v) {
            if (!$.trim($(this).find("input").val())) {
                swal({
                    title: "还款计划不完整",
                    text: "",
                    type: "warning"
                });
                return false;
            }
        });
    });
    $("#planForm").ajaxSubmit({
        url: "/loan/releaseLoan",
        data: $("#planForm").serialize(),
        dataType: "json",
        type: "post",
        async: false,
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
                                return "/loan/toLoanRecordIndex";
                            },
                            text: function () {
                                return "放款列表";
                            },
                            data: function () {
                                return new Date().getTime();
                            }
                        });
                    }
                );
            } else {
                var message = data.message == null ? "放款异常" : data.message;
                swal({
                    title: message,
                    text: "",
                    type: "error"
                });
            }

        },
        error: function () {
            swal({
                title: "放款异常",
                text: "",
                type: "error",
            });
        }
    });
});

$("#planForm").validate({
    submitHandler: function (form) {
        //return false;
        //form.submit();
    },
    rules: {
        payStatus: "required",
        payDate: "required",
        paySuccessAmt: "checkMoney"
    },
    messages: {
        payStatus: "请选择放款状态",
        payDate: "请选择放款日期",
        paySuccessAmt: "请正确填写金额"
    }

});
//放款金额校验
jQuery.validator.addMethod("checkMoney", function (value, element) {
    var num = /^[0-9]*[1-9][0-9]*$/;
    if (!value) {
        $("#updateStatus").val("4");
        return true;
    } else if (num.test(value)) {
        var payamtsuccess = 0;
        if ($("#paiedSuccessAmt").val()) {
            payamtsuccess = parseInt($("#paiedSuccessAmt").val());
        }
        var payamt = parseInt($("#payAmt").val());
        if (value * 1 + payamtsuccess == payamt) {
            //getPlants();
            $("#updateStatus").val("3");
            $("#planDiv").css("display", "block");
        } else if (value * 1 + payamtsuccess < payamt) {
            $("#updateStatus").val("5");
            $("#planDiv").css("display", "none");
        } else if (value * 1 + payamtsuccess > payamt) {
            $("#planDiv").css("display", "none");
            return false;
        }
        return true;
    }
    return false;
}, "请正确填写金额");
