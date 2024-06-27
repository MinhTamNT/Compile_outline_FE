<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 21/06/2024
  Time: 9:31 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="modal fade" id="submitModal" tabindex="-1" role="dialog"
     aria-labelledby="submitModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="submitModalLabel">Xác nhận nộp đề cương</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <label style="" class="form-label fs-6">Nhập số điện thoại:</label>
                <div id="formCheckPhone" class="">
                    <div class="input-group mb-3 ">
                        <input type="text" class="form-control" name="student_phone_number" id="check-student"
                               aria-describedby="basic-addon3">
                    </div>
                    <div id="recaptcha-container" class="mt-2"></div>
                    <button class="btn btn-success my-2" id="btnCheckPhoneNumber" type="submit" style="color:white">Xác
                        nhận
                    </button>
                </div>
                <div class="digit-group d-lg-none" id="digit-group">
                    <label style="color:black" class="form-label fs-6">Vui Lòng nhập OTP:</label>
                    <div class="mb-2 digit-group d-flex justify-content-center">
                        <input type="text" id="digit-1" name="digit-1" data-next="digit-2"/>
                        <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1"/>
                        <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2"/>
                        <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3"/>
                        <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4"/>
                        <input type="text" id="digit-6" name="digit-6" data-previous="digit-5"/>
                    </div>
                    <div class="mb-2 digit-group d-flex justify-content-center">
                        
                        <button class="btn-success btn w-50" id="checkOtp">Xác nhận</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Hủy</button>
                <c:url value="/api/specification/${specification.id}/submit/" var="url"/>
                <button class="btn btn-success" onclick="submitBai('${url}')">Nop Bai</button>
            </div>
        </div>
    </div>
</div>

