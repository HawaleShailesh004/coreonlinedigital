/**
 * Stand-in photography for the sample vertical sites.
 *
 * Every image here was picked by eye, not by keyword - the first pass at this
 * file paired IDs to roles from their names and produced a physiotherapist
 * captioned as a GP and a sterile blue hospital lobby on a brief that
 * explicitly bans that look. Build a contact sheet before adding to this file:
 *
 *   python scripts/unsplash-sheet.py <name> <id> ...   # review candidates
 *   node scripts/check-unsplash.mjs <id> ...           # confirm they resolve
 *
 * Alt text describes what is actually in the frame, so it stays honest even
 * though the businesses are invented. On a real engagement these are replaced
 * with the client's own photography, and nothing outside this file changes.
 */

const CDN = "https://images.unsplash.com/";

type Crop = "wide" | "card" | "portrait" | "square" | "tall";

/** Source crops. next/image resizes down from these per breakpoint. */
const CROPS: Record<Crop, { w: number; h: number }> = {
  wide: { w: 2000, h: 1125 },
  card: { w: 1200, h: 900 },
  portrait: { w: 800, h: 1000 },
  square: { w: 1000, h: 1000 },
  tall: { w: 900, h: 1200 },
};

export type SampleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function img(id: string, alt: string, crop: Crop = "card"): SampleImage {
  const { w, h } = CROPS[crop];
  return {
    src: `${CDN}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`,
    alt,
    width: w,
    height: h,
  };
}

/* --- 1. Clinic ------------------------------------------------------------ */
export const clinicMedia = {
  waiting: img(
    "photo-1524758631624-e2822e304c36",
    "Waiting area with timber panelling, plants and full-height windows",
    "wide",
  ),
  doctor: img(
    "photo-1612349317150-e413f6a5b16d",
    "Doctor in a white coat with a stethoscope",
    "portrait",
  ),
  consult: img(
    "photo-1631217868264-e5b90bb7e133",
    "Doctor talking through notes with a patient",
    "card",
  ),
  diagnostics: img(
    "photo-1588776814546-1ffcf47267a5",
    "Clinician reviewing imaging on a light box",
    "card",
  ),
  building: img(
    "photo-1586773860418-d37222d8fce3",
    "Exterior of the medical centre the clinic sits in",
    "card",
  ),
};

/* --- 2. Jeweller --------------------------------------------------------- */
export const jewellerMedia = {
  hero: img(
    "photo-1599643478518-a784e5dc4c8f",
    "Fine gold chain lit against a warm dark background",
    "wide",
  ),
  bridal: img(
    "photo-1596944924616-7b38e7cfac36",
    "Gold bracelets worn on a pair of wrists",
    "tall",
  ),
  gold: img(
    "photo-1633810542706-90e5ff7557be",
    "Gold link necklace worn against black",
    "tall",
  ),
  diamond: img(
    "photo-1573408301185-9146fe634ad0",
    "Diamond bracelet on a dark reflective surface",
    "tall",
  ),
  custom: img(
    "photo-1617038260897-41a1f14a8ca0",
    "Two gold rings resting on pale stone",
    "tall",
  ),
  solitaire: img(
    "photo-1605100804763-247f67b3557e",
    "Solitaire diamond ring on a black block",
    "card",
  ),
  craft: img(
    "photo-1506630448388-4e683c67ddb0",
    "Gold pendants on fine chains, close up",
    "card",
  ),
  heritage: img(
    "photo-1515562141207-7a88fb7ce338",
    "Pearl necklace presented in a jewellery box",
    "card",
  ),
};

/* --- 3. CA / Professional ------------------------------------------------ */
export const caMedia = {
  partner: img(
    "photo-1560250097-0b93528c311a",
    "Partner of the firm in a dark suit",
    "portrait",
  ),
  office: img(
    "photo-1497366754035-f200968a6e72",
    "Glass-partitioned office with a waiting bench",
    "card",
  ),
};

