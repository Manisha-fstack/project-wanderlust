# MongoDB Setup & Management Guide

## ✅ Your Current Status

**MongoDB is already installed and running on your system!**

- Installed at: `/opt/homebrew/bin/mongod`
- Service: `mongodb-community@7.0`
- Status: **Running** ✅

---

## 🔧 Managing MongoDB on macOS

### Check if MongoDB is Running
```bash
brew services list | grep mongodb
# or
pgrep -fl mongod
```

### Start MongoDB
```bash
# Start MongoDB service
brew services start mongodb-community@7.0

# Or start manually (runs in foreground)
mongod --config /opt/homebrew/etc/mongod.conf
```

### Stop MongoDB
```bash
brew services stop mongodb-community@7.0
```

### Restart MongoDB
```bash
brew services restart mongodb-community@7.0
```

### Check MongoDB Status
```bash
# Test connection
mongosh --eval "db.runCommand({ ping: 1 })"

# Or connect to MongoDB shell
mongosh
```

---

## 🔌 Connection String for .env File

Since you have **local MongoDB** installed, your `.env` file should have:

```env
ATLAS_DB_URL=mongodb://127.0.0.1:27017/wanderlust
```

**Note:** The database name `wanderlust` will be created automatically when you first use it.

---

## 🆚 Local vs Cloud (Atlas) MongoDB

### Current Setup: **Local MongoDB** ✅
- Already running on your Mac
- Connection: `mongodb://127.0.0.1:27017/wanderlust`
- No internet required
- Data stored locally

### Alternative: **MongoDB Atlas** (Cloud)
If you want to use cloud instead:

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust`
4. Update your `.env` file

---

## 🐛 Troubleshooting

### MongoDB Won't Start
```bash
# Check for errors
tail -f /opt/homebrew/var/log/mongodb/mongo.log

# Check if port 27017 is in use
lsof -i :27017
```

### Connection Timeout Error
1. **Verify MongoDB is running:**
   ```bash
   brew services list | grep mongodb
   ```

2. **Check your .env file:**
   Make sure you have the correct connection string:
   ```env
   ATLAS_DB_URL=mongodb://127.0.0.1:27017/wanderlust
   ```

3. **Test connection:**
   ```bash
   mongosh mongodb://127.0.0.1:27017/wanderlust
   ```

### Reset MongoDB Data
```bash
# Stop MongoDB
brew services stop mongodb-community@7.0

# Delete database files (CAREFUL: This deletes all data!)
rm -rf /opt/homebrew/var/mongodb/*

# Start MongoDB again
brew services start mongodb-community@7.0
```

---

## 📝 Quick Commands Reference

| Task | Command |
|------|---------|
| Start MongoDB | `brew services start mongodb-community@7.0` |
| Stop MongoDB | `brew services stop mongodb-community@7.0` |
| Restart MongoDB | `brew services restart mongodb-community@7.0` |
| Check Status | `brew services list \| grep mongodb` |
| Connect to Shell | `mongosh` |
| Test Connection | `mongosh --eval "db.runCommand({ ping: 1 })"` |

---

## ✅ Next Steps

1. **Verify your `.env` file** has the local connection string:
   ```env
   ATLAS_DB_URL=mongodb://127.0.0.1:27017/wanderlust
   ```

2. **Start your app:**
   ```bash
   npm start
   # or
   node app.js
   ```

3. **If you still get connection errors**, check:
   - MongoDB is running: `brew services list`
   - Your `.env` file has the correct connection string
   - No firewall is blocking port 27017

