package com.ou.pojo;

import lombok.AllArgsConstructor;
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
public class SubjectRequirementId implements Serializable {
    private static final long serialVersionUID = -3740726909843399410L;
    @Column(name = "Subject_id", nullable = false)
    private Integer subjectId;

    @Column(name = "Subject_requirements_id", nullable = false)
    private Integer subjectRequirementsId;

    public SubjectRequirementId(Integer subjectId, Integer subjectRequirementsId) {
        this.subjectId = subjectId;
        this.subjectRequirementsId = subjectRequirementsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SubjectRequirementId entity = (SubjectRequirementId) o;
        return Objects.equals(this.subjectId, entity.subjectId) &&
                Objects.equals(this.subjectRequirementsId, entity.subjectRequirementsId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(subjectId, subjectRequirementsId);
    }

}