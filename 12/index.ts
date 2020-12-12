import orders from "./data/captains-orders.ts";
import navigate from "./navigate.ts";
import { directDrake, waypointWilliam } from "./helmsmen.ts";

console.log(`
        -= LOOK OUT =-          
       A terrible storm         
        is approaching!         
                                
                       uh!      
                __/___   oh!    
          _____/______|         
  _______/_____\\_______\\_____     
  \\  HMS AoC 2020    < < <   |    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                `);

console.log(
  "We need to take evasive actions if we're going to get out of this storm!",
);
console.log("Quick, ask Direct Drake if he can navigate us out of this mess!");
console.log();
console.log(
  "Part 1: Direct Drake thinks the ship should move to the following location...",
);
console.log(navigate(orders, directDrake));

console.log();
console.log(
  "Dissent in the ranks!",
);
console.log(
  'Waypoint William thinks that Direct Drake\'s estimation is "rotten barnacles, matey".',
);
console.log();
console.log(
  "Part 2: Waypoint William thinks the ship should move to the following location...",
);

console.log(navigate(orders, waypointWilliam));
