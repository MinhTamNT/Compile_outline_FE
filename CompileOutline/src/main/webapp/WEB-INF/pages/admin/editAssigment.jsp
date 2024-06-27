<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/assignment/new" var="action"/>
<form:form id="editAssignmentForm" modelAttribute="assignment" method="post" action="${action}">
    <form:hidden path="id"/>
    <form:hidden path="credits" />
    <div class="mb-3">
        <label for="subjectSelect" class="form-label">Chọn môn học:</label>
        <c:url value="/api/assignment/getLecturersByFaculty/" var="urlload">
            <c:param name="facultyId" value="${facultyId}" />
        </c:url>
        <form:select path="subject" class="form-select" id="subjectSelect" name="subjectId" onchange="loadLecturers('${urlload}')">
            <c:forEach var="subject" items="${allSubject}">
                <c:choose>
                    <c:when test="${subject.id == assignments.subject.id}">
                        <option value="${subject.id}"  data-faculty-id="${subject.faculty.id}">${subject.subjectName} - ${subject.faculty.facultyName}</option>
                    </c:when>
                    <c:otherwise>
                        <option value="${subject.id}"  data-faculty-id="${subject.faculty.id}" >${subject.subjectName} - ${subject.faculty.facultyName}</option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </form:select>
    </div>
    <div class="mb-3">
        <label for="lecturerSelect" class="form-label">Chọn giảng viên:</label>
        <form:select path="lecturerUser" class="form-select" id="lecturerSelect" name="lecturerId">
            <c:forEach var="lecturer" items="${lecturers}">
                <option value="${lecturer.id}"
                        <c:if test="${lecturer.id eq assignments.lecturerUser.id}">selected</c:if>>${lecturer.user.profile.fullname}</option>
            </c:forEach>
        </form:select>
    </div>
    <button type="submit" class="btn btn-primary">Lưu Thay Đổi</button>
</form:form>
<script>
   document.addEventListener('DOMContentLoaded',function (){
       const subjectSelect = document.getElementById('subjectSelect');
       const facultyId = subjectSelect.options[subjectSelect.selectedIndex].getAttribute('data-faculty-id');
       console.log(facultyId)
       fetch('${urlload}'+ facultyId) .then(response => response.json()).then(data => {
           let lecturerSelect = document.getElementById('lecturerSelect');
           lecturerSelect.innerHTML = "";

           const lecturers = data.map(lecturer => ({
               fullname: lecturer[0],
               id: lecturer[1]
           }));

           // Populate options
           lecturers.forEach(lecturer => {
               let option = document.createElement('option');
               option.value = lecturer.id;
               option.textContent = lecturer.fullname;
               lecturerSelect.appendChild(option);
               console.log(option)
           });
       }
       )
       
       
   })
    
    function loadLecturers(urlLoad) {
        const subjectSelect = document.getElementById('subjectSelect');
        const facultyId = subjectSelect.options[subjectSelect.selectedIndex].getAttribute('data-faculty-id');
        console.log(facultyId)
        console.log("Selected Faculty ID:", facultyId);
        fetch(urlLoad + facultyId)
            .then(response => response.json())
            .then(data => {
                let lecturerSelect = document.getElementById('lecturerSelect');
                lecturerSelect.innerHTML = "";

                const lecturers = data.map(lecturer => ({
                    fullname: lecturer[0],
                    id: lecturer[1]
                }));

                // Populate options
                lecturers.forEach(lecturer => {
                    let option = document.createElement('option');
                    option.value = lecturer.id;
                    option.textContent = lecturer.fullname;
                    lecturerSelect.appendChild(option);
                    console.log(option)
                });
            })
            .catch(error => console.error('Error loading lecturers:', error));
    }
</script>
