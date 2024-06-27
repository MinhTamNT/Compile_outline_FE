<%--
  Created by IntelliJ IDEA.
  User: ACER
  Date: 6/17/2024
  Time: 3:09 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<sec:authorize access="hasRole('ADMIN')">
    <style>
    .sidebar {
        background-color: #ffffff;
        color: #343a40;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        width: 240px;
        min-height: calc(100vh - 65px);

    }

    .sidebar a {
        color: #343a40;
        text-decoration: none;
        font-size: 1.1rem;
        transition: color 0.3s;
    }

    .sidebar a:hover {
        color: #007bff;
    }

    .sidebar .nav-link.active {
        background-color: rgba(0, 123, 255, 0.1);
        color: #007bff;
    }

    .sidebar .collapse .nav-link {
        padding-left: 30px;
    }

    .sidebar .collapse.show .nav-link {
        background-color: rgba(0, 123, 255, 0.2);
        color: #007bff;
    }

    .sidebar-header {
        display: none !important;
    }

    @media (max-width: 767px) {
        .sidebar {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            display: none;
        }

        .sidebar.active {
            display: block;
            width: 90%;
        }

        .content {
            margin-left: 0;
        }

        .sidebar-header {
            display: block !important;
        }

        .name-app {
            display: none;
        }

        .sidebar-header h4 {
            display: block !important;
        }

        .sidebar-header {
            display: block !important;
        }

        .name-app h5 {
            display: block;
        }
    }
</style>
<aside class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 ">
        <div class="name-app">
            <h5 class="fw-bold" style="font-size: 16px">
                <a href="<c:url value="/" />" class="nav-link px-0 align-middle">
                    <i class="fas fa-book" style="font-size: 16px"></i>
                    <span class="ms-1 ">Admin Dashboard</span>
                </a>
            </h5>
        </div>
        <div class="sidebar-header  w-100 mb-3">
            <i class="fas fa-times close-icon" style="color: black" onclick="toggleSidebar()"></i>
        </div>
        <ul class="nav nav-pills " id="menu">
<%--            <li class="nav-item w-100 my-1">--%>
<%--                <a href="#" class="nav-link align-middle px-0">--%>
<%--                    <i class="fas fa-th-large"></i>--%>
<%--                    <span class="ms-1 ">Quản lý đề cương</span>--%>
<%--                </a>--%>
<%--            </li>--%>
            <li class="nav-item w-100 my-1">
                <a href="<c:url value="/assignment/" />" class="nav-link px-0 align-middle">
                    <i class="fas fa-tasks"></i>
                    <span class="ms-1 ">Phân công biên soạn</span>
                </a>
            </li>
            <li class="nav-item w-100 my-1">
                <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fas fa-graduation-cap"></i>
                    <span class="ms-1 ">Quản lý đào tạo</span>
                </a>
                <ul class="collapse  nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li class="w-100">
                        <a href="<c:url value="/faculty/"/>" class="nav-link p-2 mb-3">
                            <i class="fas fa-university"></i>
                            <span class="">Khoa</span>
                        </a>
                    </li>
                    <li>
                        <a href="<c:url value="/subject/"/>" class="nav-link p-2 mb-3">
                            <i class="fas fa-book"></i>
                            <span class="">Môn học</span>
                        </a>
                    </li>
                    <li class="w-100">
                        <a href="<c:url value="/year/"/>" class="nav-link p-2 mb-3">
                            <i class="fas fa-university"></i>
                            <span class="">Khóa học</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="nav-item w-100 my-1">
                <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fas fa-user"></i>
                    <span class="ms-1 ">Quản lý tài khoản</span>
                </a>
                <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                    <li class="w-100">
                        <a href="<c:url value="/users/admin"/>" class="nav-link p-2 mb-3">
                            <i class="fas fa-user-shield"></i>
                            <span class="">Tài khoản quản trị</span>
                        </a>
                    </li>
                    <li class="w-100">
                        <a href="<c:url value="/users/lecturer"/>" class="nav-link p-2 mb-3">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <span class="">Tài khoản giảng viên</span>
                        </a>
                    </li>
                    <li>
                        <a href="<c:url value="/users/student" />" class="nav-link p-2 mb-3">
                            <i class="fas fa-user-graduate"></i>
                            <span class="">Tài khoản sinh viên</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</aside>
</sec:authorize>