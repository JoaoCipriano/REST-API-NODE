const mysql = require('../mysql').pool;

exports.getSupermercado = (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
          'SELECT * FROM supermarkets;',
          (error, result, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            const response = {
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        id_supermercado: prod.id_supermarket,
                        nome: prod.name,
                        Rua: prod.street,
                        Numero: prod.number,
                        Complemento: prod.complement,
                        Bairro: prod.neighborhood,
                        Cidade: prod.city,
                        Estado: prod.state
                    }
                })
            }
            return res.status(200).send(response);
          }  
        )
    });
};

exports.postSupermercado = (req, res, next) => {
    console.log(req.usuario);
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO supermarkets (name, street, number, complement, neighborhood, city, state) VALUES (?, ?, ?, ?, ?, ?, ?);',
            [
                req.body.name,
                req.body.street,
                req.body.number,
                req.body.complement,
                req.body.neighborhood,
                req.body.city,
                req.body.state
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Supermercado inserido com sucesso',
                    supermercadoCriado: {
                        id_produto: result.id_supermarket,
                        nome: req.body.name,
                        Rua: req.body.street,
                        Numero: req.body.number,
                        Complemento: req.body.complement,
                        Bairro: req.body.neighborhood,
                        Cidade: req.body.city,
                        Estado: req.body.state
                    }
                }
                return res.status(201).send(response);
            }
        )      
    });   
};

exports.getSupermercadoId = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id_produto],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um produto com o ID ' + req.params.id_produto
                    });
                }
                const response = {
                    produto: {
                        id_produto: result[0].id,
                        nome: result[0].name,
                        preco: result[0].value
                    }
                }
                return res.status(200).send(response);
            }  
        )
    });  
};

exports.patchSupermercado = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE supermarkets
                SET name           = ?
              WHERE id_supermarket = ?`,
            [
                req.body.name, 
                req.body.id
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Supermercado atualizado com sucesso',
                    produtoAtualizado: {
                        id_produto: req.body.id,
                        nome: req.body.name,
                    }
                }
                return res.status(202).send(response);
            }
        )      
    });  
};

exports.deleteSupermercado = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM supermarkets WHERE id_supermarket = ?`, [req.body.id],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto removido com sucesso'
                }
                return res.status(202).send(response);
            }
        )      
    }); 
};