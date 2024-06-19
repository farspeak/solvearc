# Arc Prize Solver

The Arc Prize Solver is a tool designed to scrape web pages, convert them into PDFs, and process the content using the Farspeak knowledge base and data pipelines. This project is aimed at solving puzzles and challenges presented in the Arc Prize competition.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Example Output](#example-output)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Farspeak** (go to farspeak.ai, create your app & get your private token).
- **Node.js** and **npm** installed on your machine.
- **Playwright** for web scraping. Install it by running:
 ```sh
  npx playwright install
 ```

This command installs the necessary browsers (Webkit, Chromium). Farspeak for templating, JS/TS npm, knowledge base, pipelines. You will need a backend token from Farspeak.

## Installation
1. Clone the repository
2. Install the dependencies (npm install)

## Usage
1. Adjust the Farspeak template (template.yaml) however you want:
```
instructions: "This is a graphical riddle. On the left side you see examples (inputs and outputs), and the on the top right you have the input for which you need to find a solution. Those puzzles usually involve sizes, shapes, colors, and similar. A shape appearing in examples can make a difference, or a combination of these factors, like shape and color and size etc. "
template:
  name: "Name this puzzle."
  description: "Short description of the puzzle based on the example pairs of inputs and outputs."
  insights: "Description of all the factors (and their values) that are necessary parts of the decision process that would give us the solution."
  solution: "A list of how to step by step solve the problem by applying the insights you learnt. Getting the solution right is critical."
```
2. To scrape a website, convert it to a PDF, and process it using Farspeak, run the following command:
  ```sh
  node index.js --website https://example.com --template ./template.yaml --query "What is the solution to the puzzle?"
 ```

## Example output
```
{
  "id": "l345u2dp",
  "name": "Grid Resizing Puzzle",
  "description": "This puzzle involves resizing a grid based on a specific pattern observed in the examples provided.",
  "insights": "The key insight is that the output grid size is determined by the input grid size according to a specific rule or pattern.",
  "solution": [
    "1. Determine the relationship between the input grid size and the output grid size based on the examples provided.",
    "2. Identify any consistent changes or transformations applied to the grid when resizing.",
    "3. Apply the same rule or pattern to resize the test input grid to the correct output size."
  ],
  "__meta": { "self": "/solvearc/dev/papers/l345u2dp", "subtypes": {} }
}
{
  "answer": "The solution to the Grid Resizing Puzzle involves the following steps:\n
1. Start with a 2x2 grid as the input.\n
2. Create a 6x6 grid as the output by multiplying the dimensions of the input grid by 3.\n
3. Copy the content of the input grid into the top left corner of the output grid.\n
4. Fill in the remaining cells of the output grid as needed to match the pattern or rule."
}
```

## License

This project is licensed under the MIT License. 

## Contributing

Feel free to contribute to the project by submitting pull requests or opening issues.
