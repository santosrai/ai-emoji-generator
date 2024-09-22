# Project Overview
Use this guide to build a web app where users can give a text prompt to generate emoji using model hosted on Replicate.

# Feature Requirements
- We will use Next.JS, Shadcn, Lucid, Supabase, and Clerk
- Create a form where users can put in prompt, and clicking on button that calls the  replicate model to generate an emoji
-  Have a nice UI and animation when the emoji is blank or generating
- Display all the images ever generated in grid
- When hover each emji image,  an icon button for download, and an icon for like should be shown up

# Relevant Links
## How to use replicate emoji generator model
Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=b2b4f8**********************************

Visibility

Copy
Learn more about authentication

Install Replicate’s Node.js client library

npm install replicate

Copy
Learn more about setup
Run fofr/sdxl-emoji using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
console.log(output)
//=> ["https://replicate.delivery/pbxt/a3z81v5vwlKfLq1H5uBqp

# Current file structure
.
├── app
│   ├── fonts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components
│       ├── ui
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   └── input.tsx
│       └── lib
├── node_modules
├── requirements
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
- All new pages should go in ai-emoji-generator/app unless otherwise specified
