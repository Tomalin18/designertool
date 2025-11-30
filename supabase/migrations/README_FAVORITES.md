# Component Favorites and Sharing Feature

This migration adds the ability for users to favorite components and share them on social media.

## Database Changes

### New Tables

1. **component_favorites**
   - Stores user favorite components
   - Fields: id, user_id, component_slug, component_name, component_category, created_at
   - Unique constraint on (user_id, component_slug)

2. **component_shares**
   - Tracks component shares across platforms
   - Fields: id, component_slug, platform, user_id, created_at
   - Platforms: twitter, facebook, linkedin, copy

### Running the Migration

To apply this migration to your Supabase database:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL file in Supabase Dashboard
# Go to SQL Editor and run: supabase/migrations/20250130_add_favorites_and_shares.sql
```

## New Components

1. **ComponentActions** (`components/component-actions.tsx`)
   - Favorite button with heart icon
   - Share dropdown with social media options
   - Tracks shares in database
   - Requires authentication for favorites

2. **FavoritesList** (`components/favorites-list.tsx`)
   - Displays user's favorited components
   - Grid layout with cards
   - Remove functionality with confirmation dialog
   - Links to component pages

3. **ProfilePageClient** (`app/profile/profile-page-client.tsx`)
   - Tabbed interface for profile
   - Account settings tab
   - Favorites tab with FavoritesList

## Features

### Favorite Components
- Click heart button to favorite/unfavorite
- Requires user authentication
- Persists across sessions
- View all favorites in profile page

### Share Components
- Share on Twitter, Facebook, LinkedIn
- Copy link to clipboard
- Tracks shares for analytics
- Works without authentication

### Profile Page
- New "Favorites" tab
- Quick navigation to favorited components
- Remove favorites with confirmation
- Shows when component was favorited

## Usage

The ComponentActions component is automatically added below the playground preview on all component pages.

Users can:
1. Click the heart to favorite a component (requires login)
2. Click share to open social sharing options
3. View all favorites in their profile under the "Favorites" tab
4. Click on any favorite to navigate to that component
5. Remove favorites with the trash icon

## Security

- Row Level Security (RLS) enabled on both tables
- Users can only view/modify their own favorites
- Share tracking is public for analytics
- Proper indexes for performance
