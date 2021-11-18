package com.hw.code.screening.service.mapper;

import com.hw.code.screening.domain.Content;
import com.hw.code.screening.service.dto.ContentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Content} and its DTO {@link ContentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ContentMapper extends EntityMapper<ContentDTO, Content> {}
