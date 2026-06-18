package com.mathify.rest.dto.request;

import java.util.List;
import java.util.Map;
import java.util.Set;

public record AnswerInput(
    String questionId,
    String optionId,
    Set<String> selectedOptionIds,
    List<String> filledValues,
    Map<String, String> pairings
) {}
