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
  hook: string; // short problem / cliffhanger before "why"
  why: string;
  featured?: boolean; // ⭐ most important
  tier?: "starter" | "intermediate" | "advanced"; // used by money tracks
  emoji?: string; // small visual for the topic
  joke?: string; // one-liner shown near the hook
  steps: Step[];
  mistakes: string[];
  quiz: QuizQuestion;
};

export type Category = {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  tint: "transport" | "cooking" | "money" | "admin" | "life" | "home" | "tech" | "style" | "career";
  courses: Course[];
};

// ---------- helpers to keep declarations terse ----------
const c = (course: Course): Course => course;

// ============================================================================
// DATA
// ============================================================================

export const categories: Category[] = [
  // -------------------------------------------------------------- TRANSPORT
  {
    slug: "transportation",
    title: "Cars & the Road",
    tagline: "Handle your vehicle with quiet confidence.",
    emoji: "🚗",
    tint: "transport",
    courses: [
      c({
        slug: "change-a-flat-tire",
        title: "Change a Flat Tire",
        duration: "8 min",
        featured: true,
        hook: "It's 11pm, raining, you're 40 miles from home. The tow truck is 2 hours and $180 away — or you can do it yourself in 20 minutes.",
        why: "A flat on the shoulder feels like an emergency. With a 5-step routine, it becomes a routine task you can handle alone.",
        steps: [
          { title: "Pull over safely", body: "Find flat ground, away from traffic. Hazards on. Parking brake engaged." },
          { title: "Loosen the lug nuts", body: "Before jacking, break each nut counter-clockwise about a quarter turn. Use body weight." },
          { title: "Position the jack", body: "Place under the reinforced frame point near the flat. Check your owner's manual.", warning: "Never get under a car held only by a jack." },
          { title: "Swap the tire", body: "Lift until the tire clears. Remove nuts, pull flat off, mount spare, hand-tighten nuts." },
          { title: "Tighten in a star pattern", body: "Lower car, fully tighten in a crisscross. Drive under 50 mph to a tire shop." },
        ],
        mistakes: [
          "Loosening lug nuts after lifting the car (the wheel spins).",
          "Tightening nuts in a circle instead of a star.",
          "Forgetting a spare donut isn't a real tire — limit speed and distance.",
        ],
        quiz: {
          question: "When should you first loosen the lug nuts?",
          options: ["After the car is fully lifted", "Before lifting the car", "After removing the wheel", "Only with an impact wrench"],
          correctIndex: 1,
          explanation: "Loosen them while the tire is still on the ground so it can't spin freely.",
        },
      }),
      c({
        slug: "jump-start-a-car",
        title: "Jump-Start a Dead Battery",
        duration: "6 min",
        featured: true,
        hook: "Click. Click. Click. The dome light's dim and you're already late. Cables in the trunk — but in what order?",
        why: "Knowing the cable order keeps you safe and avoids frying your car's electronics.",
        steps: [
          { title: "Park the cars close", body: "Nose-to-nose. Both ignitions off." },
          { title: "Connect red to dead +", body: "Clamp red (positive) to the dead battery's + terminal." },
          { title: "Connect red to good +", body: "Clamp the other red end to the working battery's + terminal." },
          { title: "Connect black to good –", body: "Clamp black (negative) to the working battery's – terminal." },
          { title: "Ground the last clamp", body: "Final black clamps to bare metal on the dead car's engine block — not the battery.", warning: "Sparks near a battery can ignite hydrogen gas." },
          { title: "Start and disconnect in reverse", body: "Start the working car, then the dead one. Run 10+ minutes. Remove cables in reverse order." },
        ],
        mistakes: [
          "Clamping black to the dead battery's negative terminal.",
          "Letting red and black clamps touch.",
          "Driving 5 minutes and shutting off — battery won't recharge in time.",
        ],
        quiz: {
          question: "Where does the final black clamp go?",
          options: ["Dead battery negative", "Working battery negative", "Bare metal on the dead car's engine", "Anywhere that fits"],
          correctIndex: 2,
          explanation: "Grounding to bare metal away from the battery prevents sparks near flammable gases.",
        },
      }),
      c({
        slug: "dashboard-warning-lights",
        title: "Read Dashboard Warning Lights",
        duration: "5 min",
        hook: "A glowing orange symbol appears. Is this a $40 fix or a $4,000 one? Most drivers gamble. You don't have to.",
        why: "A 5-minute scan teaches you which lights mean 'pull over now' vs 'schedule next week'.",
        steps: [
          { title: "Red = stop soon", body: "Red lights (oil pressure, temp, brake) mean serious damage is happening. Pull over safely." },
          { title: "Yellow = investigate", body: "Yellow/amber (check engine, ABS, TPMS) — schedule service within days." },
          { title: "Green/blue = informational", body: "Just confirm a system is on. No action needed." },
          { title: "Check engine light", body: "Steady = soon. Flashing = pull over now. Flashing usually means a misfire that wrecks your catalytic converter." },
          { title: "Tire pressure (TPMS)", body: "In winter, cold air drops pressure. Check all four before assuming a leak." },
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
      }),
      c({
        slug: "car-insurance-basics",
        title: "Buy Car Insurance Without Getting Ripped Off",
        duration: "8 min",
        featured: true,
        hook: "The agent quotes you $240/mo. The same coverage online: $98/mo. Same car. Same you.",
        why: "Insurance is a confusing menu of acronyms designed to upsell. Knowing the four real coverages saves hundreds yearly.",
        steps: [
          { title: "Liability is the only legal must", body: "It pays for damage YOU cause to others. Get more than the state minimum — minimums won't cover one ER visit." },
          { title: "Collision & comprehensive", body: "Collision pays for your car after a crash. Comprehensive covers theft, hail, deer. Skip both on cars worth under ~$3k." },
          { title: "Uninsured motorist", body: "1 in 8 drivers is uninsured. This protects YOU when they hit you. Cheap and worth it." },
          { title: "Raise your deductible", body: "Going from $250 → $1000 deductible cuts premiums 15-30%. Only do it if you can actually float $1000." },
          { title: "Shop every renewal", body: "Loyalty is punished. Quote 3 insurers every 12 months. Switching saves $300+ on average." },
        ],
        mistakes: [
          "Buying state minimum liability — one bad crash and you're personally sued.",
          "Paying for collision on an old beater.",
          "Letting it auto-renew without reshopping.",
        ],
        quiz: {
          question: "When should you drop collision coverage?",
          options: ["Never", "When the car is worth less than ~10x the premium", "Only after age 25", "When you move states"],
          correctIndex: 1,
          explanation: "If a year of collision premiums equals ~10% of the car's value, the math stops working.",
        },
      }),
      c({
        slug: "speeding-ticket",
        title: "Handle a Speeding Ticket",
        duration: "6 min",
        hook: "$220 fine, 3 points, insurance jumps for 3 years. Or… 20 minutes of paperwork and it disappears.",
        why: "Most tickets are negotiable. Most drivers just pay and watch their insurance climb $400/year for years.",
        steps: [
          { title: "At the stop, say almost nothing", body: "License, registration, insurance. 'I'd like to consult an attorney.' Don't admit speed. Don't argue." },
          { title: "Write down everything", body: "Within an hour: weather, traffic, where the officer was, what was said. You'll forget details fast." },
          { title: "Look up your options", body: "Many states offer traffic school, deferral, or a written plea-down. Your court website lists them." },
          { title: "Show up to court", body: "Officers sometimes don't appear. If they don't, the ticket is often dismissed. Worst case: same fine you'd have paid anyway." },
          { title: "Ask for a reduction", body: "Politely ask the prosecutor for a non-moving violation (e.g. 'defective equipment'). Same fine, no points, no insurance hit." },
        ],
        mistakes: [
          "Admitting guilt at the roadside ('I know I was going fast').",
          "Just paying online — that's a guilty plea with full points.",
          "Missing the response deadline — now it's a warrant.",
        ],
        quiz: {
          question: "Why is showing up to court usually worth it?",
          options: ["Fines get bigger if you don't", "Officers sometimes don't appear → dismissal", "It's required by law", "It boosts your credit"],
          correctIndex: 1,
          explanation: "If the cited officer doesn't appear, many courts dismiss the ticket on the spot.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- COOKING
  {
    slug: "cooking",
    title: "Kitchen Basics",
    tagline: "Real meals, no chef hat required.",
    emoji: "🍳",
    tint: "cooking",
    courses: [
      c({
        slug: "perfect-eggs",
        title: "Cook Eggs Three Ways",
        duration: "7 min",
        featured: true,
        hook: "Eggs: cheapest protein in the store. So why does yours come out rubbery, watery, or green-yolked?",
        why: "Master scrambled, fried, and boiled and you've covered 80% of weekday breakfasts.",
        steps: [
          { title: "Scrambled — low and slow", body: "Whisk 2 eggs with a splash of milk and salt. Medium-low heat with butter. Stir constantly. Pull off heat while still glossy." },
          { title: "Fried — sunny side up", body: "Crack into a warm, buttered pan over medium-low. Cover with a lid for 2 minutes." },
          { title: "Soft-boiled — 6:30", body: "Lower cold eggs into boiling water. 6:30. Ice bath." },
          { title: "Hard-boiled — 10:00", body: "Same, but 10 minutes. Ice bath, peel under running water." },
        ],
        mistakes: [
          "Scrambling on high heat.",
          "Salting scrambled eggs too early — they weep water.",
          "Hard boil at a rolling boil — they crack and turn green.",
        ],
        quiz: {
          question: "How long for a soft-boiled egg with a runny yolk?",
          options: ["3 minutes", "6:30", "10 minutes", "15 minutes"],
          correctIndex: 1,
          explanation: "6:30 in already-boiling water gives a set white and a runny golden yolk.",
        },
      }),
      c({
        slug: "grocery-budget-basics",
        title: "Grocery Shop on a Budget",
        duration: "6 min",
        hook: "$40 list. $127 receipt. Where did the other $87 go? (Hint: aisle 6.)",
        why: "A 10-minute prep at home saves real money every week.",
        steps: [
          { title: "Build the list around 3 meals", body: "Pick 3 dinners you'll actually cook this week. Write everything they need." },
          { title: "Shop the perimeter first", body: "Produce, meat, dairy live outside. Center aisles = impulse buys." },
          { title: "Compare unit price, not sticker", body: "The shelf tag shows price per ounce or per pound." },
          { title: "Stick to one protein swap", body: "Chicken thighs, eggs, beans, lentils stretch the furthest." },
          { title: "Never shop hungry", body: "It's a cliché because it's true. Eat first, save 20%." },
        ],
        mistakes: [
          "Buying for recipes you 'might' make.",
          "Ignoring the freezer aisle.",
          "Falling for BOGO on stuff you don't need.",
        ],
        quiz: {
          question: "Most reliable way to compare two products' prices?",
          options: ["Sticker price", "Unit price (per oz/lb)", "Brand reputation", "Package size"],
          correctIndex: 1,
          explanation: "Unit price normalizes for package size — the only fair comparison.",
        },
      }),
      c({
        slug: "one-pan-dinner",
        title: "Cook a One-Pan Dinner",
        duration: "8 min",
        hook: "Ordering takeout 4 nights a week = ~$2,500/year. One pan, 35 minutes, costs $4 a serving.",
        why: "One sheet pan + protein + veg + oil + heat = a real meal with one dish to wash.",
        steps: [
          { title: "Preheat to 425°F (220°C)", body: "Hot oven = browning. Lukewarm = sad steaming." },
          { title: "Cut veg the same size", body: "Roughly 1-inch chunks of potato, onion, broccoli, peppers. Even size = even cooking." },
          { title: "Toss with oil + salt + pepper", body: "Two tablespoons of oil, big pinch of salt. Spread in one layer — crowding = steaming." },
          { title: "Add protein", body: "Chicken thighs, sausage, salmon, tofu. Skin side up. Drizzle with oil too." },
          { title: "Roast 25–35 min", body: "Internal temp: chicken 165°F, salmon 125°F. Rest 5 minutes before serving." },
        ],
        mistakes: [
          "Crowding the pan (everything steams).",
          "Same pan for raw chicken and ready-to-eat veg if not cooking together.",
          "Underseasoning — salt before, taste after.",
        ],
        quiz: {
          question: "Why spread food in a single layer?",
          options: ["It looks nicer", "Crowding traps steam, prevents browning", "Less mess", "Fits more food"],
          correctIndex: 1,
          explanation: "Steam from crowded food prevents the Maillard reaction — no brown crust, less flavor.",
        },
      }),
      c({
        slug: "knife-skills",
        title: "Hold a Knife Without Cutting Yourself",
        duration: "5 min",
        hook: "ER trips for kitchen cuts: 350,000 a year. The fix is a 3-finger grip.",
        why: "Most cuts come from a wrong grip and a dull knife. Both are fixable in five minutes.",
        steps: [
          { title: "Pinch the blade", body: "Index and thumb pinch the blade just past the handle. Other three fingers wrap the handle. This is the chef's grip." },
          { title: "Make a 'claw' with the other hand", body: "Curl fingertips back. Knuckles guide the blade. Tips can never get cut." },
          { title: "Rock, don't chop", body: "Tip stays on the board, heel rocks up and down through the food." },
          { title: "Sharpen monthly", body: "A dull knife slips. A sharp knife stays where you put it." },
        ],
        mistakes: [
          "Gripping the handle alone (no control).",
          "Flat fingers near the blade.",
          "Cutting on a sliding cutting board — put a damp paper towel underneath.",
        ],
        quiz: {
          question: "Which knife is more dangerous?",
          options: ["A very sharp one", "A dull one", "A serrated one", "A new one"],
          correctIndex: 1,
          explanation: "Dull blades slip off food and into fingers. Sharp blades go where you point them.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- MONEY (with tiers)
  {
    slug: "money",
    title: "Money & Taxes",
    tagline: "From your first paycheck to financial independence.",
    emoji: "💰",
    tint: "money",
    courses: [
      // ---------- STARTER ----------
      c({
        slug: "read-a-paycheck",
        title: "Read Your First Paycheck",
        duration: "5 min",
        tier: "starter",
        featured: true,
        hook: "You earned $1,200. Your bank shows $874. Where did $326 go — and is any of it coming back?",
        why: "Decode the codes once and you'll know exactly what each paycheck is doing.",
        steps: [
          { title: "Gross vs net", body: "Gross = what you earned. Net = what hit your bank. The gap is taxes + benefits." },
          { title: "FICA = Social Security + Medicare", body: "7.65% combined. Not refundable. Funds future retirement and healthcare." },
          { title: "Federal & state withholding", body: "Estimated tax. If they over-withhold, you get a refund in April. Under-withhold = you owe." },
          { title: "Pre-tax vs post-tax deductions", body: "401(k) and health insurance often come out before tax — they lower your taxable income." },
          { title: "Check your W-4", body: "Too big a refund = you gave the government a free loan. Adjust your W-4 to keep more per paycheck." },
        ],
        mistakes: [
          "Bragging about a huge refund — that was your money, interest-free, all year.",
          "Ignoring 401(k) match — it's free money.",
          "Not checking that hours match the paystub.",
        ],
        quiz: {
          question: "What does FICA fund?",
          options: ["Federal income tax", "Social Security & Medicare", "State tax", "Health insurance premiums"],
          correctIndex: 1,
          explanation: "FICA = the 7.65% that funds Social Security and Medicare.",
        },
      }),
      c({
        slug: "open-bank-accounts",
        title: "Open the Right Bank Accounts",
        duration: "6 min",
        tier: "starter",
        hook: "Your bank pays you 0.01% interest. The bank down the street pays 4.5%. On $5k, that's $225 vs 50¢ a year.",
        why: "Two accounts at two banks beats one account at one bank — every time.",
        steps: [
          { title: "One free checking, one HYSA", body: "Checking for spending. High-Yield Savings Account (HYSA) for savings — usually online-only banks." },
          { title: "Skip monthly fees", body: "Never pay a 'maintenance fee'. Hundreds of free options exist." },
          { title: "Set up direct deposit splits", body: "Send 10-20% straight to savings before you see it." },
          { title: "Enable overdraft protection (linked, not paid)", body: "Link savings → checking. Decline 'overdraft coverage' that lets purchases go through and charges $35." },
          { title: "Check FDIC insurance", body: "Up to $250k per bank per depositor. Above that, spread across institutions." },
        ],
        mistakes: [
          "Keeping all money in checking (zero interest).",
          "Opting into overdraft coverage.",
          "Ignoring HYSA rate changes — they move with the Fed.",
        ],
        quiz: {
          question: "What's the smartest place to keep your emergency fund?",
          options: ["Checking account", "Cash under the mattress", "High-Yield Savings Account", "Stocks"],
          correctIndex: 2,
          explanation: "HYSA earns interest, stays liquid, and is FDIC-insured.",
        },
      }),
      c({
        slug: "monthly-budget",
        title: "Build a Monthly Budget",
        duration: "7 min",
        tier: "starter",
        featured: true,
        hook: "Where DID that $600 go this month? Until you can answer in 60 seconds, you don't have a budget.",
        why: "A simple budget — done once and tweaked monthly — replaces anxiety with control.",
        steps: [
          { title: "Start with take-home pay", body: "Use the number that hits your bank, not your salary." },
          { title: "Try the 50/30/20 split", body: "50% needs, 30% wants, 20% savings + debt payoff." },
          { title: "List your fixed needs first", body: "Rent, utilities, phone, insurance, minimum debt — comes out before anything." },
          { title: "Automate savings", body: "Move 20% to savings the day you get paid." },
          { title: "Review monthly", body: "Spend 15 minutes looking at last month. Adjust." },
        ],
        mistakes: [
          "Budgeting from gross, not take-home.",
          "Forgetting irregular bills (insurance, holidays).",
          "Giving up after one bad month.",
        ],
        quiz: {
          question: "In 50/30/20, what's the 20%?",
          options: ["Wants", "Needs", "Savings & debt payoff", "Taxes"],
          correctIndex: 2,
          explanation: "20% is the foundation: savings and paying down debt.",
        },
      }),
      c({
        slug: "build-credit-score",
        title: "Build Credit From Zero",
        duration: "6 min",
        tier: "starter",
        featured: true,
        hook: "Two people apply for the same apartment. Same income. One gets it, one doesn't. The difference: 80 credit points.",
        why: "Credit determines apartments, car loans, and insurance rates. Building it early costs nothing.",
        steps: [
          { title: "Get one starter card", body: "A secured card or student card. Limit doesn't matter." },
          { title: "Use it for one small bill", body: "Put a streaming sub on autopay. Done." },
          { title: "Pay the FULL statement balance", body: "Not the minimum. Set autopay for full balance." },
          { title: "Keep utilization under 30%", body: "If your limit is $500, keep balance under $150." },
          { title: "Wait. Patience is the strategy.", body: "Credit history length matters. Don't close your first card." },
        ],
        mistakes: [
          "Carrying a balance to 'build credit'.",
          "Opening many cards quickly.",
          "Closing your oldest card.",
        ],
        quiz: {
          question: "Smartest way to use a starter credit card?",
          options: ["Carry a small balance", "Pay the minimum", "Pay full statement balance every month", "Max it then pay it off"],
          correctIndex: 2,
          explanation: "Paying full statement balance avoids all interest and still builds your score.",
        },
      }),

      // ---------- INTERMEDIATE ----------
      c({
        slug: "file-basic-taxes",
        title: "File Your First W-2 Taxes",
        duration: "10 min",
        tier: "intermediate",
        featured: true,
        hook: "Average TurboTax 'free' user pays $89. The IRS Free File version: $0. Same return.",
        why: "For a single W-2 job, taxes are 30 minutes and free. Skipping it = missed refund or penalties.",
        steps: [
          { title: "Gather your W-2", body: "Employer mails or emails it by January 31. Earnings + withholdings." },
          { title: "Use IRS Free File", body: "Under the income threshold? Use the official IRS Free File site. TurboTax 'free' often isn't." },
          { title: "Enter W-2 box by box", body: "Box 1 = wages, Box 2 = federal tax withheld. Just type what's on the form." },
          { title: "Take the standard deduction", body: "Unless you have a mortgage or huge medical bills, the standard deduction wins." },
          { title: "E-file with direct deposit", body: "Refund in ~3 weeks. Paper takes months.", warning: "Federal deadline is April 15." },
        ],
        mistakes: [
          "Throwing out your W-2.",
          "Paying for what the IRS gives free.",
          "Missing the deadline.",
        ],
        quiz: {
          question: "What does Box 2 on your W-2 show?",
          options: ["Total wages", "Federal income tax already withheld", "Your refund", "State tax owed"],
          correctIndex: 1,
          explanation: "Box 2 is federal tax already taken. If it's more than you owe, that's your refund.",
        },
      }),
      c({
        slug: "emergency-fund",
        title: "Build a 3-Month Emergency Fund",
        duration: "6 min",
        tier: "intermediate",
        hook: "78% of Americans live paycheck to paycheck. One car repair = a credit card spiral. The fix is boring math.",
        why: "An emergency fund is the difference between an inconvenience and a catastrophe.",
        steps: [
          { title: "Know your number", body: "Add up rent, food, utilities, insurance, minimum debt. Multiply by 3." },
          { title: "Start with $1,000", body: "Even $1k stops most small emergencies from becoming credit card debt." },
          { title: "Park it in an HYSA", body: "Liquid, separate from checking, earning real interest." },
          { title: "Automate $25-100/week", body: "Auto-transfer the day after payday. Boring beats heroic." },
          { title: "Don't 'invest' it", body: "Emergency funds aren't supposed to grow — they're supposed to BE there." },
        ],
        mistakes: [
          "Keeping it in checking (you'll spend it).",
          "Investing it in stocks (it might be down when you need it).",
          "Using it for non-emergencies.",
        ],
        quiz: {
          question: "Where should an emergency fund live?",
          options: ["Stock market", "Crypto", "High-Yield Savings Account", "Under the mattress"],
          correctIndex: 2,
          explanation: "HYSA = liquid, safe, FDIC-insured, earning real interest.",
        },
      }),
      c({
        slug: "debt-payoff-strategy",
        title: "Pay Off Debt Strategically",
        duration: "8 min",
        tier: "intermediate",
        hook: "$5,000 at 24% APR, paying minimums = 22 years and $13,000 in interest. There are two faster ways.",
        why: "Random payments waste years. Picking ONE strategy and sticking to it can cut payoff time by 70%.",
        steps: [
          { title: "List every debt", body: "Balance, interest rate, minimum payment. All of it. The list itself reduces anxiety." },
          { title: "Choose: avalanche or snowball", body: "Avalanche: highest interest first (saves most money). Snowball: smallest balance first (faster wins, better motivation)." },
          { title: "Pay minimums on everything else", body: "All extra cash goes to the ONE target debt." },
          { title: "Stop adding to it", body: "Cards in a drawer. Not closed (hurts score) — just not used." },
          { title: "Roll payments down", body: "When debt #1 dies, that whole payment moves to debt #2. Snowballs." },
        ],
        mistakes: [
          "Splitting extra cash across all debts equally.",
          "Closing cards after paying them off — credit score drops.",
          "Refinancing to a lower rate, then adding new debt.",
        ],
        quiz: {
          question: "Which strategy saves the most money mathematically?",
          options: ["Snowball (smallest first)", "Avalanche (highest rate first)", "Pay everything equally", "Pay only minimums"],
          correctIndex: 1,
          explanation: "Avalanche kills the most-expensive debt first, minimizing total interest paid.",
        },
      }),
      c({
        slug: "401k-roth-ira",
        title: "401(k) and Roth IRA in Plain English",
        duration: "9 min",
        tier: "intermediate",
        featured: true,
        hook: "Skipping a 5% 401(k) match at age 22 costs ~$300,000 by retirement. It's free money you're walking past.",
        why: "Two accounts. Two simple rules. Decades of compounding.",
        steps: [
          { title: "Get the full 401(k) match", body: "If your employer matches 5%, contribute at least 5%. That's an instant 100% return." },
          { title: "Then open a Roth IRA", body: "After the match, prioritize a Roth IRA at Fidelity/Vanguard/Schwab. Tax-free growth forever." },
          { title: "Pick a target-date fund", body: "Search 'Vanguard 2065' (or your retirement year). One fund, automatic rebalancing, low fees." },
          { title: "Automate, then ignore", body: "Auto-invest monthly. Don't check daily. Markets dip — that's fine." },
          { title: "Increase 1% per year", body: "Each raise, bump contribution +1%. Painless and powerful." },
        ],
        mistakes: [
          "Leaving the employer match on the table.",
          "Picking individual stocks for retirement.",
          "Cashing out a 401(k) when changing jobs (huge tax + 10% penalty).",
        ],
        quiz: {
          question: "What's the FIRST priority for retirement saving?",
          options: ["Max a Roth IRA", "Get the full 401(k) employer match", "Buy crypto", "Open a brokerage account"],
          correctIndex: 1,
          explanation: "The match is a 100% return. Nothing beats free money.",
        },
      }),
      c({
        slug: "what-insurance-you-need",
        title: "Insurance: What You Need vs Waste",
        duration: "8 min",
        tier: "intermediate",
        hook: "The $14/mo phone insurance? Waste. The $25/mo umbrella policy? Genius. Most people get this exactly backwards.",
        why: "Insurance protects against catastrophes you can't afford — not inconveniences you can.",
        steps: [
          { title: "WORTH IT — Health insurance", body: "One ER visit can be $30k+. Even a high-deductible plan beats nothing." },
          { title: "WORTH IT — Renter's / homeowner's", body: "Renter's is ~$15/mo. Covers fire, theft, liability. Required by most landlords." },
          { title: "WORTH IT — Auto liability", body: "Legally required. Get more than state minimum." },
          { title: "WORTH IT — Term life (if dependents)", body: "20-year term, cheap, covers actual breadwinner risk. Skip whole life." },
          { title: "USUALLY WASTE", body: "Extended warranties, phone insurance, rental car CDW (your card often covers it), credit life insurance, flight insurance." },
        ],
        mistakes: [
          "Buying whole life for 'investment'.",
          "Skipping renter's insurance because 'I don't own much'.",
          "Buying extended warranties that overlap your credit card's coverage.",
        ],
        quiz: {
          question: "Which is almost always a waste?",
          options: ["Term life (with kids)", "Renter's insurance", "Extended warranty on a $400 TV", "Health insurance"],
          correctIndex: 2,
          explanation: "Extended warranties are pure profit for retailers. Self-insure small stuff.",
        },
      }),

      // ---------- ADVANCED ----------
      c({
        slug: "tax-deductions-credits",
        title: "Deductions vs Credits (and which to chase)",
        duration: "10 min",
        tier: "advanced",
        hook: "A $1,000 deduction saves you ~$220. A $1,000 credit saves you $1,000. They're not the same animal.",
        why: "Every dollar you understand here is a dollar that stays with you.",
        steps: [
          { title: "Deduction = lowers taxable income", body: "Worth your marginal tax rate × the amount. A $1,000 deduction at 22% bracket = $220 saved." },
          { title: "Credit = lowers tax owed dollar-for-dollar", body: "$1,000 credit = $1,000 less tax. Refundable credits can even pay you." },
          { title: "Standard vs itemized", body: "Take whichever is bigger. Standard is high now (~$14,600 single). Itemize only if mortgage interest + SALT + charity exceed it." },
          { title: "Big credits to know", body: "Saver's Credit, EITC, Child Tax Credit, American Opportunity (college), Lifetime Learning, EV credits." },
          { title: "Above-the-line deductions", body: "HSA, IRA contributions, student loan interest — these reduce income even if you take the standard deduction." },
        ],
        mistakes: [
          "Itemizing when standard is bigger.",
          "Missing the Saver's Credit (low income + retirement contribution).",
          "Forgetting student loan interest is deductible.",
        ],
        quiz: {
          question: "Which is more valuable, dollar-for-dollar?",
          options: ["A $1,000 deduction", "A $1,000 credit", "They're equal", "Depends on the state"],
          correctIndex: 1,
          explanation: "Credits cut tax owed directly. Deductions only cut taxable income.",
        },
      }),
      c({
        slug: "investing-index-funds",
        title: "Index Funds: The Boring Path to Wealth",
        duration: "10 min",
        tier: "advanced",
        featured: true,
        hook: "Picking stocks beats the market roughly 15% of the time. Buying ALL of them beats stock pickers ~85% of the time.",
        why: "Three funds, automated, ignored — the strategy that quietly outperforms most professionals.",
        steps: [
          { title: "Why index funds work", body: "You own a slice of every big company. No fund manager to pay. No emotional decisions." },
          { title: "The 3-fund portfolio", body: "Total US stock market + Total international + Total bond. Done." },
          { title: "Pick a brokerage", body: "Fidelity, Vanguard, or Schwab. All free. All have zero-fee index funds." },
          { title: "Set automatic monthly buys", body: "Same day every month. Dollar-cost averaging removes timing." },
          { title: "Do nothing for 30 years", body: "Don't sell on dips. Don't chase trends. Boredom is the strategy." },
        ],
        mistakes: [
          "Trying to time the market.",
          "Selling during a crash (locks in losses).",
          "Picking high-fee actively managed funds.",
        ],
        quiz: {
          question: "Why do index funds beat most active funds long-term?",
          options: ["Lower fees + no human emotion", "Better stock pickers", "Government subsidies", "Tax breaks"],
          correctIndex: 0,
          explanation: "Lower fees compound massively over decades, and there's no human trying to outguess the market.",
        },
      }),
      c({
        slug: "negotiate-a-raise",
        title: "Negotiate a Raise (Without Making it Weird)",
        duration: "8 min",
        tier: "advanced",
        hook: "A single 10% raise at 25 compounds to ~$1M more lifetime earnings. Most people just… don't ask.",
        why: "The conversation is awkward for 10 minutes. The result lasts a career.",
        steps: [
          { title: "Document wins all year", body: "Keep a folder: shipped projects, money saved, problems solved, with numbers." },
          { title: "Research market rate", body: "levels.fyi, Glassdoor, BLS. Walk in knowing what your role pays." },
          { title: "Ask for a meeting, not a raise (yet)", body: "'I'd like 20 minutes to discuss my growth and compensation.' Calm, scheduled." },
          { title: "Anchor high, with evidence", body: "State a specific number ~10-15% above market. Tie it to your wins, not your needs." },
          { title: "Then be silent", body: "Make your case. Stop talking. The next person to speak loses." },
        ],
        mistakes: [
          "Citing personal expenses ('rent went up').",
          "Threatening to leave (only works once).",
          "Naming a range — they'll pick the bottom.",
        ],
        quiz: {
          question: "What should anchor your number?",
          options: ["Your bills", "Market rate + your documented wins", "What a friend earns", "Cost of living"],
          correctIndex: 1,
          explanation: "Market rate + evidence of value is the only argument that moves a budget.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- ADMIN
  {
    slug: "admin",
    title: "Adult Admin",
    tagline: "Forms, IDs, leases — the paperwork of life.",
    emoji: "📋",
    tint: "admin",
    courses: [
      c({
        slug: "rent-an-apartment",
        title: "Rent Your First Apartment",
        duration: "9 min",
        featured: true,
        hook: "$2,400 deposit. The lease has a clause buried on page 8 that lets them keep all of it. Read page 8.",
        why: "A lease is a binding contract. Knowing what to look for protects you from losing thousands.",
        steps: [
          { title: "Know your budget rule", body: "Rent under 30% of take-home. Add utilities, internet, renter's insurance." },
          { title: "Tour in person", body: "Check water pressure, cell signal, hallway smell, lock feel." },
          { title: "Read the lease before signing", body: "Lease length, rent increases, pet policy, utilities, early-termination, move-out cleaning clause." },
          { title: "Document move-in condition", body: "Photo and video every wall, floor, appliance. Email it to yourself and the landlord day one." },
          { title: "Get renter's insurance", body: "About $15/month. Many landlords now require it." },
        ],
        mistakes: [
          "Not reading the early-termination clause.",
          "Skipping move-in photos.",
          "Paying any 'application fee' to a landlord without seeing the unit.",
        ],
        quiz: {
          question: "Most important thing on move-in day?",
          options: ["Unpack quickly", "Document existing damage with photos", "Meet neighbors", "Change the locks"],
          correctIndex: 1,
          explanation: "Without documented proof, your deposit is at risk.",
        },
      }),
      c({
        slug: "replace-ssn-card",
        title: "Replace a Social Security Card",
        duration: "5 min",
        hook: "You can't open a bank account, start a job, or rent without it. And it's locked in a box at your parents' house — across the country.",
        why: "It's free, takes 2 weeks, and you can mostly do it online.",
        steps: [
          { title: "Try the SSA online portal first", body: "ssa.gov — if your state participates and you have a valid driver's license, you can request a replacement entirely online." },
          { title: "Otherwise, gather ID", body: "Original (not photocopy) US passport, driver's license, or state ID." },
          { title: "Fill out form SS-5", body: "Free download from ssa.gov. One page." },
          { title: "Mail or visit a local SSA office", body: "Mailing originals feels scary but they return them. Or book an in-person appointment." },
          { title: "Wait 10-14 days", body: "Card arrives by mail. Memorize the number, store the card somewhere safe — NOT your wallet." },
        ],
        mistakes: [
          "Paying a third-party service. The SSA is free.",
          "Carrying the card in your wallet (identity theft risk).",
          "Giving the number out over phone or email.",
        ],
        quiz: {
          question: "How much does a replacement Social Security card cost?",
          options: ["$25", "$50", "It's free", "$100"],
          correctIndex: 2,
          explanation: "Always free directly from the SSA. Anyone charging is a scam or middleman.",
        },
      }),
      c({
        slug: "replace-birth-certificate",
        title: "Get a Copy of Your Birth Certificate",
        duration: "5 min",
        hook: "It's required for a passport, marriage license, and Real ID. And no — your parents' photo of it doesn't count.",
        why: "Order from the right place once and store it safe forever.",
        steps: [
          { title: "Order from the state of birth", body: "Specifically: the Vital Records office of the STATE you were born in (not where you live now)." },
          { title: "Use the official .gov site", body: "Many third-party sites charge double and just forward your request. Search '[state] vital records birth certificate'." },
          { title: "Get a CERTIFIED copy", body: "Certified copies have a raised seal. Photocopies are useless for legal purposes." },
          { title: "Order 2 copies", body: "You'll need backups for passport, marriage, employment over the years. ~$15-30 each." },
          { title: "Store in a fireproof box", body: "Or a safe deposit box. NOT your wallet. NOT a desk drawer." },
        ],
        mistakes: [
          "Ordering from VitalChek-style middlemen at 2x cost.",
          "Getting a non-certified copy.",
          "Keeping it in your apartment with no fireproofing.",
        ],
        quiz: {
          question: "Which copy is legally usable for a passport?",
          options: ["A clear photocopy", "A certified copy with raised seal", "A scan emailed by your mom", "A photo on your phone"],
          correctIndex: 1,
          explanation: "Only certified copies with the official seal count for federal/legal use.",
        },
      }),
      c({
        slug: "prevent-identity-theft",
        title: "Prevent Identity Theft (in 30 Minutes)",
        duration: "8 min",
        featured: true,
        hook: "Average ID theft victim spends 200 hours and $1,300 cleaning it up. Or you can spend 30 minutes today and skip that entirely.",
        why: "A credit freeze is the single most powerful, free tool — and almost nobody uses it.",
        steps: [
          { title: "Freeze your credit at all 3 bureaus", body: "Equifax, Experian, TransUnion. Free, online, ~10 min each. No new accounts can be opened in your name." },
          { title: "Turn on bank/card alerts", body: "Text alert for every transaction over $1. You'll catch fraud in real time." },
          { title: "Use a password manager", body: "Bitwarden, 1Password. Unique passwords for every site. The breach of one doesn't cascade." },
          { title: "Enable 2FA everywhere", body: "Especially email, bank, and your phone carrier (SIM-swap attacks). Use an app, not SMS." },
          { title: "Shred mail with personal info", body: "Pre-approved card offers, medical bills, anything with your full name + address + DOB." },
        ],
        mistakes: [
          "Using the same password on 'small' and 'big' sites.",
          "SMS 2FA on a phone vulnerable to SIM swap.",
          "Trusting a phone caller claiming to be your bank — hang up, call the number on your card.",
        ],
        quiz: {
          question: "Most powerful free anti-ID-theft tool?",
          options: ["Antivirus software", "Credit freeze at all 3 bureaus", "Paid identity monitoring", "VPN"],
          correctIndex: 1,
          explanation: "A credit freeze stops new accounts cold. It's free and reversible.",
        },
      }),
      c({
        slug: "register-to-vote",
        title: "Register to Vote",
        duration: "4 min",
        hook: "Average registration time: 2 minutes. Average regret for not voting: 4 years.",
        why: "Most local elections are decided by tiny margins. Yours actually matters.",
        steps: [
          { title: "Go to vote.gov", body: "Pick your state. It links to the official registration site." },
          { title: "Have your ID ready", body: "Driver's license or last 4 of SSN — depends on your state." },
          { title: "Confirm your registration", body: "After registering, check your status weeks later. Purges happen." },
          { title: "Pick how you'll vote", body: "Mail-in, early, or election day. Mail-in needs a request in many states." },
          { title: "Re-register when you move", body: "Voter rolls follow your address, not you." },
        ],
        mistakes: [
          "Assuming you're 'still registered' after a move.",
          "Missing the registration deadline (often weeks before).",
          "Forgetting to vote in primaries — they often decide the actual race.",
        ],
        quiz: {
          question: "What's the official non-partisan place to start?",
          options: ["A campaign site", "vote.gov", "Social media link", "A petition site"],
          correctIndex: 1,
          explanation: "vote.gov is the official US government registration portal.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- HOME
  {
    slug: "home",
    title: "Home & Repairs",
    tagline: "Fix the small stuff before it's the big stuff.",
    emoji: "🔧",
    tint: "home",
    courses: [
      c({
        slug: "unclog-toilet",
        title: "Unclog a Toilet (Without a Plumber)",
        duration: "5 min",
        featured: true,
        hook: "Plumber call: $180 minimum. Your call: a $12 plunger and 4 minutes.",
        why: "95% of clogs come out with the right plunger and the right technique.",
        steps: [
          { title: "Stop the rising water", body: "Lift the tank lid, push the rubber flapper down. Water stops flowing into the bowl." },
          { title: "Use a flange plunger", body: "The black bell-shaped one with a fold-out lip. The flat red 'sink' one doesn't seal a toilet." },
          { title: "Seal first, then plunge", body: "Lower it gently to push out air. Then 6-10 firm pumps without breaking the seal." },
          { title: "Check the flush", body: "Lift slowly. If water drains, do one normal flush. If not, repeat." },
          { title: "If it won't budge: a closet auger", body: "$25 at any hardware store. Snakes through the trap. Wear gloves.", warning: "Don't add Drano to a toilet — it can damage seals and burn you on the next flush." },
        ],
        mistakes: [
          "Using a flat sink plunger.",
          "Flushing a second time hoping it'll go (now it overflows).",
          "Pouring chemical drain cleaners.",
        ],
        quiz: {
          question: "Which plunger works on toilets?",
          options: ["Red flat 'cup' plunger", "Black flange plunger", "Either one", "Neither — call a plumber"],
          correctIndex: 1,
          explanation: "The flange plunger has a fold-out lip that seals the toilet drain.",
        },
      }),
      c({
        slug: "unclog-sink-drain",
        title: "Unclog a Sink Drain",
        duration: "5 min",
        hook: "That nasty smell? Not the drain. It's a hairball the size of a tennis ball, six inches down.",
        why: "Almost every kitchen and bathroom clog can be cleared without chemicals.",
        steps: [
          { title: "Bail out standing water", body: "A cup is fine. You need access to the drain itself." },
          { title: "Try a zip-it tool first", body: "$3 plastic strip with barbs. Push down, pull up — pulls out the hairball." },
          { title: "Then plunge", body: "Cover the overflow hole with a wet rag, plunge the drain. The seal matters." },
          { title: "Then the P-trap", body: "Bucket under the curved pipe below the sink. Unscrew, dump, rinse, reattach." },
          { title: "Skip Drano on slow drains", body: "It's caustic, doesn't fix bad clogs, and damages older pipes." },
        ],
        mistakes: [
          "Skipping the overflow seal — plunger won't work.",
          "Cross-threading the P-trap on reassembly.",
          "Pouring boiling water down PVC pipes (can warp them).",
        ],
        quiz: {
          question: "Why cover the overflow when plunging a sink?",
          options: ["Looks cleaner", "Without it, plunger air escapes — no suction", "Required by code", "Stops splashing"],
          correctIndex: 1,
          explanation: "Without sealing the overflow, plunger pressure leaks out — zero suction.",
        },
      }),
      c({
        slug: "change-air-filter",
        title: "Change Your AC / Furnace Filter",
        duration: "4 min",
        featured: true,
        hook: "A clogged filter cuts AC efficiency 15%, raises your bill, and burns out a $4,000 unit early. The fix costs $8.",
        why: "30 seconds every 1-3 months keeps your HVAC alive longer.",
        steps: [
          { title: "Find your filter slot", body: "Usually in the return air vent (big grille on a wall or ceiling) or next to the furnace." },
          { title: "Note the size on the old one", body: "Printed on the cardboard edge. Looks like 16x25x1." },
          { title: "Buy a MERV 8-11", body: "Higher MERV = finer filter but more strain on the system. 8-11 is the sweet spot." },
          { title: "Slide it in with airflow arrow correct", body: "Arrow points TOWARD the unit (in the direction the air flows)." },
          { title: "Set a phone reminder", body: "Every 90 days. Pets or allergies: every 30-60 days." },
        ],
        mistakes: [
          "Installing the filter backward.",
          "Buying MERV 13+ in a system not rated for it.",
          "Forgetting for a year — efficiency tanks.",
        ],
        quiz: {
          question: "Which way does the airflow arrow point?",
          options: ["Toward the room", "Toward the HVAC unit", "Either way is fine", "Up"],
          correctIndex: 1,
          explanation: "Arrow always points in the direction of airflow — toward the furnace/AC.",
        },
      }),
      c({
        slug: "smoke-detector-care",
        title: "Smoke Detectors: Test, Replace, Survive",
        duration: "5 min",
        featured: true,
        hook: "3 out of 5 home fire deaths happen in homes with no working smoke alarm. Half had detectors — with dead batteries.",
        why: "5 minutes a year is the difference between a scare and a tragedy.",
        steps: [
          { title: "Test monthly", body: "Press the button. Loud beep = working. No beep = replace battery NOW, not 'tomorrow'." },
          { title: "Replace batteries yearly", body: "Tie it to daylight saving time. 'Spring forward, fall back, change the batteries.'" },
          { title: "Replace the whole detector every 10 years", body: "The sensor degrades. There's a date stamped on the back." },
          { title: "Have one per bedroom + hallway + each floor", body: "Plus a CO detector near sleeping areas if you have any gas appliance, fireplace, or attached garage." },
          { title: "Don't paint over them", body: "Or wrap during renovation. Sounds obvious. People do it." },
        ],
        mistakes: [
          "Pulling the battery during cooking and forgetting to replace it.",
          "Skipping CO detectors.",
          "Keeping detectors past 10 years — they slowly go blind.",
        ],
        quiz: {
          question: "How often should you replace the entire detector unit?",
          options: ["Every 2 years", "Every 5 years", "Every 10 years", "Never if it still beeps"],
          correctIndex: 2,
          explanation: "The internal sensor degrades. Manufacturer date is on the back.",
        },
      }),
      c({
        slug: "stain-removal",
        title: "Get Stains Out of Clothes",
        duration: "6 min",
        hook: "Red wine on a white shirt. The dryer is the assassin — heat sets the stain forever. You have minutes.",
        why: "Most stains come out with the right move BEFORE the dryer.",
        steps: [
          { title: "Blot, never rub", body: "Rubbing pushes stain deeper into fibers. Press a paper towel from the back." },
          { title: "Cold water first", body: "Hot water sets protein stains (blood, egg, sweat). Cold for almost everything." },
          { title: "Match treatment to stain", body: "Grease/oil → dish soap. Wine/coffee → cold water + a little vinegar. Blood → cold water + hydrogen peroxide. Ink → rubbing alcohol." },
          { title: "Soak then wash", body: "Apply, wait 15 minutes, then normal wash on cold." },
          { title: "Air dry until you confirm it's gone", body: "If it's still there after washing, hang dry and try again. The dryer locks it in.", warning: "Bleach destroys colors AND many synthetic fabrics — read the tag." },
        ],
        mistakes: [
          "Throwing it in the dryer 'just to check'.",
          "Hot water on blood or sweat (sets it forever).",
          "Bleaching colors.",
        ],
        quiz: {
          question: "What's the dryer's role in stain removal?",
          options: ["It helps lift stains", "Heat permanently sets stains", "It has no effect", "It bleaches stains out"],
          correctIndex: 1,
          explanation: "Dryer heat chemically bonds the stain to the fiber. Always confirm it's gone before drying.",
        },
      }),
      c({
        slug: "trash-recycle-compost",
        title: "What to Trash, Recycle, Compost",
        duration: "6 min",
        hook: "70% of recycled stuff gets thrown in the trash anyway — because of one greasy pizza box.",
        why: "A few rules and the system actually works.",
        steps: [
          { title: "Empty + dry + clean = recycle", body: "Rinse jars, flatten cardboard, dump containers. Liquid contaminates entire batches." },
          { title: "Pizza box rule", body: "Greasy half → trash. Clean lid → recycle. Grease ruins paper recycling." },
          { title: "Plastic numbers matter", body: "1 (PET) and 2 (HDPE) are widely accepted. 3, 6, 7 often aren't. Check your local rules — not the chasing-arrows logo." },
          { title: "NEVER bag your recyclables", body: "Plastic bags jam the machines. Loose in the bin." },
          { title: "Compost food scraps", body: "Coffee grounds, fruit/veg scraps, eggshells. Not meat, dairy, oil. Many cities now collect curbside." },
        ],
        mistakes: [
          "Bagging recyclables (entire bag goes to landfill).",
          "Recycling greasy paper.",
          "'Wishcycling' weird stuff hoping it'll be recycled.",
        ],
        quiz: {
          question: "What happens when you bag your recyclables?",
          options: ["They get sorted faster", "Workers can't open them — often trashed whole", "Required by law", "It helps the worker"],
          correctIndex: 1,
          explanation: "Bagged recyclables get pulled off the line and landfilled. Always loose.",
        },
      }),
      c({
        slug: "deep-clean-routine",
        title: "Clean Your Place Without Hating It",
        duration: "7 min",
        hook: "Cleaning all day Sunday: miserable. 15 minutes after dinner: invisible.",
        why: "Daily 15 + weekly 45 keeps a place visitor-ready forever.",
        steps: [
          { title: "Top to bottom, dry to wet", body: "Dust before you vacuum. Vacuum before you mop. Otherwise you're cleaning the same surface twice." },
          { title: "One room, one mission", body: "Don't bounce. Bathroom completely done before kitchen begins." },
          { title: "Daily 15-minute reset", body: "Dishes in dishwasher, counters wiped, one floor swept. Tonight-you protects tomorrow-you." },
          { title: "Weekly: bathroom + kitchen deep", body: "Toilet, shower, sinks, stovetop. 30-45 minutes, one playlist." },
          { title: "Restock cleaning supplies", body: "Run out = excuses. Always have all-purpose, paper towels, microfiber cloths, dish soap." },
        ],
        mistakes: [
          "Letting it become a 6-hour Saturday.",
          "Vacuuming before dusting.",
          "Using paper towels for everything (microfiber is reusable and cheaper)." ,
        ],
        quiz: {
          question: "Why dust before you vacuum?",
          options: ["Vacuums hate dust", "Dust falls — vacuuming first means doing it twice", "Dust ruins floors", "It's not necessary"],
          correctIndex: 1,
          explanation: "Dust settles. Vacuum after dusting, never before.",
        },
      }),
      c({
        slug: "basic-plumbing-shutoff",
        title: "Find Your Water Shut-Off (Before You Need It)",
        duration: "4 min",
        featured: true,
        hook: "Burst pipe at 2am. 50 gallons a minute hitting your floor. Knowing where ONE valve is = $300 in damage. Not knowing = $30,000.",
        why: "It's the single most important 4 minutes you can spend in a new home.",
        steps: [
          { title: "Know the MAIN shut-off", body: "House: usually basement, crawlspace, or near the front. Apartment: usually a panel in a hallway closet, or under sinks." },
          { title: "Try it now", body: "Turn it clockwise (righty-tighty). Note how many turns. Stiff? Spray with WD-40 — don't force." },
          { title: "Know per-fixture shut-offs", body: "Under every toilet and sink: a small oval valve. Toilet overflow → shut just that one off, no whole-house outage." },
          { title: "Tag your water heater shut-offs", body: "Cold water IN line. Plus the gas/electric power. Label them with tape." },
          { title: "Show roommates / family", body: "If only you know, only you can save the floor." },
        ],
        mistakes: [
          "Discovering the valve is rusted shut during the actual emergency.",
          "Forcing a stiff valve and snapping it.",
          "Not knowing which knob is YOUR meter in a multi-unit building.",
        ],
        quiz: {
          question: "What should you do BEFORE an emergency happens?",
          options: ["Buy plumber's tape", "Find and test your main water shut-off", "Memorize the city water number", "Get insurance"],
          correctIndex: 1,
          explanation: "An emergency is the worst time to discover a stuck valve.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- TECH
  {
    slug: "tech",
    title: "Tech & Digital Life",
    tagline: "Computers, phones, AI — used well, kept clean.",
    emoji: "💻",
    tint: "tech",
    courses: [
      c({
        slug: "backup-everything",
        title: "Back Up Your Stuff (3-2-1 Rule)",
        duration: "7 min",
        featured: true,
        hook: "Hard drives fail. Phones get stolen. Cloud accounts get locked. The question isn't IF — it's whether you'll cry when it happens.",
        why: "One free hour today saves a decade of photos forever.",
        steps: [
          { title: "Learn the 3-2-1 rule", body: "3 copies of important data, on 2 different types of media, with 1 copy off-site (cloud)." },
          { title: "Turn on cloud photo backup", body: "iCloud, Google Photos, OneDrive. Pick one. Verify it's actually syncing." },
          { title: "Add an external drive", body: "$60 for a 2TB drive. Drag-and-drop your Documents/Photos folders. Quarterly." },
          { title: "Test a restore", body: "Most 'backups' fail when you actually try to restore. Pull a random file back. Confirm it opens." },
          { title: "Don't trust just one cloud", body: "Account lockouts happen. Cloud-only is one bad email away from gone." },
        ],
        mistakes: [
          "'I have iCloud' — but never checked it's actually syncing.",
          "Backups on the same drive as the original.",
          "Relying solely on a single account that could get locked.",
        ],
        quiz: {
          question: "What does the '1' in 3-2-1 mean?",
          options: ["1 user", "1 backup off-site", "1 hour weekly", "1 type of file"],
          correctIndex: 1,
          explanation: "1 copy must be off-site (cloud or remote drive) to survive theft, fire, or flood.",
        },
      }),
      c({
        slug: "clean-your-computer",
        title: "Clean Up a Slow Computer",
        duration: "8 min",
        hook: "A 5-year-old laptop usually doesn't need replacing. It needs 30 minutes of cleanup and one upgrade.",
        why: "Most 'slow' computers are just clogged and overwhelmed.",
        steps: [
          { title: "Empty downloads + trash", body: "Often gigabytes of installer files and junk. First 5 minutes, biggest wins." },
          { title: "Uninstall what you don't use", body: "Settings → Apps. Toolbars, old games, free trials. Clean them out." },
          { title: "Disable startup programs", body: "Task Manager (Win) / System Settings → Login Items (Mac). Most apps don't need to launch on boot." },
          { title: "Update OS + browser", body: "Both fix performance and security. Restart after." },
          { title: "Physically clean it", body: "Compressed air on the keyboard and vents. Overheated chips throttle to ~30% speed." },
        ],
        mistakes: [
          "Installing 'PC cleaner' apps — most are scams or malware.",
          "Letting 50 startup apps load at boot.",
          "Never restarting (uptime of 60+ days is not a flex)." ,
        ],
        quiz: {
          question: "Why disable startup programs?",
          options: ["Saves disk space", "They slow boot and eat RAM/CPU constantly", "Required for updates", "Reduces screen brightness"],
          correctIndex: 1,
          explanation: "Each startup app takes RAM and CPU even when you're not using it.",
        },
      }),
      c({
        slug: "phone-storage",
        title: "Free Up Phone Storage (Without Losing Photos)",
        duration: "5 min",
        hook: "'Storage Almost Full' at the worst possible moment — like trying to take a photo at a once-in-a-lifetime concert.",
        why: "10 minutes of cleanup buys you years before needing a new phone.",
        steps: [
          { title: "Turn on cloud photo sync", body: "iCloud Photos or Google Photos. Then 'Optimize Storage' — only thumbnails on device." },
          { title: "Delete apps by size", body: "Settings shows apps ranked by storage. Old games, reddit clones, that food app you used twice." },
          { title: "Clear app caches", body: "Especially Instagram, TikTok, Spotify. Their caches grow to multiple GB." },
          { title: "Offload unused apps", body: "iOS: 'Offload Unused Apps'. Removes the app, keeps your data. Reinstalls keep your settings." },
          { title: "Empty 'Recently Deleted'", body: "Photos sit there for 30 days using full storage. Empty manually." },
        ],
        mistakes: [
          "Buying a new phone to solve a storage problem.",
          "Deleting photos before confirming they're in cloud.",
          "Ignoring app caches (the real culprit)." ,
        ],
        quiz: {
          question: "What should you do BEFORE deleting photos to save space?",
          options: ["Print them", "Confirm cloud sync is finished and all photos uploaded", "Email them to yourself", "Just delete — they're recoverable"],
          correctIndex: 1,
          explanation: "Always verify the cloud has them. Then delete locally.",
        },
      }),
      c({
        slug: "use-ai-well",
        title: "Use AI Like a Pro (Not a Toy)",
        duration: "9 min",
        featured: true,
        hook: "Most people type 'help me write an email' and get garbage. The pros write 200-word prompts and get a finished draft.",
        why: "AI is a tool. The output is only as good as the instructions.",
        steps: [
          { title: "Give role + task + context + format", body: "'You are a careful proofreader. Edit this email for clarity. Tone: friendly but professional. Output: bulleted changes + final version.'" },
          { title: "Show, don't tell", body: "Paste examples of what 'good' looks like. AI mimics patterns better than it follows abstract rules." },
          { title: "Iterate, don't restart", body: "'Make it shorter.' 'Less corporate.' 'Now in plain English.' Each turn improves it." },
          { title: "Verify facts independently", body: "AI confidently invents citations, dates, and quotes. Cross-check anything important — especially numbers." },
          { title: "Don't paste private data", body: "Medical info, passwords, work secrets, others' personal details. Treat the chat like a public forum." },
        ],
        mistakes: [
          "One-line prompts and frustration with vague output.",
          "Trusting AI 'sources' that don't exist.",
          "Pasting confidential data into public chatbots.",
        ],
        quiz: {
          question: "Why should you verify AI's facts?",
          options: ["AI lies on purpose", "AI sometimes invents plausible-sounding info (hallucination)", "It's required by law", "Facts change often"],
          correctIndex: 1,
          explanation: "AI hallucinates — it generates fluent text that may not be true. Always check anything that matters.",
        },
      }),
      c({
        slug: "basic-electronics-safety",
        title: "Basic Electronics: Do's and Don'ts",
        duration: "6 min",
        hook: "Plug a hair dryer + space heater into one outlet → smell smoke → realize one bad habit just nearly burned the place down.",
        why: "A few rules keep your home, devices, and fingers intact.",
        steps: [
          { title: "Don't daisy-chain power strips", body: "Strip into strip = fire risk. Heaters, microwaves, AC units go straight to a wall outlet." },
          { title: "Unplug by the plug", body: "Yanking the cord breaks internal wires near the head — the most common cause of frayed cables." },
          { title: "Match wattage on adapters", body: "Replacing a charger? Same wattage or higher. Lower wattage = slow charge or overheat." },
          { title: "Surge protect anything expensive", body: "TV, computer, console. Strips with a 'joules' rating + warranty. Replace every 3-5 years (they wear out)." },
          { title: "Water + electricity = death", body: "Bathroom and kitchen outlets need GFCI (the test/reset button). If yours don't, ask a landlord/electrician." },
        ],
        mistakes: [
          "Power strip into power strip (especially with high-draw appliances).",
          "Using off-brand chargers with wrong wattage.",
          "Ignoring a humming or warm outlet — that's a real warning sign.",
        ],
        quiz: {
          question: "Why is daisy-chaining power strips dangerous?",
          options: ["It looks ugly", "Combined load can exceed the outlet's safe draw → fire", "Voids warranty", "Uses more power"],
          correctIndex: 1,
          explanation: "Each outlet has a max amp draw. Stacking strips lets you blow past it without tripping the breaker.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- STYLE
  {
    slug: "style",
    title: "Style & Presentation",
    tagline: "Look intentional, on a budget.",
    emoji: "👔",
    tint: "style",
    courses: [
      c({
        slug: "tie-a-tie",
        title: "Tie a Tie (Four-in-Hand)",
        duration: "4 min",
        featured: true,
        hook: "Wedding in 30 minutes. YouTube has 8,000 tutorials, all of them mirrored. Here's the one knot that always works.",
        why: "One simple knot covers 90% of occasions. Know it cold.",
        steps: [
          { title: "Start with the wide end longer", body: "Wide end on your right, hanging ~12 inches lower than the narrow end on your left." },
          { title: "Cross wide over narrow", body: "Make an X just under your collar." },
          { title: "Wrap wide behind narrow", body: "Bring it around the back to the right side." },
          { title: "Wide across the front again", body: "Now horizontal across the front of the X." },
          { title: "Up through the neck loop", body: "Push wide end up behind the loop at your throat." },
          { title: "Down through the front knot", body: "Tuck it through the front horizontal band you just made. Pull, dimple, slide up." },
        ],
        mistakes: [
          "Tip should hit your belt buckle — too long or too short = redo.",
          "Skipping the dimple — looks unfinished.",
          "Tying so tight you can't undo it.",
        ],
        quiz: {
          question: "Where should the tip of the tie land?",
          options: ["Below the belt", "At your belt buckle", "Mid-chest", "Anywhere"],
          correctIndex: 1,
          explanation: "Belt buckle = correct length. Above = too short, below = too long.",
        },
      }),
      c({
        slug: "budget-wardrobe",
        title: "Build a Cheap, Versatile Wardrobe",
        duration: "8 min",
        hook: "$2,000 of fast fashion looks worse than $400 of basics. Same closet, different rules.",
        why: "Small set, fits well, neutral colors = always look put-together.",
        steps: [
          { title: "Fit > brand > price", body: "A $20 thrifted shirt that fits beats a $200 designer one that doesn't. Tailoring is cheaper than buying again." },
          { title: "The starter 10", body: "2 jeans (one dark, one light), 1 chino, 5 plain tees (white/black/grey/navy), 1 button-down, 1 jacket. Done." },
          { title: "Stick to a 3-color palette", body: "Pick 3 base colors that all match each other. Everything coordinates without thinking." },
          { title: "Buy second-hand for trends", body: "Trends die. Thrift them so the loss is $8 not $80." },
          { title: "Spend on shoes and outerwear", body: "These get worn most and matter most. Quality lasts years." },
        ],
        mistakes: [
          "Owning lots of clothes you never wear.",
          "Ignoring fit — biggest factor in looking sharp.",
          "Buying for the body you want, not the body you have.",
        ],
        quiz: {
          question: "What matters most in how clothes look?",
          options: ["Brand", "Price", "Fit", "Color trend"],
          correctIndex: 2,
          explanation: "Fit beats brand and price every time. Tailoring is cheap.",
        },
      }),
      c({
        slug: "dining-etiquette",
        title: "Dining Etiquette in 6 Moves",
        duration: "5 min",
        hook: "First date. Job interview lunch. Friend's parents. The wrong fork is rarely the problem — but napkin fumbling is.",
        why: "A few basics make you look comfortable in any setting.",
        steps: [
          { title: "Napkin first move", body: "Sit down → napkin in lap. Leaving the table briefly → napkin loosely on chair. Done eating → napkin loosely left of the plate." },
          { title: "Outside-in for utensils", body: "Multiple forks? Use the outermost one first, work in toward the plate." },
          { title: "BMW: Bread, Meal, Water", body: "Your bread plate is on the LEFT. Drinks on the RIGHT. Saves the awkward 'is that mine?' moment." },
          { title: "Pace yourself with the host", body: "Don't start until they do. Don't finish 10 minutes before everyone else." },
          { title: "Done eating: 4 o'clock", body: "Place fork and knife together pointing to '4 o'clock' on the plate. Servers know this means 'finished'." },
          { title: "Tip well, quietly", body: "US: 18-22% on the pre-tax total. Don't make a show of it." },
        ],
        mistakes: [
          "Drinking from the wrong glass at a crowded table.",
          "Starting before the host.",
          "Crossing utensils when you're done — signals 'still eating' to servers.",
        ],
        quiz: {
          question: "Where does your bread plate sit?",
          options: ["Right of you", "Left of you", "Above the plate", "Wherever there's space"],
          correctIndex: 1,
          explanation: "BMW left to right: Bread (left), Meal (middle), Water (right).",
        },
      }),
      c({
        slug: "laundry-without-ruining",
        title: "Do Laundry Without Ruining Anything",
        duration: "6 min",
        hook: "One red sock in a white load → a closet of pink shirts. One hot wash on a wool sweater → a sweater for your hand.",
        why: "Three rules cover 95% of laundry disasters.",
        steps: [
          { title: "Sort: whites / darks / delicates", body: "And read the tag. 'Hand wash' isn't a suggestion." },
          { title: "Cold for color, hot for whites only", body: "Cold preserves color and most stains come out cold. Hot only for heavily soiled whites." },
          { title: "Less detergent than you think", body: "Modern machines + concentrated soap: half the bottle's recommended amount. More = residue + smell." },
          { title: "Air dry knits, dry-flat sweaters", body: "Heat shrinks wool. Hangers stretch heavy knits. Lay flat on a towel." },
          { title: "Empty the lint trap every load", body: "Both convenience AND fire safety. Clogged dryers cause 15,000 fires a year in the US." },
        ],
        mistakes: [
          "Hot water on jeans (fades and shrinks).",
          "Overstuffing — clothes don't actually get clean.",
          "Skipping the lint trap." ,
        ],
        quiz: {
          question: "What temperature for most loads?",
          options: ["Hot", "Warm", "Cold", "Doesn't matter"],
          correctIndex: 2,
          explanation: "Cold cleans most things, preserves color, and uses 90% less energy.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- CAREER
  {
    slug: "career",
    title: "Work & Career",
    tagline: "Get the job, then thrive in it.",
    emoji: "💼",
    tint: "career",
    courses: [
      c({
        slug: "job-interview-prep",
        title: "Prepare for a Job Interview",
        duration: "10 min",
        featured: true,
        hook: "Two candidates. Identical resumes. One gets the offer. The difference: 90 minutes of prep.",
        why: "Interviews aren't a test of intelligence — they're a test of preparation.",
        steps: [
          { title: "Research the company hard", body: "Read their About, recent news, latest product launch, the team page. You'll have 3 specific things to mention." },
          { title: "Prepare your story (STAR)", body: "Situation → Task → Action → Result. Have 5-7 stories ready to drop into 'tell me about a time…' questions." },
          { title: "Prepare your questions", body: "Ask 3-5 thoughtful questions about the role, team, success metrics. Never ask about salary first." },
          { title: "Practice out loud", body: "Mirror, friend, or record yourself. The first time you say it shouldn't be in the actual interview." },
          { title: "Logistics 24h ahead", body: "Outfit ready, route timed (or video link tested), copies of resume printed. Sleep." },
        ],
        mistakes: [
          "Saying 'I don't have any questions'.",
          "Talking salary in the first interview.",
          "Trash-talking past employers.",
        ],
        quiz: {
          question: "What does STAR stand for?",
          options: ["Sit, Talk, Answer, Repeat", "Situation, Task, Action, Result", "Story, Topic, Argument, Reply", "Smile, Thank, Ask, Rest"],
          correctIndex: 1,
          explanation: "STAR is the standard framework for behavioral interview answers.",
        },
      }),
      c({
        slug: "professional-email",
        title: "Write a Professional Email",
        duration: "5 min",
        hook: "Your reply got ignored. Theirs got the meeting. Same request — different 8 sentences.",
        why: "Clear, short emails get answered. Long ones get archived.",
        steps: [
          { title: "Subject line = the ask", body: "'Quick question about Tuesday's invoice' beats 'Hi'. The recipient should know the topic before opening." },
          { title: "First line = context", body: "'Following up on our call yesterday about X.' Don't make them dig." },
          { title: "Middle = the ask, bullet form", body: "If you have 3 questions, number them. Walls of text get skimmed and missed." },
          { title: "End with a clear next step", body: "'Could you reply by Friday EOD?' Vague asks get vague responses (or none)." },
          { title: "Re-read before sending", body: "Tone, typos, attachment. The 30-second pass saves the embarrassed follow-up." },
        ],
        mistakes: [
          "'Just checking in' subject lines.",
          "Walls of text without bullets.",
          "Sending then realizing the attachment is missing." ,
        ],
        quiz: {
          question: "What should the subject line do?",
          options: ["Be polite", "Tell the recipient the topic at a glance", "Include your name", "Stay vague to encourage opening"],
          correctIndex: 1,
          explanation: "A clear, specific subject = more opens AND faster replies.",
        },
      }),
    ],
  },

  // -------------------------------------------------------------- LIFE
  {
    slug: "life",
    title: "Life Systems",
    tagline: "Decide well, live calm.",
    emoji: "🧭",
    tint: "life",
    courses: [
      c({
        slug: "smart-storage",
        title: "Store Stuff Without Drowning in It",
        duration: "6 min",
        hook: "An apartment with the same square footage feels twice as big or half as big. The difference is storage strategy, not size.",
        why: "Vertical thinking + ruthless purging beats any organizing hack.",
        steps: [
          { title: "Touch each item once", body: "Keep / donate / trash. Don't 'maybe' pile — that's just deferring the decision." },
          { title: "Vertical first", body: "Walls hold a lot. Tall narrow shelves > sprawling low ones. Over-door organizers are free real estate." },
          { title: "Clear bins + labels", body: "If you can't see it, you forget you own it. Labels prevent re-buying duplicates." },
          { title: "Heavy low, light high", body: "Heavy = bottom shelf. Things you grab daily = waist height. Seasonal = top shelf." },
          { title: "One in, one out", body: "New item enters → similar item leaves. Stops the drift back to chaos." },
        ],
        mistakes: [
          "Buying organizers BEFORE purging — you organize trash.",
          "Deep stacks (back item never gets used).",
          "No labels — guessing wastes minutes daily.",
        ],
        quiz: {
          question: "What should you do BEFORE buying storage bins?",
          options: ["Measure shelves", "Purge what you don't need", "Pick a color theme", "Watch organization videos"],
          correctIndex: 1,
          explanation: "Bins for stuff you don't need = expensive trash storage.",
        },
      }),
    ],
  },
];

// ============================================================================
// helpers
// ============================================================================

export const getCategory = (slug: string) =>
  categories.find((cat) => cat.slug === slug);

export const getCourse = (categorySlug: string, courseSlug: string) => {
  const cat = getCategory(categorySlug);
  return cat?.courses.find((co) => co.slug === courseSlug);
};

export const allCourses = categories.flatMap((cat) =>
  cat.courses.map((course) => ({
    ...course,
    categorySlug: cat.slug,
    categoryTitle: cat.title,
    tint: cat.tint,
  })),
);

export const featuredCourses = allCourses.filter((co) => co.featured);

export const moneyTiers = ["starter", "intermediate", "advanced"] as const;
export type MoneyTier = (typeof moneyTiers)[number];

export const tierMeta: Record<MoneyTier, { label: string; emoji: string; tagline: string }> = {
  starter: { label: "Starter", emoji: "🌱", tagline: "First paycheck, first card, first budget." },
  intermediate: { label: "Intermediate", emoji: "🌿", tagline: "Taxes, debt, emergency fund, retirement." },
  advanced: { label: "Advanced", emoji: "🌳", tagline: "Investing, optimization, negotiation." },
};
