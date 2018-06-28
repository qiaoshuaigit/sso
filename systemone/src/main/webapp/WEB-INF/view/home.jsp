<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<!DOCTYPE html>
<%@ include file="./include/include.jsp"%>
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
    <link href="${ctx}/resources/css/animate.css" rel="stylesheet">
    <link href="${ctx}/resources/css/style.css?v=3.2.0" rel="stylesheet">
    <link href="${ctx}/resources/img/favicon.ico" rel="icon">
    <title>华腾平台${ctx}</title>
</head>
<%
    request.getSession().getAttribute("menus");
    System.out.println("page="+request.getAttribute("menus"));

    System.out.println("shiro="+SecurityUtils.getSubject().getSession().getAttribute("menus1"));
%>
<body class="fixed-sidebar full-height-layout gray-bg">
<div id="wrapper">
    <!--左侧导航开始-->
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-close"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="profile-element">
                        <span><img alt="image" width="70" class="img-circle" src="${ctx}/resources/img/face.png"></span>
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold"></strong></span>
                            </span>
                        </a>
                        <div class="message_icon">
                            <a href="">
                                <i class="fa fa-envelope"></i>
                                <i class="message_dot"></i>
                            </a>&nbsp;&nbsp;
                            <a href=""><i class="fa fa-bell"></i>
                            </a>
                        </div>
                    </div>
                    <div class="logo-element">华腾</div>
                </li>
                <c:forEach var="menu" items="${menus}">
                    <li>
                        <a href="#">
                            <i class="fa fa-edit"></i>
                            <span class="nav-label">${menu.name}</span>
                            <span class="fa arrow"></span>
                        </a>
                        <c:forEach  var="child" items="${menu.childs}">
                            <ul class="nav nav-second-level">
                                <li>
                                    <a class="J_menuItem" href="${ctx}${child.url}">${child.name}</a>
                                </li>
                            </ul>
                        </c:forEach>
                    </li>
                </c:forEach>
            </ul>
        </div>
    </nav>
    <!--左侧导航结束-->
    <!--右侧部分开始-->
    <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0;min-height:0px;">
                <div class="navbar-header">
                </div>
            </nav>
        </div>
        <div class="row content-tabs">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#" style="position: absolute; z-index: 1;">
                <i class="fa fa-bars"></i>
            </a>
            <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i></button>
            <nav class="page-tabs J_menuTabs">
                <div class="page-tabs-content">
                    <a href="javascript:;" class="active J_menuTab" data-id="">首页</a>
                </div>
            </nav>
            <button class="roll-nav roll-right J_tabRight" style="right:140px"><i class="fa fa-forward"></i></button>
            <div class="btn-group roll-nav roll-right" style="right:60px">
                <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span></button>
                <ul role="menu" class="dropdown-menu dropdown-menu-right">
                    <li class="J_tabShowActive"><a>定位当前选项卡</a></li>
                    <li class="divider"></li>
                    <li class="J_tabCloseAll"><a>关闭全部选项卡</a></li>
                    <li class="J_tabCloseOther"><a>关闭其他选项卡</a></li>
                </ul>
            </div>
            <a class="roll-nav roll-right J_tabExit" href="${ctx}/logout"><i class="fa fa fa-sign-out"></i> 退出</a>
        </div>
        <div class="row J_mainContent" id="content-main">
            <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="" frameborder="0"
                    data-id="" seamless></iframe>
        </div>
        <div class="footer">
            <div class="pull-right">&copy;上海华腾
            </div>
        </div>
    </div>
    <!--右侧部分结束-->
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="${ctx}/resources/js/jquery-2.1.1.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="${ctx}/resources/js/bootstrap.min.js?v=3.4.0"></script>
<script src="${ctx}/resources/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="${ctx}/resources/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="${ctx}/resources/js/plugins/layer/layer.min.js"></script>
<!-- 自定义js -->
<script src="${ctx}/resources/js/hplus.js?v=3.2.0"></script>
<script src="${ctx}/resources/js/contabs.js"></script>
<!-- 第三方插件 -->
<script src="${ctx}/resources/js/plugins/pace/pace.min.js"></script>
</body>
</html>