CREATE DATABASE loja_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE loja_db;

-- =========================
-- Tabela: produtos
-- =========================
CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  quantidade_estoque INT DEFAULT 0,
  status BOOLEAN DEFAULT TRUE,
  destaque BOOLEAN DEFAULT FALSE,
  marca VARCHAR(100),
  modelo VARCHAR(100),
  garantia_meses INT DEFAULT 0,
  id_categorias INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT
);

INSERT INTO produtos (
  nome, descricao, preco, quantidade_estoque,
  marca, modelo, garantia_meses, destaque, id_categorias
) VALUES
('Notebook Dell', 'Notebook para uso profissional', 3500.00, 10, 'Dell', 'Inspiron', 12, 1, 1),
('Mouse Gamer', 'Mouse com LED RGB', 150.00, 50, 'Logitech', 'G203', 6, 0, 2),
('Smartphone Samsung', 'Celular Android', 2500.00, 15, 'Samsung', 'Galaxy S', 12, 1, 3);

INSERT INTO categorias (
  nome, descricao
) VALUES
('Notebook', 'Eletronicos'),
('Mouse Gamer', 'Percategoriascategoriasiféricos'),
('Smartphone', 'Aparelho telefonico');

ALTER TABLE produtos ADD CONSTRAINT fk_prod_categorias FOREIGN KEY produtos(id_categorias) REFERENCES categorias(id);

select * from produtos