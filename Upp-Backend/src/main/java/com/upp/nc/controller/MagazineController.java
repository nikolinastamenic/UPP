package com.upp.nc.controller;

import com.upp.nc.repository.MagazineRepository;
import com.upp.nc.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping(value = "/magazine")
public class MagazineController {


    private final MagazineRepository magazineRepository;
    private final FileStorageService fileStorageService;

    public MagazineController(MagazineRepository magazineRepository, FileStorageService fileStorageService) {
        this.magazineRepository = magazineRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity getList() {
        return new ResponseEntity(this.magazineRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/pdf", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity savePdf(@RequestPart("file") MultipartFile file) {

        String filename = this.fileStorageService.store(file);

        return ResponseEntity.ok().build();

    }

    @GetMapping(value = "/pdf/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
                                                 HttpServletRequest request) {
        Resource file = this.fileStorageService.loadFile(fileName + ".pdf");

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