/* --- 4. Real Estate ------------------------------------------------------ */
export const realtyMedia = {
  hero: img(
    "photo-1600585154340-be6161a56a0c",
    "Contemporary house lit from within at dusk, seen across a lawn",
    "wide",
  ),
  agent: img(
    "photo-1500648767791-00dcc994a43e",
    "The broker who handles enquiries",
    "portrait",
  ),
  listings: [
    img("photo-1568605114967-8130f3a36994", "Timber-clad house lit at dusk"),
    img("photo-1613490493576-7fde63acd811", "White modernist villa with a pool"),
    img("photo-1580587771525-78b9dba3b914", "Terracotta-toned villa with a pool"),
    img("photo-1600607687939-ce8a6c25118c", "Living room with a timber feature wall"),
    img("photo-1560448204-e02f11c3d0e2", "Bright living room with bay windows"),
    img("photo-1522708323590-d24dbb6b0267", "Open-plan dining and living space"),
  ],
};

/* --- 5. School ----------------------------------------------------------- */
export const schoolMedia = {
  hero: img(
    "photo-1588072432836-e10032774350",
    "Children working at tables in a busy primary classroom",
    "wide",
  ),
  primary: img(
    "photo-1509062522246-3755977927d7",
    "Primary class gathered around their teacher",
    "card",
  ),
  senior: img(
    "photo-1571260899304-425eee4c7efc",
    "Senior students working at desks with a teacher present",
    "card",
  ),
  library: img(
    "photo-1567168544813-cc03465b4fa8",
    "Student reading between library shelves",
    "card",
  ),
  classroom: img(
    "photo-1580582932707-520aed937b7b",
    "Empty classroom with timber desks and morning light",
    "card",
  ),
  auditorium: img(
    "photo-1519452575417-564c1401ecc0",
    "The school auditorium",
    "card",
  ),
  smartboard: img(
    "photo-1587691592099-24045742c181",
    "Teacher working through a problem on the board",
    "card",
  ),
  faculty: img(
    "photo-1580894732444-8ecded7900cd",
    "Teacher at the whiteboard mid-lesson",
    "portrait",
  ),
  results: img(
    "photo-1541339907198-e08756dedf3f",
    "Graduating students throwing their caps",
    "wide",
  ),
};

/* --- 6. Travel ----------------------------------------------------------- */
export const travelMedia = {
  hero: img(
    "photo-1506905925346-21bda4d32df4",
    "Mountain peaks above a sea of cloud at sunrise",
    "wide",
  ),
  packages: [
    img("photo-1464822759023-fed622ff2c3b", "Forested valley under a wide sky"),
    img("photo-1544735716-392fe2489ffa", "Monastery on a ridge below snow peaks"),
    img("photo-1519681393784-d120267933ba", "Milky Way over a mountain ridgeline"),
    img("photo-1571536802807-30451e3955d8", "Boats moored below riverside ghats"),
    img("photo-1524492412937-b28074a5d7da", "The Taj Mahal reflected in its water channel"),
    img("photo-1590050752117-238cb0fb12b1", "Palm-lined backwater at golden hour"),
  ],
  planner: img(
    "photo-1476514525535-07fb3b4ae5f1",
    "View over the prow of a boat on a still lake",
    "wide",
  ),
};

/* --- 7. Gym -------------------------------------------------------------- */
export const gymMedia = {
  hero: img(
    "photo-1593079831268-3381b0db4a77",
    "Low-lit training floor lined with equipment",
    "wide",
  ),
  programs: [
    img("photo-1541534741688-6078c6bfb5c5", "Lifter setting up under a loaded barbell"),
    img("photo-1591117207239-788bf8de6c3b", "Boxing glove landing, shot in high contrast"),
    img("photo-1581009146145-b5ef050c2e1e", "Athlete mid-curl with a barbell"),
    img("photo-1544367567-0f2fcb009e0b", "Yoga pose silhouetted against a sunset"),
  ],
  trainers: [
    img("photo-1549476464-37392f717541", "Strength coach on the gym floor", "square"),
    img("photo-1594381898411-846e7d193883", "Group class lead, shot against black", "square"),
    img("photo-1548690312-e3b507d8c110", "Trainer resting between battle-rope sets", "square"),
    img("photo-1550345332-09e3ac987658", "Athlete working on a resistance machine", "square"),
  ],
  action: img(
    "photo-1517836357463-d25dfeac3438",
    "Deadlift set-up, shot close to the floor",
    "wide",
  ),
};

