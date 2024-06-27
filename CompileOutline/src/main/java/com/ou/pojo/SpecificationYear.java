package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "specification_year")
public class SpecificationYear {
    @EmbeddedId
    @JsonIgnore
    private SpecificationYearId id;

    @MapsId("specificationId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Specification_id", nullable = false)
    private Specification specification;

    @MapsId("yearId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "Year_id", nullable = false)
    private Year year;

}