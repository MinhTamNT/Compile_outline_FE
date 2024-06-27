<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 12/06/2024
  Time: 12:38 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <div class="d-flex justify-content-between mt-4 mb-4">
        <h1 class="h3">Quản lý tài khoản giảng viên</h1>
    </div>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Ảnh đại điên</th>
            <th scope="col">Username</th>
            <th scope="col">Họ và Tên</th>
            <th scope="col">Khoa</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${lecturers}" var="l">
            <tr>
                <td>
                    <img class="img-thumbnail img-fluid  rounded-circle" style="width: 60px ;height: 60px"
                         src="${l.user.profile.avatar}" alt="Profile Picture">
                </td>
                <td>${l.user.username}</td>
                <td>${l.user.profile.fullname}</td>
                <td>${l.faculty.facultyName}</td>
                <td>${l.user.profile.email}</td>
                <td>${l.user.profile.phone}</td>
                <td>
                    <c:choose>
                        <c:when test="${l.user.isActive == true}">
                            <span class="badge bg-success text-white p-2">Active</span>
                        </c:when>
                        <c:otherwise>
                            <span class="badge bg-danger text-white p-2">Inactive</span>
                        </c:otherwise>
                    </c:choose>
                </td>
                <td class="action-icons">
                    <a href="<c:url value="/users/${l.user.id}" />">
                    <span>
                        <i class='fas fa-edit' style='font-size:24px'></i>
                    </span>
                    </a>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>

<script src="<c:url value="/resources/JS/manageAccount.js" />"></script>
