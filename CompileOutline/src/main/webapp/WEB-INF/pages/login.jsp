<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="d-flex flex-column justify-content-center py-4" style="margin-left: 0 !important;">
    <div class="mx-auto w-100" style="max-width: 400px;">
        <h2 class="mt-4 text-center fw-bold text-dark">
            Đăng nhập
        </h2>
    </div>
    <div class="mt-4 mx-auto w-100" style="max-width: 400px;">
        <div class="bg-white p-4 shadow rounded">
            <form id="loginForm" class="space-y-2" method="post" action="${pageContext.request.contextPath}/login"
                  onsubmit="return validateLoginForm()">
                <c:if test="${param.error ne null}">
                    <div class="alert alert-danger" role="alert">
                        Lỗi: Tài khoản hoặc mật khẩu sai hoặc tài khoản chưa được mở
                    </div>
                </c:if>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input name="username" type="text" id="username" placeholder="Nhập vào tên đăng nhập"
                           class="form-control"/>
                    <div id="usernameError" class="text-danger mt-1"></div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật Khẩu</label>
                    <input name="password" type="password" id="password" placeholder="Nhập vào mật khẩu"
                           class="form-control"/>
                    <div id="passwordError" class="text-danger mt-1"></div>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary w-100">
                        Đăng nhập
                    </button>
                </div>
            </form>
            <div class="mt-4 text-center">
                <p class="text-muted">
                    Bạn đã chưa có tài khoản?
                    <a href="<c:url value="/register" />" class="text-primary fw-bold">
                        Đăng kí
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>

<script>


    function validateLoginForm() {
        let isValid = true;
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Clear previous errors
        document.getElementById('usernameError').textContent = '';
        document.getElementById('passwordError').textContent = '';

        if (username === '') {
            document.getElementById('usernameError').textContent = 'Vui lòng nhập tên đăng nhập.';
            isValid = false;
        }

        if (password === '') {
            document.getElementById('passwordError').textContent = 'Vui lòng nhập mật khẩu.';
            isValid = false;
        }

        return isValid;
    }
</script>
