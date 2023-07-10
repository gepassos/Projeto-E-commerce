package com.backend.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.ecommerce.repository.ProdutoRepository;
import com.backend.ecommerce.model.Produto;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto saveOrUpdate(Produto produto) {
        return produtoRepository.save(produto);
    }

    public List<Produto> getAllProdutos() {
        return produtoRepository.findAll();
    }

    public Produto getProdutoById(String id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        return produto.orElse(null);
    }

    public Produto updateProduto(String id, Produto produto) {
        Produto existingProduto = getProdutoById(id);
        if (existingProduto != null) {
            existingProduto.setName(produto.getName());
            existingProduto.setPrice(produto.getPrice());
            existingProduto.setImage(produto.getImage());
            return produtoRepository.save(existingProduto);
        } else {
            return null;
        }
    }

    public boolean deleteProduto(String id) {
        Produto existingProduto = getProdutoById(id);
        if (existingProduto != null) {
            produtoRepository.delete(existingProduto);
            return true;
        } else {
            return false;
        }
    }
}
