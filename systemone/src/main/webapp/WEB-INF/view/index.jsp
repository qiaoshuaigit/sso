<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<!DOCTYPE html>
<%@ include file="include/include.jsp" %>
<%@ page session="false" pageEncoding="UTF-8" isELIgnored="false" %>
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
<%
    Subject subject = SecurityUtils.getSubject();
    if (subject.isAuthenticated() || subject.isRemembered()){
        response.sendRedirect("/login");
    }
%>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">

    <div class="tabs-container">

        <div class="panel-body" style="height: 700px;">

            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-6" style="margin-left: 40%;width: 30%">
                        <h3 class="m-t-none m-b">登录</h3>
                        <p>欢迎登录本站(⊙o⊙)</p>
                        <form role="form" action="${ctx}/login" method="post">
                            <div class="form-group">
                                <label>用户名</label>
                                <input type="name" name="name" placeholder="请输入用户名3" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>密码</label>
                                <label style="color:red">${error}</label>
                                <input type="password" name="password" placeholder="请输入密码" class="form-control">
                            </div>
                            <div>
                               <%-- <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit"><strong>登 录</strong>
                                </button>--%>
                                <input type="submit" class="btn btn-sm btn-primary pull-right m-t-n-xs" value="登 录">
                                <%--<label>
                                    <input type="checkbox" class="i-checks">自动登录</label>--%>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</div>

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

</script>
</body>
</html>