/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.model;

/**
 *
 * @author Akari
 */
public class LearningModule implements Playable {

    private String moduleId;
    private enum Type{VIDEO, TEXT, INTERACTIVE, EXECISE};
    private int durationMinutes;
    private int orderIndex;

    @Override
    public void start(){}

    public LearningModule(String id, int duration, int orderIndex){
        moduleId = id;
        durationMinutes = duration;
        this.orderIndex = orderIndex;
    }

    @Override
    public void start() {

        System.out.println("Module dimulai: " + moduleId);
    }

    @Override
    public void pause() {

        System.out.println("Module dijeda");
    }

    @Override
    public void stop() {

        System.out.println("Module dihentikan");
    }


    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
}
