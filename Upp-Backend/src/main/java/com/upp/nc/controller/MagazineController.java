package com.upp.nc.controller;

import com.upp.nc.repository.MagazineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/magazine")
public class MagazineController {


    private final MagazineRepository magazineRepository;

    public MagazineController(MagazineRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
    }

    @GetMapping
    public ResponseEntity getList() {
        return new ResponseEntity(this.magazineRepository.findAll(), HttpStatus.OK);
    }
}
