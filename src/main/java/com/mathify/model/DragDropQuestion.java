package com.mathify.model;

import java.util.ArrayList;

public class DragDropQuestion extends Question {
    private ArrayList<String> items;
    private ArrayList<String> correctOrder;

    public ArrayList<String> getItems(){
        return items;
    }

    public ArrayList<String> getAnswer(){
        return correctOrder;
    }
    @Override
    public boolean checkAnswer(String answer){
        return String.join(",", correctOrder).equals(answer);
    }
}
