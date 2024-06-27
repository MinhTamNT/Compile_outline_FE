package com.ou.pojo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "faculty")
@NamedQueries({
        @NamedQuery(name = "Faculty.findAll", query = "select f from Faculty f")
})
public class Faculty {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "faculty_name", length = 45)
    @NotEmpty(message = "Vui nhập khoa")
    private String facultyName;

}