/* --- 8. Interior Designer ------------------------------------------------ */
export const interiorMedia = {
  hero: img(
    "photo-1615529182904-14819c35db37",
    "Warm living room with rattan pendants, arched alcove and plants",
    "wide",
  ),
  designer: img(
    "photo-1573497019940-1c28c88b4f3e",
    "The studio's founder",
    "portrait",
  ),
  projects: [
    img("photo-1616594039964-ae9021a400a0", "Bedroom in charcoal with a brass pendant", "wide"),
    img("photo-1631679706909-1844bbd07221", "Cream living room with a bouclé sofa and round mirrors", "wide"),
    img("photo-1586023492125-27b2c045efd7", "Deep green joinery against a yellow armchair", "wide"),
    img("photo-1618221195710-dd6b41faaea6", "Open living room in warm timber and rust", "wide"),
    img("photo-1497366811353-6870744d04b2", "Industrial office fit-out with black steel glazing", "wide"),
    img("photo-1616486338812-3dadae4b4ace", "Neutral living room with a gallery wall", "wide"),
  ],
  detail: img(
    "photo-1567016432779-094069958ea5",
    "Detail of a rust-coloured sofa and cushion",
    "card",
  ),
};

/* --- 9. Trader / D2C ----------------------------------------------------- */
export const traderMedia = {
  hero: img(
    "photo-1556228453-efd6c1ff04f6",
    "Living room styled with Nilaya textiles and a wall hanging",
    "wide",
  ),
  founder: img(
    "photo-1544005313-94ddf0286df2",
    "The founder, photographed at home",
    "portrait",
  ),
  lifestyle: img(
    "photo-1541123437800-1bb1317badc2",
    "Kitchen counter styled with ceramics",
    "wide",
  ),
  products: [
    img("photo-1610701596007-11502861dcfa", "Set of four stoneware cups with cork bases", "square"),
    img("photo-1616627561950-9f746e330187", "Striped and rust cushion covers on a bed", "square"),
    img("photo-1565193566173-7a0ee3dbe261", "Three concrete vases holding dried stems", "square"),
    img("photo-1608571423902-eed4a5ad8108", "Amber glass dropper bottle on a wooden stand", "square"),
    img("photo-1602143407151-7111542de6e8", "Matte green insulated water bottle", "square"),
    img("photo-1584100936595-c0654b55a2e2", "Cotton pillow against a yellow backdrop", "square"),
    img("photo-1600166898405-da9535204843", "Rolled flatweave rug with a gold border", "square"),
    img("photo-1533090161767-e6ffed986c88", "Wall clock and table lamp on a pale wall", "square"),
  ],
};

/* --- 10. Coaching Classes ------------------------------------------------ */
export const coachingMedia = {
  hero: img(
    "photo-1427504494785-3a9ca7044f45",
    "Students facing a lecture board in a packed classroom",
    "wide",
  ),
  classroom: img(
    "photo-1524178232363-1fb2b075b655",
    "Lecture hall with students taking notes",
    "card",
  ),
  study: img(
    "photo-1434030216411-0b793f4b4173",
    "Student writing equations in a notebook",
    "card",
  ),
  group: img(
    "photo-1522202176988-66273c2fd55f",
    "Students collaborating over laptops and notes",
    "card",
  ),
  books: img(
    "photo-1497633762265-9d179a990aa6",
    "Stack of open textbooks on a desk",
    "card",
  ),
  lecture: img(
    "photo-1606761568499-6d2451b23c66",
    "Instructor teaching at the front of a classroom",
    "wide",
  ),
  faculty: [
    img(
      "photo-1560250097-0b93528c311a",
      "Physics faculty member in a dark jacket",
      "square",
    ),
    img(
      "photo-1573496359142-b8d87734a5a2",
      "Chemistry faculty member against a neutral backdrop",
      "square",
    ),
    img(
      "photo-1507003211169-0a1dd7228f2d",
      "Mathematics faculty member, portrait",
      "square",
    ),
    img(
      "photo-1573497019940-1c28c88b4f3e",
      "Biology faculty member in a light blouse",
      "square",
    ),
    img(
      "photo-1472099645785-5658abf4ff4e",
      "Board physics coach, portrait",
      "square",
    ),
    img(
      "photo-1438761681033-6461ffad8d80",
      "Mentorship lead, portrait",
      "square",
    ),
  ],
};
