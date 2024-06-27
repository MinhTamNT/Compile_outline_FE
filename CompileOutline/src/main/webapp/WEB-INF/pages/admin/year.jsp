<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 24/06/2024
  Time: 1:11 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <div class="alert alert-danger d-lg-none" id="alter" role="alert">
        <p id="errorText" class=""></p>
    </div>
    <div class="d-flex justify-content-between">
        <h2 class="h4 my-auto">Quản lý khóa học</h2>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalYear">
            Thêm mới khóa học
        </button>
    </div>
   
    <table id="departmentTable" class="table">
        <thead>
        <tr>
            <th>Khóa</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${years}" var="y">
            <tr id="${y.id}">
                <td>${y.year}</td>
                <td class="d-flex justify-content-end">
                    <a type="button" href="<c:url value="/year/${y.id}"/>" class="btn btn-info btn-sm">Chỉnh sửa</a>
                    <a href="<c:url value="/year/deleted/${y.id}" />" class="btn btn-danger btn-sm ms-2">Xóa</a>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
    
    <div class="modal" id="modalYear">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Thêm năm học</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                
                <!-- Modal body -->
                <div class="modal-body">
                    <c:url value="/year/" var="action"/>
                    <form:form method="post" modelAttribute="year" action="${action}">
                        <label for="year">Năm học:</label>
                        <form:hidden path="id"/>
                        <form:input path="year" id="year" type="number" min="0" class="form-control"/>
                        <div class="d-flex justify-content-end mt-2">
                            <button type="submit" class="btn btn-success">Thêm</button>
                        </div>
                    </form:form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    const params = new URLSearchParams(document.location.search);
    let e = params.get("errorMessage")
    console.log(e)
    if (e) {
        document.getElementById("alter").classList.remove("d-lg-none")
        document.getElementById("errorText").innerHTML = e

    }
</script>
