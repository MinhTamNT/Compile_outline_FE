package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "feedback")
@NamedQueries({
        @NamedQuery(name = "Feedback.findBySpecification_Id", query = "select f from Feedback f where f.specification.id = :id")
})
public class Feedback {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Specification_id", nullable = false)
    @JsonIgnore
    private Specification specification;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Student_User_id", nullable = false)
    private Student studentUser;


    @Size(max = 45)
    @Column(name = "classify", length = 45)
    @JsonIgnore
    private String classify;

    @Column(name = "starts")
    private Float starts;

    @Column(name = "createAt")
    private Instant createAt;

}