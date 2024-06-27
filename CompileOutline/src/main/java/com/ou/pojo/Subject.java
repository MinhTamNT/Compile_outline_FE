package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "subject")
@NamedQueries({
        @NamedQuery(name = "Subject.findAll", query = "select s from Subject s"),
        @NamedQuery(name = "Subject.count", query = "select count(s) from Subject s")
})
public class Subject {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id;

    @Column(name = "subject_name", length = 50)
    @NotEmpty(message = "Môn học không được để trống")
    private String subjectName;

    @NotNull(message = "Khoa không được để trống")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Faculty_id", nullable = false)
    @JsonIgnore
    private Faculty faculty;

    @OneToMany(mappedBy = "subject", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<SubjectRequirement> subjectRequirements = new LinkedHashSet<>();

}