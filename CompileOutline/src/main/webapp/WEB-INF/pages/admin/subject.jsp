<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 10/06/2024
  Time: 1:12 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div class="container">
    <div class="d-flex justify-content-between">
        <h2 class="h4 my-auto">Quản lý môn học</h2>
        <a type="button" href="<c:url value="/subject/create"/>" class="btn btn-primary h-75">Thêm môn học</a>
    </div>
    <table id="courseTable" class="table">
        <thead>
        <tr>
            <th>Tên môn học</th>
            <th>Khoa</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${subjects}" var="s">
            <tr>
                <td>${s.subjectName}</td>
                <td>${s.faculty.facultyName}</td>
                <td>
                    <a type="button" href="<c:url value="/subject/${s.id}"/>" class="btn btn-info btn-sm">Chỉnh sửa</a>
                    
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
