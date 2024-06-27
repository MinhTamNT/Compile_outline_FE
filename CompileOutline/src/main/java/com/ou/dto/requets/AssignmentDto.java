package com.ou.dto.requets;

import com.ou.pojo.Specification;
import com.ou.pojo.Year;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@YearNotOverlapping(message = "The specification for the selected year already exists")
public class AssignmentDto {
    private Specification specification;

    private Year startYear;
}
