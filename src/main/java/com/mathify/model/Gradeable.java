package com.mathify.model;
import java.util.ArrayList;

public interface Gradeable {
    public double getScore(ArrayList<Question> answer);
    public boolean isPassed(ArrayList<Question> answer);
}
