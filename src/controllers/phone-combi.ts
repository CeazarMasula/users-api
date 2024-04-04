import express from 'express';

// Function to find possible combination
export const phoneCombinations = async function (req: express.Request, res: express.Response) {
  try {
    // Get input from params
    const { input } = req.params;

    if (!input) {
      return res.status(400).json({ error: 'Input digits' })
    }

    // Define all value of digits, Using array of object makes it easier to access phone numbers
    const phoneLettersCombinations: { [digit: string]: string[] } = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z'],
    };

    // Define result array to store phone combinations
    let result: string[] = [];

    // Recursive function to process all phone numbers on input
    const recursiveCombine = function (currentIndex: number, combination: string = '') { // Define default value of combination to empty string
      // If combination of phone number letters is equal to input length, push to result
      if (combination.length === input.length) {
        result.push(combination);
        // End recursive
        return;
      }

      // Get the corresponding phone number 2-9
      const phoneNumber = input[currentIndex];
      // Get the array of letters of phone
      const phoneLetters = phoneLettersCombinations[phoneNumber];

      for (let phoneLetter of phoneLetters) {
        // Run another recursive function for different phone number
        recursiveCombine(currentIndex + 1, `${combination}${phoneLetter}`)
      }
    }

    // Call recursive function
    recursiveCombine(0)

    // Return result
    return res.status(200).json({ result })
  } catch (error) {
    // Return error
    return res.status(400).json({ error })
  }
}
