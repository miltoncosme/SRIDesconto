--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- Started on 2020-03-03 14:40:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16903)
-- Name: cadastro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cadastro (
    cpf character varying(14) NOT NULL,
    nome character varying(60) NOT NULL,
    email character varying(100) NOT NULL,
    empresa character varying(14) NOT NULL
);


ALTER TABLE public.cadastro OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16906)
-- Name: cliproduto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliproduto (
    cliente character varying(14) NOT NULL,
    codproduto character varying(14) NOT NULL
);


ALTER TABLE public.cliproduto OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16909)
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    empresa character varying(14) NOT NULL,
    cod_produto character varying(14) NOT NULL,
    descricao character varying(60) NOT NULL,
    preco numeric(15,2) NOT NULL,
    promocao numeric(15,2) NOT NULL,
    imagem bytea
);


ALTER TABLE public.produtos OWNER TO postgres;


--
-- TOC entry 2695 (class 2606 OID 16917)
-- Name: cadastro pk_cadastro; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT pk_cadastro PRIMARY KEY (cpf);


--
-- TOC entry 2697 (class 2606 OID 16919)
-- Name: produtos pk_produtos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT pk_produtos PRIMARY KEY (empresa, cod_produto);


--
-- TOC entry 2698 (class 2606 OID 16920)
-- Name: cliproduto cliproduto_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliproduto
    ADD CONSTRAINT cliproduto_cliente_fkey FOREIGN KEY (cliente) REFERENCES public.cadastro(cpf);


-- Completed on 2020-03-03 14:40:46

--
-- PostgreSQL database dump complete
--

