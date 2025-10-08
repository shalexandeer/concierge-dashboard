# Testing Guide - Concierge Dashboard Integration

## 🚀 Servers Running

✅ **Backend**: http://localhost:8080
✅ **Frontend**: http://localhost:5173

## 📋 Testing Checklist

### 1. Test Login Flow

1. **Open the frontend**: http://localhost:5173
2. You should be redirected to `/login`
3. **Register a new user** (if you don't have one):
   - Click on any registration link or use API directly
   - Or use the backend API to create a user

**Test Login:**
```bash
# First, register a user via backend API:
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@concierge.com",
    "password": "password123",
    "fullName": "Admin User",
    "phoneNumber": "+1234567890"
  }'

# Then login:
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@concierge.com",
    "password": "password123"
  }'
```

4. **Login via UI:**
   - Email: `admin@concierge.com`
   - Password: `password123`
   - Click "Login"
   - You should be redirected to `/dashboard`

### 2. Test Navigation

Once logged in, test the sidebar navigation:
- ✅ Dashboard
- ✅ Users
- ✅ Tenants
- ✅ Amenities

### 3. Test Tenants Management

1. **Navigate to Tenants** (`/tenants`)
2. **Create a new tenant:**
   - Click "Add Tenant"
   - Fill in:
     - Name: `Sunset Apartments`
     - Domain: `sunset.concierge.com`
   - Click "Create Tenant"
   - You should see the new tenant in the list

3. **Edit the tenant:**
   - Click the edit icon
   - Update the name or domain
   - Click "Update Tenant"

4. **Delete the tenant** (optional):
   - Click the delete icon
   - Confirm deletion

### 4. Test Amenity Categories

1. **Navigate to Amenities** (`/amenities`)
2. **Click "Categories"** button
3. **Create a new category:**
   - Click "Add Category"
   - Fill in:
     - Tenant: Select "Sunset Apartments"
     - Name: `Recreation`
     - Description: `Recreational facilities`
   - Click "Create Category"

4. **Create more categories** for testing:
   - `Services` - "Concierge services"
   - `Facilities` - "Building facilities"

### 5. Test Amenities Management

1. **Navigate back to Amenities** (`/amenities`)
2. **Create a new amenity:**
   - Click "Add Amenity"
   - Fill in:
     - Tenant: `Sunset Apartments`
     - Category: `Recreation`
     - Name: `Swimming Pool Access`
     - Description: `1 hour pool access`
     - Price: `25.00`
     - Stock: `100`
   - Click "Create Amenity"

3. **Create more amenities** for testing:
   - Category: `Services`
     - Name: `Dry Cleaning`
     - Price: `15.00`
     - Stock: `50`
   - Category: `Facilities`
     - Name: `Gym Access`
     - Price: `10.00`
     - Stock: `200`

4. **Test editing:**
   - Click edit on any amenity
   - Change the price or stock
   - Click "Update Amenity"

5. **Test deletion:**
   - Click delete on an amenity
   - Confirm the deletion

### 6. Test Users Management

1. **Navigate to Users** (`/users`)
2. **View all users** - you should see your admin user
3. **Create a new user:**
   - Click "Add User"
   - Fill in:
     - Email: `user@concierge.com`
     - Password: `password123`
     - Full Name: `Test User`
     - Phone: `+1234567891`
   - Click "Create User"

4. **Edit user:**
   - Click edit icon
   - Update full name or phone
   - Click "Update User"

## 🧪 API Testing with curl

### Check Backend Health
```bash
curl http://localhost:8080/api/v1/health
```

### Create Tenant
```bash
curl -X POST http://localhost:8080/api/v1/tenants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Apartments",
    "domain": "test.concierge.com"
  }'
```

### Get All Tenants
```bash
curl http://localhost:8080/api/v1/tenants \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Amenity Category
```bash
curl -X POST http://localhost:8080/api/v1/amenities-categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "tenantId": "TENANT_ID",
    "name": "Recreation",
    "description": "Recreational facilities"
  }'
```

### Create Amenity
```bash
curl -X POST http://localhost:8080/api/v1/amenities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "tenantId": "TENANT_ID",
    "categoryId": "CATEGORY_ID",
    "name": "Swimming Pool",
    "description": "Pool access",
    "price": 25.00,
    "stock": 100
  }'
```

## 🔍 What to Look For

### ✅ Success Indicators:
- Login redirects to dashboard
- Navigation works smoothly
- Forms submit successfully
- Data appears in tables after creation
- Edit forms pre-populate with existing data
- Delete confirmations appear
- Success toast notifications show
- Lists update after CRUD operations

### ❌ Potential Issues to Check:
- CORS errors in console
- 401 Unauthorized errors
- Token not being sent with requests
- Form validation errors
- Network timeouts
- Database connection errors

## 🐛 Troubleshooting

### If Login Fails:
1. Check backend logs
2. Verify database is running
3. Check CORS configuration
4. Verify email/password are correct

### If API Calls Fail:
1. Open browser DevTools (F12)
2. Check Network tab for failed requests
3. Look at Console for errors
4. Verify token in localStorage: `localStorage.getItem('access_token')`

### If Data Doesn't Load:
1. Check if backend is running: `curl http://localhost:8080/api/v1/health`
2. Verify database has data
3. Check browser console for errors
4. Look at Network tab for 404 or 500 errors

## 📝 Notes

- All forms have validation
- Delete actions require confirmation
- Tables auto-refresh after mutations
- Authentication token stored in localStorage
- Backend runs on port 8080
- Frontend runs on port 5173

