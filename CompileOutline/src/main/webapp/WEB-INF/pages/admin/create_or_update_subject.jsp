<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:url value="/subject/create" var="action"/>
<div class="container">
    <h4 class="title">
        <c:choose>
            <c:when test="${subject.id > 0}">Cập nhật môn học</c:when>
            <c:otherwise>
                Thêm môn học
            </c:otherwise>
        </c:choose>
    </h4>
    <form:form method="post" modelAttribute="subject" action="${action}">
        <form:hidden path="id"/>
        <div class="mb-3 mt-3">
            <label for="subjectName" class="form-label">Tên môn học</label>
            <form:input path="subjectName" type="text" class="form-control" id="subjectName"/>
            <form:errors path="subjectName" cssClass="text-danger"/>
        </div>
        <div class="mb-3 mt-3">
            <label for="faculty">Khoa:</label>
            <form:select path="faculty" class="form-select" id="faculty">
                <option hidden="hidden" disabled selected>Chọn khoa</option>
                <c:forEach items="${faculties}" var="f">
                    <c:choose>
                        <c:when test="${f.id==subject.faculty.id}">
                            <option value="${subject.faculty.id}" selected>${f.facultyName}</option>
                        </c:when>
                        <c:otherwise>
                            <option value="${f.id}">${f.facultyName}</option>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </form:select>
            <form:errors path="faculty" cssClass="text-danger"/>
        </div>
        <form:button class="btn btn-success float-end mt-3">
            <c:choose>
                <c:when test="${subject.id > 0}">Cập nhật môn học</c:when>
                <c:otherwise>
                    Thêm môn học
                </c:otherwise>
            </c:choose>
        </form:button>
    </form:form>
</div>
