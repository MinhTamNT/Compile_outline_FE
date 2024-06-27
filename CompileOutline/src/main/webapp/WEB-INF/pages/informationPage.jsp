<%-- Created by IntelliJ IDEA. User: ACER Date: 6/23/2024 Time: 12:53 PM --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    body {
        background-color: #f8f9fa;
        font-family: Arial, sans-serif;
    }

    .container {
        margin-top: 2rem;
    }

    .card {
        border: none;
        border-radius: 1rem;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .profile-avatar {
        width: 150px;
        height: 150px;
        object-fit: cover;
        margin-bottom: 1rem;
        border: 2px solid #dee2e6;
    }

    .card-header {
        background-color: #007bff;
        color: white;
        text-align: center;
        font-size: 1.25rem;
        padding: 1rem;
    }

    .card-body {
        padding: 2rem;
    }

    .form-control {
        border: none;
        border-bottom: 1px solid #ced4da;
        background-color: #fff;
        border-radius: 0;
        padding: .75rem .75rem;
    }

    .form-control p {
        margin-bottom: 0;
    }

    .form-label {
        font-weight: bold;
        margin-bottom: .5rem;
        color: #495057;
    }

    .faculty-select option {
        padding: .5rem;
    }
</style>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 mb-4">
            <!-- Profile picture card-->
            <div class="card text-center">
                <div class="card-header">Ảnh hồ sơ</div>
                <div class="card-body">
                    <c:choose>
                        <c:when test="${currentUser.profile.avatar == null}">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUQHvRu2YQwSej0i9xzdubvVi7i8FGCrEYye688jOh42InYdYk4cByUTJn81a4hm_EAB8&usqp=CAU"
                                 alt="Avatar" class="profile-avatar rounded-circle">
                        </c:when>
                        <c:otherwise>
                            <img src="${currentUser.profile.avatar}" alt="Avatar" class="profile-avatar rounded-circle">
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        
        </div>
        <div class="col-lg-8 col-md-6 mb-4">
            <div class="card">
                <div class="card-header">Chi tiết hồ sơ</div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label" for="inputUsername">Username</label>
                        <div class="form-control" id="inputUsername">
                            <p>${currentUser.username}</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="inputFullname">Họ và Tên</label>
                        <div class="form-control" id="inputFullname">
                            <p>${currentUser.profile.fullname}</p>
                        </div>
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label" for="inputEmail">Email</label>
                            <div class="form-control" id="inputEmail">
                                <c:choose>
                                    <c:when test="${currentUser.profile.email == null}">
                                        <p>Chưa thêm</p>
                                    </c:when>
                                    <c:otherwise>
                                        <p>${currentUser.profile.email}</p>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" for="inputPhone">Số điện thoại</label>
                            <div class="form-control" id="inputPhone">
                                <c:choose>
                                    <c:when test="${currentUser.profile.phone == null}">
                                        <p>Chưa thêm</p>
                                    </c:when>
                                    <c:otherwise>
                                        <p>${currentUser.profile.phone}</p>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="showRole">Vai trò</label>
                        <div class="form-control" id="showRole">
                            <p>${currentUser.role}</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <c:choose>
                            <c:when test="${currentUser.role != 'ROLE_ADMIN'}">
                                <div class="mb-3">
                                    <label class="form-label">Khoa</label>
                                    <select class="form-control faculty-select">
                                        <c:choose>
                                            <c:when test="${currentUser.role == 'ROLE_LECTURER'}">
                                                <c:forEach items="${faculties}" var="f">
                                                    <c:choose>
                                                        <c:when test="${f.id == currentUser.lecturer.faculty.id}">
                                                            <option value="${f.id}" selected>${f.facultyName}</option>
                                                        </c:when>
                                                        <c:otherwise>
                                                            <option value="${f.id}">${f.facultyName}</option>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </c:forEach>
                                            </c:when>
                                            <c:when test="${currentUser.role == 'ROLE_STUDENT'}">
                                                <option hidden="hidden" disabled selected>Chọn khoa</option>
                                                <c:forEach items="${faculties}" var="f">
                                                    <c:choose>
                                                        <c:when test="${f.id == currentUser.student.faculty.id}">
                                                            <option value="${f.id}" selected>${f.facultyName}</option>
                                                        </c:when>
                                                        <c:otherwise>
                                                            <option value="${f.id}">${f.facultyName}</option>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </c:forEach>
                                            </c:when>
                                        </c:choose>
                                    </select>
                                </div>
                            </c:when>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
