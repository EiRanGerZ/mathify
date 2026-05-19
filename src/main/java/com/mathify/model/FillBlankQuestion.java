package com.mathify.model;

public class FillBlankQuestion extends Question {
    private String CorrectAnswer;
    private boolean caseSensitive;

    public boolean getCaseSensitive(){
        return caseSensitive;
    }

    public String getAnswer(){
        return CorrectAnswer;
    }

    @Override
    public boolean checkAnswer(String answer){
        return CorrectAnswer.equalsIgnoreCase(answer);
    }
}
