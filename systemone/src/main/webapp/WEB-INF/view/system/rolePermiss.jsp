<!DOCTYPE html>
<%@ include file="../include/include.jsp" %>
<%@ page session="false" pageEncoding="UTF-8" isELIgnored="false" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<html lang="zh">

<head>
    <meta http-equiv="content-type" content="text/html, charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <link href="${ctx}/resources/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctx}/resources/css/font-awesome.min.css?v=4.3.0" rel="stylesheet">
    <link href="${ctx}/resources/css/plugins/jqgrid/ui.jqgrid.css?0820" rel="stylesheet">
    <link href="${ctx}/resources/css/animate.css" rel="stylesheet">
    <link href="${ctx}/resources/css/style.css?v=3.2.0" rel="stylesheet">
    <link href="${ctx}/resources/img/favicon.ico" rel="icon">
    <link href="${ctx}/resources/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">

    <div class="tabs-container">

        <div class="panel-body">

            <!--查询条件begin-->
            <div class="ibox float-e-margins">
                <div class="ibox-content clearfix">
                    <form role="form" class="form-inline" action="${ctx}/user/export" id="queryForm">
                        <shiro:hasRole name="001">
                            <button type="button" class="btn btn-primary" id="add-btn">保存</button>
                        </shiro:hasRole>
                    </form>
                </div>
            </div>
            <!--查询条件end-->

            <div class="panel panel-default">
                <div class="panel-heading">角色信息</div>
                <table class="table">
                    <th>角色code</th>
                    <th>角色名称</th>
                    <th>角色状态</th>
                    <tr>
                        <td>${role.roleCode}</td>
                        <td>${role.roleName}</td>
                        <td>${role.status}</td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="col-sm-12 tabs">

                    <div class="ibox-content clearPadding">
                        <!--活动数据表格-->
                        <div class="jqGrid_wrapper">
                            <table id="loanRecords_table_1"></table>
                            <div id="pager_list_1"></div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
</div>


