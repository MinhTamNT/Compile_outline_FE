<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 11/06/2024
  Time: 4:36 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <div class="d-flex justify-content-between mt-4 mb-4">
        <h1 class="h3">Quản lý tài khoản quản trị</h1>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newAdmin">
            Tạo tài khoản quản trị
        </button>
    </div>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Username</th>
            <th class="d-flex justify-content-end" scope="col">Trạng thái</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${admins}" var="a">
            <tr>
                <td>${a.user.username}</td>
                <td class="d-flex justify-content-end">
                    <c:choose>
                        <c:when test="${a.user.isActive == true}">
                            <span class="badge bg-success text-white p-2">Active</span>
                        </c:when>
                        <c:otherwise>
                            <span class="badge bg-danger text-white p-2">Inactive</span>
                        </c:otherwise>
                    </c:choose>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>

    <div class="modal" id="newAdmin">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Đăng ký tài khoản quản trị</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <c:url value="/users/admin" var="action"/>
                    <form:form method="post" modelAttribute="user" action="${action}">
                        <div class="mb-3 mt-3">
                            <label for="username" class="form-label">Username:</label>
                            <form:input path="username" type="text" class="form-control" id="username"/>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password:</label>
                            <form:input path="password" type="password" class="form-control" id="password"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form:form>
                </div>

            </div>
        </div>
    </div>
</div>

<script src="<c:url value="/resources/JS/manageAccount.js" />"></script>