const wfrp3 = {}

CONFIG.ChatMessage.template = "systems/wfrp3/templates/chat/chat-message.html"

CONFIG.statusEffects = ["systems/wfrp3/icons/conditions/bleeding1.png",
    "systems/wfrp3/icons/conditions/bleeding2.png",
    "systems/wfrp3/icons/conditions/bleeding3.png",
    "systems/wfrp3/icons/conditions/bleeding4.png",
    "systems/wfrp3/icons/conditions/poisoned1.png",
    "systems/wfrp3/icons/conditions/poisoned2.png",
    "systems/wfrp3/icons/conditions/poisoned3.png",
    "systems/wfrp3/icons/conditions/poisoned4.png",
    "systems/wfrp3/icons/conditions/ablaze1.png",
    "systems/wfrp3/icons/conditions/ablaze2.png",
    "systems/wfrp3/icons/conditions/ablaze3.png",
    "systems/wfrp3/icons/conditions/ablaze4.png",
    "systems/wfrp3/icons/conditions/deafened1.png",
    "systems/wfrp3/icons/conditions/deafened2.png",
    "systems/wfrp3/icons/conditions/deafened3.png",
    "systems/wfrp3/icons/conditions/deafened4.png",
    "systems/wfrp3/icons/conditions/stunned1.png",
    "systems/wfrp3/icons/conditions/stunned2.png",
    "systems/wfrp3/icons/conditions/stunned3.png",
    "systems/wfrp3/icons/conditions/stunned4.png",
    "systems/wfrp3/icons/conditions/entangled1.png",
    "systems/wfrp3/icons/conditions/entangled2.png",
    "systems/wfrp3/icons/conditions/entangled3.png",
    "systems/wfrp3/icons/conditions/entangled4.png",
    "systems/wfrp3/icons/conditions/fatigued1.png",
    "systems/wfrp3/icons/conditions/fatigued2.png",
    "systems/wfrp3/icons/conditions/fatigued3.png",
    "systems/wfrp3/icons/conditions/fatigued4.png",
    "systems/wfrp3/icons/conditions/blinded1.png",
    "systems/wfrp3/icons/conditions/blinded2.png",
    "systems/wfrp3/icons/conditions/blinded3.png",
    "systems/wfrp3/icons/conditions/blinded4.png",
    "systems/wfrp3/icons/conditions/broken1.png",
    "systems/wfrp3/icons/conditions/broken2.png",
    "systems/wfrp3/icons/conditions/broken3.png",
    "systems/wfrp3/icons/conditions/broken4.png",
    "systems/wfrp3/icons/conditions/prone.png",
    "systems/wfrp3/icons/conditions/fear.png",
    "systems/wfrp3/icons/conditions/surprised.png",
    "systems/wfrp3/icons/conditions/unconscious.png",
    "systems/wfrp3/icons/conditions/grappling.png",
    "systems/wfrp3/icons/defeated.png",
]

CONFIG.controlIcons.defeated = "systems/wfrp3/icons/defeated.png";