<%--弹窗--%>
<div id="menu-modal-form" class="modal fade" aria-hidden="true">
    <div class="modal-dialog" style="width: 600px;">
        <%--<div class="modal-body">--%>
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>添加菜单</h5>
                </div>
                <div class="ibox-content">
                    <form class="form-horizontal m-t" id="logForm" action="${ctx}/system/addMenu"
                          accept-charset="UTF-8">
                        <div class="form-group">
                            <label for="menuname" class="col-sm-2 control-label">菜单名称:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="menuname" name="name"
                                       placeholder="请输入名字">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="url" class="col-sm-2 control-label">菜单路径:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="url" name="url"
                                       placeholder="请输入名字">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="parentId" class="col-sm-2 control-label">父菜单:</label>
                            <div class="col-sm-2">
                                <select type="text" class="form-control" name="parentId" id="parentId"
                                        data-bind-dict="BUS_STATUS_CD" style="width: 400px">
                                    <option value="0">请选择</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-2 control-label">菜单状态:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="status" name="status"
                                       placeholder="请输入名字">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default"
                                    data-dismiss="modal">关闭
                            </button>
                            <button type="submit" class="btn btn-primary">
                                提交更改
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<%--end弹窗--%>
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="${ctx}/resources/js/jquery-2.1.1.min.js"></script>
<script src="${ctx}/resources/js/plugins/ajaxfileupload/jquery.ajaxfileupload.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="${ctx}/resources/js/bootstrap.min.js?v=3.4.0"></script>
<script src="${ctx}/resources/js/plugins/layer/laydate/laydate.js"></script>
<!-- jqGrid -->
<script src="${ctx}/resources/js/plugins/jqgrid/i18n/grid.locale-cn.js?0820"></script>
<script src="${ctx}/resources/js/plugins/jqgrid/jquery.jqGrid.min.js?0820"></script>
<%--jquery.validate--%>
<script src="${ctx}/resources/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${ctx}/resources/js/plugins/validate/additional-methods.min.js"></script>
<script src="${ctx}/resources/js/plugins/validate/messages_zh.min.js"></script>
<!-- 自定义js -->
<script src="${ctx}/resources/js/contabs.js"></script>
<%--bootstrap-treeview.js
<script src="${ctx}/resources/js/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>--%>
<%--sweetalert.min.js--%>
<script src="${ctx}/resources/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${ctx}/resources/js/plugins/layer/layer.min.js"></script>
<!-- Page-Level Scripts -->
<script>

    $(document).ready(function () {

        $.jgrid.defaults.styleUI = 'Bootstrap';

        // Configuration for jqGrid
        $("#loanRecords_table_1").jqGrid({

            beforeRequest: function () {
                jQuery("#loanRecords_table_1").jqGrid("clearGridData");
            },	//请求前的函数
            url: '${ctx}/perm/getPermissions',
            postData: {
                "flag": 0
            },
            datatype: 'json',
            height: 'auto',
            width: 'auto',
            shrinkToFit: false,//设置了此配置，将会参考每列配置的列宽，对列宽进行重新计算
            mtype: 'post',
            colNames: ['code', '菜单名称', '路径', '状态'],
            colModel: [
                {name: 'code', index: 'code', align: 'center', width: '200'},
                {name: 'name', index: 'name', width: '200', align: 'center'},
                {name: 'permiss', index: 'permiss', width: '200', align: 'center'},
                {
                    name: 'status', index: 'status', width: '200', align: 'center',
                    formatter: function typeformatter(cellValue, options, rowObject) {
                        if (rowObject.payStatus == 0) {
                            return "禁用";
                        } else if (rowObject.payStatus == 1) {
                            return "可用";
                        } else {
                            return "未知";
                        }
                    }
                }
            ],
            jsonReader: {
                root: "viewJsonData", //json中的viewJsonData，对应Page中的 viewJsonData。
                page: "curPage", //json中curPage，当前页号,对应Page中的curPage。
                total: "totalPages",//总的页数，对应Page中的pageSizes
                records: "totalRecords",//总记录数，对应Page中的totalRecords
                repeatitems: false,
                id: "0"
            },
            reloadOnExpand: false,//设置为false，展开时仅加载一次数据，随后的点击图标点击操作只是显示或者隐藏子表格，而不会再发送ajax重新获取数据
            pager: '#pager_list_1',
            rowNum: 10,
            rowList: [10, 20, 30],
            // sortname: 'id',
            // sortorder: 'desc',
            viewrecords: false,
            //rownumbers: true,
            multiselect: true,//复选框
            onSelectRow: function (rowid) {
            },
            loadComplete: function (data) {
                /*var sMenuId = ${menuIds};
                var rowData = $("#loanRecords_table_1").jqGrid("getRowData");
                for (var i = 0; rowData.length && rowData[i]; i++) {
                    for (var j = 0; sMenuId.length && sMenuId[j]; j++) {
                        if (rowData[i].id == sMenuId[j]) {
                            $("#loanRecords_table_1 tr[id=" + (i + 1) + "] input:checkbox").attr("checked", true);
                            continue;
                        }
                    }
                }*/
            },
            gridview: true,
        }).closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
        jQuery("#loanRecords_table_1").jqGrid('setFrozenColumns');
        // Add selection
    });
    function parentMenu() {
        $.ajax({
            url: "${ctx}/system/pMenus",
            type: "get",
            data: "json",
            success: function (data) {
                if (data) {
                    $.each(data, function (k, v) {
                        $("#parentId").append("<option value='" + v.id + "'>" + v.name + "</option>");
                    });
                }
            },
            error: function () {
                swal("异常");
            }
        });
    }

    $("#add-btn").click(function () {
        var checkId = "";
        $("#loanRecords_table_1 tr input:checkbox[checked='checked']").each(function () {
            checkId += $(this).parents("tr").attr("id") + ",";
        });
        var rowIds = jQuery("#loanRecords_table_1").jqGrid('getGridParam', 'selarrrow');
        var array = (rowIds + "," + checkId).split(",");
        var perIds = "";
        for (var i = 0; i < array.length && array[i]; i++) {
            var rowData = $("#loanRecords_table_1").jqGrid("getRowData", array[i]);
            perIds += rowData.code + ",";
        }
        $.ajax({
            url: "${ctx}/role/savePermiss",
            data: {"roleId":${role.code},"permissIds":perIds},
            type: "get",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data && parseInt(data) > 0) {
                    swal({
                        title: "保存成功",
                        text: "",
                        type: "success"
                    }, function () {
                        parent.closeCurrentPage();
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                swal({
                    title: "保存异常",
                    text: "",
                    type: "error"
                });
            },
        });

    });

    function openUserMenu() {
        window.parent.ParentMenuItem({
            attr: function () {
                return "${ctx}/system/userMenu/";
            },
            text: function () {
                return "用户菜单";
            },
            data: function () {
                return new Date().getTime();
            }
        });
        return false;
    }

</script>
</body>
</html>