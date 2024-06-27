package com.ou.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class SpecificationYearId implements Serializable {
    private static final long serialVersionUID = -7952768420144059266L;


    @Column(name = "Specification_id", nullable = false)
    private Integer specificationId;

    @Column(name = "Year_id", nullable = false)
    private Integer yearId;



    public SpecificationYearId(Integer specificationId, Integer yearId) {
        this.specificationId = specificationId;
        this.yearId = yearId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SpecificationYearId entity = (SpecificationYearId) o;
        return Objects.equals(this.specificationId, entity.specificationId) &&
                Objects.equals(this.yearId, entity.yearId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(specificationId, yearId);
    }

}