CONFIG.JournalEntry.noteIcons = {
    "Marker": "systems/wfrp3/icons/buildings/point_of_interest.png",
    "Apothecary": "systems/wfrp3/icons/buildings/apothecary.png",
    "Beastmen Herd 1": "systems/wfrp3/icons/buildings/beastmen_camp1.png",
    "Beastmen Herd 2": "systems/wfrp3/icons/buildings/beastmen_camp2.png",
    "Blacksmith": "systems/wfrp3/icons/buildings/blacksmith.png",
    "Bretonnian City 1": "systems/wfrp3/icons/buildings/bret_city1.png",
    "Bretonnian City 2": "systems/wfrp3/icons/buildings/bret_city2.png",
    "Bretonnian City 3": "systems/wfrp3/icons/buildings/bret_city3.png",
    "Bretonnian Worship": "systems/wfrp3/icons/buildings/bretonnia_worship.png",
    "Caste Hill 1": "systems/wfrp3/icons/buildings/castle_hill1.png",
    "Caste Hill 2": "systems/wfrp3/icons/buildings/castle_hill2.png",
    "Caste Hill 3": "systems/wfrp3/icons/buildings/castle_hill3.png",
    "Castle Wall": "systems/wfrp3/icons/buildings/castle_wall.png",
    "Cave 1": "systems/wfrp3/icons/buildings/cave1.png",
    "Cave 2": "systems/wfrp3/icons/buildings/cave2.png",
    "Cave 3": "systems/wfrp3/icons/buildings/cave3.png",
    "Cemetery": "systems/wfrp3/icons/buildings/cemetery.png",
    "Chaos Portal": "systems/wfrp3/icons/buildings/chaos_portal.png",
    "Chaos Worship": "systems/wfrp3/icons/buildings/chaos_worship.png",
    "Court": "systems/wfrp3/icons/buildings/court.png",
    "Dwarf Beer": "systems/wfrp3/icons/buildings/dwarf_beer.png",
    "Dwarf Hold 1": "systems/wfrp3/icons/buildings/dwarf_hold1.png",
    "Dwarf Hold 2": "systems/wfrp3/icons/buildings/dwarf_hold2.png",
    "Dwarf Hold 3": "systems/wfrp3/icons/buildings/dwarf_hold3.png",
    "Empire Barracks": "systems/wfrp3/icons/buildings/empire_barracks.png",
    "Empire City 1": "systems/wfrp3/icons/buildings/empire_city1.png",
    "Empire City 2": "systems/wfrp3/icons/buildings/empire_city2.png",
    "Empire City 3": "systems/wfrp3/icons/buildings/empire_city3.png",
    "Farm": "systems/wfrp3/icons/buildings/farms.png",
    "Food": "systems/wfrp3/icons/buildings/food.png",
    "Guard Post": "systems/wfrp3/icons/buildings/guards.png",
    "Haunted Hill": "systems/wfrp3/icons/buildings/haunted_hill.png",
    "Haunted Wood": "systems/wfrp3/icons/buildings/haunted_wood.png",
    "Inn 1": "systems/wfrp3/icons/buildings/inn1.png",
    "Inn 2": "systems/wfrp3/icons/buildings/inn2.png",
    "Kislev City 1": "systems/wfrp3/icons/buildings/kislev_city1.png",
    "Kislev City 2": "systems/wfrp3/icons/buildings/kislev_city2.png",
    "Kislev City 3": "systems/wfrp3/icons/buildings/kislev_city3.png",
    "Lumber": "systems/wfrp3/icons/buildings/lumber.png",
    "Magic": "systems/wfrp3/icons/buildings/magic.png",
    "Metal": "systems/wfrp3/icons/buildings/metal.png",
    "Mountain 1": "systems/wfrp3/icons/buildings/mountains1.png",
    "Mountain 2": "systems/wfrp3/icons/buildings/mountains2.png",
    "Orcs": "systems/wfrp3/icons/buildings/orcs.png",
    "Orc Camp": "systems/wfrp3/icons/buildings/orc_city.png",
    "Port": "systems/wfrp3/icons/buildings/port.png",
    "Road": "systems/wfrp3/icons/buildings/roads.png",
    "Ruins": "systems/wfrp3/icons/buildings/ruins.png",
    "Scroll": "systems/wfrp3/icons/buildings/scroll.png",
    "Sigmar": "systems/wfrp3/icons/buildings/sigmar_worship.png",
    "Stables": "systems/wfrp3/icons/buildings/stables.png",
    "Standing Stones": "systems/wfrp3/icons/buildings/standing_stones.png",
    "Swamp": "systems/wfrp3/icons/buildings/swamp.png",
    "Temple": "systems/wfrp3/icons/buildings/temple.png",
    "Textile": "systems/wfrp3/icons/buildings/textile.png",
    "Tower 1": "systems/wfrp3/icons/buildings/tower1.png",
    "Tower 2": "systems/wfrp3/icons/buildings/tower2.png",
    "Tower Hill": "systems/wfrp3/icons/buildings/tower_hill.png",
    "Wizard Tower": "systems/wfrp3/icons/buildings/wizard_tower.png",
    "Ulric": "systems/wfrp3/icons/buildings/ulric_worship.png",
    "Village 1": "systems/wfrp3/icons/buildings/village1.png",
    "Village 2": "systems/wfrp3/icons/buildings/village2.png",
    "Village 3": "systems/wfrp3/icons/buildings/village3.png",
    "Wood Elves 1": "systems/wfrp3/icons/buildings/welves1.png",
    "Wood Elves 2": "systems/wfrp3/icons/buildings/welves2.png",
    "Wood Elves 3": "systems/wfrp3/icons/buildings/welves3.png"
}

// Species
wfrp3.species = {
    "human": "Human",
    "dwarf": "Dwarf",
    "halfling": "Halfling",
    "helf": "High Elf",
    "welf": "Wood Elf",
};

wfrp3.speciesCharacteristics = {
    "human": {
        "ws": "2d10+20",
        "bs": "2d10+20",
        "s": "2d10+20",
        "t": "2d10+20",
        "i": "2d10+20",
        "ag": "2d10+20",
        "dex": "2d10+20",
        "int": "2d10+20",
        "wp": "2d10+20",
        "fel": "2d10+20"
    },
    "dwarf": {
        "ws": "2d10+30",
        "bs": "2d10+20",
        "s": "2d10+20",
        "t": "2d10+30",
        "i": "2d10+20",
        "ag": "2d10+10",
        "dex": "2d10+30",
        "int": "2d10+20",
        "wp": "2d10+40",
        "fel": "2d10+10"
    },
    "halfling": {
        "ws": "2d10+10",
        "bs": "2d10+30",
        "s": "2d10+10",
        "t": "2d10+20",
        "i": "2d10+20",
        "ag": "2d10+20",
        "dex": "2d10+30",
        "int": "2d10+20",
        "wp": "2d10+30",
        "fel": "2d10+30"
    },
    "helf": {
        "ws": "2d10+30",
        "bs": "2d10+30",
        "s": "2d10+20",
        "t": "2d10+20",
        "i": "2d10+40",
        "ag": "2d10+30",
        "dex": "2d10+30",
        "int": "2d10+30",
        "wp": "2d10+30",
        "fel": "2d10+20"
    },
    "welf": {
        "ws": "2d10+30",
        "bs": "2d10+30",
        "s": "2d10+20",
        "t": "2d10+20",
        "i": "2d10+40",
        "ag": "2d10+30",
        "dex": "2d10+30",
        "int": "2d10+30",
        "wp": "2d10+30",
        "fel": "2d10+20"
    },

}