<div class="" style="min-height:calc(100vh - 65px);">
    <div class="alert alert-danger d-lg-none" id="alter" role="alert">
        <p id="errorTextErrRequiment" class=""></p>
    </div>
    <div class="alert alert-danger d-lg-none" id="errorObjectives" role="alert">
        <p id="errorObjective" class=""></p>
    </div>
    
    <div class="alert alert-danger d-lg-none" id="alterRatting" role="alert">
        <p id="textErrorRatting" class=""></p>
    </div>
    
    
    <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center mb-4">
            <img src="https://png.pngtree.com/png-vector/20221023/ourmid/pngtree-paper-publish-document-media-vector-png-image_34370374.png"
                 style="height: 50px;" alt="icon-specification">
            <p class="fs-5 fw-bold ms-3 mb-0">Biên soạn đề cương chi tiết</p>
        </div>
        <button onclick="submitSpecification()" class="btn btn-danger my-2">
            <i class="fa-solid fa-file-arrow-up"></i>
            Nộp đề cương
        </button>
    </div>
    
    <div class="header px-2 py-2 mb-4 border-bottom border-gray">
        <p class="text-center fs-5 mb-0">BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
        <p class="text-center fs-5 mb-0">MINISTRY OF EDUCATION AND TRAINING</p>
        <p class="text-center fs-5 fw-bold mb-0">TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH</p>
        <p class="text-center fs-5 fw-bold ">HO CHI MINH CITY OPEN UNIVERSITY</p>
    </div>
    <!-- Course Specification Section -->
    <div class="name-specification-subject mb-4">
        <p class="text-center fw-bold fs-5 mb-0">Đề cương Môn Học</p>
        <p class="text-center fw-bold fs-5 mb-0">COURSE SPECIFICATION</p>
    </div>
    <!-- Form Section -->
    <div class="container-content">
        <c:url value="/specification/update" var="action"/>
        <form:form method="post" modelAttribute="specification" action="${action}">
            <form:hidden path="id"/>
            <form:hidden path="lecturerUser"/>
            <form:hidden path="subject"/>
            <form:hidden path="years"/>
            <h5 class="fw-bold mt-4">I. Thông tin tổng quát - General information</h5>
            <p>1. Thông tin/Information </p>
            <div class="name-subject mb-2 d-flex align-items-center">
                <p class="mb-0 me-2">Tên môn: <span
                        class="fw-bold mb-0">${specification.subject.subjectName}</span></p>
                <p class="mb-0 me-2"> - Mã Môn học: <span
                        class="fw-bold mb-0">MH${specification.subject.id}</span></p>
            </div>
            <div class="department-info mb-2 d-flex align-items-center">
                <p class="mb-0 me-2">Khoa phụ trách: <span
                        class="fw-bold mb-0">${specification.subject.faculty.facultyName}</span></p>
                <p class="mb-0 me-2"> - Khóa học áp dụng:</p>
                <c:forEach items="${specification.years}" var="y" varStatus="status">
                    <c:if test="${!status.first}">
                        <span class="text-danger fw-bold mb-0"> - </span>
                    </c:if>
                    <span class="text-danger fw-bold mb-0">${y.year}</span>
                </c:forEach>
            </div>
            <div class="instructor-info mb-2 d-flex align-items-center">
                <p class="mb-0 me-2">Giáo viên biên soạn:</p>
                <p class="fw-bold mb-0">${specification.lecturerUser.user.profile.fullname}</p>
            </div>
            <div class="instructor-email mb-2 d-flex align-items-center">
                <p class="mb-0 me-2">Email của giảng viên:</p>
                <p class="fw-bold mb-0">${specification.lecturerUser.user.profile.email}</p>
            </div>
            <p>2. Số tín chỉ/Credits </p>
            <div class="mb-3 d-flex align-items-center">
                <label for="credits" class="form-label mb-0 me-2">Số tín chỉ:</label>
                <div class="col-2">
                    <form:input path="credits" type="number" min="1" max="5" step="0.5"
                                class="form-control form-control-sm" id="credits" style="width: 70px;"
                                placeholder="1"/>
                    <form:errors path="credits" cssClass="text-danger"/>
                </div>
                <p class="text-danger" id="errorText"></p>
            </div>
            <div class="course-info mt-4">
                <h5 class="fw-bold">II. Thông tin về môn học - Course overview</h5>
                <div>
                    <div class="d-flex justify-content-between">
                        <p>1.Mô Tả Đề Cương</p>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Lưu thông tin
                        </button>
                    </div>
                    <div class="description mb-2">
                        <form:textarea path="description" class="form-control" rows="5"
                                       placeholder="Nhập mô tả đề cương ở đây..."/>
                        <form:errors path="description" cssClass="text-danger"/>
                    </div>
                    <p class="text-danger" id="errorText2"></p>
                </div>
                <div>
                    <div class="d-flex justify-content-between">
                        <p>2. Môn học điều kiện/Requirements:</p>
                        <a href="<c:url value="/specification/${specification.id}/requirement"/>"
                           class="btn btn-primary mb-2"><i class="fas fa-plus me-2"></i>Thêm môn học điều kiện</a>
                    </div>
                    <table class="table" id="courseTable" border="1">
                        <thead>
                        <tr>
                            <th scope="col">STT/No.</th>
                            <th scope="col">Môn học điều kiện/Requirements</th>
                            <th scope="col">Mã môn học/Code</th>
                            <th scope="col"></th> <!-- New column for delete button -->
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${requirements}" var="r">
                            <tr>
                                <td>${r.id}</td>
                                <td>${r.type}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <c:forEach items="${specification.subject.subjectRequirements}" var="sR">
                                <c:choose>
                                    <c:when test="${sR.requirements.id == r.id}">
                                        <tr id="MH${sR.subjectRequirements.id}">
                                            <td></td>
                                            <td>${sR.subjectRequirements.subjectName}</td>
                                            <td>MH${sR.subjectRequirements.id}</td>
                                            <td>
                                                <c:url value="/api/specification/${specification.subject.id}/${sR.subjectRequirements.id}"
                                                       var="urlDeleteSubjectRequirement"/>
                                                <button onclick="deleteComponent('${urlDeleteSubjectRequirement}', 'MH${sR.subjectRequirements.id}')"
                                                        type="button" class="btn btn-danger"><i
                                                        class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </c:when>
                                </c:choose>
                            </c:forEach>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div class="d-flex justify-content-between">
                        <p>3. Mục tiêu môn học/Course objectives:</p>
                        <a href="<c:url value="/specification/${specification.id}/edit/objectives" />"
                           class="btn btn-primary mb-2"><i class="fas fa-plus me-2"></i>Thêm mục tiêu môn học</a>
                    </div>
                    <table class="table" id="objectivesTable" border="1">
                        <thead>
                        <tr>
                            <th scope="col">Mục tiêu môn học / Course objectives</th>
                            <th scope="col">Mô tả - Description</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${specification.objectives}" var="o" varStatus="status">
                            <tr id="objective${o.id}">
                                <td>${status.index + 1}</td>
                                <td>${o.description}</td>
                                <td>
                                    <a href="<c:url value="/specification/objectives/${o.id}"/> "
                                       class="btn btn-primary"><i class="fas fa-edit"></i></a>
                                    <c:url value="/api/specification/objectives/${o.id}" var="urlDeleteObjectives"/>
                                    <button type="button" class="btn btn-danger"
                                            onclick="deleteComponent('${urlDeleteObjectives}', 'objective${o.id}')">
                                        <i
                                                class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div class="d-flex justify-content-between">
                        <p>4. Chuẩn đầu ra (CĐR) môn học – Course learning outcomes (CLOs)</p>
                        <a href="<c:url value="/specification/${specification.id}/edit/outcomes" />"
                           class="btn btn-primary mb-2"><i class="fas fa-plus me-2"></i>Thêm đầu ra môn học</a>
                    </div>
                    <table class="table table-bordered" id="outcomesTable">
                        <thead>
                        <tr>
                            <th scope="col">Mục tiêu môn học/Course objectives
                            </th>
                            <th scope="col">Mô tả - Description</th>
                            <th scope="col"></th> <!-- New column for delete button -->
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${specification.outcomes}" var="o" varStatus="status">
                            <tr id="outcomes${o.id}">
                                <td>${status.index + 1}</td>
                                <td>${o.description}</td>
                                <td>
                                    <a href="<c:url value="/specification/outcomes/${o.id}"/> "
                                       class="btn btn-primary"><i
                                            class="fas fa-edit"></i></a>
                                    <c:url value="/api/specification/outcomes/${o.id}" var="urlDeleteOutcomes"/>
                                    <button type="button" class="btn btn-danger"
                                            onclick="deleteComponent('${urlDeleteOutcomes}', 'outcomes${o.id}')"><i
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div class="d-flex justify-content-between">
                        <p>5. Điểm đánh giá/Rating:</p>
                        <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal"
                                data-bs-target="#modalRating">
                            <i class="fas fa-plus me-2"></i>Thêm cột điểm đánh giá
                        </button>
                    </div>
                    <table class="table" id="tableRating">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Bài đánh giá Assessment methods</th>
                            <th scope="col">Tỷ lệ % Weight %</th> <!-- New column for assessment score -->
                            <th scope="col"></th> <!-- New column for delete button -->
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${specification.specificationRatings}" var="rating" varStatus="status">
                            <tr id="spec-${specification.id}-rate-${rating.rating.id}">
                                <td>${status.index + 1}</td>
                                <td>${rating.rating.method}</td>
                                <td class="percent-cell">${rating.percent}%</td>
                                <td>
                                    <c:url value="/api/specification/rating/${rating.id}"
                                           var="urlDeleteRating"/>
                                    <button onclick="deleteComponent('${urlDeleteRating}', 'spec-${specification.id}-rate-${rating.rating.id}')"
                                            type="button" class="btn btn-danger"><i
                                            class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </form:form>
    </div>
