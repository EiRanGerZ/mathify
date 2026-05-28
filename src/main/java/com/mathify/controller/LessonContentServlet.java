/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.controller;

import com.mathify.dao.LessonDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 *
 * @author Akari
 */
@WebServlet("/lesson-content")
public class LessonContentServlet
        extends HttpServlet {

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        // Membuat object DAO
        LessonDAO dao =
                new LessonDAO();

        // Default lesson pertama
        int lessonNumber = 1;

        // Ambil parameter dari URL
        String lessonParam =
                request.getParameter("id");

        // Jika parameter ada
        if (lessonParam != null) {

            lessonNumber =
                    Integer.parseInt(
                            lessonParam
                    );
        }

        // Ambil lesson dari DAO
//        Lesson lesson =
//                dao.getLessonByNumber(
//                        lessonNumber
//                );
//
//        // Total lesson
//        int totalLessons =
//                dao.getTotalLessons();

        // Kirim data ke JSP
//        request.setAttribute(
//                "lesson",
//                lesson
//        );
//
//        request.setAttribute(
//                "currentLesson",
//                lessonNumber
//        );
//
//        request.setAttribute(
//                "totalLessons",
//                totalLessons
//        );

        // Forward ke JSP
        request.getRequestDispatcher(
                "lesson-content.jsp"
        ).forward(request, response);
    }
}