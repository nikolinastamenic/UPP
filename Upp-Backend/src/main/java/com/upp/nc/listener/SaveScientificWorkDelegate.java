package com.upp.nc.listener;

import com.upp.nc.model.Magazine;
import com.upp.nc.model.ScientificWork;
import com.upp.nc.repository.MagazineRepository;
import com.upp.nc.repository.ScientificWorkRepository;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

@Service("saveScientificWork")
public class SaveScientificWorkDelegate implements JavaDelegate {
    private final RuntimeService runtimeService;
    private final ScientificWorkRepository scientificWorkRepository;
    private final MagazineRepository magazineRepository;

    public SaveScientificWorkDelegate(RuntimeService runtimeService, ScientificWorkRepository scientificWorkRepository, MagazineRepository magazineRepository) {
        this.runtimeService = runtimeService;
        this.scientificWorkRepository = scientificWorkRepository;
        this.magazineRepository = magazineRepository;
    }

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {

        ScientificWork scientificWork = new ScientificWork();
        scientificWork.setApstrakt((String) delegateExecution.getVariable("apstrakt"));
        scientificWork.setGlavniUrednik((String) delegateExecution.getVariable("glavni_urednik"));
        scientificWork.setKljucniPojmovi((String) delegateExecution.getVariable("kljucni_pojmovi"));
        scientificWork.setKoautor((String) delegateExecution.getVariable("koautor"));
        scientificWork.setNaslov((String) delegateExecution.getVariable("naslov"));
        scientificWork.setPathPDF((String) delegateExecution.getVariable("pdf"));

        Long magazineId = Long.parseLong((String) delegateExecution.getVariable("casopis"));
        Magazine magazine = this.magazineRepository.getOne(magazineId);

        scientificWork.setMagazine(magazine);

        scientificWorkRepository.save(scientificWork);
    }
}
