<%--
  Created by IntelliJ IDEA.
  User: Hùng's Dell
  Date: 03/06/2024
  Time: 12:48 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <tiles:insertAttribute name="title"/>
    </title>
    
    <%--    Icon--%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
          crossorigin="anonymous"/>
    <%--    Bootstrap--%>
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous"
    />
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
    <%--  --------  css --------  --%>
    
    <link rel="stylesheet" href="<c:url value="/CSS/app.css"/> "/>
    
    
    <%-------------------------------------    Firebase---------------------------------%>
    <script src="https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.13.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.js"></script>
    
    <script src="
https://cdn.jsdelivr.net/npm/jquery-toast-plugin@1.3.2/dist/jquery.toast.min.js
"></script>
    <link href="
https://cdn.jsdelivr.net/npm/jquery-toast-plugin@1.3.2/dist/jquery.toast.min.css
" rel="stylesheet">


</head>
<style>
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #ffffff;
        color: #343a40;
        font-size: 16px;
    }

    .content {
        background-color: #ffffff;
        padding: 30px;
        flex-direction: column;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        min-height: calc(100vh - 65px);
        width: 100%;
    }
</style>
<body>
<script type="module">
    import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import {
        getStorage,
        ref,
        uploadBytesResumable,
        getDownloadURL
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

    const firebaseConfig = {
        apiKey: "AIzaSyBRjcxoBo2ezaS89SwsrFAuEJ-4pd0sU6k",
        authDomain: "chatrealtime-cb6a0.firebaseapp.com",
        projectId: "chatrealtime-cb6a0",
        storageBucket: "chatrealtime-cb6a0.appspot.com",
        messagingSenderId: "156500470716",
        appId: "1:156500470716:web:1a180086bd4e4e056a19b9",
        measurementId: "G-DY06R8Q9NC",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    export const db = getStorage(app);
</script>

<tiles:insertAttribute name="header"/>
<main class=" d-flex" style="gap:2px; min-height: calc(100vh - 65px);">
    <tiles:insertAttribute name="sidebar"/>
    <div class="content">
        <tiles:insertAttribute name="content"/>
    </div>
</main>
<tiles:insertAttribute name="footer"/>
</body>
<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
></script>
<script>
    function toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('active');
    }
</script>
</body>
</html>

