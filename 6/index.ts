import questions from "./data/questions.ts";
import {
  countTotalAnsweredQuestions,
  parseQuestionGroup,
} from "./imHelpingEveryoneCountQuestions.ts";

const questionGroups = questions.split(/\n\n/).map(parseQuestionGroup);

console.log(
  "Oh, sure, I can help! I just finishd mine, actually. All you've gotta do is count which questions...",
);

console.log("\n----- SOME TIME LATER -----\n");

console.log(
  "All done! No, it's fine, honestly. No hassle. All in all, we answered %d in total.",
  countTotalAnsweredQuestions(questionGroups),
);

console.log("Wait what do you mean questions EVERYONE answered--");

console.log("\n----- EVEN MORE SOME TIME LATER -----\n");

console.log(
  "It was %d. I'm very tired now.",
  countTotalAnsweredQuestions(questionGroups),
);
