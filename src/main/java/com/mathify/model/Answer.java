package com.mathify.model;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Sealed interface — hanya 3 tipe jawaban yang diizinkan. Setiap tipe jawaban
 * direpresentasikan sebagai record immutable.
 */
public sealed interface Answer permits
        Answer.MultipleChoiceAnswer,
        Answer.FillBlankAnswer,
        Answer.DragAndDropAnswer {

    /**
     * Jawaban pilihan ganda — bisa lebih dari satu pilihan (multi-select).
     */
    record MultipleChoiceAnswer(Set<String> selectedOptionIds) implements Answer {

    }

    /**
     * Jawaban isian — List karena satu prompt bisa punya banyak blank.
     */
    record FillBlankAnswer(List<String> filledValues) implements Answer {

    }

    /**
     * Jawaban drag-and-drop — Map<draggableId, dropZoneId>.
     */
    record DragAndDropAnswer(Map<String, String> pairings) implements Answer {

    }
}
