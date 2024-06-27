<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 21/06/2024
  Time: 9:29 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<h4 class="title">
    <c:choose>
        <c:when test="${outcome.id > 0}">
            Chỉnh sửa đầu ra
        </c:when>
        <c:otherwise>
            Thêm đầu ra
        </c:otherwise>
    </c:choose>
    ${outcome.specification.subject.subjectName} - Mã môn học: MH${outcome.specification.subject.id}
</h4>
<c:url value="/specification/outcomes" var="action"/>
<form:form method="post" modelAttribute="outcome" action="${action}">
    <div class="mb-3">
        <label for="description" class="form-label">Nhập đẩu ra :</label>
        <form:textarea path="description" class="form-control" rows="5" id="description" placeholder="Nhập đầu ra ..."/>
        <form:errors path="description" cssClass="text-danger"/>
    </div>
    <button type="submit" class="btn btn-success float-end">
        <c:choose>
            <c:when test="${outcome.id > 0}">
                Sửa
            </c:when>
            <c:otherwise>
                Thêm
            </c:otherwise>
        </c:choose>
    </button>
    <form:hidden path="id"/>
    <form:hidden path="specification"/>
</form:form>