</div>

<div class="modal" id="modalRating">
    <div class="modal-dialog">
        <div class="modal-content">
            
            <div class="modal-header">
                <h4 class="modal-title">Thêm đánh giá</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            
            <div class="modal-body">
                <c:url value="/specification/rating/save" var="action"/>
                <form:form method="post" modelAttribute="specificationRating" action="${action}">
                    <form:hidden path="specification" value="${specification.id}"/>
                    <div class="mb-3">
                        <label for="rating" class="form-label">Chọn bài đánh giá:</label>
                        <form:select path="rating" class="form-select" id="rating">
                            <option hidden="hidden" selected>Chọn phương pháp đánh giá</option>
                            <c:forEach var="r" items="${ratingMethods}">
                                <option value="${r.id}">${r.method}</option>
                            </c:forEach>
                        </form:select>
                        <form:errors path="rating" cssClass="text-danger"/>
                    </div>
                    <div class="mb-3">
                        <label for="percent" class="form-label">Chọn tỉ lệ bài:</label>
                        <form:input path="percent" type="number" min="0" step="5" max="100" id="percent"
                                    class="form-control"/>
                        <form:errors path="percent" cssClass="text-danger"/>
                    </div>
                    <div class="d-flex  justify-content-end">
                        <form:button type="submit" class="btn btn-success">Thêm</form:button>
                    </div>
                
                </form:form>
            </div>
        </div>
    
    </div>


