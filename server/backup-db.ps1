# Export database
pg_dump -f online_cinema.sql postgresql://pieter:v2_3vnub_Ji6p2CPHwc24XEwaYg4J9dX@db.bit.io/pieter/online_cinema

# Import databse
# psql postgresql://pieter:v2_3vnub_Ji6p2CPHwc24XEwaYg4J9dX@db.bit.io/pieter/online_cinema < online_cinema.sql