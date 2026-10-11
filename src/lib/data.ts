export type Cat = "earth" | "animal" | "human" | "extinction";
export type TEvent = { id: string; ya: number; title: string; date: string; cat: Cat; simple: string; detail: string; chapter?: string };

export const EVENTS: TEvent[] = [
  { id: "earth", ya: 4.54e9, date: "~4.54 billion years ago", title: "Earth forms", cat: "earth", chapter: "birth", simple: "Dust and rock around the young Sun crashed together and made our planet.", detail: "Earth accreted from the solar nebula. Its age comes from radiometric dating of meteorites and the oldest Earth minerals (zircons ~4.4 Ga)." },
  { id: "moon", ya: 4.5e9, date: "~4.5 billion years ago", title: "The Moon forms", cat: "earth", simple: "A giant crash threw rock into space that clumped into the Moon.", detail: "The leading giant-impact hypothesis proposes a Mars-sized body (Theia) struck the proto-Earth." },
  { id: "life", ya: 3.5e9, date: "> 3.5 billion years ago", title: "Earliest evidence of life", cat: "animal", chapter: "life", simple: "Tiny single cells, too small to see, appear in the oceans.", detail: "Stromatolites and chemical signatures suggest microbial life by at least 3.5 Ga; some contested evidence is older." },
  { id: "oxygen", ya: 2.4e9, date: "~2.4 billion years ago", title: "Great Oxygenation Event", cat: "earth", chapter: "life", simple: "Microbes that use sunlight filled the air with oxygen for the first time.", detail: "Cyanobacterial photosynthesis raised atmospheric O₂, oxidising iron and transforming chemistry of oceans and air." },
  { id: "eukaryote", ya: 1.8e9, date: "~2–1.6 billion years ago", title: "Complex cells", cat: "animal", simple: "Bigger cells with a nucleus appear — the ancestors of plants, fungi and animals.", detail: "Eukaryotes likely arose via endosymbiosis; mitochondria descend from once free-living bacteria." },
  { id: "cambrian", ya: 5.39e8, date: "~539 million years ago", title: "Cambrian diversification", cat: "animal", chapter: "cambrian", simple: "Animals with shells, eyes and legs suddenly show up in many shapes.", detail: "Most major animal phyla appear in the fossil record over ~20–25 million years (Burgess Shale, Chengjiang)." },
  { id: "plants", ya: 4.7e8, date: "~470 million years ago", title: "Plants reach land", cat: "earth", chapter: "land", simple: "Tiny plants creep out of the water and start turning rock into soil.", detail: "Early land plants related to liverworts colonised land; spores date to the Ordovician." },
  { id: "ordovician", ya: 4.45e8, date: "~445 million years ago", title: "End-Ordovician extinction", cat: "extinction", simple: "A big ice age wipes out many sea creatures.", detail: "Glaciation and sea-level fall drove one of the 'Big Five' mass extinctions." },
  { id: "tetrapods", ya: 3.75e8, date: "~375 million years ago", title: "Vertebrates walk on land", cat: "animal", chapter: "land", simple: "Fish with sturdy fins start to crawl into shallow water and onto land.", detail: "Tiktaalik (~375 Ma) shows a transition between lobe-finned fish and tetrapods." },
  { id: "permian", ya: 2.52e8, date: "~252 million years ago", title: "The Great Dying", cat: "extinction", simple: "The biggest extinction ever: most sea life disappeared.", detail: "End-Permian extinction, linked to Siberian Traps volcanism; ~80–90% of marine species lost." },
  { id: "dinos", ya: 2.3e8, date: "~230 million years ago", title: "First dinosaurs", cat: "animal", chapter: "dinos", simple: "Small, fast dinosaurs appear and later grow into giants.", detail: "Early dinosaurs like Eoraptor and Herrerasaurus are known from Triassic Argentina." },
  { id: "mammals", ya: 2.0e8, date: "~200 million years ago", title: "Early mammals", cat: "animal", chapter: "mammals", simple: "Small furry mammals scurry around at night while dinosaurs rule.", detail: "Mammaliaforms like Morganucodon appear in the Late Triassic–Early Jurassic." },
  { id: "birds", ya: 1.5e8, date: "~150 million years ago", title: "Archaeopteryx", cat: "animal", simple: "A feathered dinosaur that could glide — birds are living dinosaurs!", detail: "Birds evolved from theropod dinosaurs; Archaeopteryx is a famous transitional form." },
  { id: "kpg", ya: 6.6e7, date: "~66 million years ago", title: "End-Cretaceous extinction", cat: "extinction", chapter: "dinos", simple: "An asteroid hits Earth. Non-bird dinosaurs disappear.", detail: "The Chicxulub impact plus Deccan volcanism caused the K–Pg extinction; ~75% of species lost." },
  { id: "primates", ya: 5.5e7, date: "~55 million years ago", title: "Early primates", cat: "animal", chapter: "mammals", simple: "Small tree-climbing primates with grasping hands appear.", detail: "Early euprimates such as Teilhardina spread across northern continents." },
  { id: "hominins", ya: 7e6, date: "~7–6 million years ago", title: "Early hominins", cat: "human", chapter: "humans", simple: "The human family branch splits from the chimpanzee branch.", detail: "Sahelanthropus (~7 Ma) is a candidate early hominin; its status is debated." },
  { id: "lucy", ya: 3.2e6, date: "~3.2 million years ago", title: "'Lucy' (Australopithecus)", cat: "human", chapter: "humans", simple: "Lucy walked upright on two legs but had a small brain.", detail: "A. afarensis skeleton AL 288-1 from Ethiopia, discovered 1974." },
  { id: "tools", ya: 3.3e6, date: "~3.3 million years ago", title: "Oldest stone tools", cat: "human", simple: "Someone starts making sharp stone tools.", detail: "Lomekwi 3 tools (Kenya) predate the earliest known Homo." },
  { id: "erectus", ya: 1.9e6, date: "~1.9 million years ago", title: "Homo erectus", cat: "human", chapter: "humans", simple: "Tall, long-legged humans travel out of Africa into Asia.", detail: "H. erectus had body proportions like ours and spread across Africa and Eurasia." },
  { id: "sapiens", ya: 3e5, date: "~300,000 years ago", title: "Homo sapiens", cat: "human", chapter: "humans", simple: "Our own species appears in Africa.", detail: "Jebel Irhoud (Morocco) fossils ~300 ka are the oldest attributed to H. sapiens." },
  { id: "neanderthal", ya: 4e4, date: "~40,000 years ago", title: "Last Neanderthals", cat: "human", simple: "Neanderthals, our close cousins, disappear — but some of their DNA lives in many of us.", detail: "Neanderthals vanished ~40 ka; non-African populations carry ~1–2% Neanderthal DNA." },
  { id: "farming", ya: 1.2e4, date: "~12,000 years ago", title: "Agriculture begins", cat: "human", simple: "People start growing crops and living in villages.", detail: "Domestication began independently in several regions, starting in the Fertile Crescent." },
  { id: "writing", ya: 5200, date: "~5,200 years ago", title: "Writing invented", cat: "human", simple: "People begin writing things down — history begins.", detail: "Cuneiform in Mesopotamia ~3200 BCE." },
  { id: "modern", ya: 70, date: "Last century", title: "The modern era", cat: "human", chapter: "today", simple: "Humans explore space and study DNA — and change the planet fast.", detail: "Industrialisation and rapid population growth make humans a major force on Earth systems." },
];

