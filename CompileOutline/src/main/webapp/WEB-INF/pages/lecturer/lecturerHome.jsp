<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    /* Custom styles */
    body {
        background-color: #f8f9fa;
        color: #343a40;
        font-family: Arial, sans-serif;
    }

    .container-fluid {
        padding-top: 4rem;
    }

    .card {
        background-color: #ffffff;
        border-radius: 15px;
        border: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .card-title {
        font-size: 1.5rem;
        color: #007bff;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .card-subtitle {
        font-size: 1rem;
        color: #6c757d;
    }

    .btn {
        border-radius: 10px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }

    .btn-success {
        background-color: #28a745;
        border-color: #28a745;
    }

    .btn-success:hover {
        background-color: #218838;
        border-color: #218838;
    }

    .page-link {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
        border: none;
    }

    .page-link:hover {
        color: #0056b3;
        text-decoration: none;
        background-color: transparent;
        border-color: #dee2e6;
    }

    .pagination {
        justify-content: center;
    }

</style>

<div class="container-fluid mt-5 py-4">
    <div class="container">
        <%--        <div class="row justify-content-center">--%>
        <%--            <div class="col-md-8">--%>
        <%--                <h6 class="text-center fs-5 mb-4">Soạn đề cương chi tiết</h6>--%>
        <%--                <div class="card shadow">--%>
        <%--                    <div class="card-body">--%>
        <%--                        <div class="mb-3">--%>
        <%--                            <label for="selectSubject" class="form-label"><i class="fas fa-bookmark text-danger"></i>--%>
        <%--                                Chọn môn học *</label>--%>
        <%--                            <form action="${pageContext.request.contextPath}/specification/edit" method="get">--%>
        <%--                                <select class="form-select" id="selectSubject" name="assigmentId" aria-label="Chọn môn học">--%>
        <%--                                    <c:forEach var="s" items="${specification}">--%>
        <%--                                        <option value="${s.id}">Môn Học: ${s.subject.subjectName} - Khoa: ${s.subject.faculty.facultyName}</option>--%>
        <%--                                    </c:forEach>--%>
        <%--                                </select>--%>
        <%--                                <div class="d-grid mt-3">--%>
        <%--                                    <button type="submit" class="btn btn-success">Biên soạn đề cương</button>--%>
        <%--                                </div>--%>
        <%--                            </form>--%>
        <%--                        </div>--%>
        <%--                    </div>--%>
        <%--                </div>--%>
        <%--            </div>--%>
        <%--        </div>--%>
    </div>
    <div class="container mt-4">
        <h2 class="mb-4 text-center">Đề Cương của bạn được phân công</h2>
        <div class="row">
            <c:forEach items="${specification}" var="s">
                <div class="col-md-4">
                    <div class="card mb-4 shadow">
                        <div class="card-body">
                            <h5 class="card-title mb-3">Đề cương ${s.subject.subjectName}</h5>
                            <div class="card-text">
                                <p class="mb-2"><strong>Mã học:</strong> MH${s.subject.id}</p>
                                <p class="mb-2"><strong>Khoa:</strong> ${s.subject.faculty.facultyName}</p>
                            
                            </div>
                            <div class="d-flex justify-content-between mt-3">
                                    <%--                            <c:url value="/specification/${s.id}"/>--%>
                                <a href="#" class="btn btn-primary d-flex align-items-center">
                                    <i class="fas fa-eye me-1"></i> Xem chi tiết
                                </a>
                                <c:choose>
                                    <c:when test="${s.isSubmitted == true}">
                                        <button type="button" class="btn btn-secondary d-flex align-items-center">
                                            <i class="fas fa-edit me-1"></i>Sửa đề cương</span>
                                        </button>
                                    </c:when>
                                    <c:otherwise>
                                        <a href="<c:url value="/specification/${s.id}/edit"/>"
                                           class="btn btn-success d-flex align-items-center">
                                            <i class="fas fa-edit me-1"></i> Sửa đề cương
                                        </a>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
        
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">« Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next »</a>
                </li>
            </ul>
        </nav>
    </div>
</div>