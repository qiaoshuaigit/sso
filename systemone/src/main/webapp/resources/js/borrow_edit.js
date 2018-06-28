for (var i = 0; i < adjunctFiles.length; i++) {
    addAdjunctFile(adjunctFiles[i]);
}
var $form = $("#mainForm");
$form.validate();
var loadingId;
$('#_upload_box').change(function () {
    var filename=this.files[0].name;
    var suffix="none";
    if(filename.indexOf(".")>0){
        suffix=filename.substr(filename.lastIndexOf(".")+1,filename.length);
    }
    var mockData={
        id:0,
        url:"#",
        name:filename,
        suffix:suffix
    };
    $("#file-list").empty();
    addAdjunctFile(mockData);
});
/**
 * 追加附件信息
 * @param file
 */
function addAdjunctFile(file) {
    var tpl = "<li data-file='"+file["id"]+"'><input type='hidden' name='adjunctFileId' value='" + file["id"]
        + "'/><a target='_blank' href='" + file["url"]+ "'";
    if(file.id==0){
        tpl+=" onclick='return false' ";
    }
    tpl+="  class='i_" + file['suffix'] + "' title=''><span>" + file["name"] + "</span></a><a class='remove' data-file-id='"+file["id"]+"' title='删除' onclick='removeAdjunctFile(this)'><i class='glyphicon glyphicon-trash'></i></a></li>";
    $(tpl).appendTo("#file-list");
}

/**
 * 选择出借人回调事件
 * @param val
 */
function onLenderInfoChange(data) {
    $('input[name="lenderInfo.id"]').val(data['id']);
    $('input[name="lenderInfo.cardNum"]').val(data['cardNum']);
    $('input[name="lenderInfo.bankBranch"]').val(data['bankBranch']);
    $('input[name="lenderInfo.phoneNumber"]').val(data['phoneNumber']);
    $('input[name="lenderInfo.bankAccount"]').val(data['bankAccount']);
    $('input[name="lenderInfo.bankName"]').val(data['bankName']);
}
/**
 * 提交表单
 * @param type
 */
function submitForm(type) {
    if (!$form.valid()) {
        var $firstErrorInput=$(".form-control.error").first();
        var msg=$firstErrorInput.siblings(".error").text();
        window.scrollTo(0,$firstErrorInput.offset().top);
        swal(msg);
        return;
    }
    var loading = layer.load();
    $("#action").val(type);
    //转为json再提交
    $("#coborrowers").val(JSON.stringify(coborrowers));
    $("#assurers").val(JSON.stringify(assurers));
    var $mortgages=$("#mortgages");
    $("#mortgages").empty();
    for(var i=0;i<mortgages.length;i++){
        $('<input type="hidden" name="mortgages" value="'+mortgages[i].id+'">').appendTo($mortgages);
    }

    $form.ajaxSubmit({
        url: "borrow/submit",
        type:"post",
        dataType:"json",
        success: function (result) {
            layer.close(loading);
            if (result.success) {
                //如果创建成功，则询问是否继续编辑
                if (result.isCreated) {
                    afterCreateContract(result.contractId);
                } else {
                    if (type == "save") {
                        swal("保存成功");
                        if(result["newAttach"]){
                            $("#file-list").empty();
                            addAdjunctFile(result["newAttach"]);
                        }
                    } else {
                        afterSubmitContract();
                    }
                }
            } else {
                swal("保存失败，" + result.message);
            }

        }
    });
}
function afterCreateContract(contractId) {
    var opts = {
        title: "创建成功！",
        text: "您可以关闭当前页面或继续编辑",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "继续编辑",
        cancelButtonText: "关闭页面"
    };
    swal(opts, function () {
            var currentPageId = window.parent.getCurrentPageDataId();
            //打开编辑界面
            window.parent.ParentMenuItem({
                attr: function () {
                    return "borrow/edit/" + contractId;
                },
                text: function () {
                    return "编辑进件-" + $('#contractNum').val()
                },
                data: function () {
                    return new Date().getTime();
                }
            });
            //关闭新建页面
            window.parent.closePage(currentPageId);
        },
        function () {
            window.parent.closeCurrentPage();
        });
}
/**
 * 提交审核后，关闭当前页面
 */
function afterSubmitContract() {
    swal({
            title: "提交成功！",
            text: "审核已经提交，点击【关闭】",
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "关闭"
        },
        function () {
            window.parent.closeCurrentPage();
        }
    );
}

/**
 * 删除附件
 * @param a
 */
function removeAdjunctFile(a) {
    var fileId=$(a).data('file-id');
    if(fileId==0){
        $('li[data-file="'+fileId+'"]').remove();
        $("#_upload_box").val("");
        return;
    }
    var opts = {
        title: "您确定要删除该附件吗？",
        text: "注意：该操作不可恢复！",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
    };
    swal(opts,function(){
        $.getJSON("attach/remove/"+fileId,function(result){
            if(result.success){
                $('li[data-file="'+fileId+'"]').remove();
            }else{
                swal("删除附件失败");
            }
        });
    });

}
/**
 * 计算服务费
 */
function calcServiceFee() {
  var  loadingId = layer.load();
    $("#mainForm").ajaxSubmit({
        url: "borrow/calc?ts="+new Date().getTime(),
        type: "post",
        dataType: "json",
        success: function (result) {
            layer.close(loadingId);
            if (result.success) {
                for (var key in result.data) {
                    $("[name='contractInfo." + key + "']").val(result.data[key]);
                }
            } else {
                swal("计算失败，" + result.message);
            }
        }
    });

}

function toggleOtherInfo(a) {
    var $div=$('#otherInfo');
    $(a).find("i").toggleClass("glyphicon-arrow-right").toggleClass("glyphicon-arrow-down");
    if($div.css("height")=="0px"){
        $div.css("height","auto");
    }else{
        $div.css('height','0');
    }

}