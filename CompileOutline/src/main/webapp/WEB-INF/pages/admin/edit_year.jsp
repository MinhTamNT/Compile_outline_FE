<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 24/06/2024
  Time: 2:29 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <h4 class="title">
        Sửa khóa học
    </h4>
    <c:url value="/year/" var="action"/>
    <form:form method="post" modelAttribute="year" action="${action}">
        <form:hidden path="id"/>
        <label for="year">Năm học:</label>
        <form:input id="year" type="number" min="0" path="year" class="form-control"/>
        <div class="d-flex justify-content-end mt-2">
            <button type="submit" class="btn btn-success">Sửa</button>
        </div>
    </form:form>
</div>

