package com.mathify.rest.dto.request;

import jakarta.validation.constraints.Min;

public record ChapterCompleteInput(
    @Min(0) Integer timeSpentSeconds
) {}
