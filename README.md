# Text2Image AI 🖼️  

✅ **Free to use! NO LIMIT!**  
🖌️ Generate **AI-powered** images from text prompts with **10 style presets**, **batch generation**, **save-to-file**, and **multi-language** support!

![NPM Version](https://img.shields.io/npm/v/text2image-ai?color=blue&style=flat-square)  
![Downloads](https://img.shields.io/npm/dt/text2image-ai?color=green&style=flat-square)  
![License](https://img.shields.io/npm/l/text2image-ai?style=flat-square)  

---

## 🆕 What's New in v2.0.0  

🔥 **10 Style Presets** – `realistic`, `anime`, `oil`, `watercolor`, `pixel`, `3d`, `cyberpunk`, `fantasy`, `minimal`, `sketch`  
🔥 **Generate & Save** – One-call image generation + file saving  
🔥 **Batch Generation** – Generate multiple images with progress tracking  
🔥 **Negative Prompts** – Specify what to avoid in generation  
🔥 **Auto Directory Creation** – Saves create missing folders automatically  

---

## 📦 Installation  

```sh
npm install text2image-ai
```

---

## 🚀 Quick Start  

```js
const { generateImage, generateAndSave } = require("text2image-ai");

// Basic generation
const result = await generateImage("a futuristic city at sunset");
console.log(result.base64Image);

// With style preset
const anime = await generateImage("a warrior princess", "en", { style: "anime" });

// Generate and save directly
const { savedPath } = await generateAndSave(
  "a cyberpunk city at night",
  "output.jpg",
  "en",
  { style: "cyberpunk" }
);
console.log(`Saved: ${savedPath}`);
```

---

## 🎨 Style Presets  

| Style | Description |
|---|---|
| `realistic` | Ultra realistic, photographic, 8K |
| `anime` | Anime style, vibrant, cel shaded |
| `oil` | Oil painting, classical art |
| `watercolor` | Watercolor, soft edges, pastel |
| `pixel` | Pixel art, retro, 8-bit |
| `3d` | 3D render, Octane, Cinema 4D |
| `cyberpunk` | Neon lights, dark futuristic |
| `fantasy` | Magical, ethereal illustration |
| `minimal` | Minimalist, clean lines |
| `sketch` | Pencil sketch, hand drawn |

```js
const { getStyles } = require("text2image-ai");
console.log(getStyles()); // See all available style presets
```

---

## 📦 Batch Generation  

```js
const { batchGenerate } = require("text2image-ai");

const results = await batchGenerate(
  ["a red dragon", "a blue ocean", "a green forest"],
  "en",
  { style: "fantasy" },
  (progress) => console.log(`${progress.percent}% - ${progress.lastPrompt}`)
);

console.log(`Generated ${results.filter(r => r.success).length} images`);
```

---

## 🌍 Language Support  

| Code | Language |
|---|---|
| `en` | English |
| `tr` | Turkish |
| `es` | Spanish |
| `fr` | French |
| `de` | German |

---

## 📜 License  
This project is licensed under the **MIT License**.  

---

## 🌟 Support & Contact  
- **GitHub Issues:** [Report Bugs or Request Features](https://github.com/utkuberkaykoc/text2image-ai/issues)  
- **⭐ Give a Star:** If you like this package, support by starring the repo!  

🚀 **Create something amazing!** 🎨✨
