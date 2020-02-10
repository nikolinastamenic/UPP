package com.upp.nc.model;

import lombok.Data;

import javax.persistence.*;

@Table
@Entity
@Data
public class ScientificWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String naslov;
    @Column
    private String koautor;
    @Column
    private String kljucniPojmovi;
    @Column
    private String apstrakt;
    @Column
    private String pathPDF;
    @Column
    private String glavniUrednik;

    @ManyToOne
    private Magazine magazine;
}
