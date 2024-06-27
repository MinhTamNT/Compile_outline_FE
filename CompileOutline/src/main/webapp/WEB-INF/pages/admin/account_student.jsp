<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<div class="container mt-4">
    <div class="alert alert-danger d-none" id="alert">
        <p id="errorText" class="mb-0"></p>
    </div>
    
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3">Quản lý tài khoản sinh viên</h1>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createStudentAccount">
            Tạo tài khoản sinh viên
        </button>
    </div>
    
    <table class="table table-bordered table-hover">
        <thead class="table-light">
        <tr>
            <th scope="col">Ảnh đại diện</th>
            <th scope="col">Username</th>
            <th scope="col">Họ và Tên</th>
            <th scope="col">Khoa</th>
            <th scope="col">Email</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${students}" var="s">
            <tr>
                <td>
                    <img class="img-thumbnail img-fluid rounded-circle" style="width: 50px"
                         src="${s.user.profile.avatar}" alt="Profile Picture">
                </td>
                <td>${s.user.username}</td>
                <td>${s.user.profile.fullname}</td>
                <td>${s.faculty.facultyName}</td>
                <td>${s.user.profile.email}</td>
                <td>
                    <c:choose>
                        <c:when test="${s.user.isActive == true}">
                            <span class="badge bg-success">Active</span>
                        </c:when>
                        <c:otherwise>
                            <span class="badge bg-danger">Inactive</span>
                        </c:otherwise>
                    </c:choose>
                </td>
                <td class="text-center">
                    <a href="<c:url value='/users/${s.user.id}' />" class="btn btn-link p-0">
                        <i class='fas fa-edit' style='font-size:24px'></i>
                    </a>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>

<!-- Modal -->
<div class="modal fade" id="createStudentAccount" tabindex="-1" aria-labelledby="createStudentAccountLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title" id="createStudentAccountLabel">Đăng kí tài khoản sinh viên</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                <c:url value="/users/student" var="action"/>
                <form:form method="post" modelAttribute="student" action="${action}">
                    
                    <div class="form-floating mb-3">
                        <form:input path="user.profile.fullname" type="text" class="form-control" id="username"
                                    placeholder="Username"/>
                        <label for="username">Họ và Tên</label>
                        <form:errors path="user.profile.fullname" cssClass="text-danger"/>
                    </div>
                    <div class="form-floating mb-3">
                        <form:input path="user.username" type="text" class="form-control" id="username"
                                    placeholder="Username"/>
                        <label for="username">Username</label>
                        <form:errors path="user.username" cssClass="text-danger"/>
                    </div>
                    
                    <div class="form-floating mb-3">
                        <form:input path="user.profile.email" type="email" class="form-control" id="email"
                                    placeholder="Email"/>
                        <label for="email">Email</label>
                        <form:errors path="user.profile.email" cssClass="text-danger"/>
                    </div>
                    
                    <div class="form-floating mb-3">
                        <form:select path="faculty" class="form-select" id="faculty">
                            <option hidden disabled selected>Chọn khoa</option>
                            <c:forEach items="${faculties}" var="f">
                                <option value="${f.id}">${f.facultyName}</option>
                            </c:forEach>
                        </form:select>
                        <form:errors path="faculty" cssClass="text-danger"/>
                    </div>
                    
                    <div class="form-floating mb-3">
                        <form:input path="user.password" type="password" class="form-control" id="password"
                                    placeholder="Password"/>
                        <label for="password">Mật khẩu</label>
                        <form:errors path="user.password" cssClass="text-danger"/>
                    </div>
                    
                    <form:hidden path="user.profile.phone" value="00000000000" />
                    
                    <div class="d-flex justify-content-end">
                        <form:button class="btn btn-primary">Lưu</form:button>
                    </div>
                </form:form>
            </div>
        </div>
    </div>
</div>

<script>
    const params = new URLSearchParams(document.location.search);
    let e = params.get("errorMessage");
    console.log(e);
    if (e) {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("errorText").innerHTML = e;
    }
</script>
<script src="<c:url value='/resources/JS/manageAccount.js' />"></script>
