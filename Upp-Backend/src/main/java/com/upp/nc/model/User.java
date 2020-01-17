package com.upp.nc.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table
@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String ime;
    @Column
    private String prezime;
    @Column
    private String grad;
    @Column
    private String drzava;
    @Column
    private String titula;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String email;
    @ElementCollection
    private List<String> naucneOblasti;

    public User() {
        naucneOblasti = new ArrayList<>();
    }
}
