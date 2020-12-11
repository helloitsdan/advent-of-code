import seating from "./data/seating.ts";
import { findSeatingArrangement } from "./seabus.ts";
import {
  countAdjacentSeats,
  countVisibleOccupiedSeats,
} from "./ocean-comparators.ts";
import countOccupiedChairs from "./utils/countOccupiedChairs.ts";

console.log(`
    -= IT'S MARI-TIME! =-       
      (like "maritime")         
   (i think it means boats)     
                                
                     toot!      
                __/___   toot!    
          _____/______|         
  _______/_____\\_______\\_____     
  \\  HMS AoC 2020    < < <   |    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          ><_°>                 
                     ><_°>      
                                `);

const t0 = performance.now();

console.log(
  "Part 1:",
  countOccupiedChairs(findSeatingArrangement(seating, countAdjacentSeats)),
);

console.log(
  "Part 2:",
  countOccupiedChairs(
    findSeatingArrangement(
      seating,
      countVisibleOccupiedSeats,
      { MAX_ADJACENT_SEATS: 5 },
    ),
  ),
);

const t1 = performance.now();
console.log(`Took ${t1 - t0} milliseconds.`);