wfrp3.speciesSkills = {
    "human": [
        "Animal Care",
        "Charm",
        "Cool",
        "Evaluate",
        "Gossip",
        "Haggle",
        "Language (Bretonnian)",
        "Language (Wastelander)",
        "Leadership",
        "Lore (Reikland)",
        "Melee (Basic)",
        "Ranged (Bow)"
    ],
    "dwarf": [
        "Consume Alcohol",
        "Cool",
        "Endurance",
        "Entertain (Storytelling)",
        "Evaluate",
        "Intimidate",
        "Language (Khazalid)",
        "Lore (Dwarfs)",
        "Lore (Geology)",
        "Lore (Metallurgy)",
        "Melee (Basic)",
        "Trade (any one)"
    ],
    "halfling": [
        "Charm",
        "Consume Alcohol",
        "Dodge",
        "Gamble",
        "Haggle",
        "Intuition",
        "Language (Mootish)",
        "Lore (Reikland)",
        "Perception",
        "Sleight of Hand",
        "Stealth (Any)",
        "Trade (Cook)"
    ],
    "helf": [
        "Cool",
        "Entertain (Sing)",
        "Evaluate",
        "Language (Eltharin)",
        "Leadership",
        "Melee (Basic)",
        "Navigation",
        "Perception",
        "Play (any one)",
        "Ranged (Bow)",
        "Sail",
        "Swim"
    ],
    "welf": [
        "Athletics",
        "Climb",
        "Endurance",
        "Entertain (Sing)",
        "Intimidate",
        "Language (Eltharin)",
        "Melee (Basic)",
        "Outdoor Survival",
        "Perception",
        "Ranged (Bow)",
        "Stealth (Rural)",
        "Track"
    ],
}

wfrp3.speciesTalents = {
    "human": [
        "Doomed",
        "Savvy, Suave",
        3
    ],
    "dwarf": [
        "Magic Resistance",
        "Night Vision",
        "Read/Write, Relentless",
        "Resolute, Strong-minded",
        "Sturdy",
        0
    ],
    "halfling": [
        "Acute Sense (Taste)",
        "Night Vision",
        "Resistance (Chaos)",
        "Small",
        0
    ],
    "helf": [
        "Acute Sense (Sight)",
        "Coolheaded, Savvy",
        "Night Vision",
        "Second Sight, Sixth Sense",
        "Read/Write",
        0
    ],
    "welf": [
        "Acute Sense (Sight)",
        "Hardy, Second Sight",
        "Night Vision",
        "Second Sight, Sixth Sense",
        "Read/Write",
        0
    ],
}

wfrp3.speciesMovement = {
    "human": 4,
    "dwarf": 3,
    "halfling": 3,
    "helf": 5,
    "welf": 5
}

wfrp3.speciesFate = {
    "human": 2,
    "dwarf": 0,
    "halfling": 0,
    "helf": 0,
    "welf": 0
}

wfrp3.speciesRes = {
    "human": 1,
    "dwarf": 2,
    "halfling": 2,
    "helf": 0,
    "welf": 0
}

wfrp3.speciesExtra = {
    "human": 3,
    "dwarf": 2,
    "halfling": 3,
    "helf": 2,
    "welf": 2
}

wfrp3.speciesAge = {
    "human": "15+1d10",
    "dwarf": "15+10d10",
    "halfling": "15+5d10",
    "helf": "30+10d10",
    "welf": "30+10d10"
}

wfrp3.speciesHeight = {
    "human": {
        feet: 4,
        inches: 9,
        die: "2d10"
    },
    "dwarf": {
        feet: 4,
        inches: 3,
        die: "1d10"
    },
    "halfling": {
        feet: 3,
        inches: 1,
        die: "1d10"
    },
    "helf": {
        feet: 5,
        inches: 11,
        die: "1d10"
    },
    "welf": {
        feet: 5,
        inches: 11,
        die: "1d10"
    }
}

wfrp3.classTrappings = {
    "Academics": "ClassTrappings.Academics",
    "Burghers": "ClassTrappings.Burghers",
    "Courtiers": "ClassTrappings.Courtiers",
    "Peasants": "ClassTrappings.Peasants",
    "Rangers": "ClassTrappings.Rangers",
    "Riverfolk": "ClassTrappings.Riverfolk",
    "Rogues": "ClassTrappings.Rogues",
    "Warriors": "ClassTrappings.Warriors",
}

