export type Step = {
  title: string;
  body: string;
  warning?: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Course = {
  slug: string;
  title: string;
  duration: string;
  why: string;
  steps: Step[];
  mistakes: string[];
  quiz: QuizQuestion;
};

export type Category = {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  tint: "transport" | "cooking" | "money" | "admin" | "life";
  courses: Course[];
};

export const categories: Category[] = [
  {
    slug: "transportation",
    title: "Cars & the Road",
    tagline: "Handle your vehicle with quiet confidence.",
    emoji: "🚗",
    tint: "transport",
    courses: [
      {
        slug: "change-a-flat-tire",
        title: "Change a Flat Tire",
        duration: "8 min",
        why: "A flat tire on the side of the road feels like an emergency. With a 5-step routine, it becomes a 20-minute task you can handle alone — saving a $150 tow and a lot of stress.",
        steps: [
          { title: "Pull over safely", body: "Find flat ground, away from traffic. Turn on hazard lights. Engage the parking brake." },
          { title: "Loosen the lug nuts", body: "Before jacking, break each nut counter-clockwise about a quarter turn. Use your body weight, not just your arms." },
          { title: "Position the jack", body: "Place under the reinforced frame point near the flat tire. Check your owner's manual — wrong placement bends metal.", warning: "Never get under a car held only by a jack." },
          { title: "Swap the tire", body: "Lift until the tire clears the ground. Remove lug nuts, pull the flat off, mount the spare, hand-tighten the nuts." },
          { title: "Tighten in a star pattern", body: "Lower the car. Then fully tighten the lug nuts in a crisscross pattern for even pressure. Drive under 50 mph to a tire shop." },
        ],
        mistakes: [
          "Loosening lug nuts after lifting the car (the wheel will spin).",
          "Tightening nuts in a circle instead of a star pattern.",
          "Forgetting that a spare donut is not a real tire — limit speed and distance.",
        ],
        quiz: {
          question: "When should you first loosen the lug nuts?",
          options: ["After the car is fully lifted", "Before lifting the car", "After removing the wheel", "Only with an impact wrench"],
          correctIndex: 1,
          explanation: "Loosen them while the tire is still on the ground so it doesn't spin freely.",
        },
      },
      {
        slug: "jump-start-a-car",
        title: "Jump-Start a Dead Battery",
        duration: "6 min",
        why: "Dead batteries happen — usually at the worst time. Knowing the cable order keeps you safe and avoids frying your car's electronics.",
        steps: [
          { title: "Park the cars close", body: "Bring the working car nose-to-nose with the dead one. Both ignitions off." },
          { title: "Connect red to dead +", body: "Clamp the red (positive) cable to the dead battery's + terminal." },
          { title: "Connect red to good +", body: "Clamp the other red end to the working battery's + terminal." },
          { title: "Connect black to good –", body: "Clamp black (negative) to the working battery's – terminal." },
          { title: "Ground the last clamp", body: "Clamp the final black to a bare metal bolt on the dead car's engine block — not the battery.", warning: "Sparks near a battery can ignite hydrogen gas." },
          { title: "Start and disconnect in reverse", body: "Start the working car, then the dead one. Let it run 10+ minutes. Remove cables in the reverse order you placed them." },
        ],
        mistakes: [
          "Clamping black to the dead battery's negative terminal.",
          "Letting the red and black clamps touch each other.",
          "Driving 5 minutes and shutting off — battery won't recharge in time.",
        ],
        quiz: {
          question: "Where does the final black clamp go?",
          options: ["Dead battery negative", "Working battery negative", "Bare metal on the dead car's engine", "Anywhere that fits"],
          correctIndex: 2,
          explanation: "Grounding to bare metal away from the battery prevents sparks near flammable gases.",
        },
      },
      {
        slug: "dashboard-warning-lights",
        title: "Read Dashboard Warning Lights",
        duration: "5 min",
        why: "Most drivers ignore lights until something breaks. A 5-minute scan teaches you which lights mean 'pull over now' vs 'schedule next week'.",
        steps: [
          { title: "Red = stop soon", body: "Red lights (oil pressure, temperature, brake) mean serious damage is happening. Pull over safely." },
          { title: "Yellow = investigate", body: "Yellow/amber (check engine, ABS, TPMS) means schedule service within days, not months." },
          { title: "Green/blue = informational", body: "These just confirm a system is on (high beams, cruise control). No action needed." },
          { title: "Check engine light", body: "Steady = soon. Flashing = pull over. A flashing CEL usually means a misfire that can wreck your catalytic converter." },
          { title: "Tire pressure (TPMS)", body: "Don't ignore this in winter — cold air drops pressure. Check all four tires before assuming a leak." },
        ],
        mistakes: [
          "Driving with a flashing check engine light.",
          "Assuming the oil light means 'add oil' — it can mean dangerously low pressure.",
          "Resetting a light without finding the cause.",
        ],
        quiz: {
          question: "Your check engine light is flashing. What should you do?",
          options: ["Keep driving, schedule a checkup", "Pull over safely soon", "Reset the light", "Add fuel"],
          correctIndex: 1,
          explanation: "A flashing CEL means active engine damage. Pull over and tow if needed.",
        },
      },
    ],
  },
  {
    slug: "cooking",
    title: "Kitchen Basics",
    tagline: "Real meals, no chef hat required.",
    emoji: "🍳",
    tint: "cooking",
    courses: [
      {
        slug: "perfect-eggs",
        title: "Cook Eggs Three Ways",
        duration: "7 min",
        why: "Eggs are the cheapest protein and the foundation of breakfast. Master scrambled, fried, and boiled and you've covered 80% of weekday mornings.",
        steps: [
          { title: "Scrambled — low and slow", body: "Whisk 2 eggs with a splash of milk and salt. Medium-low heat with butter. Stir constantly with a spatula. Pull off heat while still glossy." },
          { title: "Fried — sunny side up", body: "Crack into a warm, buttered pan over medium-low. Cover with a lid for 2 minutes to set the white without flipping." },
          { title: "Soft-boiled — 6:30", body: "Gently lower cold eggs into already-boiling water. 6 minutes 30 seconds. Move straight to ice water." },
          { title: "Hard-boiled — 10:00", body: "Same as soft-boiled, but 10 minutes. Ice bath, then peel under running water." },
        ],
        mistakes: [
          "Scrambling on high heat — they turn rubbery.",
          "Adding salt to scrambled eggs too early — they weep water.",
          "Boiling eggs too vigorously — they crack and turn green.",
        ],
        quiz: {
          question: "How long for a soft-boiled egg with a runny yolk?",
          options: ["3 minutes", "6:30", "10 minutes", "15 minutes"],
          correctIndex: 1,
          explanation: "6:30 in already-boiling water gives a set white and a runny golden yolk.",
        },
      },
      {
        slug: "grocery-budget-basics",
        title: "Grocery Shop on a Budget",
        duration: "6 min",
        why: "Walking in without a plan is how $40 turns into $120. A 10-minute prep at home saves real money every week.",
        steps: [
          { title: "Build the list around 3 meals", body: "Pick 3 dinners you'll actually cook this week. Write everything they need. That's your list." },
          { title: "Shop the perimeter first", body: "Produce, meat, dairy live on the outside. The center aisles are where impulse buys live." },
          { title: "Compare unit price, not sticker", body: "The shelf tag shows price per ounce or per pound. Big package isn't always cheaper." },
          { title: "Stick to one protein swap", body: "Chicken thighs, eggs, beans, and lentils stretch the furthest. Build a meal around them." },
          { title: "Never shop hungry", body: "It's a cliché because it's true. Eat first, save 20%." },
        ],
        mistakes: [
          "Buying ingredients for recipes you 'might' make.",
          "Ignoring the freezer — frozen veg is just as nutritious and lasts months.",
          "Falling for buy-one-get-one on stuff you don't need.",
        ],
        quiz: {
          question: "What's the most reliable way to compare two products' prices?",
          options: ["Sticker price", "Unit price (per oz/lb)", "Brand reputation", "Package size"],
          correctIndex: 1,
          explanation: "Unit price normalizes for package size — it's the only fair comparison.",
        },
      },
    ],
  },
  {
    slug: "money",
    title: "Money & Taxes",
    tagline: "The system, demystified.",
    emoji: "💰",
    tint: "money",
    courses: [
      {
        slug: "file-basic-taxes",
        title: "File Your First W-2 Taxes",
        duration: "10 min",
        why: "Filing taxes feels scarier than it is. For a single W-2 job, it's usually 30 minutes and free. Skipping it means missing your refund — or owing penalties.",
        steps: [
          { title: "Gather your W-2", body: "Your employer mails or emails this by January 31. It shows what you earned and what was already withheld for taxes." },
          { title: "Pick free software", body: "If you earn under the IRS Free File threshold, use the official IRS Free File site. TurboTax 'free' often isn't actually free." },
          { title: "Enter W-2 box by box", body: "The software walks you through. Box 1 = wages, Box 2 = federal tax withheld. Just type what's on the form." },
          { title: "Take the standard deduction", body: "Unless you have a mortgage or huge medical bills, the standard deduction beats itemizing for most young filers." },
          { title: "File electronically, refund by direct deposit", body: "E-filing with direct deposit gets your refund in ~3 weeks. Paper filing takes months.", warning: "Federal deadline is April 15. Most states match it." },
        ],
        mistakes: [
          "Throwing out your W-2 before filing.",
          "Paying TurboTax for something the IRS offers free.",
          "Missing the deadline — late filing penalties stack up fast.",
        ],
        quiz: {
          question: "What does Box 2 on your W-2 show?",
          options: ["Total wages", "Federal income tax already withheld", "Your refund", "State tax owed"],
          correctIndex: 1,
          explanation: "Box 2 is federal tax already taken from your paychecks. If it's more than you owe, that's your refund.",
        },
      },
      {
        slug: "build-credit-score",
        title: "Build Credit From Zero",
        duration: "6 min",
        why: "Your credit score determines what apartment you can rent, what car loan you qualify for, and your insurance rates. Building it early costs nothing — and pays off for life.",
        steps: [
          { title: "Get one starter card", body: "A secured card or a student card. The limit doesn't matter — using it responsibly does." },
          { title: "Use it for one small bill", body: "Put a streaming subscription on autopay. That's it. You don't need to spend more to build credit." },
          { title: "Pay the FULL statement balance", body: "Not the minimum. Set autopay for the full balance. This avoids interest entirely." },
          { title: "Keep utilization under 30%", body: "If your limit is $500, keep the balance under $150. Lower is better for your score." },
          { title: "Wait. Patience is the strategy.", body: "Credit history length matters. Don't close your first card — even years later." },
        ],
        mistakes: [
          "Carrying a balance to 'build credit' — it just costs you interest.",
          "Opening many cards quickly — each one dings your score.",
          "Closing your oldest card — it shortens your credit history.",
        ],
        quiz: {
          question: "What's the smartest way to use a starter credit card?",
          options: ["Carry a small balance each month", "Pay the minimum", "Pay the full statement balance every month", "Max it out then pay it off"],
          correctIndex: 2,
          explanation: "Paying the full statement balance avoids all interest and still builds your score.",
        },
      },
    ],
  },
  {
    slug: "admin",
    title: "Adult Admin",
    tagline: "Forms, leases, and the paperwork of life.",
    emoji: "📋",
    tint: "admin",
    courses: [
      {
        slug: "rent-an-apartment",
        title: "Rent Your First Apartment",
        duration: "9 min",
        why: "A lease is a binding legal contract. Knowing what to look for before signing protects you from losing thousands in deposits and fees.",
        steps: [
          { title: "Know your budget rule", body: "Aim for rent under 30% of your take-home pay. Don't forget utilities, internet, and renter's insurance on top." },
          { title: "Tour in person, not just photos", body: "Check water pressure, cell signal, hallway smell, and how locks feel. Photos hide a lot." },
          { title: "Read the lease before signing", body: "Look for: lease length, rent increases, pet policy, who pays utilities, early-termination fees, and the move-out cleaning clause." },
          { title: "Document the move-in condition", body: "Photo and video every wall, floor, appliance, and existing damage. Email it to yourself and the landlord on day one." },
          { title: "Get renter's insurance", body: "About $15/month. Covers your stuff if there's a fire, flood, or theft. Many landlords now require it." },
        ],
        mistakes: [
          "Signing without reading the early-termination clause.",
          "Skipping move-in photos, then losing your deposit.",
          "Paying any 'application fee' to a landlord without seeing the unit.",
        ],
        quiz: {
          question: "What's the single most important thing to do on move-in day?",
          options: ["Unpack quickly", "Document existing damage with photos", "Meet the neighbors", "Change the locks"],
          correctIndex: 1,
          explanation: "Without documented proof of pre-existing damage, your deposit is at risk.",
        },
      },
    ],
  },
  {
    slug: "life",
    title: "Life Systems",
    tagline: "Decide well, live calm.",
    emoji: "🧭",
    tint: "life",
    courses: [
      {
        slug: "monthly-budget",
        title: "Build a Monthly Budget",
        duration: "7 min",
        why: "Most money stress comes from not knowing where it goes. A simple budget — done once and tweaked monthly — replaces anxiety with control.",
        steps: [
          { title: "Start with take-home pay", body: "Use the number that hits your bank, not your salary. That's what you actually have to work with." },
          { title: "Try the 50/30/20 split", body: "50% needs (rent, food, transport), 30% wants (fun, dining out), 20% savings and debt payoff." },
          { title: "List your fixed needs first", body: "Rent, utilities, phone, insurance, minimum debt payments. These come out before anything else." },
          { title: "Automate the savings", body: "Move 20% to savings the day you get paid. You can't spend what you don't see." },
          { title: "Review once a month", body: "Spend 15 minutes looking at last month. Adjust. Don't aim for perfect — aim for honest." },
        ],
        mistakes: [
          "Budgeting from your gross salary, not take-home.",
          "Forgetting irregular bills (car insurance, holidays).",
          "Giving up after one bad month — every budget needs tuning.",
        ],
        quiz: {
          question: "In the 50/30/20 rule, what's the 20%?",
          options: ["Wants", "Needs", "Savings & debt payoff", "Taxes"],
          correctIndex: 2,
          explanation: "20% goes to savings and paying down debt — the foundation of financial stability.",
        },
      },
    ],
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const getCourse = (categorySlug: string, courseSlug: string) => {
  const cat = getCategory(categorySlug);
  return cat?.courses.find((c) => c.slug === courseSlug);
};

export const allCourses = categories.flatMap((c) =>
  c.courses.map((course) => ({ ...course, categorySlug: c.slug, categoryTitle: c.title, tint: c.tint }))
);
