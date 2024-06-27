package com.ou.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@Table(name = "user")
@NamedQueries({
        @NamedQuery(name = "User.findById", query = "select u from User u where u.id = :id"),
        @NamedQuery(name = "User.findByUsername", query = "select u from User u where u.username = :username"),
        @NamedQuery(name = "User.findByIsActive", query = "select u from User u where u.isActive = :isActive")
})
public class User implements Serializable {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "Tên đăng nhập không được để trống")
    @Column(name = "username", nullable = false, length = 45)
    @NotNull(message = "Tên đăng nhập không được để trống")
    private String username;


    @NotEmpty(message = "Mật khẩu không được để trống")
    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Lob
    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    @Valid
    private Profile profile;

    @Valid
    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Lecturer lecturer;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Student student;

}