wfrp3.creditOptions = {
    SPLIT : "split",
    EACH : "each",

}

// Status Tiers
wfrp3.statusTiers = {
    "g": "TIER.Gold",
    "s": "TIER.Silver",
    "b": "TIER.Brass"
};

// Characteristic Names
wfrp3.characteristics = {
    "ws": "CHAR.WS",
    "bs": "CHAR.BS",
    "s": "CHAR.S",
    "t": "CHAR.T",
    "i": "CHAR.I",
    "ag": "CHAR.Ag",
    "dex": "CHAR.Dex",
    "int": "CHAR.Int",
    "wp": "CHAR.WP",
    "fel": "CHAR.Fel"
};

// Characteristic Abbreviations
wfrp3.characteristicsAbbrev = {
    "ws": "CHARAbbrev.WS",
    "bs": "CHARAbbrev.BS",
    "s": "CHARAbbrev.S",
    "t": "CHARAbbrev.T",
    "i": "CHARAbbrev.I",
    "ag": "CHARAbbrev.Ag",
    "dex": "CHARAbbrev.Dex",
    "int": "CHARAbbrev.Int",
    "wp": "CHARAbbrev.WP",
    "fel": "CHARAbbrev.Fel"
};

wfrp3.skillTypes = {
    "bsc": "Basic",
    "adv": "Advanced"
};

wfrp3.xpCost = {
    "characteristic": [25, 30, 40, 50, 70, 90, 120, 150, 190, 230, 280, 330, 390, 450, 520],
    "skill": [10, 15, 20, 30, 40, 60, 80, 110, 140, 180, 220, 270, 320, 380, 440]
}

wfrp3.skillGroup = {
    "isSpec": "ITEM.IsSpec",
    "noSpec": "ITEM.NoSpec"
};

wfrp3.talentMax = {
    "1": "1",
    "2": "2",
    "none": "None",
    "ws": "CHARBonus.WS",
    "bs": "CHARBonus.BS",
    "s": "CHARBonus.S",
    "t": "CHARBonus.T",
    "i": "CHARBonus.I",
    "ag": "CHABonus.Ag",
    "dex": "CHARBonus.Dex",
    "int": "CHARBonus.Int",
    "wp": "CHARBonus.WP",
    "fel": "CHARBonus.Fel"
}


// Weapon Groups
wfrp3.weaponGroups = {
    "basic": "SPEC.Basic",
    "cavalry": "SPEC.Cavalry",
    "fencing": "SPEC.Fencing",
    "brawling": "SPEC.Brawling",
    "flail": "SPEC.Flail",
    "parry": "SPEC.Parry",
    "polearm": "SPEC.Polearm",
    "twohanded": "SPEC.TwoHanded",
    "blackpowder": "SPEC.Blackpowder",
    "bow": "SPEC.Bow",
    "crossbow": "SPEC.Crossbow",
    "entangling": "SPEC.Entangling",
    "engineering": "SPEC.Engineering",
    "explosives": "SPEC.Explosives",
    "sling": "SPEC.Sling",
    "throwing": "SPEC.Throwing",
};

// Given a group, what's the primary type, melee or ranged
wfrp3.groupToType = {
    "basic": "melee",
    "cavalry": "melee",
    "fencing": "melee",
    "brawling": "melee",
    "flail": "melee",
    "parry": "melee",
    "polearm": "melee",
    "twohanded": "melee",
    "blackpowder": "ranged",
    "bow": "ranged",
    "crossbow": "ranged",
    "entangling": "ranged",
    "engineering": "ranged",
    "explosives": "ranged",
    "sling": "ranged",
    "throwing": "ranged",
};

wfrp3.weaponTypes = {
    "melee": "Melee",
    "ranged": "Ranged"
}

// Weapon Group Descriptions
wfrp3.weaponGroupDescriptions = {
    "basic": "Basic",
    "cavalry": "wfrp3.GroupDescription.Cavalry",
    "fencing": "Fencing",
    "brawling": "Brawling",
    "flail": "wfrp3.GroupDescription.Flail",
    "parry": "wfrp3.GroupDescription.Parry",
    "polearm": "Polearm",
    "twohanded": "Two-Handed",
    "blackpowder": "wfrp3.GroupDescription.Blackpowder",
    "bow": "Bow",
    "crossbow": "wfrp3.GroupDescription.Crossbow",
    "entangling": "Entangling",
    "engineering": "wfrp3.GroupDescription.Engineering",
    "explosives": "wfrp3.GroupDescription.Explosives",
    "sling": "Sling",
    "throwing": "wfrp3.GroupDescription.Throwing",
};

// Weapon Reach
wfrp3.weaponReaches = {
    "personal": "wfrp3.Reach.Personal",
    "vshort": "wfrp3.Reach.VShort",
    "short": "wfrp3.Reach.Short",
    "average": "wfrp3.Reach.Average",
    "long": "wfrp3.Reach.Long",
    "vLong": "wfrp3.Reach.VLong",
    "massive": "wfrp3.Reach.Massive",
}

