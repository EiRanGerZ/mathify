<%-- 
    Document   : course-catalog
    Created on : May 19, 2026, 11:48:36 PM
    Author     : Akari
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page import="java.util.List"%>
<%@page import="com.mathify.model.Course"%>

<!DOCTYPE html>

<html>

    <head>

        <title>Course Catalog Mathify</title>

        <style>

            body{
                font-family: Arial;
                background: #f5f5f5;
                padding: 20px;
            }

            h1{
                color: #333;
            }

            .course-card{

                background: white;

                padding: 20px;

                margin-bottom: 20px;

                border-radius: 10px;

                box-shadow:
                    0 2px 5px rgba(0,0,0,0.1);
            }

            .level{

                color: blue;
                font-weight: bold;
            }

            .btn{

                display: inline-block;

                padding: 10px 15px;

                background: #4F46E5;

                color: white;

                border-radius: 8px;

                text-decoration: none;
            }

        </style>

    </head>

    <body>

        <h1>Couse Catalog Mathify</h1>

        <%

            List<Course> courseList
                    = (List<Course>) request.getAttribute(
                            "courseList"
                    );

            if (courseList != null) {

                for (Course course : courseList) {

        %>

        <div class="course-card">

            <h2>
                <%= course.getTitle()%>
            </h2>

            <p>
                <%= course.getDescription()%>
            </p>

            <p class="level">

                Level:
                <%= course.getLevel()%>

            </p>

            <a href="#"
               class="btn">

                View Course

            </a>

        </div>

        <%
                }
            }
        %>

    </body>
</html>