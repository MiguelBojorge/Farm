import psycopg2

try:
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="admin123",
        host="localhost",
        port="5432"
    )
    conn.autocommit = True
    cur = conn.cursor()
    
    # Drop and recreate granja database
    cur.execute("DROP DATABASE IF EXISTS granja WITH (FORCE);")
    cur.execute("CREATE DATABASE granja;")
    
    print("Database 'granja' reset successfully.")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error resetting database: {e}")
