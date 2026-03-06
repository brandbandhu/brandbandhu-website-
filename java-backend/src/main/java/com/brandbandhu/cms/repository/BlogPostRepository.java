package com.brandbandhu.cms.repository;

import com.brandbandhu.cms.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
  Optional<BlogPost> findBySlug(String slug);
  List<BlogPost> findByPublishedTrueOrderByPublishedAtDesc();
}
