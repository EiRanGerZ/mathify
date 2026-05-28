/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.dao;

import com.mathify.model.Chapter;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Akari
 */
public class LessonDAO {
    private static List<Chapter> chapterList =
            new ArrayList<>();

    public void addLesson(Chapter chapter) {

        chapterList.add(chapter);

        System.out.println("Lesson berhasil ditambahkan!");
    }

    public List<Chapter> getAllLessons() {

        return chapterList;
    }

    public Chapter getLessonById(String lessonId) {

        for (Chapter chapter : chapterList) {

            if (chapter.getLessonId().equals(lessonId)) {

                return chapter;
            }
        }

        return null;
    }

    public void updateLesson(String lessonId,
                             Chapter updatedChapter) {

        Chapter chapter = getLessonById(lessonId);

        if (chapter != null) {

            chapter.setTitle(updatedChapter.getTitle());
            chapter.setDescription(updatedChapter.getDescription());
            chapter.setXpReward(updatedChapter.getXpReward());

            System.out.println("Lesson berhasil diupdate!");

        } else {

            System.out.println("Lesson tidak ditemukan!");
        }
    }

    public void deleteLesson(String lessonId) {

        chapterList.removeIf(
                chapter ->
                        chapter.getLessonId().equals(lessonId)
        );

        System.out.println("Lesson berhasil dihapus!");
    }

    public List<Chapter> searchLesson(String keyword) {

        List<Chapter> result = new ArrayList<>();

        for (Chapter chapter : chapterList) {

            if (chapter.getTitle()
                    .toLowerCase()
                    .contains(keyword.toLowerCase())) {

                result.add(chapter);
            }
        }

        return result;
    }

    public int getTotalLesson() {

        return chapterList.size();
    }

    public int getTotalLessons() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Lesson getLessonByNumber(int lessonNumber) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