// Weapon reach descriptions
wfrp3.reachDescription = {
    "personal": "wfrp3.Reach.PersonalDescription",
    "vshort": "wfrp3.Reach.VShortDescription",
    "short": "wfrp3.Reach.ShortDescription",
    "average": "wfrp3.Reach.AverageDescription",
    "long": "wfrp3.Reach.LongDescription",
    "vLong": "wfrp3.Reach.VLongDescription",
    "massive": "wfrp3.Reach.MassiveDescription",
}

// Ammo Groups
wfrp3.ammunitionGroups = {
    "BPandEng": "wfrp3.BPandEng",
    "bow": "wfrp3.Bow",
    "crossbow": "wfrp3.Crossbow",
    "sling": "wfrp3.Sling",
};

// Item Qualities
wfrp3.itemQualities = {
    "durable": "PROPERTY.Durable",
    "fine": "PROPERTY.Fine",
    "lightweight": "PROPERTY.Lightweight",
    "practical": "PROPERTY.Practical",
};

// Item Flaws
wfrp3.itemFlaws = {
    "ugly": "PROPERTY.Ugly",
    "shoddy": "PROPERTY.Shoddy",
    "unreliable": "PROPERTY.Unreliable",
    "bulky": "PROPERTY.Bulky",
}


// Weapon Qualities
wfrp3.weaponQualities = {
    "accurate": "PROPERTY.Accurate",
    "blackpowder": "PROPERTY.Blackpowder",
    "blast": "PROPERTY.Blast",
    "damaging": "PROPERTY.Damaging",
    "defensive": "PROPERTY.Defensive",
    "entangle": "PROPERTY.Entangle",
    "fast": "PROPERTY.Fast",
    "hack": "PROPERTY.Hack",
    "impact": "PROPERTY.Impact",
    "impale": "PROPERTY.Impale",
    "penetrating": "PROPERTY.Penetrating",
    "pistol": "PROPERTY.Pistol",
    "precise": "PROPERTY.Precise",
    "pummel": "PROPERTY.Pummel",
    "repeater": "PROPERTY.Repeater",
    "shield": "PROPERTY.Shield",
    "trapblade": "PROPERTY.TrapBlade",
    "unbreakable": "PROPERTY.Unbreakable",
    "wrap": "PROPERTY.Wrap"
};

// Weapon Flaws
wfrp3.weaponFlaws = {
    "dangerous": "PROPERTY.Dangerous",
    "imprecise": "PROPERTY.Imprecise",
    "reload": "PROPERTY.Reload",
    "slow": "PROPERTY.Slow",
    "tiring": "PROPERTY.Tiring",
    "undamaging": "PROPERTY.Undamaging"
};


// Weapon Quality Descriptions (Used in dropdown info)
wfrp3.qualityDescriptions = {
    "accurate": "wfrp3.Properties.Accurate",
    "blackpowder": "wfrp3.Properties.Blackpowder",
    "blast": "wfrp3.Properties.Blast",
    "damaging": "wfrp3.Properties.Damage",
    "defensive": "wfrp3.Properties.Defensive",
    "distract": "wfrp3.Properties.Distract",
    "entangle": "wfrp3.Properties.Entangle",
    "fast": "wfrp3.Properties.Fast",
    "hack": "wfrp3.Properties.Hack",
    "impact": "wfrp3.Properties.Impact",
    "impale": "wfrp3.Properties.Impale",
    "penetrating": "wfrp3.Properties.Penetrating",
    "pistol": "wfrp3.Properties.Pistol",
    "precise": "wfrp3.Properties.Precise",
    "pummel": "wfrp3.Properties.Pummel",
    "repeater": "wfrp3.Properties.Repeater",
    "shield": "wfrp3.Properties.Shield",
    "trapblade": "wfrp3.Properties.Trapblade",
    "unbreakable": "wfrp3.Properties.Unbreakable",
    "wrap": "wfrp3.Properties.Wrap",
    "flexible": "wfrp3.Properties.Flexible",
    "impenetrable": "wfrp3.Properties.Impenetrable",
    "durable": "wfrp3.Properties.Durable",
    "fine": "wfrp3.Properties.Fine",
    "lightweight": "wfrp3.Properties.Lightweight",
    "practical": "wfrp3.Properties.Practical",
};

// Weapon Flaw Descriptions (used in dropdown info)
wfrp3.flawDescriptions = {
    "dangerous": "wfrp3.Properties.Dangerous",
    "imprecise": "wfrp3.Properties.Imprecise",
    "reload": "wfrp3.Properties.Reload",
    "slow": "wfrp3.Properties.Slow",
    "tiring": "wfrp3.Properties.Tiring",
    "undamaging": "wfrp3.Properties.Undamaging",
    "partial": "wfrp3.Properties.Partial",
    "weakpoints": "wfrp3.Properties.Weakpoints",
    "ugly": "wfrp3.Properties.Ugly",
    "shoddy": "wfrp3.Properties.Shoddy",
    "unreliable": "wfrp3.Properties.Unreliable",
    "bulky": "wfrp3.Properties.Bulky"
};

