<%--
  Created by IntelliJ IDEA.
  User: shuai
  Date: 2017/7/13
  Time: 下午2:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<html>
<head>
    <title>Title</title>

</head>
<body>

<h2>登录成功${user}</h2>


<a href="http://127.0.0.1:8081/index/welcome">跳转到systemone应用</a>
<a href="http://127.0.0.1:8081/logout">退出</a>
</body>
</html>
