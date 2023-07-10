package com.backend.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.ecommerce.model.Produto;
import com.backend.ecommerce.service.ProdutoService;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/")
    public ResponseEntity<Produto> saveOrUpdate(@RequestBody Produto produto) {
        return new ResponseEntity<>(produtoService.saveOrUpdate(produto), HttpStatus.ACCEPTED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Produto>> getAllProdutos() {
        List<Produto> produtos = produtoService.getAllProdutos();
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable String id) {
        Produto produto = produtoService.getProdutoById(id);
        if (produto != null) {
            return new ResponseEntity<>(produto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable String id, @RequestBody Produto produto) {
        Produto updatedProduto = produtoService.updateProduto(id, produto);
        if (updatedProduto != null) {
            return new ResponseEntity<>(updatedProduto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduto(@PathVariable String id) {
        boolean deleted = produtoService.deleteProduto(id);
        if (deleted) {
            String message = "Product with ID " + id + " has been deleted.";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String message = "Product with ID " + id + " not found.";
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
    }

}