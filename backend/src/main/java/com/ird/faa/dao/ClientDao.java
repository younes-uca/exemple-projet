package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Client;


@Repository
public interface ClientDao extends JpaRepository<Client,Long> {




    Client findByReference(String reference);

    int deleteByReference(String reference);



}
