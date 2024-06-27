package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "subject_requirements")
@NamedQueries({
        @NamedQuery(name = "SubjectRequirement.findBySubject_Id", query = "select s from SubjectRequirement s where s.subject.id = :id"),
        @NamedQuery(name = "SubjectRequirement.findBySubject_IdAndSubjectRequirements_Id", query = "select s from SubjectRequirement s where s.subject.id = :subjectId and s.subjectRequirements.id = :subjectRequirementsId")
})
public class SubjectRequirement {
    @EmbeddedId
    @JsonIgnore
    private SubjectRequirementId id;

    @MapsId("subjectId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Subject_id", nullable = false)
    @JsonIgnore
    private Subject subject;

    @Valid
    @MapsId("subjectRequirementsId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Subject_requirements_id", nullable = false)
    private Subject subjectRequirements;


    @Valid
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Requirements_id", nullable = false)
    private Requirement requirements;

}