export const AGE = 4.54e9;
/** Log-scale position (0 = Earth's formation, 1 = today) */
export function logPos(ya: number) {
  const max = Math.log10(AGE), min = Math.log10(10);
  return 1 - (Math.log10(Math.max(ya, 10)) - min) / (max - min);
}
export function fmtYa(ya: number) {
  if (ya >= 1e9) return `${(ya / 1e9).toFixed(2)} billion years ago`;
  if (ya >= 1e6) return `${(ya / 1e6).toFixed(ya >= 1e8 ? 0 : 1)} million years ago`;
  if (ya >= 1e3) return `${Math.round(ya / 1e3).toLocaleString()},000 years ago`;
  return `${Math.round(ya)} years ago`;
}

export type Hominin = { id: string; name: string; start: number; end: number; brain: string; brainCc: number; region: string; posture: string; tools: string; found: string; simple: string; branch: number };
// dates in millions of years ago (approximate)
export const HOMININS: Hominin[] = [
  { id: "sahel", name: "Sahelanthropus tchadensis", start: 7, end: 6, brain: "~360 cc", brainCc: 360, region: "Africa", posture: "Possibly upright", tools: "None known", found: "Chad, 2001", simple: "One of the oldest possible members of the human family.", branch: 0 },
  { id: "afar", name: "Australopithecus afarensis", start: 3.9, end: 2.9, brain: "~450 cc", brainCc: 450, region: "Africa", posture: "Upright, still climbed", tools: "Possibly simple", found: "Ethiopia, 1974 ('Lucy')", simple: "Walked on two legs; famous fossil 'Lucy'.", branch: 1 },
  { id: "paranthropus", name: "Paranthropus boisei", start: 2.3, end: 1.2, brain: "~500 cc", brainCc: 500, region: "Africa", posture: "Upright", tools: "Uncertain", found: "Tanzania, 1959", simple: "A side branch with huge chewing teeth — not our ancestor.", branch: 3 },
  { id: "habilis", name: "Homo habilis", start: 2.4, end: 1.5, brain: "~600 cc", brainCc: 600, region: "Africa", posture: "Upright", tools: "Oldowan stone tools", found: "Tanzania, 1960", simple: "'Handy man' — linked with early stone tools.", branch: 2 },
  { id: "erectus", name: "Homo erectus", start: 1.9, end: 0.11, brain: "~900 cc", brainCc: 900, region: "Africa, Asia", posture: "Fully upright, long legs", tools: "Hand axes, fire use", found: "Java, 1891", simple: "First to spread far beyond Africa.", branch: 2 },
  { id: "floresiensis", name: "Homo floresiensis", start: 0.1, end: 0.05, brain: "~420 cc", brainCc: 420, region: "Asia", posture: "Upright", tools: "Stone tools", found: "Indonesia, 2003", simple: "Tiny 'hobbit' humans on an island.", branch: 4 },
  { id: "neanderthal", name: "Homo neanderthalensis", start: 0.4, end: 0.04, brain: "~1,450 cc", brainCc: 1450, region: "Europe, Asia", posture: "Upright, stocky", tools: "Mousterian tools, art, fire", found: "Germany, 1856", simple: "Our close cousins; lived at the same time as us.", branch: 5 },
  { id: "sapiens", name: "Homo sapiens", start: 0.3, end: 0, brain: "~1,350 cc", brainCc: 1350, region: "Worldwide", posture: "Upright", tools: "Complex tools, art, writing", found: "Morocco (oldest), 2017", simple: "Us! The only human species alive today.", branch: 6 },
];

