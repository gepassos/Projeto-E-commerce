package com.backend.ecommerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.ecommerce.model.Produto;

@Repository
public interface ProdutoRepository extends MongoRepository<Produto, String> {

}
