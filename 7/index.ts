import rules from "./data/rules.ts";
import {
  countContainedBags,
  countContainingBags,
} from "./iGotANewShinyGoldBag.ts";

console.log("\n*** BZZZZZZZT ***\n");

console.log(
  "Welcome to BAGGAGE CONTROL. We see you have a {SHINY GOLD} bag with you.",
);
console.log(
  "If you wish to bring your {SHINY GOLD} bag on board, please remember it must be contained with another bag.",
);
console.log(
  `Consult the easily-remembered list of ${
    countContainingBags("shiny gold", rules)
  } bags below if you are unsure which you should use.`,
);

console.log("\n*** BZZZZZZZT ***\n");

console.log(
  "Valued Customer and Member of the Flying Community, please also remember that your {SHINY GOLD} bag is required to contain several other kinds of bag due to the new Rainbow Bag Ordinance of 2020.",
);

console.log(
  `Again, our customer service experts have provided a list of the ${
    countContainedBags("shiny gold", rules)
  } bags you require below.`,
);

console.log(
  "If you are missing some of these bags, we have a full selection available in Duty Free, at the Bagopolis. You literally cannot miss it. It is very big.",
);
