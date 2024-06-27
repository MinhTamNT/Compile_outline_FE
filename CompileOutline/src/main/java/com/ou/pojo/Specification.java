package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.swing.text.View;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "specification")
@NamedQueries({
        @NamedQuery(name = "Specification.findAll", query = "select s from Specification s"),
        @NamedQuery(name = "Specification.findByOrderByIdDesc", query = "select s from Specification s order by s.id DESC"),
        @NamedQuery(name = "Specification.findByLecturerUser_Id", query = "select s from Specification s where s.lecturerUser.id = :id"),
        @NamedQuery(name = "Subject.findAllUnassigned", query = "select s from Subject s where s.id NOT IN (select a.subject.id FROM Specification a)"),
        @NamedQuery(name = "Subject.findAllUnassignedIncludingCurrent", query = "SELECT s FROM Subject s WHERE s.id NOT IN (SELECT a.subject.id FROM Specification a) OR s.id = :currentSubjectId"),
        @NamedQuery(name = "Specification.countByIsSubmittedTrue", query = "select count(s) from Specification s where s.isSubmitted = true"),
        @NamedQuery(name = "Specification.findByIsSubmittedTrue", query = "select s from Specification s where s.isSubmitted = true")
})

public class Specification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "credits")
    @NotNull(message = "Vui lòng nhập tín chỉ")
    private Integer credits;

    @Column(name = "createdAt")
    private Instant createdAt;

    @Lob
    @Column(name = "description")
    @NotEmpty(message = "Vui lòng mô tả")
    @JsonIgnore
    private String description;

    @Column(name = "is_submitted")
    @JsonIgnore
    private Boolean isSubmitted;

    @Column(name = "assignment_date")
    @JsonIgnore
    private Instant assignmentDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Lecturer_User_id", nullable = false)
    private Lecturer lecturerUser;



    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Subject_id", nullable = false)
    private Subject subject;


    @OneToMany(mappedBy = "specification", fetch = FetchType.EAGER)
    @Valid
    @JsonIgnore
    private Set<Objective> objectives = new LinkedHashSet<>();


    @OneToMany(mappedBy = "specification", fetch = FetchType.EAGER)
    @Valid
    @JsonIgnore
    private Set<Outcome> outcomes = new LinkedHashSet<>();


    @OneToMany(mappedBy = "specification", fetch = FetchType.EAGER)
    @JsonIgnore
    @Valid
    private Set<SpecificationRating> specificationRatings = new LinkedHashSet<>();


    @OneToMany(mappedBy = "specification", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Feedback> feedbacks = new LinkedHashSet<>();


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "specification_year",
            joinColumns = @JoinColumn(name = "Specification_id"),
            inverseJoinColumns = @JoinColumn(name = "Year_id"))
    private Set<Year> years = new LinkedHashSet<>();



}
