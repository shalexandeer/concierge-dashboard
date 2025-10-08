# Quick Testing Guide

## ✅ Both Servers Are Running!

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:5173

## 🔐 Test Credentials

**Username**: `admin`  
**Password**: `password123`

## 📋 Quick Test Steps

### 1. Login Test
1. Open http://localhost:5173 in your browser
2. You'll be redirected to the login page
3. Enter credentials:
   - Username: `admin`
   - Password: `password123`
4. Click "Login"
5. ✅ You should be redirected to `/dashboard`

### 2. Test Navigation
Click through the sidebar:
- Dashboard
- Users
- Tenants  
- Amenities

### 3. Test Tenants (Already has data!)
1. Click "Tenants" in sidebar
2. You should see "Sunset Apartments"
3. Try:
   - ✅ Click "Add Tenant" to create a new one
   - ✅ Click edit icon to modify
   - ✅ Click delete icon to remove (confirm dialog appears)

### 4. Test Amenities
1. Click "Amenities" in sidebar
2. Click "Categories" button
3. Click "Add Category"
4. Fill in:
   - Tenant: Select "Sunset Apartments"
   - Name: "Recreation"
   - Description: "Recreational facilities"
5. Click "Create Category"
6. Go back to Amenities
7. Click "Add Amenity"
8. Fill in:
   - Tenant: "Sunset Apartments"
   - Category: "Recreation"
   - Name: "Swimming Pool Access"
   - Price: 25.00
   - Stock: 100
9. Click "Create Amenity"

### 5. Test Users
1. Click "Users" in sidebar
2. You should see the "admin" user
3. Try creating a new user
4. Try editing an existing user

## 🐛 Troubleshooting

**If login doesn't work:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

**If data doesn't load:**
- Check if backend is running: http://localhost:8080/api/v1/health
- Should return: `{"status":"ok","message":"Service is running"}`

**Common Issues:**
- Clear browser localStorage if you see old data
- Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check CORS errors in console

## 🎯 What to Look For

### ✅ Success Indicators:
- Login works and redirects to dashboard
- Navigation between pages is smooth
- Forms submit successfully
- Toast notifications appear (top-right corner)
- Tables update after creating/editing/deleting
- Loading states show when fetching data

### ❌ Potential Issues:
- 401 Unauthorized errors → Token issue
- 404 Not Found → Route not found
- CORS errors → Backend CORS configuration
- Empty tables → No data or fetch failed

## 🔍 Browser DevTools Tips

**Console Tab:**
- See JavaScript errors
- See console.log outputs

**Network Tab:**
- See all API calls
- Check request/response data
- See if token is being sent
- Look for failed requests (red)

**Application Tab:**
- Check localStorage for `access_token`
- Should be set after login

## 📝 API Endpoints Ready to Test

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/auth/register` | POST | Register new user |
| `/api/v1/auth/login` | POST | Login |
| `/api/v1/me` | GET | Get current user |
| `/api/v1/users` | GET | List users |
| `/api/v1/tenants` | GET/POST | List/Create tenants |
| `/api/v1/amenities` | GET/POST | List/Create amenities |
| `/api/v1/amenities-categories` | GET/POST | List/Create categories |

Enjoy testing! 🚀

