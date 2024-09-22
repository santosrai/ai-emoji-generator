


This web app allows users to generate emojis based on text prompts using a model hosted on Replicate. The application is built with Next.js, Shadcn, Lucid, Supabase, and Clerk.

## Tech Stack
- **Frontend**: Next.js, Shadcn, Lucid, Supabase, Clerk
- **Backend**: Next.js, Supabase, Clerk

## Feature Requirements
- Create a form for users to input prompts and generate emojis.
- Implement a user-friendly UI with animations for loading states.
- Display all generated emojis in a grid format.
- Show download and like buttons on hover for each emoji.

## Backend Requirements
1. **User Management**:
   - After signing in via Clerk, check if the user exists in the `profiles` table.
   - Create a new user if they do not exist.

2. **Emoji Generation**:
   - Upload generated emoji images to the Supabase "emojis" storage bucket.
   - Store the image URL and user ID in the `emojis` data table.

3. **Emoji Grid**:
   - Fetch and display all images from the `emojis` data table.
   - Automatically update the grid when a new emoji is generated.

4. **Likes Interaction**:
   - Increment or decrement the likes count in the `emojis` table based on user interactions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```