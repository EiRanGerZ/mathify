/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.model;

/**
 *
 * @author Nabil
 */
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

enum ModuleType {
    VIDEO,
    SLIDE
}

record ModuleInfo(
    String id,
    String title,
    int orderIndex,
    LocalDateTime createdAt
) {}

record Slide(
    int order,
    String imageUrl,
    String caption
) {}

public class SlideModule {
    private ModuleInfo info;
    private List<Slide> slides;
    private int secondsPerSlide;

    public SlideModule(ModuleInfo info, List<Slide> slides, int secondsPerSlide) {
        this.info = info;
        this.slides = slides;
        this.secondsPerSlide = secondsPerSlide;
    }

    public ModuleInfo getInfo() {
        return info;
    }

    public ModuleType getType() {
        return ModuleType.SLIDE;
    }

    public Duration estimatedDuration() {
        return Duration.ofSeconds((long) slides.size() * secondsPerSlide);
    }

    public List<Slide> getSlides() {
        return slides;
    }

    public int getSecondPerSlide() {
        return secondsPerSlide;
    }
}
