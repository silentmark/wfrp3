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
    "ogre": "Ogre"
};

// Weapon Groups
wfrp3.weaponGroups = {
    "basic": "Basic",
    "cavalry": "Cavalry",
    "fencing": "Fencing",
    "brawling": "Brawling",
    "flail": "Flail",
    "polearm": "Polearm",
    "greatweapon": "Great Weapon",
    "staff": "Staff",
    "spear": "Spear",
    "blackpowder": "Blackpowder",
    "bow": "Bow",
    "crossbow": "Crossbow",
    "sling": "Sling",
    "throwing": "Throwing"
};

// Given a group, what's the primary type, melee or ranged
wfrp3.groupToType = {
    "basic": "melee",
    "cavalry": "melee",
    "fencing": "melee",
    "brawling": "melee",
    "flail": "melee",
    "polearm": "melee",
    "greatweapon": "melee",
    "staff": "melee",
    "spear": "melee",
    "blackpowder": "ranged",
    "bow": "ranged",
    "crossbow": "ranged",
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
    "polearm": "Polearm",
    "greatweapon": "Great Weapon",
    "staff": "Staff",
    "spear": "Spear",

    "bow": "Bow",
    "sling": "Sling",
    "blackpowder": "wfrp3.GroupDescription.Blackpowder",
    "crossbow": "wfrp3.GroupDescription.Crossbow",
    "throwing": "wfrp3.GroupDescription.Throwing",
};

// Ammo Groups
wfrp3.ammunitionGroups = {
    "BPandEng": "wfrp3.BPandEng",
    "bow": "wfrp3.Bow",
    "crossbow": "wfrp3.Crossbow",
    "sling": "wfrp3.Sling",
};

// Item Qualities
wfrp3.itemQualities = {
    "attund1": "Attiund 1",
    "attund2": "Attiund 2",
    "attund3": "Attiund 3",
    "attund4": "Attiund 4",
    "attund5": "Attiund 5",
    "blast": "Blast",
    "defensive": "Defensive",
    "entangling": "Entangling",
    "fast": "Fast",
    "pierce1": "Pierce 1",
    "pierce2": "Pierce 2",
    "pierce3": "Pierce 3",
    "pierce4": "Pierce 4",
    "pierce5": "Pierce 5",
    "reload": "Reload",
    "slow": "Slow",
    "thrown": "Thrown",
    "twohanded": "Two-Handed",
    "slow": "Slow",
    "unreliable1": "Unreliable 1",
    "unreliable2": "Unreliable 2",
    "unreliable3": "Unreliable 3",
    "unreliable4": "Unreliable 4",
    "unreliable5": "Unreliable 5",
    "vicious": "Vicious"
};

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

wfrp3.craftsmanship = {
    "Superior": {
        "Cost": "*10",
        "Rarity": "+1"
    },
    "Average": {       
        "Cost": "*1",
        "Rarity": "+0"
    },
    "Poor": {
        "Cost": "*0.5",
        "Rarity": "-1"
    }
}

wfrp3.availability = {
    "Exotic": {
        test: "4x"
    },
    "Rare": {
        test: "3x"
    },   
    "Common": {
        test: "2x"
    },
    "Plentiful": {
        test:  "1x"
    },
    "Abundant": {
        test:  "0x"
    }
}

const PSEUDO_ENTITIES = [
	"Table",
	"Condition",
	"Symptom",
	"Roll",
	"Pay"
]
