package com.upp.nc.listener;

import com.upp.nc.model.Magazine;
import com.upp.nc.repository.MagazineRepository;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("setGlavniUrednik")
public class SetMainEditorDelegate implements JavaDelegate {
    @Autowired
    private MagazineRepository magazineRepository;
    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        Long magazineId = Long.parseLong((String) delegateExecution.getVariable("casopis"));
        Magazine magazine = this.magazineRepository.getOne(magazineId);
        delegateExecution.getProcessInstance().setVariable("glavni_urednik", magazine.getGlavniUrednik());
        delegateExecution.setVariable("vremenski_rok_za_ispravak", 1);
    }
}
