# Export database
pg_dump -f server/online_cinema.sql postgresql://pieter:v2_3vnub_Ji6p2CPHwc24XEwaYg4J9dX@db.bit.io/pieter/online_cinema

# Import databse
# psql postgresql://pieter:v2_3vnub_Ji6p2CPHwc24XEwaYg4J9dX@db.bit.io/pieter/online_cinema < server/online_cinema.sql