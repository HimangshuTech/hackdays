import psycopg2
import json
import os

DATABASE_URL = os.getenv("DATABASE_URL")

def export_table_to_json():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL is required")

    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute('''SELECT * FROM "Post" ORDER BY "createdAt" DESC;''')

        colnames = [desc[0] for desc in cursor.description]

        rows = cursor.fetchall()

        data = [dict(zip(colnames, row)) for row in rows]

        with open("data/output.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, default=str)

        print("Export complete")

    except Exception as e:
        print("Error:", e)

    finally:
        if conn:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    export_table_to_json()
