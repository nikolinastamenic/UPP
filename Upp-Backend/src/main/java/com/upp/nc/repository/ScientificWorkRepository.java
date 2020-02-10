package com.upp.nc.repository;

import com.upp.nc.model.ScientificWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScientificWorkRepository extends JpaRepository<ScientificWork, Long> {
}
