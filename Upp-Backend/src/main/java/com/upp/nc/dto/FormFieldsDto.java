package com.upp.nc.dto;

import java.util.List;

import org.camunda.bpm.engine.form.FormField;

public class FormFieldsDto {
    String taskId;
    List<FormField> formFields;
    String processInstanceId;
    String activeTaskKey;

    public FormFieldsDto(String taskId, String processInstanceId, List<FormField> formFields, String activeTaskKey) {
        super();
        this.taskId = taskId;
        this.formFields = formFields;
        this.processInstanceId = processInstanceId;
        this.activeTaskKey = activeTaskKey;
    }

    public FormFieldsDto() {
        super();
        // TODO Auto-generated constructor stub
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public List<FormField> getFormFields() {
        return formFields;
    }

    public void setFormFields(List<FormField> formFields) {
        this.formFields = formFields;
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public String getActiveTaskKey() {
        return activeTaskKey;
    }

    public void setActiveTaskKey(String activeTaskKey) {
        this.activeTaskKey = activeTaskKey;
    }
}