export const GLOSSARY: { term: string; def: string }[] = [
  { term: "Evolution", def: "Change in the inherited traits of populations over many generations." },
  { term: "Natural selection", def: "Individuals with helpful inherited traits tend to survive and have more offspring, so those traits become more common." },
  { term: "Fossil", def: "Preserved remains or traces of ancient life, usually in rock." },
  { term: "Hominin", def: "Humans and our extinct relatives, after the split from chimpanzees' lineage." },
  { term: "Mass extinction", def: "A time when a large share of Earth's species die out in a short geological time." },
  { term: "Photosynthesis", def: "Using sunlight to make food from water and carbon dioxide, releasing oxygen." },
  { term: "Radiometric dating", def: "Measuring the decay of radioactive atoms in rocks to find their age." },
  { term: "Cyanobacteria", def: "Microbes that photosynthesise; they filled Earth's air with oxygen." },
  { term: "Eon / Era / Period", def: "Units of geological time, from biggest (eon) to smaller (period)." },
  { term: "Ancient DNA", def: "Genetic material recovered from old remains, revealing relationships between populations." },
  { term: "Gene / DNA", def: "The instructions inside cells that are passed from parents to offspring." },
  { term: "Food web", def: "The network of who eats whom in an ecosystem." },
];

export type Q = { q: string; options: string[]; answer: number; why: string; chapter: string };
export const QUIZ: Q[] = [
  { q: "About how old is Earth?", options: ["6,000 years", "4.54 million years", "4.54 billion years", "13.8 billion years"], answer: 2, why: "Radiometric dating of meteorites and ancient minerals shows Earth is about 4.54 billion years old. (13.8 billion is the age of the universe.)", chapter: "birth" },
  { q: "What did early photosynthesising microbes add to the atmosphere?", options: ["Oxygen", "Helium", "Methane only", "Nitrogen only"], answer: 0, why: "Cyanobacteria released oxygen, causing the Great Oxygenation Event ~2.4 billion years ago.", chapter: "life" },
  { q: "The Cambrian diversification began roughly when?", options: ["66 million years ago", "539 million years ago", "3.5 billion years ago", "12,000 years ago"], answer: 1, why: "Around 539 million years ago many animal groups appear in the fossil record.", chapter: "cambrian" },
  { q: "Which of these is a dinosaur?", options: ["Pterosaur", "Plesiosaur", "Triceratops", "Dimetrodon"], answer: 2, why: "Triceratops is a dinosaur. Pterosaurs and plesiosaurs were other reptiles, and Dimetrodon is closer to mammals!", chapter: "dinos" },
  { q: "What most likely triggered the extinction 66 million years ago?", options: ["An ice age", "An asteroid impact", "Humans hunting", "The Moon forming"], answer: 1, why: "The Chicxulub asteroid impact (with massive volcanism) caused the end-Cretaceous extinction.", chapter: "dinos" },
  { q: "Are birds related to dinosaurs?", options: ["No, not at all", "Yes, birds are living dinosaurs", "Only penguins", "Only through bats"], answer: 1, why: "Birds evolved from small feathered theropod dinosaurs.", chapter: "dinos" },
  { q: "Which best describes human evolution?", options: ["A straight ladder", "A branching bush with overlapping species", "Chimps turning into humans", "It happened in one step"], answer: 1, why: "Human evolution is a branching tree; several human species lived at the same time. We share a common ancestor with chimps — we didn't descend from them.", chapter: "humans" },
  { q: "In natural selection, why do traits become more common?", options: ["Animals want them", "Individuals with them leave more offspring", "They are learned", "Randomly every year"], answer: 1, why: "Inherited traits that help survival and reproduction get passed on more often. Animals don't evolve traits because they 'need' them.", chapter: "lab" },
  { q: "Where did Homo sapiens first appear?", options: ["Europe", "Australia", "Africa", "The Americas"], answer: 2, why: "The oldest Homo sapiens fossils (~300,000 years) come from Africa.", chapter: "humans" },
  { q: "How do scientists learn about extinct life?", options: ["Fossils and ancient DNA", "Guessing", "Only legends", "Time travel"], answer: 0, why: "Fossils, rock layers, radiometric dating and ancient DNA are key evidence.", chapter: "humans" },
];

export const CHAPTERS = [
  { id: "birth", n: 1, title: "The Birth of Earth", date: "~4.54 billion years ago" },
  { id: "life", n: 2, title: "The First Life", date: "> 3.5 billion years ago" },
  { id: "cambrian", n: 3, title: "Life Explodes in Diversity", date: "~539 million years ago" },
  { id: "land", n: 4, title: "Life Moves Onto Land", date: "~470–300 million years ago" },
  { id: "dinos", n: 5, title: "The Age of Dinosaurs", date: "~230–66 million years ago" },
  { id: "mammals", n: 6, title: "The Rise of Mammals", date: "66 million years ago →" },
  { id: "humans", n: 7, title: "Human Evolution", date: "~7 million years ago →" },
  { id: "today", n: 8, title: "Life Today and Tomorrow", date: "Now" },
];
