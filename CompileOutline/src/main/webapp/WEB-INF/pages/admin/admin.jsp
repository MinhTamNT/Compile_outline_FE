<%--
  Created by IntelliJ IDEA.
  User: ACER
  Date: 6/3/2024
  Time: 11:24 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #f7f8fa;
        color: #333;
    }

    .container {

        max-width: 1200px;
        padding: 20px;
    }

    .card {
        border: none;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        transition: transform 0.3s ease-in-out;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .card-body {
        text-align: center;
        padding: 20px;
        font-size: 18px;
    }

    .card-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .text-danger {
        color: #dc3545;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .shadow {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .rounded-sm {
        border-radius: 5px;
    }

    .btn-success {
        background-color: #28a745;
        border: none;
        padding: 10px 20px;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        transition: background-color 0.3s ease-in-out;
    }

    .btn-success:hover {
        background-color: #218838;
    }

    .form-floating {
        margin-bottom: 20px;
    }

    .form-control, .form-select {
        border-radius: 5px;
        border: 1px solid #ced4da;
        padding: 10px;
        font-size: 16px;
    }

    .form-label {
        font-size: 14px;
        color: #6c757d;
    }

    .stats-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .stats-container > div {
        flex: 1;
        min-width: 300px;
        margin: 10px;
    }

    .form-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 40px;
    }

    .form-container > div {
        flex: 1;
        min-width: 300px;
        margin: 10px;
    }

    .chart-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .stats-container, .form-container {
            flex-direction: column;
            align-items: center;
        }

        .stats-container > div, .form-container > div {
            min-width: 100%;
        }

        .chart-container {
            max-width: 100%;
        }
    }
</style>
<div class="container">
    <div class="alert alert-primary" role="alert">
        <p class=" text-center fw-bold fs-5">Thông báo cập nhật lúc ${updateTime}</p>
    </div>
    <div class="card shadow-sm rounded-sm">
        <div class="card-body">
            <h1 class="card-title">
                Chào mừng trở lại, <sec:authentication property="principal.username"/>
                👋
            </h1>
            <div class="stats-container">
                <div class="card shadow" style="background-color: #f3f4f6;">
                    <div class="card-body rounded-sm">
                        <h5 class="card-title font-weight-bold text-dark">Tổng học sinh</h5>
                        <p class="card-text h3 text-dark">${countStudent}</p>
                    </div>
                </div>
                <div class="card shadow bg-success text-white">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Tổng các môn học</h5>
                        <p class="card-text h3">${countSubject}</p>
                    </div>
                </div>
                <div class="card shadow bg-warning text-white">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Đề cương Đã Nộp</h5>
                        <p class="card-text h3">${countSpecSubmitted}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="form-container">
    <div>
        <div class="chart-container">
            <canvas id="statsSpecSubmit"></canvas>
        </div>
        <form>
            <div class="form-floating mb-3 mt-3">
                <input type="text" value="${param.year}" class="form-control" id="year" placeholder="Năm" name="year">
                <label for="year">Năm</label>
            </div>
            <div class="form-floating mb-3 mt-3">
                <select class="form-select" id="period" name="period">
                    <option value="MONTH" selected>Theo tháng</option>
                    <option value="QUARTER">Theo quý</option>
                </select>
                <label for="period" class="form-label">Chọn thời gian</label>
            </div>
            <div class="form-floating mb-3 mt-3">
                <button class="btn btn-success">Lọc</button>
            </div>
        </form>
    
    </div>
    <div>
        <div class="chart-container">
            <canvas id="statsEmotionFeedbackBySpec"></canvas>
        </div>
        <form>
            <div class="form-floating mb-3 mt-3">
                <select id="spec" class="form-select" name="specId">
                    <c:forEach items="${specSubmitted}" var="s">
                        <option value="${s.id}">${s.subject.subjectName}</option>
                    </c:forEach>
                </select>
                <label for="spec" class="form-label">Chọn đề cương</label>
            </div>
            <div class="form-floating mb-3 mt-3">
                <button class="btn btn-success">Lọc</button>
            </div>
        </form>
    
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    function drawChart(ctx, labels, data, title) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function drawPieChart(ctx, labels, data, title) {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    let labels1 = []
    let data1 = []
    <c:forEach items="${statsSpecSubmit}" var="s">
    labels1.push("${s[0]}")
    data1.push(${s[1]})
    </c:forEach>

    console.log(labels1)
    console.log(data1)

    let labels2 = []
    let data2 = []

    <c:forEach items="${statsFeedback}" var="s">
    labels2.push("${s[0]}")
    data2.push(${s[1]})
    </c:forEach>

    console.log(labels2)
    console.log(data2)

    window.onload = function () {
        let ctx1 = document.getElementById('statsSpecSubmit');
        drawChart(ctx1, labels1, data1, 'Thống kê số lượng đề cương nộp theo tháng');

        let ctx2 = document.getElementById('statsEmotionFeedbackBySpec');
        drawPieChart(ctx2, labels2, data2, 'Thống kê');
    }
</script>
