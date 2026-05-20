package com.mathify.model;

import java.util.ArrayList;

public abstract class Quiz implements Gradeable{
    private String quizId;
    private ArrayList<Question> question;
    
    public Quiz(String id ,ArrayList<Question> arr ){
        this.quizId = id;
        this.question = arr;
    }

    @Override
    public double getScore(ArrayList<Question> answer){
        return 1;
    }

    @Override
    public boolean isPassed(ArrayList<Question> answer){
        // for (int i=0; i<question.size(); i++){
        //     if (answer.get(i) instanceof MultipleChoiceQuestion){
        //         MultipleChoiceQuestion q = question.get(i);
        //         MultipleChoiceQuestion a = new MultipleChoiceQuestion(answer.get(i));
        //         if (answer.get(i).getAnswer() != question.get(i).getAnswer()){
        //             return false;
        //         }
        //     }
        // } 
        return true;
    }
}
