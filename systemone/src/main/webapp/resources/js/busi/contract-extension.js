//以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        element.closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.parent().parent().parent());
        } else {
            error.appendTo(element.parent());
        }
    },
    errorClass: "help-block m-b-none",
    validClass: "help-block m-b-none"
});
var web = undefined;
function contractExtension(contractId,ctx) {
	web = ctx;
	$("#extensionForm")[0].reset();
	$("#extension-form #contractId").val(contractId);
	$("#extension").attr("href","#extension-form");
    $("#extension").trigger("click");
}
//返回
$("#btnExtensionClose").bind("click",function(){
   $("#extension-form-closer").click();
   $("#uploadStatus").text("暂未上传");
   return false;
});
//查看物料
function viewFile(){
	var fileIdsVal = $("#fileIds").val();
	if(!fileIdsVal){
		swal("请先上传文件", "", "success");
		return false;
	}
	//测试数据
	//fileIdsVal = "161,160,159,158,157,156,155,154,153,152,151";
	var layerIndex = parent.layer.open({
        //title: "报盘明细（"+offerBatchNumber+"）",
        title:'物料下载',
        type: 2,
        content: web+'/contractExtension/listFileData?fileIds='+fileIdsVal,
        area: ['600px', '500px'],
        maxmin: false,
        btn: ['重新上传', '关闭页面','打包下载'],
        yes:function(index,layero){
        	$("#fileIds").val("");
        	$("#uploadStatus").text("暂未上传");
        	parent.layer.close(index);
        },
        btn2:function(index,layero){
        	console.log("关闭页面");
        },
        btn3:function(index,layero){
        	layero.find('iframe')[0].contentWindow.downLoadFileData();
        },
        success:function(layero){
        	
        }
    });
 	//弹出即全屏
    //parent.layer.full(layerIndex);
}
//以下为官方示例
$().ready(function () {
	$("#uploadStatus").click(function(){viewFile();});
    // validate signup form on keyup and submit
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#extensionForm").validate({
        rules: {
        	renewAmt: {
                required: true,
                minlength: 2
            },
            periodNum: {
                required: true,
                digits:true,
                min:1,
                max:9
            },
            monthRate: {
            	required: true,
            	min:0.00000000000001,
            	max:9.99999999999999,
            	maxlength: 8
            },
            monthAverageRate: {
            	required: true,
            	min:0.00000000000001,
            	max:9.99999999999999,
            	maxlength: 8
            }
        },
        messages: {
        	renewAmt: {
                required: icon + "请输入您的展期金额",
                minlength: icon + "展期基恩必须2个字符以上"
            },
            periodNum: {
            	required: icon + "请输入展期期限",
            	digits: icon + "展期期限只能输入数字",
            	min: icon + "展期期限最小值为1",
            	max: icon + "展期期限最大值为9"
            },
            monthRate:{
            	required: icon + "请输入您的展期月利率",
            	min: icon + "展期月利率必须大于0",
            	max: icon + "展期月利率必须小于10",
            	maxlength: icon + "展期月利率最多8个字符"
            },
            monthAverageRate:{
            	required: icon + "请输入您的展期月综合费率",
            	min: icon + "展期月综合费率必须大于0",
            	max: icon + "展期月综合费率必须小于10",
            	maxlength: icon + "展期月综合费率最多8个字符"
            } 
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: web+"/contractExtension/contractExtensionApply",
                data: $(form).serialize(),
                dataType: "json",
                success: function (result) {
                    if (result.success) {
                        //todo
                        $("#extension-form-closer").click();
                        swal(result.msg, "", "success");
                    }else{
                    	swal(result.msg, "", "error");
                    }
                },
                error: function (xhr) {
                }
            });
            return false;
        }
    });
});

$("#import").click(function(){
	importFileID.click();
});
//选择文件
$("#importFileID").on("change",function(e){
    if (typeof e.target.files[0] == 'object') {
        var file = e.target.files[0];
        uploadFile(file);
        return false;
    }
});
//上传文件
function uploadFile(file){
	var formData = new FormData();
    formData.append("upload", file);
    $.ajax({
    	url: web+'/contractExtension/upload',
        type: 'POST',
        data:formData,
        cache: false,
        processData: false,
        contentType: false
    }).done(function (result) {
    	$("#importFileID").val("");
    	if(result.success){
    		var fileIdsVal = $("#fileIds").val();
    		//alert(JSON.stringify(result.obj));
    		$("#fileIds").val(fileIdsVal?fileIdsVal+","+result.obj.id:result.obj.id);
    		$("#uploadStatus").text("查看物料");
    		swal(result.msg,"","success");
    	}else{
    		swal(result.msg,"","error");
    	}
    	//swal(result.msg,"","success");
    }).fail(function(result){
    	$("#importFileID").val("");
    	swal("文件上传失败","","error");
    }); 
}