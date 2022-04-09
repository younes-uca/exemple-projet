package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.CategorieProduit;


@Repository
public interface CategorieProduitDao extends JpaRepository<CategorieProduit,Long> {




    CategorieProduit findByReference(String reference);

    int deleteByReference(String reference);



}
