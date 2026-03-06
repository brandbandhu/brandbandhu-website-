package com.brandbandhu.cms.repository;

import com.brandbandhu.cms.model.CaseStudy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
  Optional<CaseStudy> findBySlug(String slug);
  List<CaseStudy> findByPublishedTrueOrderByPublishedAtDesc();
}
