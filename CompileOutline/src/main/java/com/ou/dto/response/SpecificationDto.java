package com.ou.dto.response;

import com.ou.pojo.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link Specification}
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpecificationDto implements Serializable {
    private Integer id;
    private Integer credits;
    private Instant createdAt;
    private String description;
    private String fullname;
    private String email;
    private Subject subject;
    private String faculty;
    private Set<SubjectRequirement> subjectRequirements;
    private Set<Objective> objectives;
    private Set<Outcome> outcomes;
    private Set<SpecificationRating> specificationRatings;
    private Set<Year> years;


}