// Armor Qualities
wfrp3.armorQualities = {
    "flexible": "Flexible",
    "impenetrable": "Impenetrable",
};

// Armor Flaws
wfrp3.armorFlaws = {
    "partial": "Partial",
    "weakpoints": "Weakpoints",
};

// Equipment Types
wfrp3.armorTypes = {
    "softLeather": "wfrp3.ArmourType.SLeather",
    "boiledLeather": "wfrp3.ArmourType.BLeather",
    "mail": "wfrp3.ArmourType.Mail",
    "plate": "wfrp3.ArmourType.Plate",
    "other": "wfrp3.ArmourType.Other"
};

// Range Test Modifiers
wfrp3.rangeModifiers = {
    "Point Blank": "Easy (+40)",
    "Short Range": "Average (+20)",
    "Normal": "Challenging (+0)",
    "Long Range": "Difficult (-10)",
    "Extreme": "Very Hard (-30)",
}

// Difficulty Modifiers
wfrp3.difficultyModifiers = {
    "veasy": 60,
    "easy": 40,
    "average": 20,
    "challenging": 0,
    "difficult": -10,
    "hard": -20,
    "vhard": -30
}

// Difficulty Labels
wfrp3.difficultyLabels = {

    "veasy": "Very Easy (+60)",
    "easy": "Easy (+40)",
    "average": "Average (+20)",
    "challenging": "Challenging (+0)",
    "difficult": "Difficult (-10)",
    "hard": "Hard (-20)",
    "vhard": "Very Hard (-30)"
}

wfrp3.locations = {
    "head": "Head",
    "body": "Body",
    "rArm": "Right Arm",
    "lArm": "Left Arm",
    "rLeg": "Right Leg",
    "lLeg": "Left Leg",
}

// Trapping Availability
wfrp3.availability = {
    "None": "-",
    "common": "wfrp3.Availability.Common",
    "scarce": "wfrp3.Availability.Scarce",
    "rare": "wfrp3.Availability.Rare",
    "exotic": "wfrp3.Availability.Exotic",
}


// Trapping Types
wfrp3.trappingTypes = {
    "clothingAccessories": "wfrp3.TrappingType.ClothingAccessories",
    "foodAndDrink": "wfrp3.TrappingType.FoodDrink",
    "toolsAndKits": "wfrp3.TrappingType.ToolsKits",
    "booksAndDocuments": "wfrp3.TrappingType.BooksDocuments",
    "tradeTools": "wfrp3.TrappingType.TradeTools", // Unused - combined with tools and kits
    "drugsPoisonsHerbsDraughts": "wfrp3.TrappingType.DrugsPoisonsHerbsDraughts",
    "ingredient": "wfrp3.TrappingType.Ingredient",
    "misc": "wfrp3.TrappingType.Misc",
};

// These categories are used to label items in containers (Trapping tab)
wfrp3.trappingCategories = {
    "weapon": "wfrp3.TrappingType.Weapon",
    "armour": "wfrp3.TrappingType.Armour",
    "money": "wfrp3.TrappingType.Money",
    "ammunition": "wfrp3.TrappingType.Ammunition",
    "container": "wfrp3.TrappingType.Container",
    "clothingAccessories": "wfrp3.TrappingType.ClothingAccessories",
    "foodAndDrink": "wfrp3.TrappingType.FoodDrink",
    "toolsAndKits": "wfrp3.TrappingType.ToolsKits",
    "booksAndDocuments": "wfrp3.TrappingType.BooksDocuments",
    "tradeTools": "wfrp3.TrappingType.TradeTools",
    "drugsPoisonsHerbsDraughts": "wfrp3.TrappingType.DrugsPoisonsHerbsDraughts",
    "ingredient": "wfrp3.TrappingType.Ingredient",
    "misc": "wfrp3.TrappingType.Misc",
};

// Creature Sizes
wfrp3.actorSizes = {
    "tiny": "SPEC.Tiny",
    "ltl": "SPEC.Little",
    "sml": "SPEC.Small",
    "avg": "SPEC.Average",
    "lrg": "SPEC.Large",
    "enor": "SPEC.Enormous",
    "mnst": "SPEC.Monstrous"
};
wfrp3.actorSizeNums = {
    "tiny": 0,
    "ltl": 1,
    "sml": 2,
    "avg": 3,
    "lrg": 4,
    "enor": 5,
    "mnst": 6
};

wfrp3.tokenSizes = {
    "tiny": 0.3,
    "ltl": 0.5,
    "sml": 0.8,
    "avg": 1,
    "lrg": 2,
    "enor": 3,
    "mnst": 4
};

