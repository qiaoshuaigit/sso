<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<head>
    <title>Title</title>
</head>
<body>

<h2>用户列表</h2>
${hello}

<table>
    <th>用户ID</th><th>用户密码</th><th>状态</th>
    <c:forEach items="${userList}" var="user">
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.status}</td>
        </tr>
    </c:forEach>

</table>

</body>
</html>