</div>

<script>

    const params = new URLSearchParams(document.location.search);
    let e = params.get("errorMessgae")
    if (e) {
        document.getElementById("errorText").innerHTML = e
        document.getElementById("errorText2").innerHTML = e

    }


    const paramsOutCome = new URLSearchParams(document.location.search);
    let errorMessgaeOutComeText = paramsOutCome.get("errorMessgaeOutCome")


    console.log(errorMessgaeOutComeText)
    if (errorMessgaeOutComeText) {
        alert(errorMessgaeOutComeText)

    }

    const paramsRequirement = new URLSearchParams(document.location.search);
    let requirement = paramsRequirement.get("errorRequirement")
    if (requirement) {
        document.getElementById("alter").classList.remove("d-lg-none")
        document.getElementById("errorTextErrRequiment").innerHTML = requirement

    }
    const params1 = new URLSearchParams(document.location.search);
    let objective = paramsRequirement.get("errorMessageObject")
    if (objective) {
        document.getElementById("errorObjectives").classList.remove("d-lg-none")
        document.getElementById("errorObjective").innerHTML = objective

    }

    const params2 = new URLSearchParams(document.location.search);
    let ratting = paramsRequirement.get("errorRatting")
    if (ratting) {
        document.getElementById("alterRatting").classList.remove("d-lg-none")
        document.getElementById("textErrorRatting").innerHTML = ratting

    }


    const firebaseConfig = {
        apiKey: "AIzaSyBRjcxoBo2ezaS89SwsrFAuEJ-4pd0sU6k",
        authDomain: "chatrealtime-cb6a0.firebaseapp.com",
        projectId: "chatrealtime-cb6a0",
        storageBucket: "chatrealtime-cb6a0.appspot.com",
        messagingSenderId: "156500470716",
        appId: "1:156500470716:web:1a180086bd4e4e056a19b9",
        measurementId: "G-DY06R8Q9NC",
    };
    firebase.initializeApp(firebaseConfig);
    var coderesult = ""
    var dataStudent = null
    localStorage.setItem("specification", "${specification.id}")

    //OTP VERIFY
    $('.digit-group').find('input').each(function () {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function (e) {
            var parent = $($(this).parent());

            if (e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));

                if (prev.length) {
                    $(prev).select();
                }
            } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));

                if (next.length) {
                    $(next).select();
                } else {
                    if (parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });


    function convertPhoneNumber(phoneNumber) {
        if (typeof phoneNumber !== 'string' || phoneNumber.length === 0) {
            throw new Error('Invalid phone number');
        }

        if (phoneNumber.startsWith('0')) {
            return '+84' + phoneNumber.slice(1);
        } else {
            return phoneNumber;
        }
    }

    function render() {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        recaptchaVerifier.render();

    }

    render()

    document.getElementById("btnCheckPhoneNumber").addEventListener("click", function (e) {
        e.preventDefault();
        const phoneNumber = document.getElementById("check-student").value
        const data = {
            "phone": phoneNumber
        }
        fetch('/CompileOutline/api/check-phone/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return;
            } else {
                toastCustom("Error", "Không tim thấy số điện thoại.", "error");
            }
        }).then(data => {
            firebase.auth().signInWithPhoneNumber(convertPhoneNumber(phoneNumber), window.recaptchaVerifier).then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
                coderesult = confirmationResult;
                console.log('OTP Sent');
                document.getElementById("btnCheckPhoneNumber").style.display = "none"
                document.getElementById("recaptcha-container").style.display = "none"
            }).catch(function (error) {
                alert(error.message);
            });
            document.getElementById("digit-group").classList.remove("d-lg-none")
            document.getElementById("checkOtp").addEventListener("click", function () {
                const inputs = document.querySelectorAll('.digit-group input')
                let opt = ''
                inputs.forEach((input) => {
                    opt += input.value;
                });
                coderesult.confirm(opt).then(function () {
                    dataStudent = true;
                }).catch(function (error) {
                    console.error("Error occurred:", error);
                    toastCustom("Error", "OTP nhâp sai nha.", "error");
                });

            })
        })
    })

    function deleteComponent(url, elementId) {
        fetch(url, {
            method: 'delete'
        }).then(res => {
            if (res.status === 204) {
                let element = document.getElementById(elementId)
                element.remove()
                // location.reload();
            }
        })
    }

    function toastCustom(heading, message, icon) {
        $.toast({
            heading: heading,
            text: message,
            showHideTransition: 'fade',
            icon: icon,
            position: "top-right",

        })
    }

    function validateSpecification() {
        let objectives = document.querySelector("#objectivesTable tbody")
        if (objectives.children.length === 0) {
            toastCustom("Error", "Không có mục tiêu môn học", "error")
            return false;
        }
        let outcomes = document.querySelector("#outcomesTable tbody")
        if (outcomes.children.length === 0) {
            toastCustom("Error", "Không có đầu ra môn học", "error")
            return false;
        }
        let ratingRow = document.querySelector("#tableRating tbody")
        if (ratingRow.children.length >= 2 && ratingRow.children.length <= 5) {
            let percentCells = document.querySelectorAll('.percent-cell');
            let total = 0;
            percentCells.forEach(function (cells) {
                let value = parseFloat(cells.textContent.trim().replace('%', ''));
                total += value;
            })
            if (total == 100) {

                console.log("Đủ 100%")
                return true;
            } else {
                toastCustom("Error", "Đánh giá môn học buộc phải 100%", "error")
                return false;
            }
        } else {
            toastCustom("Warning", "Đề cương phải có tối thiểu 2 cột điểm đánh gía và tối đa 5 cột điểm đánh giá", "warning")
            return false;
        }

        return true;
    }

    function submitSpecification() {
        if (validateSpecification() === true) {
            $('#submitModal').modal('show');
        }
    }

    function submitBai(url) {
        console.log(url)
        if (dataStudent) {
            fetch(url, {
                method: 'POST',
            }).then(res => {
                return;
            }).then(data => {
                console.log("Thanh cong")
                toastCustom("Success", "Nộp bài thành công", "success")
            })
        }
    }

</script>
<script src="<c:url value="/resources/JS/specification.js" />"></script>
