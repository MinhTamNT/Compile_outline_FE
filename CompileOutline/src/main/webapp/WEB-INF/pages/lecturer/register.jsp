<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="d-flex flex-column justify-content-center">
    <div class="mx-auto w-100" style="max-width: 400px;">
        <h2 class="text-center fw-bold text-dark">
            Đăng ký giảng viên
        </h2>
    </div>
    <div class="mt-2 mx-auto w-100" style="max-width: 400px;">
        <div class="bg-white p-4 shadow rounded">
            <c:url value="/register" var="action"/>
            <form:form class="space-y-2" method="post" action="${action}" modelAttribute="user"
                       enctype="multipart/form-data" onsubmit="return validateForm();">
                <div class="mb-3 text-center">
                    <label for="avatar" class="form-label d-block">
                        Avatar
                    </label>
                    <div class="d-flex justify-content-center">
                        <img id="avatarPreview" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                             class="rounded-circle"
                             style="height: 80px; width: 80px; object-fit: cover; cursor: pointer;"
                             onclick="document.getElementById('avatar').click();" alt=""/>
                        <form:input path="profile.file" id="avatar" name="avatar" type="file"
                                    class="form-control d-none" onchange="previewAvatar();"/>
                    </div>
                    <span id="" class="text-danger">*Bắt buộc upload ảnh</span>
                
                </div>
                <div class="mb-3">
                    <label class="form-label">Họ và Tên</label>
                    <form:input path="profile.fullname" type="text" id="fullName" name="fullName"
                                placeholder="Nhập vào họ tên" class="form-control"/>
                    <span id="fullNameError" class="text-danger"></span>
                    <form:errors path="profile.fullname" cssClass="text-danger"/>
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <form:input path="username" type="text" id="username" name="username"
                                placeholder="Nhập vào tên đăng nhập" class="form-control"/>
                    <span id="usernameError" class="text-danger"></span>
                    <form:errors path="username" cssClass="text-danger"/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <form:input path="profile.email" type="email" id="email" name="email" placeholder="Nhập vào email"
                                class="form-control"/>
                    <span id="emailError" class="text-danger"></span>
                    <form:errors path="profile.email" cssClass="text-danger"/>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Số điện thoại </label>
                    <form:input path="profile.phone" type="text" id="phone" name="phone"
                                placeholder="Nhập vào số điện thoại" class="form-control"/>
                    <span id="phoneError" class="text-danger"></span>
                    <form:errors path="profile.phone" cssClass="text-danger"/>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật Khẩu</label>
                    <form:input path="password" type="password" id="password" name="password"
                                placeholder="Nhập vào mật khẩu" class="form-control"/>
                    <span id="passwordError" class="text-danger"></span>
                    <form:errors path="password" cssClass="text-danger"/>
                </div>
                <div class="mb-3">
                    <label for="faculty" class="form-label">Khoa</label>
                    <form:select path="lecturer.faculty" class="form-select" id="faculty" onchange="validateFaculty()">
                        <option hidden="hidden" disabled selected>Chọn khoa</option>
                        <c:forEach items="${faculties}" var="f">
                            <option value="${f.id}">${f.facultyName}</option>
                        </c:forEach>
                    </form:select>
                    <form:errors path="lecturer.faculty" cssClass="text-danger" />
                    <span id="avatarError" class="text-danger">*Bắt buộc chọn khoa</span>
                </div>
                <div>
                    <form:button  class="btn btn-primary w-100">
                        Đăng kí
                    </form:button>
                </div>
            </form:form>
            <div class="mt-4 text-center">
                <p class="text-muted">
                    Bạn đã có tài khoản?
                    <a href="<c:url value="/login"/> " class="text-primary fw-bold">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>
<script>
    function previewAvatar() {
        const avatarInput = document.getElementById('avatar');
        const avatarPreview = document.getElementById('avatarPreview');

        const file = avatarInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function validateFaculty() {
        const faculty = document.getElementById('faculty').value;
        if (faculty === '') {
            document.getElementById('facultyError').innerText = 'Vui lòng chọn khoa.';
        } else {
            document.getElementById('facultyError').innerText = '';
        }
    }
</script>
