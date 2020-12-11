import seating from "./data/seating.ts";
import {
  countOccupiedChairs,
  countVisibleOccupiedSeats,
  findSeatingArrangement,
} from "./seabus.ts";

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

console.log(
  "Part 1:",
  countOccupiedChairs(findSeatingArrangement(seating)),
);

console.log(
  "Part 2:",
  countOccupiedChairs(
    findSeatingArrangement(
      seating,
      { MAX_ADJACENT_SEATS: 5 },
      countVisibleOccupiedSeats,
    ),
  ),
);
