package com.mathify.model;

import java.util.ArrayList;

public class MultipleChoiceQuestion extends Question{
    private ArrayList<String> option;
    private String CorrectOptionId;
    private int correctOrder;

    public String getAnswer(){
        return option.get(correctOrder);
    }

    public ArrayList<String> getoption(){
        return option;
    }

    public boolean checkAnswer(String answer){
        return answer.equalsIgnoreCase(option.get(correctOrder));
    }
}
