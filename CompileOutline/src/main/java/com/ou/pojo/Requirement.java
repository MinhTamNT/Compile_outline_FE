package com.ou.pojo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "requirements")
@NamedQueries({
        @NamedQuery(name = "Requirement.findAll", query = "select r from Requirement r")
})
public class Requirement {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "type", length = 45)
    private String type;

}