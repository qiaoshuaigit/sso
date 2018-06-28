/**
 * Created by xiaow on 2017/2/8.
 */
$.get("resources/tpl/edit_refund.html?v=" + new Date().getTime(), function (html) {
    var $modal = $(html);
    $modal.find("#filestyle-0").change(function () {
        $modal.find("[name='fileName']").val(this.files[0].name);
    });
    if (!$.fn.ajaxSubmit) {
        console.error("缺少必要插件：jquery.ajaxSubmit");
        return;
    }

    $modal.find(".btn-confirm").click(function () {
        //jquery.validate被修改，这里会造成样式问题，所以手动校验
        var refundAmount=parseFloat($("#refundAmount").val());
        var max=parseFloat($("#refundAmount").attr("max"));
        if(refundAmount==""){
         swal("请输入退款金额");return;
        }
        if(refundAmount>max){
         swal("退款金额最大只能为："+max+"元");return;
        }
        if($('input[name="fileName"]').val()==""){
          swal("请上传附件");return;
        }

        $modal.find("form").ajaxSubmit({
            url: "refund/create",
            type: "post",
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    swal({
                        title: "余额退款",
                        text: "退款成功",
                        type: "info"
                    },function () {
                        $modal.modal("hide");
                    });
                } else {
                    swal("退款失败，" + result.message);
                }
            }
        });
    });
    $modal.appendTo("body");

});
/**
 * 创建退款
 * @param contractId
 */
function createRefund(contractId) {
    var $modal = $("#_refund_modal");
    $modal.find("form")[0].reset();
    $.getJSON("refund/balance/" + contractId + "?ts=" + new Date().getTime(), function (result) {
        if (result.success) {
            var maxAmount=result["balanceAmount"];
            $modal.find('.max').text(maxAmount);
            $modal.find('input[name="refundAmount"]').attr("max",maxAmount);
            $modal.find('input[name="contractId"]').val(contractId);
            $modal.modal("show");
        } else {
            swal("获取余额失败，"+result.message);
        }
    });
}