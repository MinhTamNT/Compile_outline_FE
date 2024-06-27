package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "specification_rating")
public class SpecificationRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonIgnore
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Specification_id", nullable = false)
    @JsonIgnore
    private Specification specification;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Rating_id", nullable = false)
    private Rating rating;

    @Column(name = "percent")
    @NotNull(message = "Vui lòng nhập tỉ trọng")
    private Integer percent;

}