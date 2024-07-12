import { ObjectType } from "@/types/filtering";

let objectInfo = {
  [ObjectType.Eclipse]: {
    "2024 Total Solar Eclipse": { name: "2024 Total Solar Eclipse" },
    "2024 Penumbral Lunar Eclipse": { name: "2024 Penumbral Lunar Eclipse" },
  },
  [ObjectType.Lunar]: {
    Moon: { name: "Moon" },
  },
  [ObjectType.Solar]: {
    Sun: { name: "Sun" },
  },
  [ObjectType.Planetary]: {
    Jupiter: { name: "Jupiter" },
  },
  [ObjectType.StarCluster]: {
    M14: { name: "Globular Cluster" },
    M34: { name: "Spiral Cluster" },
    M35: { name: "Shoe-Buckle Cluster" },
    M37: { name: "Salt and Pepper Cluster" },
    M45: { name: "Pleiades Cluster" },
  },
  [ObjectType.Galaxy]: {
    M31: { name: "Andromeda Galaxy" },
    M33: { name: "Triangulum Galaxy" },
    "M66 Group": { name: "Leo Triplet" },
    M77: { name: "Squid Galaxy" },
    M94: { name: "Croc's Eye Galaxy" },
    M100: { name: "Grand Spiral Galaxy" },
    M104: { name: "Sombrero Galaxy" },
    NGC891: { name: "Silver Sliver Galaxy" },
    NGC2903: { name: "Spiral Galaxy" },
  },
  [ObjectType.Nebula]: {
    M1: { name: "Crab Nebula" },
    M16: { name: "Eagle Nebula" },
    M17: { name: "Omega Nebula" },
    M27: { name: "Dumbbell Nebula" },
    M42: { name: "Orion Nebula" },
    IC405: { name: "Flaming Star Nebula" },
    IC410: { name: "Tadpole Nebula" },
    IC434: { name: "Horsehead Nebula" },
    IC443: { name: "Jellyfish Nebula" },
    NGC1499: { name: "California Nebula" },
    NGC1579: { name: "Northern Trifid Nebula" },
    NGC2175: { name: "Monkey Head Nebula" },
    NGC6960: { name: "Western Veil Nebula" },
    "SH2-275": { name: "Rosette Nebula" },
  },
};

export default objectInfo;
