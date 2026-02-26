# AgriConnect Database Schema

## Tables

### 1. users
Stores user information for both farmers and retailers.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  mobile TEXT UNIQUE,
  role TEXT NOT NULL CHECK(role IN ('farmer', 'retailer')),
  location TEXT,
  verified BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. crops
Stores crop listings created by farmers.

```sql
CREATE TABLE crops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farmer_id INTEGER,
  crop_name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  price REAL NOT NULL,
  harvest_date DATE,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'sold', 'expired')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES users (id)
);
```

### 3. business_requests
Stores business requests from retailers to farmers.

```sql
CREATE TABLE business_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  crop_id INTEGER,
  retailer_id INTEGER,
  farmer_id INTEGER,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (crop_id) REFERENCES crops (id),
  FOREIGN KEY (retailer_id) REFERENCES users (id),
  FOREIGN KEY (farmer_id) REFERENCES users (id)
);
```

### 4. weather_data
Caches weather information for different locations.

```sql
CREATE TABLE weather_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT NOT NULL,
  temperature REAL,
  condition TEXT,
  humidity REAL,
  wind_speed REAL,
  forecast_data TEXT, -- JSON string
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Relationships

- `crops.farmer_id` → `users.id` (Many-to-One)
- `business_requests.crop_id` → `crops.id` (Many-to-One)
- `business_requests.retailer_id` → `users.id` (Many-to-One)
- `business_requests.farmer_id` → `users.id` (Many-to-One)

## Indexes (Recommended)

```sql
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_mobile ON users(mobile);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_crops_farmer_id ON crops(farmer_id);
CREATE INDEX idx_crops_status ON crops(status);
CREATE INDEX idx_business_requests_farmer_id ON business_requests(farmer_id);
CREATE INDEX idx_business_requests_retailer_id ON business_requests(retailer_id);
CREATE INDEX idx_business_requests_status ON business_requests(status);
```