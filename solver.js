#!/usr/bin/env node

import { Farspeak } from 'farspeak';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import YAML from 'yamljs';
import { Command } from 'commander';
import puppeteer from 'puppeteer';
import fsPromises from 'fs/promises';

// Farspeak setup
const farspeak = new Farspeak({
  app: 'solvearc', // your app name
  env: 'dev', // your app env
  backendToken: 'fvsdpjm2jhr4dx', // paste your backend token
});

const entityName = 'papers';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define CLI options using commander
const program = new Command();
program
  .option('--website <website>', 'URL of the website to be scraped and sent to Farspeak')
  .option('--template <path>', 'Path to the YAML file containing the instructions and template')
  .option('--query <query>', 'Query to inquire about the document')
  .parse(process.argv);

const options = program.opts();

if (!options.website || !options.template) {
  console.error('Error: Both --website and --template options are required');
  process.exit(1);
}

// Load the instructions and template from the YAML file
const templateFilePath = path.resolve(__dirname, options.template);
const { instructions, template } = YAML.load(templateFilePath);

// Function to scrape website and convert to PDF
async function scrapeAndConvertToPDF(url, outputPath) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Convert the content to a PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    });

    await browser.close();

    // Write the PDF buffer to a file
    await fsPromises.writeFile(outputPath, pdfBuffer);
    console.log(`PDF saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

(async () => {
  const url = options.website;
  const outputPath = path.resolve(__dirname, 'output.pdf');

  // Scrape the website and convert to PDF
  await scrapeAndConvertToPDF(url, outputPath);

  // Process the PDF with Farspeak
  const doc = await farspeak
    .entity(entityName)
    .fromDocument({ filePath: outputPath, instructions, template });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const entity = await farspeak.entity(entityName).get(doc.id);

  if (options.query) {
    farspeak
      .entity(entityName)
      .inquire(options.query)
      .then(console.log);
  }

  console.log(doc);
  console.log(entity);
})();