// Condition Types
wfrp3.magicLores = {
    "petty": "Petty",
    "beasts": "Beasts",
    "death": "Death",
    "fire": "Fire",
    "heavens": "Heavens",
    "metal": "Metal",
    "life": "Life",
    "light": "Light",
    "shadow": "Shadow",
    "hedgecraft": "Hedgecraft",
    "witchcraft": "Witchcraft",
    "daemonology": "Daemonology",
    "necromancy": "Necromancy",
    "nurgle": "Nurgle",
    "slaanesh": "Slaanesh",
    "tzeentch": "Tzeentch",
};

// Given a Lore, what is the Wind
wfrp3.magicWind = {
    "petty": "None",
    "beasts": "Ghur",
    "death": "Shyish",
    "fire": "Aqshy",
    "heavens": "Azyr",
    "metal": "Chamon",
    "life": "Ghyran",
    "light": "Hysh",
    "shadow": "Ulgu",
    "hedgecraft": "None",
    "witchcraft": "None",
    "daemonology": "Dhar",
    "necromancy": "Dhar",
    "nurgle": "Dhar",
    "slaanesh": "Dhar",
    "tzeentch": "Dhar",
};

wfrp3.loreEffect = {
    "petty": "None",
    "beasts": "wfrp3.LoreDescription.Beasts",
    "death": "wfrp3.LoreDescription.Death",
    "fire": "wfrp3.LoreDescription.Fire",
    "heavens": "wfrp3.LoreDescription.Heavens",
    "metal": "wfrp3.LoreDescription.Metal",
    "life": "wfrp3.LoreDescription.Life",
    "light": "wfrp3.LoreDescription.Light",
    "shadow": "wfrp3.LoreDescription.Shadow",
    "hedgecraft": "wfrp3.LoreDescription.Hedgecraft",
    "witchcraft": "wfrp3.LoreDescription.Witchcraft",
    "daemonology": "",
    "necromancy": "",
    "nurgle": "",
    "slaanesh": "",
    "tzeentch": "",
};

// Types of prayers
wfrp3.prayerTypes = {
    "blessing": "Blessing",
    "miracle": "Miracle"
}

wfrp3.mutationTypes = {
    "physical": "Physical",
    "mental": "Mental"
}

wfrp3.encumbrancePenalties = {
    "encumbered": "wfrp3.EncumbrancePenalties.Encumbered",
    "veryEncumbered": "wfrp3.EncumbrancePenalties.VeryEnc",
    "maxEncumbered": "wfrp3.EncumbrancePenalties.MaxEnc",
}

wfrp3.conditions = {
	"ablaze": "wfrp3.ConditionName.Ablaze",
	"bleeding": "wfrp3.ConditionName.Bleeding",
	"blinded": "wfrp3.ConditionName.Blinded",
	"broken": "wfrp3.ConditionName.Broken",
	"deafened": "wfrp3.ConditionName.Deafened",
	"entangled": "wfrp3.ConditionName.Entangled",
	"fatigued": "wfrp3.ConditionName.Fatigued",
	"poisoned": "wfrp3.ConditionName.Poisoned",
	"prone": "wfrp3.ConditionName.Prone",
	"stunned": "wfrp3.ConditionName.Stunned",
	"surprised": "wfrp3.ConditionName.Surprised",
	"unconscious": "wfrp3.ConditionName.Unconscious",
	"grappling": "wfrp3.ConditionName.Grappling",
	"fear": "wfrp3.ConditionName.Fear",
	"defeated": "wfrp3.ConditionName.Defeated"
}


wfrp3.conditionDescriptions = {
    "ablaze": "wfrp3.Conditions.Ablaze",
    "bleeding": "wfrp3.Conditions.Bleeding",
    "blinded": "wfrp3.Conditions.Blinded",
    "broken": "wfrp3.Conditions.Broken",
    "deafened": "wfrp3.Conditions.Deafened",
    "entangled": "wfrp3.Conditions.Entangled",
    "fatigued": "wfrp3.Conditions.Fatigued",
    "poisoned": "wfrp3.Conditions.Poisoned",
    "prone": "wfrp3.Conditions.Prone",
    "stunned": "wfrp3.Conditions.Stunned",
    "surprised": "wfrp3.Conditions.Surprised",
    "unconscious": "wfrp3.Conditions.Unconscious",
    "grappling": "wfrp3.Conditions.Grappling",
    "fear": "wfrp3.Conditions.Fear",
}

wfrp3.symptoms = {
    "blight": "Blight",
    "buboes": "Buboes",
    "convulsions": "Convulsions",
    "coughsAndSneezes": "Coughs and Sneezes",
    "fever": "Fever",
    "flux": "Flux",
    "gangrene": "Gangrene",
    "lingering": "Lingering",
    "malaise": "Malaise",
    "nausea": "Nausea",
    "pox": "Pox",
    "wounded": "Wounded",
    "delirium": "Delirium",
    "swelling": "Swelling"
}

