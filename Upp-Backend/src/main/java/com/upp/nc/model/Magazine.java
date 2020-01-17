package com.upp.nc.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table
@Entity
@Data
public class Magazine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String naziv;
    @Column
    private String ISSNBroj;
    @Column
    private String nacinNaplacivanja;
    @ElementCollection
    private List<String> naucneOblasti;
    @Column
    private String glavniUrednik;
    @ElementCollection
    private List<String> urednici;
    @ElementCollection
    private List<String> recenzenti;

    public Magazine(Long id, String naziv, String ISSNBroj, String nacinNaplacivanja, List<String> naucneOblasti, String glavniUrednik,
                    List<String> urednici, List<String> recenzenti) {
        this.naucneOblasti = new ArrayList<>();
        this.urednici = new ArrayList<>();
        this.recenzenti = new ArrayList<>();
        this.id = id;
        this.naziv = naziv;
        this.nacinNaplacivanja = nacinNaplacivanja;
        if (naucneOblasti != null) {
            this.naucneOblasti = naucneOblasti;
        }
        this.glavniUrednik = glavniUrednik;
        if (urednici != null) {
            this.urednici = urednici;
        }
        if (recenzenti != null) {
            this.recenzenti = recenzenti;
        }
    }

    public Magazine() {
        this.naucneOblasti = new ArrayList<>();
        this.urednici = new ArrayList<>();
        this.recenzenti = new ArrayList<>();
    }
}
