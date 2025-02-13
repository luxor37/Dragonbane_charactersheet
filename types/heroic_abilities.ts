import type { Ability } from "./sheet";
export const HEROIC_ABILITIES = [
    {
        name: "Assassin",
        cost: 3,
        description: "Your sneak attack (page 43) deals an extra D8 damage. This heroic ability can be combined with the heroic ability Backstabbing. You activate this ability after you roll to hit, but before you roll for damage.",
        requirement: "Knives 12"
    } as Ability,
    {
        name: "Backstabbing",
        cost: 3,
        description: "You can activate this ability when making a melee attack against an enemy that is also within 2 meters of another player character. Your attack then counts as a sneak attack, which means it cannot be dodged or parried, you get a boon to the roll, and the number of dice rolled for the damage is increased by one (i.e. 2D8 instead of D8). This ability can only be used with a subtle weapon (page 74). Activating this ability does not count as an action.",
        requirement: "Knives 12"
    } as Ability,
    {
        name: "Battle Cry",
        cost: 3,
        description: "You can, as an action in combat, let out a battle cry that inspires your friends. All other player characters within earshot immediately heal a condition of their choice (page 51). This heroic ability can only be used in combat.",
    } as Ability,
    {
        name: "Berserker",
        cost: 3,
        description: "You gain the Angry condition and immediately attack the nearest opponent in melee combat. If already Angry, you gain another condition of your choice. Then you must keep fighting until all opponents within sight have been defeated or you reach 0 HP. You gain a boon to melee attacks, but can neither parry nor dodge. After the fight you become Exhausted.",
        requirement: "Any melee weapon skill 12"
    } as Ability,
    {
        name: "Catlike",
        description: "The number of D6 rolled for damage from a fall (page 53) decreases by one for each WP spent. You can first make an ACROBATICS roll and then activate this heroic ability.",
        requirement: "Acrobatics 12"
    } as Ability,
    {
        name: "Companion",
        cost: 3,
        description: "You can activate this ability to turn an animal (not a monster) into your companion. This takes a stretch of time, and you can only have one animal companion at a time. The GM decides which animals are nearby – see the list on page 99. The animal follows you as long as you remain in its natural environment, and it can scout for you at no additional WP cost. For 3 additional WP you can command the animal to attack an enemy (free action for you).",
        requirement: "Hunting & Fishing 12"
    } as Ability,
    {
        name: "Contortionist",
        cost: 1,
        description: "You escape from your shackles or squeeze through a narrow space without rolling for any skill.",
        requirement: "Evade 12"
    } as Ability,
    {
        name: "Defensive",
        cost: 3,
        description: "You may attempt to parry an attack (page 46) without consuming your action for the round. The bonus parry can be used at any time during the round. You may only try to parry the same attack once and you cannot try to dodge and parry the same attack. This ability can be used multiple times per round, as long as you have enough WP.",
        requirement: "Any melee weapon skill 12"
    } as Ability,
    {
        name: "Deflect Arrow",
        cost: 1,
        description: "You can parry a ranged attack with a melee weapon, instead of using a shield.",
        requirement: "Any melee weapon skill 12"
    } as Ability,
    {
        name: "Disguise",
        cost: 2,
        description: "You are a master of disguise and can easily assume the appearance of others. After working for a stretch of time you can assume another person’s looks, voice, and demeanor. The person must be of the same kin as you. Anyone who knows the person and sees you from up to 10 meters away can make an AWARENESS roll to see through your disguise.",
        requirement: "Bluffing 12"
    } as Ability,
    {
        name: "Double Slash",
        cost: 3,
        description: "When wielding a slashing weapon, you can attack two enemies within 2 meters with a single slash. You only roll for the attack once – if it succeeds, both enemies are hit. Your enemies can parry or dodge the attack individually. Damage is rolled separately. This ability can be combined with Dual Wield.",
        requirement: "Axes or Swords 12"
    } as Ability,
    {
        name: "Dragonslayer",
        cost: 3,
        description: "An attack aimed at a monster (not a normal NPC) deals an additional D8 damage. You activate this ability after you roll to hit, but before you roll for damage. Read more about monsters in chapter 7.",
        requirement: "Any weapon skill 12"
    } as Ability,
    {
        name: "Dual Wield",
        cost: 3,
        description: "This heroic ability can only be used if you wield a one-handed weapon in each hand. The STR requirement of the weapon in your off hand (you decide if it is right or left) increases by 3. You activate the ability on your turn in combat and can then perform an extra attack with your second weapon. The second attack is done with a bane. You decide in which order to use your two weapons. Finish the first attack, including damage, before rolling the second one. This ability can be combined with Double Slash.",
        requirement: "Any melee weapon skill 12"
    } as Ability,
    {
        name: "Eagle Eye",
        cost: 2,
        description: "You can see a person or object up to 200 meters away in great detail, as if standing right next to it. The effect lasts for one stretch. In combat you can also shoot at a target beyond the weapon’s effective range (page 49) without getting a bane to your roll. This heroic ability must be activated for each new target.",
        requirement: "Awareness 12"
    } as Ability,
    {
        name: "Fast Footwork",
        cost: 3,
        description: "You may attempt to dodge an attack (page 47) without consuming your action for the round. The bonus dodge can be performed at any time during the round. You may only try to dodge the same attack once and you cannot try to dodge and parry the same attack. This ability can be used multiple times per round, as long as you have enough WP.",
        requirement: "Evade 12"
    } as Ability,
    {
        name: "Fast Healer",
        cost: 2,
        description: "You heal an extra D6 HP during a stretch rest. This heroic ability does not affect WP or conditions.",
    } as Ability,
    {
        name: "Fearless",
        cost: 2,
        description: "You automatically resist fear (page 52), without a WIL roll.",
    } as Ability,
    {
        name: "Focused",
        description: "Your maximum number of Willpower Points is permanently increased by 2. You can select this heroic ability multiple times, without limit.",
    } as Ability,
    {
        name: "Guardian",
        cost: 2,
        description: "You do not hesitate to take a hit to protect your friends. If you and another player character are both within 2 meters of the same enemy and the enemy tries to attack the other character, you can activate this ability to force the enemy to attack you instead. Using this ability can be done out of turn and it does not count as an action.",
        requirement: "Axes, Hammers, or Swords 12"
    } as Ability,
    {
        name: "Insight",
        cost: 2,
        description: "If you talk a while with another person, you can roll AWARENESS to determine whether that person is telling the truth. You cannot tell exactly what a person is lying about.",
        requirement: "Persuasion 12"
    } as Ability,
    {
        name: "Intuition",
        cost: 3,
        description: "When faced with a difficult decision, you can activate this ability to ask a question directly to the GM and receive a helpful answer. The answer represents your vast general knowledge and should only aid your decision-making, not reveal everything there is to know.",
        requirement: "Myths & Legends 12"
    } as Ability,
    {
        name: "Iron Fist",
        cost: 1,
        description: "The damage of an unarmed attack increases by one D6. You can activate this heroic ability as a free action after rolling the attack.",
        requirement: "Brawling 12"
    } as Ability,
    {
        name: "Iron Grip",
        cost: 1,
        description: "You get a boon to your BRAWLING roll when trying to grapple another person or prevent the enemy from breaking free.",
        requirement: "Brawling 12"
    } as Ability,
    {
        name: "Lightning Fast",
        cost: 2,
        description: "When drawing an initiative card at the start of a combat round (page 41), you may draw two cards instead of one and choose which one you want. You can only activate this heroic ability once per round.",
        requirement: "Evade 12"
    } as Ability,
    {
        name: "Lone Wolf",
        description: "You can take a shift rest in the wilderness without first rolling for BUSHCRAFT to make camp (page 103). The effect only applies to you, even if you have a tent.",
        requirement: "Bushcraft 12"
    } as Ability,
    {
        name: "Magic Talent",
        description: "You have an aptitude for magic and can learn a new school of magic (whether you already know any or not). Spells need to be learned separately. For more information on how it works, see page 61. This heroic ability can be selected multiple times – once for each new school you want to learn.",
    } as Ability,
    {
        name: "Massive Blow",
        cost: 3,
        description: "A strike with a two-handed melee weapon inflicts D8 additional points of damage, but you cannot move in the same round. You can activate this ability after the roll to hit, but not if you moved.",
        requirement: "Any STR-based melee weapon skill 12"
    } as Ability,
    {
        name: "Master Blacksmith",
        description: "This ability requires blacksmithing tools. In one stretch, you can sharpen a bladed or pointed weapon, at the cost of 3 WP. Against a sharpened weapon, the armor rating of an item counts as one step lower. The effect wears off after one combat encounter where the weapon was used to attack or parry. In one shift, you craft a metal weapon or metal armor of your choice from the lists on pages 73–75. It requires a forge, an anvil, and iron (weight 1). The cost in WP is equal to the item’s price in gold (rounded up). You can spread the work across multiple shifts if you do not have enough WP.",
        requirement: "Crafting 12"
    } as Ability,
    {
        name: "Master Carpenter",
        description: "This ability requires carpentry tools. As an action, you can inflict D12 points of damage per WP spent on a door, wall, or any other inanimate object, ignoring the object’s armor rating. In one shift of time, you can craft a wooden item of your choice, such as a club, staff, or shield, from the lists on pages 73–75. It requires wood (weight 1 or determined by the GM), and costs a number of WP equal to the item’s price in gold (rounded up). The GM decides the cost for unlisted items.",
        requirement: "Crafting 12"
    } as Ability,
    {
        name: "Master Chef",
        cost: 1,
        description: "You automatically succeed at cooking food (page 103) without rolling BUSHCRAFT.",
    } as Ability,
    {
        name: "Master Spellcaster",
        cost: 3,
        description: "If you activate this ability on your turn in combat, you can cast two different spells as a single action. It must be two different spells. You can roll for the first spell and then activate this heroic ability.",
        requirement: "Any magic school 12"
    } as Ability,
    {
        name: "Master Tanner",
        description: "This ability requires leatherworking tools. You can craft one set of leather armor from the skin of an animal or a monster. The armor gets half the beast’s armor rating (rounded up), but always has at least 1. It takes one shift and the cost in WP is equal to the item’s armor rating.",
        requirement: "Crafting 12"
    } as Ability,
    {
        name: "Monster Hunter",
        cost: 3,
        description: "At a crossroads of some kind, you can activate this ability to learn the direction of the most dangerous enemies.",
        requirement: "Beast Lore 12"
    } as Ability,
    {
        name: "Musician",
        cost: 3,
        description: "Your beautiful voice instills courage in your friends or fear in your foes. Activating this ability (an action in combat) gives all allies within 10 meters a boon to all rolls, or a bane to all enemies within the same range – choose one or the other. The effect lasts until your turn in the next round.",
        requirement: "Performance 12"
    } as Ability,
    {
        name: "Pathfinder",
        cost: 1,
        description: "You get a boon to your BUSHCRAFT roll when trying to find the right direction in the wilderness.",
        requirement: "Bushcraft 12"
    } as Ability,
    {
        name: "Quartermaster",
        cost: 1,
        description: "You are good at finding suitable campsites. You automatically succeed at making camp during journeys (page 103).",
        requirement: "Bushcraft 12"
    } as Ability,
    {
        name: "Robust",
        description: "Your max HP increases by 2. This heroic ability can be selected multiple times, without limit.",
    } as Ability,
    {
        name: "Sea Legs",
        cost: 1,
        description: "You can activate this ability (not an action) when performing an action in water, even if only waist deep. You are then safe from all negative effects of being in water (page 53) for one round, including the risk of drowning.",
        requirement: "Swim 12"
    } as Ability,
    {
        name: "Shield Block",
        cost: 2,
        description: "You can activate this ability when parrying with a shield to roll with a boon. Using this ability, you can also parry physical monster attacks (not area effects) that normally cannot be parried. This requires a shield and you get a boon to the roll. This ability can be combined with Defensive.",
        requirement: "Any STR-based melee weapon skill 12"
    } as Ability,
    {
        name: "Throwing Arm",
        cost: 2,
        description: "You can throw a melee weapon with tremendous force at an enemy within your STR meters away. It must be a one-handed weapon. Roll the attack as normal. The enemy can parry or dodge the attack as usual. The weapon lands at the enemy’s feet.",
        requirement: "Any melee weapon skill 12"
    } as Ability,
    {
        name: "Treasure Hunter",
        cost: 3,
        description: "At a crossroads of some kind, you can activate this ability to learn the direction of the greatest treasures.",
        requirement: "Bartering 12"
    } as Ability,
    {
        name: "Twin Shot",
        cost: 3,
        description: "By activating this ability when attacking with a bow (not crossbow), you shoot two arrows instead of one. Roll just once to hit, with a bane. Damage is rolled separately. The arrows can be directed at the same target or two different targets.",
        requirement: "Bows 12"
    } as Ability,
    {
        name: "Veteran",
        cost: 1,
        description: "Activating this ability at the start of a combat round allows you to retain your initiative card from the previous round instead of drawing a new one. Doing so does not count as an action. For more information on combat and initiative, see chapter 4.",
        requirement: "Any weapon skill 12"
    } as Ability,
    {
        name: "Weasel",
        cost: 3,
        description: "If you are attacked and have another player character within 2 meters, you can activate this ability to let the attack hit that character instead of you. This ability has no effect against area attacks and you must activate this ability before attempting any dodge or parry. The new target may try to dodge or parry normally.",
        requirement: "Evade 12"
    } as Ability
] as const;
export type Heroic_ability = typeof HEROIC_ABILITIES[number];