wfrp3.symptomDescriptions = {
    "blight": "wfrp3.SymptomDescriptions.Blight",
    "buboes": "wfrp3.SymptomDescriptions.Buboes",
    "convulsions": "wfrp3.SymptomDescriptions.Convulsions",
    "coughsAndSneezes": "wfrp3.SymptomDescriptions.CoughsandSneezes",
    "fever": "wfrp3.SymptomDescriptions.Fever",
    "flux": "wfrp3.SymptomDescriptions.Flux",
    "gangrene": "wfrp3.SymptomDescriptions.Gangrene",
    "lingering": "wfrp3.SymptomDescriptions.Lingering",
    "malaise": "wfrp3.SymptomDescriptions.Malaise",
    "nausea": "wfrp3.SymptomDescriptions.Nausea",
    "pox": "wfrp3.SymptomDescriptions.Pox",
    "wounded": "wfrp3.SymptomDescriptions.Wounded",
    "delirium": "wfrp3.SymptomDescriptions.Delirium",
    "swelling": "wfrp3.SymptomDescriptions.Swelling",
}

wfrp3.symptomTreatment = {
    "blight": "wfrp3.SymptomTreatment.Blight",
    "buboes": "wfrp3.SymptomTreatment.Buboes",
    "convulsions": "wfrp3.SymptomTreatment.Convulsions",
    "coughsAndSneezes": "wfrp3.SymptomTreatment.CoughsandSneezes",
    "fever": "wfrp3.SymptomTreatment.Fever",
    "flux": "wfrp3.SymptomTreatment.Flux",
    "gangrene": "wfrp3.SymptomTreatment.Gangrene",
    "lingering": "wfrp3.SymptomTreatment.Lingering",
    "malaise": "wfrp3.SymptomTreatment.Malaise",
    "nausea": "wfrp3.SymptomTreatment.Nausea",
    "pox": "wfrp3.SymptomTreatment.Pox",
    "wounded": "wfrp3.SymptomTreatment.Wounded",
    "delirium": "wfrp3.SymptomTreatment.Delirium",
    "swelling": "wfrp3.SymptomTreatment.Swelling",
}

wfrp3.earningValues = {
    "b": "2d10",
    "s": "1d10",
    "g": "1",
}

wfrp3.randomExp = {
    speciesRand: 20,
    careerRand: 50,
    careerReroll: 25,
    statsRand: 50,
    statsReorder: 25
}

wfrp3.traitBonuses = {
    "big": {
        "s": 10,
        "t": 10,
        "ag": -5
    },
    "brute": {
        "m": -1,
        "t": 10,
        "s": 10,
        "ag": -10
    },
    "clever": {
        "int": 20,
        "i": 10
    },
    "cunning": {
        "int": 10,
        "fel": 10,
        "i": 10
    },
    "elite": {
        "ws": 20,
        "bs": 20,
        "wp": 20
    },
    "fast": {
        "ag": 10,
        "m": 1
    },
    "leader": {
        "fel": 10,
        "wp": 10
    },
    "tough": {
        "t": 10,
        "wp": 10
    },
    "swarm": {
        "ws": 10
    }
}

wfrp3.talentBonuses = {
    "savvy": "int",
    "suave": "fel",
    "marksman": "bs",
    "very strong": "s",
    "sharp": "i",
    "lightning reflexes": "ag",
    "coolheaded": "wp",
    "very resilient": "t",
    "nimble fingered": "dex",
    "warrior born": "ws"
}

const DAMAGE_TYPE = {
    NORMAL: 0,
    IGNORE_AP: 1,
    IGNORE_TB: 2,
    IGNORE_ALL: 3
}

const PSEUDO_ENTITIES = [
	"Table",
	"Condition",
	"Symptom",
	"Roll",
	"Pay"
]

wfrp3.availabilityTable = {
    "MARKET.Village": {
        "wfrp3.Availability.Common": {
            test: 100,
            stock: '2'
        },
        "wfrp3.Availability.Scarce": {
            test: 30,
            stock: '1'
        },
        "wfrp3.Availability.Rare": {
            test: 15,
            stock: '1'
        },
        "wfrp3.Availability.Exotic": {
            test: 0,
            stock: '0'
        }
    },
    "MARKET.Town": {
        "wfrp3.Availability.Common": {
            test: 100,
            stock: '2d10'
        },
        "wfrp3.Availability.Scarce": {
            test: 60,
            stock: '1d10'
        },
        "wfrp3.Availability.Rare": {
            test: 30,
            stock: '1d5'
        },
        "wfrp3.Availability.Exotic": {
            test: 0,
            stock: '0'
        }
    },
    "MARKET.City": {
        "wfrp3.Availability.Common": {
            test: 100,
            stock: '∞'
        },
        "wfrp3.Availability.Scarce": {
            test: 90,
            stock: '∞'
        },
        "wfrp3.Availability.Rare": {
            test: 45,
            stock: '∞'
        },
        "wfrp3.Availability.Exotic": {
            test: 0,
            stock: '0'
        }
    }
}

