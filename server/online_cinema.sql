--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
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
    rating integer,
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
190	Maleficent	Robert Stromberg	A beautiful, pure-hearted young woman, Maleficent has an idyllic life growing up in a peaceable forest kingdom, until one day when an invading army threatens the harmony of the land.	15000	maleficent-poster.jpg	https://youtube.com/embed/n0OFH4xpPr4	maleficent-movie.mp4
159	Joker	Todd Phillips	During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.	10000	joker-poster.jpg	https://www.youtube.com/embed/t433PEQGErc	joker-movie.mp4
184	Sri Asih	Upi Avianto	Alana doesn’t understand why she is always influenced by anger. But she has always been trying to fight it. As she reaches adulthood, Alana discover the truth about her origin: she’s not an ordinary human being.	15000	sri-asih-poster.jpg	https://youtube.com/embed/564eG_1Mvf0	sri-asih-movie.mp4
160	Parasite	Bong Joon-ho	The struggling Kim family sees an opportunity when the son starts working for the wealthy Park family. Soon, all of them find a way to work within the same household and start living a parasitic life.	10000	parasite-poster.jpg	https://www.youtube.com/embed/5xH0HfJHsaY	parasite-movie.mp4
186	Enola Holmes 2	Harry Bradbeer	Now a detective-for-hire like her infamous brother, Enola Holmes takes on her first official case to find a missing girl, as the sparks of a dangerous conspiracy ignite a mystery that requires the help of friends — and Sherlock himself — to unravel.	10000	enola-holmes-2-poster.jpg	https://youtube.com/embed/KKXNmYoPkx0	enola-holmes-2-movie.mp4
187	Me Before You	Jojo Moyes	A small town girl is caught between dead-end jobs. A high-profile, successful man becomes wheelchair bound following an accident. The man decides his life is not worth living until the girl is hired for six months to be his new caretaker. 	10000	me-before-you-poster.jpg	https://youtube.com/embed/Eh993__rOxA	me-before-you-movie.mp4
185	Black Panther: Wakanda Forever	Ryan Coogler	Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross.	15000	black-panther-wakanda-forever-poster.jpg	https://youtube.com/embed/RlOB3UALvrQ	black-panther-wakanda-forever-movie.mp4
188	The Fault In Our Start	Josh Boone	Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis.	15000	the-fault-in-our-start-poster.jpg	https://youtube.com/embed/9ItBvH5J6ss	the-fault-in-our-start-movie.mp4
189	Divergent	Neil Burger	In a world divided into factions based on personality types, Tris learns that she's been classified as Divergent and won't fit in. When she discovers a plot to destroy Divergents.	20000	divergent-poster.jpg	https://youtube.com/embed/sutgWjz10sM	divergent-movie.mp4
158	Tenet	Christopher Nolan	Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.	5000	tenet-poster.jpg	https://www.youtube.com/embed/LdOM0x0XDMo	tenet-movie.mp4
157	Interstellar	Christopher Nolan	The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.	15000	interstellar-poster.jpg	https://www.youtube.com/embed/827FNDpQWrQ	interstellar-movie.mp4
156	Thor: Love and Thunder	Taika Waititi	After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure.	10000	thor-love-and-thunder-poster.jpg	https://www.youtube.com/embed/Go8nTmfrQd8	thor-love-and-thunder-movie.mp4
153	The Batman	Matt Reeves	Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.	15000	the-batman-poster.jpg	https://www.youtube.com/embed/mqqft2x_Aa4	the-batman-movie.mp4
150	Pulp Fiction	Quentin Tarantino	In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.	15000	pulp-fiction-poster.jpg	https://www.youtube.com/embed/tGpTpVyI_OQ	pulp-fiction-movie.mp4
1	Jaws	Steven Spielberg	A police chief, a marine scientist and a fisherman spring into action after a white shark terrorises the inhabitants of Amity, a quiet island.	10000	jaws-poster.jpg	https://www.youtube.com/embed/U1fu_sA7XhE	jaws-movie.mp4
183	Love, Rosie	Christian Ditter	Since the moment they met at age 5, Rosie and Alex have been best friends, facing the highs and lows of growing up side by side. A fleeting shared moment, one missed opportunity, and the decisions that follow send their lives in completely different directions. 	20000	love-rosie-poster.jpg	https://youtube.com/embed/5zL3YJKygd4	love-rosie-movie.mp4
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (id, username, title, rating, review) FROM stdin;
12	test_user	Parasite	5	Amazing movie!
13	user_testing	Parasite	5	Such a masterpiece by Bong Joon-ho
14	user_testing	Jaws	5	Had me on the edge of my seat!
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
3	dummy_user	Joker	10000	2022-11-10 21:22:01.994864
4	dummy_user	The Batman	15000	2022-11-08 00:15:51.388604
5	dummy_user	Jaws	10000	2022-11-15 22:47:10.350774
6	test_user	\N	\N	2022-12-19 09:54:10.731348
7	test_user	\N	\N	2022-12-19 09:57:05.349771
8	test_user	Parasite	10000	2022-12-19 10:38:55.028432
9	user_testing	Parasite	10000	2022-12-19 13:51:16.507277
10	user_testing	Jaws	10000	2022-12-19 13:54:09.908079
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, user_type) FROM stdin;
1	admin	admin@online.cinema.com	123	admin
2	dummy_user	dummy_user@email.com	123	user
3	user_testing	user_testing@email.com	123	user
8	testing_user	testing_user@email.com	123	user
47	user_test	user_test@email.com	123	user
49	user_abc	user_abc@email.com	123	user
51	user_xyz	user_xyz@email.com	123	user
52	test_user	test_user@email.com	123	user
\.


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 190, true);


--
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 14, true);


--
-- Name: reset_password_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reset_password_log_id_seq', 1, false);


--
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 10, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 52, true);


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

