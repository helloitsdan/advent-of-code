import instructions from "./data/instructions.ts";
import { executeInstructions } from "./popstation.ts";

console.log(
  "Oi, guv! I'm a little Dickensian orphan boy! I anachronistically found me way onto the plane in a time travel mishap!",
);
console.log(
  "I'm having proper bother getting me Popstation to work, I am! Could you take a look inside of 'im?",
);
console.log(
  "Whenever I turns him on, all these sparks come out the back! It's like he's got a little Guy Fawkes in there, it is!",
);

console.log("\n** --- BZZZZZT --- **\n");

try {
  executeInstructions(instructions, false);
} catch (e) {
  console.error(e);
}

console.log("\n** --- BZZZZZT --- **\n");

console.log(
  "You look like a right clever sort, guv! Please, tell me what's happened to him!",
);

console.log(
  `What's that? All I've gotta do is whisper ${
    executeInstructions(instructions, true)
  } as I start him up, and it'll all be golden? Oh, you're a lifesaver!`,
);

console.log(
  "I'm gonna go skip off down the plane now and do that little jump where you kick your feet together! Hooty hoo, one and all!",
);
