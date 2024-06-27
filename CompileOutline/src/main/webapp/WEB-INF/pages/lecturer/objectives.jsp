<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 21/06/2024
  Time: 9:30 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 20/06/2024
  Time: 3:48 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<h4 class="title">
    <c:choose>
        <c:when test="${objectives.id > 0}">
            Chỉnh sửa mục tiêu môn học
        </c:when>
        <c:otherwise>
            Thêm mục tiêu môn học
        </c:otherwise>
    </c:choose>
    ${objectives.specification.subject.subjectName} - Mã môn học: MH${objectives.specification.subject.id}
</h4>
<c:url value="/specification/objectives" var="action"/>
<form:form method="post" modelAttribute="objectives" action="${action}">
    <div class="mb-3">
        <label for="description" class="form-label">Nhập mục tiêu môn học:</label>
        <form:textarea path="description" class="form-control" rows="5" id="description"
                       placeholder="Mục tiêu môn học..."/>
        <form:errors path="description" cssClass="text-danger"/>
    </div>
    <form:button class="btn btn-success float-end">
        <c:choose>
            <c:when test="${objectives.id > 0}">
                Sửa
            </c:when>
            <c:otherwise>
                Thêm
            </c:otherwise>
        </c:choose>
    </form:button>
    <form:hidden path="id"/>
    <form:hidden path="specification"/>
</form:form>
