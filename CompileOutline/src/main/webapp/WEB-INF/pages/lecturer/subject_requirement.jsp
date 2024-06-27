<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 21/06/2024
  Time: 11:09 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<h4 class="title">
    Thêm môn học điều kiện - Môn học: ${subjectRequirement.subject.subjectName} - Mã môn học:
    MH${subjectRequirement.subject.id}
</h4>
<c:url value="/specification/requirement/save" var="action">
    <c:param name="specId" value="${specId}"/>
</c:url>
<form:form method="post" modelAttribute="subjectRequirement" action="${action}">
    <form:hidden path="subject"/>
    <div class="mb-3 mt-3">
        <label for="condition">Điều kiện:</label>
        <form:select path="requirements" class="form-select" id="condition">
            <option hidden="hidden" disabled selected>Chọn điều kiện</option>
            <c:forEach items="${requirements}" var="r">
                <c:choose>
                    <c:when test="${r.id == subjectRequirement.requirements.id}">
                        <option value="${r.id}" selected>${r.type}</option>
                    </c:when>
                    <c:otherwise>
                        <option value="${r.id}">${r.type}</option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </form:select>
    </div>
    <div class="mb-3 mt-3">
        <label for="subject">Môn điều kiện:</label>
        <form:select path="subjectRequirements" class="form-select" id="subject">
            <option hidden="hidden" disabled selected>Chọn môn học:</option>
            <c:forEach items="${subjects}" var="s">
                <c:choose>
                    <c:when test="${s.id != subjectRequirement.subject.id and s.id == subjectRequirement.subjectRequirements.id}">
                        <option value="${s.id}" selected>${s.subjectName}</option>
                    </c:when>
                    <c:when test="${s.id != subjectRequirement.subject.id}">
                        <option value="${s.id}">${s.subjectName}</option>
                    </c:when>
                </c:choose>
            </c:forEach>
        </form:select>
    </div>
    
    <button type="submit" class="btn btn-success float-end mt-3">
        Thêm điều kiện môn học
    </button>
</form:form>