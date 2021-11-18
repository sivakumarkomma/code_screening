package com.hw.code.screening.service;

import com.hw.code.screening.service.dto.ContentDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.hw.code.screening.domain.Content}.
 */
public interface ContentService {
    /**
     * Save a content.
     *
     * @param contentDTO the entity to save.
     * @return the persisted entity.
     */
    ContentDTO save(ContentDTO contentDTO);

    /**
     * Partially updates a content.
     *
     * @param contentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ContentDTO> partialUpdate(ContentDTO contentDTO);

    /**
     * Get all the contents.
     *
     * @return the list of entities.
     */
    List<ContentDTO> findAll();

    /**
     * Get the "id" content.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ContentDTO> findOne(Long id);

    /**
     * Delete the "id" content.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
