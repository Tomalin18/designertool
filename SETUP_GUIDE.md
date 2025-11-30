# 🚀 Setup Guide: Favorites & Sharing Feature

## 📋 Quick Start

### 1. Run the SQL Migration

Open your **Supabase Dashboard** → **SQL Editor** and run the file:

```
RUN_THIS_SQL.sql
```

This will create:
- ✅ `component_favorites` table
- ✅ `component_shares` table  
- ✅ Indexes for performance
- ✅ Row Level Security policies
- ✅ Proper permissions

### 2. Verify Installation

After running the SQL, you can verify with these queries:

```sql
-- Check tables exist
SELECT * FROM component_favorites LIMIT 1;
SELECT * FROM component_shares LIMIT 1;
```

## 🎯 Features Enabled

### ❤️ Favorites
- Users can favorite any component
- Favorites sync across devices
- View all favorites in Profile → Saved Items
- One-click remove with confirmation

### 🔗 Share
- Share to Twitter, Facebook, LinkedIn
- Copy link to clipboard
- Track shares for analytics
- Works without login (tracking is optional)

### 👤 Profile Updates
- **Sidebar navigation** with avatar
- **Three tabs**: My Profile, Saved Items, Settings
- **Upgrade card** (hidden for Pro members)
- **Sign out** button

## 🔐 Security

All tables have Row Level Security (RLS) enabled:

- Users can only see/modify their own favorites
- Share tracking is public for analytics
- Proper CASCADE deletes when user is deleted

## 📊 Database Schema

### component_favorites
```
id                  UUID (PK)
user_id            UUID (FK → auth.users)
component_slug     TEXT
component_name     TEXT
component_category TEXT
created_at         TIMESTAMP
```

### component_shares
```
id             UUID (PK)
component_slug TEXT
platform       TEXT (twitter|facebook|linkedin|copy)
user_id        UUID (FK → auth.users, nullable)
created_at     TIMESTAMP
```

## 🎨 UI Components

### New Files Created:
1. `components/component-actions.tsx` - Share/Favorite buttons
2. `components/favorites-list.tsx` - Favorites grid display
3. `components/profile-sidebar.tsx` - Profile navigation sidebar
4. `app/profile/profile-page-client.tsx` - Profile page with tabs

### Updated Files:
1. `components/component-playground.tsx` - Added ComponentActions
2. `lib/supabase/types.ts` - Added TypeScript types
3. `app/profile/page.tsx` - Server component wrapper

## 💡 Usage

### For Users:
1. Click ❤️ heart button to favorite a component
2. Click 🔗 share to open sharing options
3. Go to Profile → Saved Items to see all favorites
4. Click on any favorite to navigate to that component

### For Developers:
```tsx
// The ComponentActions component is automatically added
// to all component detail pages in the playground

<ComponentActions
  componentSlug={slug}
  componentName={componentName}
  componentCategory={category}
/>
```

## 🔍 Troubleshooting

### Favorites not saving?
- Check if user is logged in
- Verify RLS policies are active
- Check browser console for errors

### Upgrade card still showing for Pro users?
- Verify `user_metadata.is_paid = true` in auth.users
- Check Stripe webhook is updating user metadata correctly

### Share tracking not working?
- Check `component_shares` table permissions
- Verify anon users can INSERT

## 📈 Analytics Queries

```sql
-- Most favorited components
SELECT component_name, COUNT(*) as favorites
FROM component_favorites
GROUP BY component_name
ORDER BY favorites DESC
LIMIT 10;

-- Share statistics by platform
SELECT platform, COUNT(*) as shares
FROM component_shares
GROUP BY platform
ORDER BY shares DESC;

-- User engagement
SELECT 
  u.email,
  COUNT(DISTINCT cf.id) as favorites_count,
  COUNT(DISTINCT cs.id) as shares_count
FROM auth.users u
LEFT JOIN component_favorites cf ON u.id = cf.user_id
LEFT JOIN component_shares cs ON u.id = cs.user_id
GROUP BY u.email
ORDER BY favorites_count DESC;
```

## ✨ Next Steps

Consider adding:
- [ ] Email notifications for new favorites
- [ ] Collections/folders for organizing favorites
- [ ] Public favorite lists
- [ ] Share count display on components
- [ ] Trending components based on shares

---

**Need help?** Check the code comments or reach out to the team!
