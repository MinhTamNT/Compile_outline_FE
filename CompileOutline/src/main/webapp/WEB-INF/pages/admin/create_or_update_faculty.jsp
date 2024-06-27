<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 10/06/2024
  Time: 10:56 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/faculty/create" var="action"/>
<div class="container">
    <h4 class="title">
        <c:choose>
            <c:when test="${faculty.id > 0}">Cập nhật khoa</c:when>
            <c:otherwise>
                Thêm mới khoa
            </c:otherwise>
        </c:choose>
    </h4>
    <form:form method="post" modelAttribute="faculty" action="${action}">
        <div class="mb-3">
            <label for="name" class="form-label">Tên khoa:</label>
            <form:input id="name" type="text" path="facultyName" class="form-control"/>
            <form:errors path="facultyName" cssClass="text-danger"/>
        </div>

        <form:button class="btn btn-success float-end">
            <c:choose>
                <c:when test="${faculty.id > 0}">Cập nhật</c:when>
                <c:otherwise>
                    Thêm
                </c:otherwise>
            </c:choose>
        </form:button>
        <form:hidden path="id"/>
    </form:form>
</div>
