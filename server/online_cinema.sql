--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying,
    director character varying,
    synopsis character varying,
    price integer,
    poster character varying,
    trailer character varying,
    movie character varying
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.movie ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    username character varying,
    title character varying,
    rate integer,
    review character varying
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rating ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reset_password_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reset_password_log (
    id integer NOT NULL,
    username character varying,
    reset_token integer,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.reset_password_log OWNER TO postgres;

--
-- Name: reset_password_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reset_password_log ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reset_password_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    username character varying,
    title character varying,
    price integer,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying,
    email character varying,
    password character varying,
    user_type character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie (id, title, director, synopsis, price, poster, trailer, movie) FROM stdin;
153	The Batman	Matt Reeves	Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.	15000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg	https://www.youtube.com/embed/mqqft2x_Aa4	C:/Users/piete/Videos/stock_nightsky.mp4
150	Pulp Fiction	Quentin Tarantino	In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.	15000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg	https://www.youtube.com/embed/tGpTpVyI_OQ	C:/Users/piete/Videos/stock_nightsky.mp4
1	Jaws	Steven Spielberg	A police chief, a marine scientist and a fisherman spring into action after a white shark terrorises the inhabitants of Amity, a quiet island.	10000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/lxM6kqilAdpdhqUl2biYp5frUxE.jpg	https://www.youtube.com/embed/U1fu_sA7XhE	C:/Users/piete/Videos/stock_nightsky.mp4
156	Thor: Love and Thunder	Taika Waititi	After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure.	10000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg	https://www.youtube.com/embed/Go8nTmfrQd8	C:/Users/piete/Videos/stock_nightsky.mp4
158	Tenet	Christopher Nolan	Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.	5000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/oh8XmxWlySHgGLlx8QOBmq9k72j.jpg	https://www.youtube.com/embed/LdOM0x0XDMo	C:/Users/piete/Videos/stock_nightsky.mp4
157	Interstellar	Christopher Nolan	The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.	15000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg	https://www.youtube.com/embed/827FNDpQWrQ	C:/Users/piete/Videos/stock_nightsky.mp4
159	Joker	Todd Phillips	During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.	10000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg	https://www.youtube.com/embed/t433PEQGErc	C:/Users/piete/Videos/stock_nightsky.mp4
160	Parasite	Bong Joon-ho	All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.	10000	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg	https://www.youtube.com/embed/SEUXfv87Wpk	C:/Users/piete/Videos/stock_nightsky.mp4
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (id, username, title, rate, review) FROM stdin;
\.


--
-- Data for Name: reset_password_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reset_password_log (id, username, reset_token, "timestamp") FROM stdin;
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, username, title, price, "timestamp") FROM stdin;
1	admin	Jaws	10000	2022-10-16 13:37:22.470685
2	admin	Pulp Fiction	15000	2022-10-16 18:00:22.104526
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, user_type) FROM stdin;
1	admin	admin@online.cinema.com	123	admin
\.


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 160, true);


--
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 1, false);


--
-- Name: reset_password_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reset_password_log_id_seq', 1, false);


--
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 2, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- Name: movie movie_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_title_key UNIQUE (title);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);


--
-- Name: reset_password_log reset_password_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_password_log
    ADD CONSTRAINT reset_password_log_pkey PRIMARY KEY (id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: rating rating_title_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_title_fkey FOREIGN KEY (title) REFERENCES public.movie(title);


--
-- Name: rating rating_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_username_fkey FOREIGN KEY (username) REFERENCES public."user"(username);


--
-- Name: reset_password_log reset_password_log_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_password_log
    ADD CONSTRAINT reset_password_log_username_fkey FOREIGN KEY (username) REFERENCES public."user"(username);


--
-- Name: transaction transaction_title_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_title_fkey FOREIGN KEY (title) REFERENCES public.movie(title);


--
-- Name: transaction transaction_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_username_fkey FOREIGN KEY (username) REFERENCES public."user"(username);


--
-- PostgreSQL database dump complete
--

