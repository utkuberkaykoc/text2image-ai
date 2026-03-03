const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const API_URL = "https://utku.berkaykoc.net/api/entertainment/text2image";

// Style presets that can be appended to prompts
const STYLES = {
  realistic: "ultra realistic, photographic, 8k, detailed",
  anime: "anime style, vibrant colors, cel shaded",
  oil: "oil painting, classical art, textured brush strokes",
  watercolor: "watercolor painting, soft edges, pastel colors",
  pixel: "pixel art, retro, 8-bit style",
  "3d": "3d render, octane render, cinema 4d, volumetric lighting",
  cyberpunk: "cyberpunk style, neon lights, dark futuristic city",
  fantasy: "fantasy art, magical, ethereal, detailed illustration",
  minimal: "minimalist, clean lines, simple composition",
  sketch: "pencil sketch, hand drawn, detailed line art",
};

/**
 * Generates an AI image from a text prompt with multi-language support.
 * @param {string} prompt - The text prompt for the AI image.
 * @param {string} [lang="en"] - Language of the prompt. Supports "en", "tr", "es", "fr", "de".
 * @param {Object} [options] - Generation options.
 * @param {string} [options.style] - Style preset name (see STYLES).
 * @param {string} [options.negative] - Negative prompt (what to avoid).
 * @returns {Promise<Object>} - Returns an object with the original prompt, translated prompt, and base64 image.
 */
async function generateImage(prompt, lang = "en", options = {}) {
  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("A valid text prompt is required.");
    }

    let fullPrompt = prompt;

    // Apply style preset if specified
    if (options.style && STYLES[options.style]) {
      fullPrompt = `${prompt}, ${STYLES[options.style]}`;
    }

    // Append negative prompt instruction if specified
    if (options.negative) {
      fullPrompt = `${fullPrompt}. Avoid: ${options.negative}`;
    }

    const response = await fetch(`${API_URL}?prompt=${encodeURIComponent(fullPrompt)}&lang=${lang}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    data.styleApplied = options.style || null;
    return data;
  } catch (error) {
    throw new Error(`Image generation failed: ${error.message}`);
  }
}

/**
 * Generates an image and saves it directly to a file.
 * @param {string} prompt - Text prompt.
 * @param {string} [outputPath="output.jpg"] - Output file path.
 * @param {string} [lang="en"] - Language.
 * @param {Object} [options] - Generation options (same as generateImage).
 * @returns {Promise<{data: Object, savedPath: string}>}
 */
async function generateAndSave(prompt, outputPath = "output.jpg", lang = "en", options = {}) {
  const data = await generateImage(prompt, lang, options);

  if (!data.base64Image) {
    throw new Error("No image data received from API.");
  }

  const buffer = Buffer.from(data.base64Image, "base64");

  const dir = path.dirname(outputPath);
  if (dir && dir !== '.' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  
  return { data, savedPath: path.resolve(outputPath) };
}

/**
 * Generates multiple images from an array of prompts.
 * @param {string[]} prompts - Array of text prompts.
 * @param {string} [lang="en"] - Language.
 * @param {Object} [options] - Generation options.
 * @param {Function} [onProgress] - Callback for progress updates.
 * @returns {Promise<Object[]>} - Array of results.
 */
async function batchGenerate(prompts, lang = "en", options = {}, onProgress = null) {
  if (!Array.isArray(prompts) || prompts.length === 0) {
    throw new Error("Please provide an array of prompts.");
  }

  const results = [];
  for (let i = 0; i < prompts.length; i++) {
    try {
      const result = await generateImage(prompts[i], lang, options);
      results.push({ prompt: prompts[i], success: true, data: result });
    } catch (error) {
      results.push({ prompt: prompts[i], success: false, error: error.message });
    }

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: prompts.length,
        percent: Math.round(((i + 1) / prompts.length) * 100),
        lastPrompt: prompts[i],
      });
    }
  }

  return results;
}

/**
 * Returns the list of available style presets.
 * @returns {Object} Style presets with descriptions.
 */
function getStyles() {
  return { ...STYLES };
}

module.exports = { generateImage, generateAndSave, batchGenerate, getStyles };
