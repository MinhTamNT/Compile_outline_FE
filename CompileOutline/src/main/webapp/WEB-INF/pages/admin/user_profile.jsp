<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<div class="container-xl px-4 mt-4">
    <c:url value="/users/" var="action"/>
    <form:form method="post" modelAttribute="profile" action="${action}" enctype="multipart/form-data">
        <form:hidden path="id"/>
        <form:hidden path="avatar"/>
        <div class="row">
            <div class="col-xl-4">
                <!-- Profile picture card-->
                <div class="card mb-4 mb-xl-0">
                    <div class="card-header">Ảnh hồ sơ</div>
                    <div class="card-body text-center">
                        <!-- Profile picture image-->
                        <img id="profileImage" class="img-account-profile rounded-circle mb-2 " width="240px" height="240px"style="object-fit: cover" src="${profile.avatar}" alt="">
                        <!-- Profile picture upload button-->
                        <div class="mb-3">
                            <form:input path="file" id="avatarFileInput" type="file" class="form-control d-none" onchange="displaySelectedImage(event);"/>
                            <label for="avatarFileInput" class="btn btn-primary">Chọn ảnh</label>
                        </div>
                        <button class="btn btn-secondary" type="button" onclick="resetImage()">Hủy</button>
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <!-- Account details card-->
                <div class="card mb-4">
                    <div class="card-header">Chi tiết hồ sơ</div>
                    <div class="card-body">
                        <!-- Form Group (username)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">Username</label>
                            <form:input path="user.username" class="form-control" id="inputUsername" type="text"/>
                        </div>
                        <div class="mb-3">
                            <label class="small mb-1" for="inputFullname">Họ và Tên</label>
                            <form:input path="fullname" class="form-control" id="inputFullname" type="text"/>
                        </div>
                        <div class="row gx-3 mb-3">
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputEmail">Email</label>
                                <form:input path="email" class="form-control" id="inputEmail" type="text"/>
                            </div>
                            <!-- Form Group (phone)-->
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Số điện thoại</label>
                                <form:input path="phone" class="form-control" id="inputPhone" type="text"/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="small mb-1" for="showRole">Vai trò</label>
                            <form:input path="user.role" value="${user.role}" class="form-control" id="showRole" readonly="true" type="text"/>
                        </div>
                        <!-- Form Group (is active)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="isActive">Đang hoạt động</label>
                            <form:select path="user.isActive" class="form-select" id="isActive">
                                <c:choose>
                                    <c:when test="${profile.user.isActive == true}">
                                        <option value="1" selected>Bật</option>
                                        <option value="0">Tắt</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="1">Bật</option>
                                        <option value="0" selected>Tắt</option>
                                    </c:otherwise>
                                </c:choose>
                            </form:select>
                        </div>
                        <!-- Form Group (faculty)-->
                        <div class="mb-3">
                            <c:choose>
                                <c:when test="${profile.user.role == 'ROLE_LECTURER'}">
                                    <label for="faculty">Khoa:</label>
                                    <form:select path="user.lecturer.faculty" class="form-select" id="faculty">
                                        <option hidden="hidden" disabled selected>Chọn khoa</option>
                                        <c:forEach items="${faculties}" var="f">
                                            <c:choose>
                                                <c:when test="${f.id==profile.user.lecturer.faculty.id}">
                                                    <option value="${f.id}" selected>${f.facultyName}</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="${f.id}">${f.facultyName}</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:forEach>
                                    </form:select>
                                </c:when>
                                <c:when test="${profile.user.role == 'ROLE_STUDENT'}">
                                    <label for="faculty">Khoa:</label>
                                    <form:select path="user.student.faculty" class="form-select" id="faculty">
                                        <option hidden="hidden" disabled selected>Chọn khoa</option>
                                        <c:forEach items="${faculties}" var="f">
                                            <c:choose>
                                                <c:when test="${f.id==profile.user.student.faculty.id}">
                                                    <option value="${f.id}" selected>${f.facultyName}</option>
                                                </c:when>
                                                <c:otherwise>
                                                    <option value="${f.id}">${f.facultyName}</option>
                                                </c:otherwise>
                                            </c:choose>
                                        </c:forEach>
                                    </form:select>
                                </c:when>
                            </c:choose>
                        
                        </div>
                        <!-- Save changes button-->
                        <button class="btn btn-primary" type="submit">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    </form:form>
</div>

<script>
    function displaySelectedImage(event) {
        const fileInput = event.target;
        const files = fileInput.files;
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageElement = document.getElementById('profileImage');
                imageElement.src = e.target.result;
            }
            reader.readAsDataURL(files[0]);
        }
    }

    function resetImage() {
        const imageElement = document.getElementById('profileImage');
        // Reset the image to the original or default avatar
        imageElement.src = "${profile.avatar}";
        // Clear the file input field
        const fileInput = document.getElementById('avatarFileInput');
        fileInput.value = '';
    }
</script>
