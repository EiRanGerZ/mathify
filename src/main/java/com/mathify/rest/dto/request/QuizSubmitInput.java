package com.mathify.rest.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record QuizSubmitInput(
    @NotNull @Valid List<AnswerInput> answers
) {}
