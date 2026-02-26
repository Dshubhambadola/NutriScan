import sqlite3
import os

# Create assets dir if not exists
os.makedirs('assets', exist_ok=True)

conn = sqlite3.connect('assets/ifct2017.db')

# 1. Create foods table
conn.execute('''
CREATE TABLE IF NOT EXISTS foods (
  id          INTEGER PRIMARY KEY,
  code        TEXT UNIQUE,          
  name        TEXT NOT NULL,        
  lang        TEXT,                 
  energy      REAL,                 
  carb        REAL,                 
  fat         REAL,                 
  protein     REAL,                 
  fibre       REAL,                 
  sugar       REAL,                 
  sodium      REAL,                 
  is_custom   INTEGER DEFAULT 0     
);
''')

conn.execute('CREATE INDEX IF NOT EXISTS idx_name ON foods(name)')
conn.execute('CREATE INDEX IF NOT EXISTS idx_lang ON foods(lang)')

# 2. Add dummy data (Indian Foods for MVP)
dummy_foods = [
    (1, 'A001', 'Dal Makhani', 'urad dal, makhan', 300, 35, 12, 11, 8, 2, 400, 0),
    (2, 'A002', 'Dhokla', 'khaman', 160, 22, 4, 6, 2, 8, 250, 0),
    (3, 'A003', 'Paneer Tikka', 'cottage cheese', 260, 6, 20, 16, 0, 2, 350, 0),
    (4, 'A004', 'Samosa', '', 262, 24, 17, 3, 2, 1, 420, 0),
    (5, 'A005', 'Idli', 'steamed rice cake', 58, 12, 0.4, 1.5, 1, 0, 1, 0),
    (6, 'A006', 'Dosa', 'crepe', 168, 29, 3.7, 3.9, 0.9, 0, 94, 0),
    (7, 'A007', 'Gulab Jamun', 'sweet', 300, 42, 13, 3, 0.5, 30, 10, 0),
    (8, 'A008', 'Butter Chicken', 'murgh makhani', 350, 10, 25, 20, 2, 4, 500, 0),
    (9, 'A009', 'Palak Paneer', 'spinach cheese', 230, 8, 18, 14, 4, 2, 300, 0),
    (10, 'A010', 'Chole Bhature', 'chana', 450, 50, 22, 12, 8, 3, 600, 0)
]

conn.executemany('''
INSERT OR IGNORE INTO foods (id, code, name, lang, energy, carb, fat, protein, fibre, sugar, sodium, is_custom)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', dummy_foods)

# 3. Create meal_logs table
conn.execute('''
CREATE TABLE IF NOT EXISTS meal_logs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  food_id       INTEGER,            
  food_name     TEXT NOT NULL,
  meal_type     TEXT NOT NULL,      
  grams         REAL NOT NULL,
  calories      REAL NOT NULL,      
  carbs         REAL NOT NULL,
  fat           REAL NOT NULL,
  protein       REAL NOT NULL,
  fiber         REAL NOT NULL,
  logged_at     INTEGER NOT NULL,   
  FOREIGN KEY (food_id) REFERENCES foods(id)
);
''')
conn.execute("CREATE INDEX IF NOT EXISTS idx_logged_date ON meal_logs(date(logged_at / 1000, 'unixepoch'));")

# 4. Create daily_goals table
conn.execute('''
CREATE TABLE IF NOT EXISTS daily_goals (
  date          TEXT PRIMARY KEY,   
  calorie_goal  INTEGER NOT NULL DEFAULT 2000,
  carb_goal     INTEGER,            
  fat_goal      INTEGER,
  protein_goal  INTEGER
);
''')

conn.commit()
conn.close()

print("Successfully created assets/ifct2017.db with dummy foods, meal_logs, and daily_goals tables.")
