class Actorwfrp3 extends Actor {

  static async create(data, options) 
  {
    // If the created actor has items (only applicable to duplicated actors) bypass the new actor creation logic
    if (data.items)
    {
      return super.create(data, options);
    }

    // Initialize empty items
    data.items = [];

    // Default auto calculation to true
    data.flags = { };
    let moneyItems = await WFRP_Utility.allMoneyItems()
    moneyItems = moneyItems.sort((a, b) => (a.data.coinValue.value > b.data.coinValue.value) ? -1 : 1);

    // If character, automatically add basic skills and money items
    if (data.type == "character")
    {
      for (let m of moneyItems)   // Add money items, with a quantity of 0
      {
        m.data.quantity.value = 0;
        data.items.push(m);
      }
      super.create(data, options); // Follow through the the rest of the Actor creation process upstream
    }
  }

  prepareData()
  {
    try
    {
      super.prepareData();
      const data = this.data;

      // Only characters have experience
      // TODO: calculate other stuff like XP from career items, stance
      if ( data.type === "character" )
      {
        data.data.details.experience.current = data.data.details.experience.total - data.data.details.experience.spent;
      }
    }
    catch(error)
    {
      console.error("Something went wrong with preparing actor data: " + error)
      ui.notifications.error(game.i18n.localize("ACTOR.PreparationError") + error)
    }
  }

  setupCharacteristic(characteristicId, options = {}) {
    let char = this.data.data.characteristics[characteristicId];
    let title = game.i18n.localize(char.label) + " " + game.i18n.localize("Test");

    let testData = {
      target : char.value,
      extra : {
        size : this.data.data.details.size.value,
        options : options
      }
    };

    // Setup dialog data: title, template, buttons, prefilled data
    let dialogOptions = {
      title: title,
      template : "/systems/wfrp3/templates/chat/characteristic-dialog.html",
      // Prefilled dialog data
      data : {
      },
      callback : (html, roll) => {
        // When dialog confirmed, fill testData dialog information
        // Note that this does not execute until DiceWFRP.prepareTest() has finished and the user confirms the dialog
        cardOptions.rollMode =    html.find('[name="rollMode"]').val();
        testData.testModifier =   Number(html.find('[name="testModifier"]').val());
        testData.testDifficulty = wfrp3.difficultyModifiers[html.find('[name="testDifficulty"]').val()];
        testData.successBonus =   Number(html.find('[name="successBonus"]').val());
        testData.slBonus =        Number(html.find('[name="slBonus"]').val());
        // Target value is the final value being tested against, after all modifiers and bonuses are added
        testData.target =         testData.target + testData.testModifier + testData.testDifficulty;
        let talentBonuses =       html.find('[name = "talentBonuses"]').val();

          // Combine all Talent Bonus values (their times taken) into one sum
        testData.successBonus +=  talentBonuses.reduce(function (prev, cur){
          return prev + Number(cur)
        }, 0)

        // Use the assigned roll function (see DiceWFRP.prepareTest() to see how this roll function is assigned)
        roll(testData, cardOptions);
      }
    };

    // Call the universal cardOptions helper
    let cardOptions = this._setupCardOptions("systems/wfrp3/templates/chat/characteristic-card.html", title)

    // Provide these 3 objects to prepareTest() to create the dialog and assign the roll function
    DiceWFRP.prepareTest({
      dialogOptions : dialogOptions,
      testData : testData,
      cardOptions : cardOptions
    });
  }

  /**
   * Setup a Skill Test.
   *
   * Skill tests are much like Characteristic Tests in their simplicity, just with another layer of modifiers (skill advances).
   * However, there is more complication if the skill is instead for an Income test, which adds computation after the roll is
   * completed.
   *
   * @param {Object} skill    The skill item being tested. Skill items contain the advancements and the base characteristic, see template.json for more information.
   * @param {bool}   income   Whether or not the skill is being tested to determine Income.
   */
  setupSkill(skill, options = {}) {
    let title = skill.name + " " + game.i18n.localize("Test");
    let testData = {
      income : options.income,
      target: this.data.data.characteristics[skill.data.characteristic.value].value + skill.data.advances.value,
      extra : {
        size : this.data.data.details.size.value,
        options : options,
        skill: skill
      }
    };

    // Setup dialog data: title, template, buttons, prefilled data   
    let dialogOptions = {
      title: title,
      template : "/systems/wfrp3/templates/chat/skill-dialog.html",
      // Prefilled dialog data

      data : {
        characteristicList : wfrp3.characteristics,
        characteristicToUse : skill.data.characteristic.value,
        advantage : this.data.data.status.advantage.value || 0
      },
      callback : (html, roll) => {
        // When dialog confirmed, fill testData dialog information
        // Note that this does not execute until DiceWFRP.prepareTest() has finished and the user confirms the dialog
        cardOptions.rollMode =    html.find('[name="rollMode"]').val();
        testData.testModifier =   Number(html.find('[name="testModifier"]').val());
        testData.testDifficulty = wfrp3.difficultyModifiers[html.find('[name="testDifficulty"]').val()];
        testData.successBonus =   Number(html.find('[name="successBonus"]').val());
        testData.slBonus =        Number(html.find('[name="slBonus"]').val());
        let characteristicToUse = html.find('[name="characteristicToUse"]').val();
        // Target value is the final value being tested against, after all modifiers and bonuses are added
        testData.target =
        this.data.data.characteristics[characteristicToUse].value
        + testData.testModifier
        + testData.testDifficulty
        + skill.data.advances.value;
        let talentBonuses =       html.find('[name = "talentBonuses"]').val();

          // Combine all Talent Bonus values (their times taken) into one sum
        testData.successBonus +=  talentBonuses.reduce(function (prev, cur) {
          return prev + Number(cur)
        }, 0)

        // Use the assigned roll function (see below for how rollOverride is assigned, and then
        // DiceWFRP.prepareTest() for more info on how the override is used, if any)
        roll(testData, cardOptions)
      }
    };

    // If Income, use the specialized income roll handler and set testDifficulty to average
    if (testData.income)
    {
     dialogOptions.rollOverride = this.constructor.incomeOverride;
     dialogOptions.data.testDifficulty = "average";
    }

    // If Rest & Recover, set testDifficulty to average
    if (options.rest) {dialogOptions.data.testDifficulty = "average";}

    // Call the universal cardOptions helper
    let cardOptions = this._setupCardOptions("systems/wfrp3/templates/chat/skill-card.html", title)

    // Provide these 3 objects to prepareTest() to create the dialog and assign the roll function
    DiceWFRP.prepareTest({
      dialogOptions : dialogOptions,
      testData : testData,
      cardOptions : cardOptions});
  }

  /**
   * Setup a Weapon Test.
   *
   * Probably the most complicated type of Test, weapon tests' complexity comes from all the different
   * factors and variables of the different weapons available and how they might affect test results,
   * as well as ammo usage, the effects of using different skills etc.
   *
   * @param {Object} weapon   The weapon Item being used.
   * @param {bool}   event    The event that called this Test, used to determine if attack is melee or ranged.
   */
  setupWeapon(weapon, options = {}) {
    let skillCharList = []; // This array is for the different options available to roll the test (Skills and characteristics)
    let slBonus = 0   // Used when wielding Defensive weapons
    let modifier = 0; // Used when attacking with Accurate weapons
    let successBonus = 0;
    let title = game.i18n.localize("WeaponTest") + " - " + weapon.name;

    // Prepare the weapon to have the complete data object, including qualities/flaws, damage value, etc.
    let wep = this.prepareWeaponCombat(duplicate(weapon));
    let ammo; // Ammo object, if needed

    let testData = {
      target : 0,
      extra : { // Store this extra weapon/ammo data for later use
        weapon : wep,
        ammo : ammo,
        size : this.data.data.details.size.value,
        options : options
      }
    };

    if (wep.attackType == "melee")
      skillCharList.push(game.i18n.localize("Weapon Skill"))

    else if (wep.attackType == "ranged")
    {
      // If Ranged, default to Ballistic Skill, but check to see if the actor has the specific skill for the weapon
      skillCharList.push(game.i18n.localize("Ballistic Skill"))
      if (weapon.data.weaponGroup.value != "throwing" && weapon.data.weaponGroup.value != "explosives" && weapon.data.weaponGroup.value != "entangling")
      {
        // Check to see if they have ammo if appropriate
        ammo = duplicate(this.getEmbeddedEntity("OwnedItem", weapon.data.currentAmmo.value))
        if (!ammo || weapon.data.currentAmmo.value == 0 || ammo.data.quantity.value == 0)
        {
          ui.notifications.error(game.i18n.localize("Error.NoAmmo"))
          return
        }
      }
      else if (weapon.data.weaponGroup.value != "entangling" && weapon.data.quantity.value == 0)
      {
        // If this executes, it means it uses its own quantity for ammo (e.g. throwing), which it has none of
        ui.notifications.error(game.i18n.localize("Error.NoAmmo"))
        return;
      }
      else
      {
        // If this executes, it means it uses its own quantity for ammo (e.g. throwing)
        ammo = weapon;
      }
    }

    let defaultSelection // The default skill/characteristic being used
    if (wep.skillToUse)
    {
        // If the actor has the appropriate skill, default to that.
        skillCharList.push(wep.skillToUse.name)
        defaultSelection = skillCharList.indexOf(wep.skillToUse.name)
        testData.target = this.data.data.characteristics[wep.skillToUse.data.characteristic.value].value + wep.skillToUse.data.advances.value;

    }

    // Bypass macro default values
    if (!testData.target)
      testData.target = wep.attackType == "melee" ? this.data.data.characteristics["ws"].value : this.data.data.characteristics["bs"].value

    // ***** Automatic Test Data Fill Options ******

    // Try to automatically fill the dialog with values based on context
    // If the auto-fill setting is true, and there is combat....
    if (game.settings.get("wfrp3", "testAutoFill") && (game.combat && game.combat.data.round != 0 && game.combat.turns))
    {
      try
      {
        let currentTurn = game.combat.turns.find(t => t.active)

        // If actor is a token
        if (this.data.token.actorLink)
        {
          // If it is NOT the actor's turn
          if (currentTurn && this.data.token != currentTurn.actor.data.token)
            slBonus = this.data.flags.defensive; // Prefill Defensive values (see prepareItems() for how defensive flags are assigned)

          else // If it is the actor's turn
          {
            // Prefill dialog according to qualities/flaws
            if (wep.properties.qualities.includes(game.i18n.localize("PROPERTY.Accurate")))
              modifier += 10;
            if (wep.properties.qualities.includes(game.i18n.localize("PROPERTY.Precise")))
              successBonus += 1;
            if (wep.properties.flaws.includes(game.i18n.localize("PROPERTY.Imprecise")))
              slBonus -= 1;
          }
        }
        else // If the actor is not a token
        {
          // If it is NOT the actor's turn
          if (currentTurn && currentTurn.tokenId != this.token._id)
            slBonus = this.data.flags.defensive;

          else // If it is the actor's turn
          {
            // Prefill dialog according to qualities/flaws
            if (wep.properties.qualities.includes(game.i18n.localize("PROPERTY.Accurate")))
              modifier += 10;
            if (wep.properties.qualities.includes(game.i18n.localize("PROPERTY.Precise")))
              successBonus += 1;
            if (wep.properties.flaws.includes(game.i18n.localize("PROPERTY.Imprecise")))
              slBonus -= 1;
          }
        }
      }
      catch // If something went wrong, default to 0 for all prefilled data
      {
        slBonus = 0;
        successBonus = 0;
        modifier = 0;
      }
    }

    // Setup dialog data: title, template, buttons, prefilled data
    let dialogOptions = {
      title: title,
      template : "/systems/wfrp3/templates/chat/weapon-dialog.html",
      // Prefilled dialog data
      data : {
        skillCharList : skillCharList,
        slBonus : slBonus || 0,
        successBonus : successBonus || 0,
        testDifficulty: options.difficulty,
        modifier : modifier || 0,
        defaultSelection : defaultSelection,
        advantage : this.data.data.status.advantage.value || 0
      },
      callback : (html, roll) => {
        // When dialog confirmed, fill testData dialog information
        // Note that this does not execute until DiceWFRP.prepareTest() has finished and the user confirms the dialog
        cardOptions.rollMode =    html.find('[name="rollMode"]').val();
        testData.testModifier =   Number(html.find('[name="testModifier"]').val());
        testData.testDifficulty = wfrp3.difficultyModifiers[html.find('[name="testDifficulty"]').val()];
        testData.successBonus =   Number(html.find('[name="successBonus"]').val());
        testData.slBonus =        Number(html.find('[name="slBonus"]').val());
        let skillSelected =       skillCharList[Number(html.find('[name="skillSelected"]').val())];

        // Determine final target if a characteristic was selected
        if (skillSelected == game.i18n.localize("CHAR.WS") || skillSelected == game.i18n.localize("CHAR.BS"))
        {
          if (skillSelected == game.i18n.localize("CHAR.WS"))
            testData.target = this.data.data.characteristics.ws.value
          else if (skillSelected == game.i18n.localize("CHAR.BS"))
            testData.target = this.data.data.characteristics.bs.value

          testData.target += testData.testModifier + testData.testDifficulty;
        }
        else // If a skill was selected
        {
          // If using the appropriate skill, set the target number to characteristic value + advances + modifiers
          // Target value is the final value being tested against, after all modifiers and bonuses are added
          let skillUsed = testData.extra.weapon.skillToUse;

          testData.target =
          this.data.data.characteristics[skillUsed.data.characteristic.value].value
          + testData.testModifier
          + testData.testDifficulty
          + skillUsed.data.advances.value;
        }

        let talentBonuses = html.find('[name = "talentBonuses"]').val();

        // Combine all Talent Bonus values (their times taken) into one sum
        testData.successBonus += talentBonuses.reduce(function (prev, cur){
          return prev + Number(cur)
        }, 0)

        // Use the assigned roll function (see below for how rollOverride is assigned, and then
        // DiceWFRP.prepareTest() for more info on how the override is used, if any)
        roll(testData, cardOptions);

        // Reduce ammo if necessary
        if (ammo && skillSelected != game.i18n.localize("CHAR.WS") && weapon.data.weaponGroup.value != game.i18n.localize("SPEC.Entangling").toLowerCase())
        {
          ammo.data.quantity.value--;
          this.updateEmbeddedEntity("OwnedItem", {_id: ammo._id, "data.quantity.value" : ammo.data.quantity.value });
        }
      },

      // Override the default test evaluation to use specialized rollWeaponTest function
      rollOverride : this.constructor.weaponOverride
    };

    // Call the universal cardOptions helper
    let cardOptions = this._setupCardOptions("systems/wfrp3/templates/chat/weapon-card.html", title)

    // Provide these 3 objects to prepareTest() to create the dialog and assign the roll function
    DiceWFRP.prepareTest({
      dialogOptions : dialogOptions,
      testData : testData,
      cardOptions : cardOptions});
  }

  /**
   * Universal card options for setup functions.
   *
   * The setup_____() functions all use the same cardOptions, just different templates. So this is
   * a standardized helper function to maintain DRY code.
   *
   * @param {string} template   Fileptah to the template being used
   * @param {string} title      Title of the Test to be displayed on the dialog and card
   */
  _setupCardOptions(template, title)
  {
    let cardOptions = {
      speaker: {
        alias: this.data.token.name,
        actor : this.data._id,
      },
      title: title,
      template : template,
      flags : {img: this.data.token.randomImg ? this.data.img : this.data.token.img} 
      // img to be displayed next to the name on the test card - if it's a wildcard img, use the actor image
    }

    // If the test is coming from a token sheet
    if (this.token)
    {
      cardOptions.speaker.alias = this.token.data.name; // Use the token name instead of the actor name
      cardOptions.speaker.token = this.token.data._id;
      cardOptions.speaker.scene = canvas.scene._id
      cardOptions.flags.img = this.token.data.img; // Use the token image instead of the actor image
    }
    else // If a linked actor - use the currently selected token's data if the actor id matches
    {
      let speaker = ChatMessage.getSpeaker()
      if (speaker.actor == this.data._id)
      {
        cardOptions.speaker.alias = speaker.alias
        cardOptions.speaker.token = speaker.token
        cardOptions.speaker.scene = speaker.scene
        cardOptions.flags.img = speaker.token ? canvas.tokens.get(speaker.token).data.img : cardOptions.flags.img
      }
    }

    return cardOptions
  }

  /* --------------------------------------------------------------------------------------------------------- */
  /* --------------------------------------------- Roll Overides --------------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */
  /**
   * Roll overrides are specialized functions for different types of rolls. In each override, DiceWFRP is called
   * to perform the test logic, which has its own specialized functions for different types of tests. For exapmle,
   * weaponOverride() calls DiceWFRP.rollWeaponTest(). Additionally, any post-roll logic that needs to be performed
   * is done here. For example, Income tests use incomeOverride, which determines how much money is made after the
   * roll is completed. A normal Skill Test does not go through this process, instead using defaultRoll override,
   * however both overrides just use the standard DiceWFRP.rollTest().
   *
  /* --------------------------------------------------------------------------------------------------------- */

  /**
   * Default Roll override, the standard rolling method for general tests.
   *
   * defaultRoll is the default roll override (see DiceWFRP.prepareTest() for where it's assigned). This follows
   * the basic steps. Call DiceWFRP.rollTest for standard test logic, send the result and display data to
   * DiceWFRP.renderRollCard() as well as handleOpposedTarget().
   *
   * @param {Object} testData         All the data needed to evaluate test results - see setupSkill/Characteristic
   * @param {Object} cardOptions      Data for the card display, title, template, etc.
   * @param {Object} rerenderMessage  The message to be updated (used if editing the chat card)
   */
  static async defaultRoll(testData, cardOptions, rerenderMessage = null) {
    testData = await DiceWFRP.rollDices(testData, cardOptions);
    let result = DiceWFRP.rollTest(testData);
    
    result.postFunction = "defaultRoll";
    if (testData.extra)
      mergeObject(result, testData.extra);

      
   try {
    let contextAudio = await WFRP_Audio.MatchContextAudio(WFRP_Audio.FindContext(result))
    cardOptions.sound = contextAudio.file || cardOptions.sound
   }
   catch 
   { }
    Hooks.call("wfrp3:rollTest", result)

    if (game.user.targets.size)
    {
        cardOptions.title += ` - ${game.i18n.localize("Opposed")}`;
        cardOptions.isOpposedTest = true
    }

    await DiceWFRP.renderRollCard(cardOptions, result, rerenderMessage).then(msg => {
      OpposedWFRP.handleOpposedTarget(msg) // Send to handleOpposed to determine opposed status, if any.
    })
  }

  /**
   * weaponOverride is used for weapon tests, see setupWeapon for how it's assigned.
   *
   * weaponOverride doesn't add any special functionality, it's main purpose being to call
   * DiceWFRP.rollWeaponTest() instead of the generic DiceWFRP.rollTest()
   *
   * @param {Object} testData         All the data needed to evaluate test results - see setupWeapon()
   * @param {Object} cardOptions      Data for the card display, title, template, etc.
   * @param {Object} rerenderMessage  The message to be updated (used if editing the chat card)
   */
  static async weaponOverride(testData, cardOptions, rerenderMessage = null)
  {
    if (game.user.targets.size)
    {
      cardOptions.title += ` - ${game.i18n.localize("Opposed")}`,
      cardOptions.isOpposedTest = true
    }
    testData = await DiceWFRP.rollDices(testData, cardOptions);
    let result = DiceWFRP.rollWeaponTest(testData);
    result.postFunction = "weaponOverride";

   try {
    let contextAudio = await WFRP_Audio.MatchContextAudio(WFRP_Audio.FindContext(result))
    cardOptions.sound = contextAudio.file || cardOptions.sound
   }
   catch 
   { }
    Hooks.call("wfrp3:rollWeaponTest", result)


    await DiceWFRP.renderRollCard(cardOptions, result, rerenderMessage).then(msg => {
      OpposedWFRP.handleOpposedTarget(msg) // Send to handleOpposed to determine opposed status, if any.
    })
  }

  /**
   * castOverride is used for casting tests, see setupCast for how it's assigned.
   *
   * The only special functionality castOverride adds is reseting spell SL channelled back to 0, other than that,
   * it's main purpose is to call DiceWFRP.rollCastTest() instead of the generic DiceWFRP.rollTest().
   *
   * @param {Object} testData         All the data needed to evaluate test results - see setupCast()
   * @param {Object} cardOptions      Data for the card display, title, template, etc.
   * @param {Object} rerenderMessage  The message to be updated (used if editing the chat card)
   */
  static async castOverride(testData, cardOptions, rerenderMessage = null)
  {
    if (game.user.targets.size)
    {
      cardOptions.title += ` - ${game.i18n.localize("Opposed")}`,
      cardOptions.isOpposedTest = true
    }
    testData = await DiceWFRP.rollDices(testData, cardOptions);
    let result = DiceWFRP.rollCastTest(testData);
    result.postFunction = "castOverride";

   try {
    let contextAudio = await WFRP_Audio.MatchContextAudio(WFRP_Audio.FindContext(result))
    cardOptions.sound = contextAudio.file || cardOptions.sound
   }
   catch 
   { }
    Hooks.call("wfrp3:rollCastTest", result)


    // Update spell to reflect SL from channelling resetting to 0
    WFRP_Utility.getSpeaker(cardOptions.speaker).updateEmbeddedEntity("OwnedItem", {_id: testData.extra.spell._id, 'data.cn.SL' : 0});

    await DiceWFRP.renderRollCard(cardOptions, result, rerenderMessage).then(msg => {
      OpposedWFRP.handleOpposedTarget(msg) // Send to handleOpposed to determine opposed status, if any.
    })
  }

  /**
   * channellOverride is used for casting tests, see setupCast for how it's assigned.
   *
   * channellOveride doesn't add any special functionality, it's main purpose being to call
   * DiceWFRP.rollChannellTest() instead of the generic DiceWFRP.rollTest()
   *
   * @param {Object} testData         All the data needed to evaluate test results - see setupChannell()
   * @param {Object} cardOptions      Data for the card display, title, template, etc.
   * @param {Object} rerenderMessage  The message to be updated (used if editing the chat card)
   */
  static async channellOverride(testData, cardOptions, rerenderMessage = null)
  {
    if (game.user.targets.size)
    {
      cardOptions.title += ` - ${game.i18n.localize("Opposed")}`,
      cardOptions.isOpposedTest = true
    }
    testData = await DiceWFRP.rollDices(testData, cardOptions);
    let result = DiceWFRP.rollChannellTest(testData, WFRP_Utility.getSpeaker(cardOptions.speaker));
    result.postFunction = "channellOverride";

   try {
    let contextAudio = await WFRP_Audio.MatchContextAudio(WFRP_Audio.FindContext(result))
    cardOptions.sound = contextAudio.file || cardOptions.sound
   }
   catch 
   { }
    Hooks.call("wfrp3:rollChannelTest", result)

    await DiceWFRP.renderRollCard(cardOptions, result, rerenderMessage).then(msg => {
      OpposedWFRP.handleOpposedTarget(msg) // Send to handleOpposed to determine opposed status, if any.
    })
  }

  /**
   * prayerOverride is used for casting tests, see setupCast for how it's assigned.
   *
   * prayerOverride doesn't add any special functionality, it's main purpose being to call
   * DiceWFRP.rollPrayerTest() instead of the generic DiceWFRP.rollTest()
   *
   * @param {Object} testData         All the data needed to evaluate test results - see setupPrayer()
   * @param {Object} cardOptions      Data for the card display, title, template, etc.
   * @param {Object} rerenderMessage  The message to be updated (used if editing the chat card)
   */
  static async prayerOverride(testData, cardOptions, rerenderMessage = null)
  {
    if (game.user.targets.size)
    {
      cardOptions.title += ` - ${game.i18n.localize("Opposed")}`,
      cardOptions.isOpposedTest = true
    }
    testData = await DiceWFRP.rollDices(testData, cardOptions);
    let result = DiceWFRP.rollPrayTest(testData, WFRP_Utility.getSpeaker(cardOptions.speaker));
    result.postFunction = "prayerOverride";

   try {
    let contextAudio = await WFRP_Audio.MatchContextAudio(WFRP_Audio.FindContext(result))
    cardOptions.sound = contextAudio.file || cardOptions.sound
   }
   catch 
   { }
    Hooks.call("wfrp3:rollPrayerTest", result)

    await DiceWFRP.renderRollCard(cardOptions, result, rerenderMessage).then(msg => {
      OpposedWFRP.handleOpposedTarget(msg) // Send to handleOpposed to determine opposed status, if any.
    })
  }

  /* --------------------------------------------------------------------------------------------------------- */
  /* --------------------------------- Preparation & Calculation Functions ----------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */
  /**
   * Preparation function takes raw item data and processes it with actor data, typically using the calculate
   * functions to do so. For example, A weapon passed into prepareWeaponCombat will turn the weapon's damage 
   * from "SB + 4" to the actual damage value by using the actor's strength bonus. See the specific functions
   * below for more details on what exactly is processed. These functions are used when rolling a test 
   * (determining a weapon's base damage) or setting up the actor sheet to be displayed (displaying the damage
   * in the combat tab).
   *
  /* --------------------------------------------------------------------------------------------------------- */

  /**
   * Prepares actor data for display and other features.
   * 
   * prepare() is the principal function behind taking every aspect of an actor and processing them
   * for display (getData() - see ActorSheetwfrp3) and other needs. This is where all items (call to 
   * prepareItems()) are prepared and  organized, then used to calculate different Actor features, 
   * such as the Size trait influencing wounds and token size, or how talents might affect damage. 
   * In many areas here, these talents/traits that affect some calculation are updated only if a 
   * difference is detected to avoid infinite loops, I would like an alternative but I'm not sure 
   * where to go instead.
   * 
   * NOTE: THIS FUNCTION IS NOT TO BE CONFUSED WITH prepareData(). That function is called upon updating 
   * an actor. This function is called whenever the sheet is rendered.
   */
  prepare()
  {
    let preparedData = duplicate(this.data)
    // Call prepareItems first to organize and process OwnedItems
    mergeObject(preparedData, this.prepareItems())

    // Add speciality functions for each Actor type
    if (preparedData.type == "character")
      this.prepareCharacter(preparedData)

    if (preparedData.type == "npc")
      this.prepareNPC(preparedData)

    if (preparedData.type == "creature")
      this.prepareCreature(preparedData)

    // Find size based on Traits/Talents
    let size;
    
    // If the size has been changed since the last known value, update the value
    for (let s in wfrp3.actorSizes)
    {
      // Inverse lookup - Size value to key (Average -> "avg")
      if (wfrp3.actorSizes[s] == size && preparedData.data.details.size.value != s)
      {
        this.update({"data.details.size.value" : s})
      }
    }

    let tokenSize = wfrp3.tokenSizes[preparedData.data.details.size.value]
    preparedData.isToken = !!this.token;

    try // If the token size has been changed (based on actual Actor size), update the value
    {
      // Different update process based on if token or not.
      if (this.isToken && this.token.data.height != tokenSize) // Actor checking if its prototype token is correct
      {
        this.token.update({"height" : tokenSize,"width" : tokenSize})
      }
      else if (preparedData.token.height != tokenSize) // Token checking whether its size is correct
      {
        this.update({"token.height" : tokenSize,"token.width" : tokenSize})
      }
    }
    catch { }    
    return preparedData;
  }

  /**
   * Augments actor preparation with additional calculations for Characters.
   * 
   * Characters have more features and so require more calculation. Specifically,
   * this will add pure soul talent advances to max corruption, as well as display
   * current career values (details, advancement indicatiors, etc.). 
   * 
   * Note that this functions requires actorData to be prepared, by this.prepare().
   * 
   * @param {Object} actorData  prepared actor data to augment 
   */
  prepareCharacter(actorData)
  {
    // If no actor data passed in, return this.prepare() which calls this function properly
    if (!actorData)
    {
      return this.prepare()
    }

    let hasCurrentCareer = false;
    // For each career, find the current one, and set the details accordingly (top of the character sheet)
    // Additionally, set available characteristics, skills, and talents to advance (advancement indicator)
    for (let career of actorData.careers)
    {
      if (career.data.current.value)
      {
        hasCurrentCareer = true;
      }
    }
  }

  /**
   * Augments actor preparation with additional calculations for NPCs.
   * 
   * Currently NPCs do not need any additional calculation, hooray.
   * 
   * @param {Object} actorData  prepared actor data 
   */
  prepareNPC(actorData)
  {
    // If no actor data passed in, return this.prepare() which calls this function properly
    if (!actorData)
    {
      return this.prepare()
    }
  }

  /**
   * Augments actor preparation with additional calculations for Creatures.
   * 
   * preparing for Creatures mainly involves excluding traits that were marked to be excluded,
   * then replacing the traits array with only the included traits (which is used by prepare()).
   * 
   * Note that this functions requires actorData to be prepared, by this.prepare().
   * 
   * @param {Object} actorData  prepared actor data to augment 
   */
  prepareCreature(actorData)
  {
    // If no actor data passed in, return this.prepare() which calls this function properly
    if (!actorData)
    {
      return this.prepare()
    }
  }

  /**
   * Iterates through the Owned Items, processes them and organizes them into containers.
   * 
   * This behemoth of a function goes through all Owned Items, separating them into individual arrays
   * that the html templates use. Before adding them into the array, they are typically processed with
   * the actor data, which can either be a large function itself (see prepareWeaponCombat) or not, such
   * as career items which have minimal processing. These items, as well as some auxiliary data (e.g.
   * encumbrance, AP) are bundled into an return object
   * 
   */
  prepareItems()
  {
    let actorData = duplicate(this.data)
    // These containers are for the various different tabs
    const careers = [];
    const talents = [];
    const cards = [];
    const weapons = [];
    const armour = [];
    const injuries = [];
    const psychology = [];
    const mutations = [];
    const diseases = [];
    const criticals = [];
    let penalties = {
      [game.i18n.localize("Armour")]: {
        value: ""
      },
      [game.i18n.localize("Injury")]: {
        value: ""
      },
      [game.i18n.localize("Mutation")]: {
        value: ""
      },
      [game.i18n.localize("Criticals")]: {
        value: ""
      },
    };

    // Inventory object is for the Trappings tab - each sub object is for an individual inventory section
    const inventory = {
      weapons: {
        label: game.i18n.localize("wfrp3.TrappingType.Weapon"), // Label - what is displayed in the inventory section header
        items: [],                                  // Array of items in the section
        toggle: true,                               // Is there a toggle in the section? (Equipped, worn, etc.)
        toggleName: game.i18n.localize("Equipped"), // What is the name of the toggle in the header
        show: false,                                // Should this section be shown (if an item exists in this list, it is set to true)
        dataType: "weapon"                          // What type of FVTT Item is in this section (used by the + button to add an item of this type)
      },
      armor: {
        label: game.i18n.localize("wfrp3.TrappingType.Armour"),
        items: [],
        toggle: true,
        toggleName: game.i18n.localize("Worn"),
        show: false,
        dataType: "armour"
      },
      ammunition: {
        label: game.i18n.localize("wfrp3.TrappingType.Ammunition"),
        items: [],
        show: false,            
        dataType: "ammunition"
      },
      clothingAccessories: {
        label: game.i18n.localize("wfrp3.TrappingType.ClothingAccessories"),
        items: [],
        toggle: true,
        toggleName: game.i18n.localize("Worn"),
        show: false,
        dataType: "trapping"
      },
      booksAndDocuments: {
        label: game.i18n.localize("wfrp3.TrappingType.BooksDocuments"),
        items: [],
        show: false,
        dataType: "trapping"
      },
      toolsAndKits: {
        label: game.i18n.localize("wfrp3.TrappingType.ToolsKits"),
        items: [],
        show: false,
        dataType: "trapping"
      },
      foodAndDrink: {
        label: game.i18n.localize("wfrp3.TrappingType.TradeTools"),
        items: [],
        show: false,
        dataType: "trapping"
      },
      drugsPoisonsHerbsDraughts: {
        label: game.i18n.localize("wfrp3.TrappingType.DrugsPoisonsHerbsDraughts"),
        items: [],
        show: false,
        dataType: "trapping"
      },
      misc: {
        label: game.i18n.localize("wfrp3.TrappingType.Misc"),
        items: [],
        show: true,
        dataType: "trapping"
      }
    };

    // Money and ingredients are not in inventory object because they need more customization - note in actor-inventory.html that they do not exist in the main inventory loop
    const ingredients = {
      label: game.i18n.localize("wfrp3.TrappingType.Ingredient"),
      items: [],
      show: false,
      dataType: "trapping"
    };
    const money = {
      coins: [],    
      total: 0,     // Total coinage value
      show: true
    };
    const containers = {
      items: [],
      show: false
    };
    const inContainers = []; // inContainers is the temporary storage for items within a container

    let totalEnc = 0;         // Total encumbrance of items

    // Iterate through items, allocating to containers
    // Items that need more intense processing are sent to a specialized function (see preparation functions below)
    // Physical items are also placed into containers instead of the inventory object if their 'container' is not 0
    // A container of 0 means not in a container, otherwise, the container corresponds to the id of the container the item is in
    for (let i of actorData.items) 
    {
      try 
      {
        i.img = i.img || DEFAULT_TOKEN;

        // *********** TALENTS ***********
        if (i.type === "talent") 
        {
          this.prepareTalent(i, talents);
        }

        else if (i.type === "card")
        {
          this.prepareCard(i, cards);
        }

        // *********** Ammunition ***********
        else if (i.type === "ammunition") 
        {
          i.encumbrance = (i.data.encumbrance.value * i.data.quantity.value).toFixed(2);
          if (i.data.container.value == "0")
          {
            inventory.ammunition.items.push(i);
            inventory.ammunition.show = true
            totalEnc += Number(i.encumbrance);
          } 
          else 
          {
            inContainers.push(i);
          }
        }

        // *********** Weapons ***********
        // Weapons are "processed" at the end for efficency
        else if (i.type === "weapon") 
        {
          i.encumbrance = Math.floor(i.data.encumbrance.value * i.data.quantity.value);
          if (i.data.container.value == "0")
          {
            i.toggleValue = i.data.equipped || false;
            inventory.weapons.items.push(i);
            inventory.weapons.show = true;
            totalEnc += i.encumbrance;
          } 
          else 
          {
            inContainers.push(i);
          }
        } 

        // *********** Armour ***********
        // Armour is prepared only if it is worn, otherwise, it is just pushed to inventory and encumbrance is calculated
        else if (i.type === "armour") 
        {
          i.encumbrance = Math.floor(i.data.encumbrance.value * i.data.quantity.value);
          if (i.data.container.value == "0")
          {
            i.toggleValue = i.data.equipped.value || false;
            if (i.data.equipped.value) 
            {
              i.encumbrance = i.encumbrance - 1;
              i.encumbrance = i.encumbrance < 0 ? 0 : i.encumbrance;
            }
            inventory.armor.items.push(i);
            inventory.armor.show = true;
            totalEnc += i.encumbrance;
          } 
          else 
          {
            inContainers.push(i);
          }

          if (i.data.equipped.value)
            armour.push(this.prepareArmorCombat(i));
        } 
        // *********** Injuries ***********
        else if (i.type == "injury") 
        {
          injuries.push(i);
          penalties[game.i18n.localize("Injury")].value += i.data.penalty.value;
        } 

        // *********** Criticals ***********
        else if (i.type == "critical") 
        {
          criticals.push(i);
          penalties[game.i18n.localize("Criticals")].value += i.data.modifier.value;
        } 

        // *********** Containers ***********
        // Items within containers are organized at the end
        else if (i.type === "container") 
        {
          i.encumbrance = i.data.encumbrance.value;

          if (i.data.container.value == "0")
          {
            if (i.data.equipped.value) 
            {
              i.encumbrance = i.encumbrance - 1;
              i.encumbrance = i.encumbrance < 0 ? 0 : i.encumbrance;
            }
            totalEnc += i.encumbrance;
          }
          else 
          {
            inContainers.push(i);
          }
          containers.items.push(i);
          containers.show = true;
        }

        // *********** Trappings ***********
        // Trappings have several sub-categories, most notably Ingredients
        // The trappings tab does not have a "Trappings" section, but sections for each type of trapping instead
        else if (i.type === "trapping") 
        {
          i.encumbrance = i.data.encumbrance.value * i.data.quantity.value;
          if (i.data.container.value == "0")
          {
            // Push ingredients to a speciality array for futher customization in the trappings tab
            if (i.data.trappingType.value == "ingredient") 
            {
              ingredients.items.push(i)
            } 
            // The trapping will fall into one of these if statements and set the array accordingly
            else if (i.data.trappingType.value == "clothingAccessories")
            {
              i.toggleValue = i.data.equipped.value || false;
              inventory[i.data.trappingType.value].items.push(i);
              inventory[i.data.trappingType.value].show = true;
              if (i.data.equipped.value) 
              {
                i.encumbrance = i.encumbrance - 1;                      // Since some trappings are worn, they need special treatment
                i.encumbrance = i.encumbrance < 0 ? 0 : i.encumbrance;  // This if statement is specific to worn clothing Trappings
              }
            } 
            else if (i.data.trappingType.value == "tradeTools") 
            {
              inventory["toolsAndKits"].items.push(i)             // I decided not to separate "Trade Tools" and "Tools and Kits"
              inventory["toolsAndKits"].show = true;              // Instead, merging them both into "Tools and Kits"
            }
            else if (i.data.trappingType.value) 
            {
              inventory[i.data.trappingType.value].items.push(i); // Generic - add anything else to their appropriate array
              inventory[i.data.trappingType.value].show = true;
            } 
            else 
            {
              inventory.misc.items.push(i); // If somehow it didn't fall into the other categories (it should)
              inventory.misc.show = true;   // Just push it to miscellaneous
            }
            totalEnc += i.encumbrance;
          }
          else 
          {
            inContainers.push(i);
          }
        } 

        // *********** Careers ***********   
        else if (i.type === "career") 
        {
          careers.push(i);
        } 
 
        // *********** Psychologies ***********   
        else if (i.type === "psychology") 
        {
          psychology.push(i);
        } 

        // *********** Diseases ***********   
        // .roll is the roll result. If it doesn't exist, show the formula instead
        else if (i.type === "disease") 
        {
          i.data.incubation.roll = i.data.incubation.roll || i.data.incubation.value;
          i.data.duration.roll = i.data.duration.roll || i.data.duration.value;
          diseases.push(i);
        } 

        // *********** Mutations ***********   
        // Some mutations have modifiers - see the penalties section below 
        else if (i.type === "mutation") 
        {
          mutations.push(i);
        } 

        // *********** Money ***********   
        // Keep a running total of the coin value the actor has outside of containers
        else if (i.type === "money") 
        {
          i.encumbrance = (i.data.encumbrance.value * i.data.quantity.value).toFixed(2);
          if (i.data.container.value == "0")
          {
            money.coins.push(i);
            totalEnc += Number(i.encumbrance);
          } 
          else 
          {
            inContainers.push(i);
          }
          money.total += i.data.quantity.value * i.data.coinValue.value;
        }
      } 
      catch (error) 
      {
        console.error("Something went wrong with preparing item " + i.name + ": " + error)
        console.log(error);
        ui.notifications.error("Something went wrong with preparing item " + i.name + ": " + error)
       // ui.notifications.error("Deleting " + i.name);
       // this.deleteEmbeddedEntity("OwnedItem", i._id);
      }
    } // END ITEM SORTING

    // Prepare weapons for combat after items passthrough for efficiency - weapons need to know the ammo possessed, so instead of iterating through
    // all items to find, iterate through the inventory.ammo array we just made
    for (let wep of inventory.weapons.items) 
    {
      // We're only preparing equipped items here - this is for displaying weapons in the combat tab after all
      if (wep.data.equipped) 
      {
        // Process weapon taking into account actor data, skills, and ammo
        weapons.push(this.prepareWeaponCombat(wep, inventory.ammo));
        // Add shield AP to AP object        
      }
    }

    inventory.misc.items = inventory.misc.items.concat(ingredients.items);

    // ******************************** Container Setup ***********************************

    // containerMissing is an array of items whose container does not exist (needed for when a container is deleted)
    var containerMissing = inContainers.filter(i => !containers.items.find(c => c._id == i.data.container.value));
    for (var itemNoContainer of containerMissing) // Reset all items without container references (items that were removed from a contanier)
      itemNoContainer.data.container.value = "0";
    
    // If there were missing containers, reset the items that are orphaned
    if (containerMissing.length)
      this.updateEmbeddedEntity("OwnedItem", containerMissing)
    
    for (var cont of containers.items) // For each container
    {
      // All items referencing (inside) that container
      var itemsInside = inContainers.filter(i => i.data.container.value == cont._id);
      itemsInside.map(function (item) 
      { // Add category of item to be displayed
        if (item.type == "trapping")
          item.type = wfrp3.trappingCategories[item.data.trappingType.value];
        else
          item.type = wfrp3.trappingCategories[item.type];
      })
      cont["carrying"] = itemsInside.filter(i => i.type != "Container");    // cont.carrying -> items the container is carrying
      cont["packsInside"] = itemsInside.filter(i => i.type == "Container"); // cont.packsInside -> containers the container is carrying
      cont["holding"] = itemsInside.reduce(function (prev, cur) {           // cont.holding -> total encumbrance the container is holding
        return Number(prev) + Number(cur.encumbrance);
      }, 0);
      cont.holding = Math.floor(cont.holding)
    }

    containers.items = containers.items.filter(c => c.data.container.value == "0"); // Do not show containers inside other containers as top level (a container value of 0 means not inside a container)
    
    
    // ******************************** Penalties Setup ***********************************        
    
    // Penalties box setup
    // If too much text, divide the penalties into groups
    let penaltiesOverflow = false;
    if ((penalties[game.i18n.localize("Mutation")].value + penalties[game.i18n.localize("Injury")].value + penalties[game.i18n.localize("Criticals")].value).length > 50) // ~50 characters is when the text box overflows
    {                                                                                                                                     // When that happens, break it up into categories 
      penaltiesOverflow = true;
      for (let penaltyType in penalties) 
      {
        if (penalties[penaltyType].value)
          penalties[penaltyType].show = true;
        else
          penalties[penaltyType].show = false; // Don't show categories without any penalties 
      }
    }

    // Penalties flag is teh string that shows when the actor's turn in combat starts
    let penaltiesFlag = penalties[game.i18n.localize("Mutation")].value + " " + penalties[game.i18n.localize("Injury")].value + " " + penalties[game.i18n.localize("Criticals")].value + " " + this.data.data.status.penalties.value
    penaltiesFlag = penaltiesFlag.trim();

    // This is for the penalty string in flags, for combat turn message
    if (this.data.flags.modifier != penaltiesFlag)
      this.update({"flags.modifier": penaltiesFlag})

    // enc used for encumbrance bar in trappings tab
    let enc;
    totalEnc = Math.floor(totalEnc);
    enc = {
      max: actorData.data.status.encumbrance.max,
      value: Math.round(totalEnc * 10) / 10,
    };
    // percentage of the bar filled
    enc.pct = Math.min(enc.value * 100 / enc.max, 100);
    enc.state = enc.value / enc.max; // state is how many times over you are max encumbrance
    if (enc.state > 3) 
    {
      enc["maxEncumbered"] = true
      enc.penalty = wfrp3.encumbrancePenalties["maxEncumbered"];
    } 
    else if (enc.state > 2) 
    {
      enc["veryEncumbered"] = true
      enc.penalty = wfrp3.encumbrancePenalties["veryEncumbered"];
    } 
    else if (enc.state > 1) 
    {
      enc["encumbered"] = true
      enc.penalty = wfrp3.encumbrancePenalties["encumbered"];
    } 
    else
      enc["notEncumbered"] = true;

    // Return all processed objects
    let preparedData = {
      inventory: inventory,
      containers: containers,
      talents: talents,
      cards: cards,
      weapons: weapons,
      diseases: diseases,
      mutations: mutations,
      armour: armour,
      penalties: penalties,
      penaltyOverflow: penaltiesOverflow,
      injuries: injuries,
      careers: careers.reverse(),
      money: money,
      psychology: psychology,
      criticals: criticals,
      criticalCount: criticals.length,
      encumbrance: enc,
      ingredients: ingredients
    }
    return preparedData
  }
  
   prepareTalent(talent, talentList) 
   {
      talentList.push(talent);
   }

   prepareCard(card, cardsList) 
   {
    cardsList.push(card);
   }

  prepareWeaponCombat(weapon, ammoList)
  {
    let actorData = this.data

    weapon.attackType = wfrp3.groupToType[weapon.data.weaponGroup.value]
    weapon.data.weaponGroup.value = wfrp3.weaponGroups[weapon.data.weaponGroup.value] || "basic";

    // TODO: look for specialization
    //weapon.skillToUse = skills.find(x => x.name.toLowerCase().includes(`(${weapon.data.weaponGroup.value.toLowerCase()})`))
    
    // prepareQualitiesFlaws turns the comma separated qualities/flaws string into a string array
    // Does not include qualities if no skill could be found above
    weapon["properties"] = [];

    // Melee Damage calculation
    if (weapon.attackType == "melee")
    {
      weapon["meleeWeaponType"] = true;
    }
    // Ranged Damage calculation
    else 
    {
      weapon["rangedWeaponType"] = true;
    }

    // If the weapon uses ammo...
    if (weapon.data.ammunitionGroup.value != "none") 
    {
      weapon["ammo"] = [];
      // If a list of ammo has been provided, filter it by ammo that is compatible with the weapon type
      if (ammoList)
      {
        weapon.ammo = ammoList.filter(a => a.data.ammunitionType.value == weapon.data.ammunitionGroup.value)
      }
      else // If no ammo has been provided, filter through all items and find ammo that is compaptible
        for ( let a of actorData.items ) 
          if (a.type == "ammunition" && a.data.ammunitionType.value == weapon.data.ammunitionGroup.value) // If is ammo and the correct type of ammo
              weapon.ammo.push(a);
    }
    // If throwing or explosive weapon, its ammo is its own quantity
    else if (weapon.data.weaponGroup.value == game.i18n.localize("SPEC.Throwing"))
    {
      weapon.data.ammunitionGroup.value = "";
    }
    return weapon;
  }

  /**
   * Prepares an armour Item.
   * 
   * Takes a an armour item, along with a persistent AP object to process the armour
   * into a useable format. Adding AP values and qualities to the AP object to be used
   * in display and opposed tests.
   * 
   * @param   {Object} armor  'armour' type item
   */
  prepareArmorCombat(armor)
  { 
    // Turn comma separated qualites/flaws into a more structured 'properties.qualities/flaws` string array
    armor.properties = [];
    return armor;
  }

  /**
   * Apply damage to an actor, taking into account armor, size, and weapons.
   *
   * applyDamage() is typically called at the end of an oppposed tests, where you can
   * right click the chat message and apply damage. This function goes through the
   * process of calculating and reducing damage if needede based on armor, toughness,
   * size, armor qualities/flaws, and weapon qualities/flaws
   *
   * @param {Object} victim       id of actor taking damage
   * @param {Object} opposedData  Test results, all the information needed to calculate damage
   * @param {var}    damageType   enum for what the damage ignores, see config.js
   */
  static applyDamage(victim, opposeData, damageType = DAMAGE_TYPE.NORMAL)
  {
    if (!opposeData.damage)
      return `<b>Error</b>: ${game.i18n.localize("CHAT.DamageAppliedError")}`
    // If no damage value, don't attempt anything
    if (!opposeData.damage.value)
      return game.i18n.localize("CHAT.DamageAppliedErrorTiring");

    // Get actor/tokens for those in the opposed test
    let actor = WFRP_Utility.getSpeaker(victim);
    let attacker = WFRP_Utility.getSpeaker(opposeData.speakerAttack)
    let soundContext = {item : {}, action : "hit"};

    // Start wound loss at the damage value
    let totalWoundLoss = opposeData.damage.value
    let newWounds = actor.data.data.status.wounds.value;
    let applyAP = (damageType == DAMAGE_TYPE.IGNORE_TB || damageType == DAMAGE_TYPE.NORMAL)
    let applyTB = (damageType == DAMAGE_TYPE.IGNORE_AP || damageType == DAMAGE_TYPE.NORMAL)
    let AP = {};

    // Start message update string
    let updateMsg = `<b>${game.i18n.localize("CHAT.DamageApplied")}</b><span class = 'hide-option'>: @TOTAL`;
    if (damageType != DAMAGE_TYPE.IGNORE_ALL)
      updateMsg += " ("

    let weaponProperties
    // If armor at hitloc has impenetrable value or not
    let impenetrable = false;
    // If weapon is undamaging
    let undamaging = false;
    // If weapon has Hack
    let hack = false;
    // If weapon has Impale
    let impale = false;
    // If weapon has Penetrating
    let penetrating = false;

    // if weapon has pummel - only used for audio
    let pummel = false

    // Reduce damage by TB
    if (applyTB)
    {
      totalWoundLoss -= actor.data.data.characteristics.t.bonus
      updateMsg += actor.data.data.characteristics.t.bonus + " TB"
    }

    // If the actor has the Robust talent, reduce damage by times taken
    totalWoundLoss -= actor.data.flags.robust || 0;

    if (actor.data.flags.robust)
      updateMsg += ` + ${actor.data.flags.robust} Robust`

    if (applyAP)
    {
      // I dislike this solution but I can't think of any other way to do it
      // Prepare the entire actor to get the AP layers at the hitloc
      AP = actor.prepareItems().AP[opposeData.hitloc.value]
      AP.ignored = 0;
      if (opposeData.attackerTestResult.weapon) // If the attacker is using a weapon
      {
        // Determine its qualities/flaws to be used for damage calculation
        weaponProperties = opposeData.attackerTestResult.weapon.properties;
        penetrating = weaponProperties.qualities.includes(game.i18n.localize("PROPERTY.Penetrating"))
        undamaging = weaponProperties.flaws.includes(game.i18n.localize("PROPERTY.Undamaging"))
        hack = weaponProperties.qualities.includes(game.i18n.localize("PROPERTY.Hack"))
        impale = weaponProperties.qualities.includes(game.i18n.localize("PROPERTY.Impale"))
        pummel = weaponProperties.qualities.includes(game.i18n.localize("PROPERTY.Pummel"))
      }
      // see if armor flaws should be triggered
      let ignorePartial = opposeData.attackerTestResult.roll % 2 == 0 || opposeData.attackerTestResult.extra.critical
      let ignoreWeakpoints = (opposeData.attackerTestResult.roll % 2 == 0 || opposeData.attackerTestResult.extra.critical)
                              && impale

      // Mitigate damage with armor one layer at a time
      for (let layer of AP.layers)
      {
        if (ignoreWeakpoints && layer.weakpoints)
        {
          AP.ignored += layer.value
        }
        else if (ignorePartial && layer.partial)
        {
          AP.ignored += layer.value;
        }
        else if (penetrating) // If penetrating - ignore 1 or all armor depending on material
        {
          AP.ignored += layer.metal ? 1 : layer.value
        }
        if (opposeData.attackerTestResult.roll % 2 != 0 && layer.impenetrable)
        {
          impenetrable = true;
          soundContext.outcome = "impenetrable"
        }

        // Prioritize plate over chain over leather for sound
        if (layer.value)
        {
          if (layer.armourType == "plate")
            soundContext.item.armourType = layer.armourType
          else if (!soundContext.item.armourType || (soundContext.item.armourType && (soundContext.item.armourType.includes("leather")) && layer.armourType == "mail")) // set to chain if there isn't an armour type set yet, or the current armor type is leather
            soundContext.item.armourType = layer.armourType
          else if(!soundContext.item.armourType)
            soundContext.item.armourType = "leather"
        }
      }

      // AP.used is the actual amount of AP considered
      AP.used = AP.value - AP.ignored
      AP.used = AP.used < 0 ? 0 : AP.used;           // AP minimum 0
      AP.used = undamaging ? AP.used * 2 : AP.used;  // Double AP if undamaging

      // show the AP usage in the updated message
      if (AP.ignored)
        updateMsg += ` + ${AP.used}/${AP.value} ${game.i18n.localize("AP")}`
      else
        updateMsg += ` + ${AP.used} ${game.i18n.localize("AP")}`

      // If using a shield, add that AP as well
      let shieldAP = 0;
      if (opposeData.defenderTestResult.weapon)
      {
        if (opposeData.defenderTestResult.weapon.properties.qualities.find(q => q.toLowerCase().includes(game.i18n.localize("PROPERTY.Shield").toLowerCase())))
          shieldAP = Number(opposeData.defenderTestResult.weapon.properties.qualities.find(q => q.toLowerCase().includes(game.i18n.localize("PROPERTY.Shield").toLowerCase())).split(" ")[1]);
      }

      if (shieldAP)
        updateMsg += ` + ${shieldAP} ${game.i18n.localize("CHAT.DamageShield")})`
      else
        updateMsg += ")"

      // Reduce damage done by AP
      totalWoundLoss -= (AP.used + shieldAP)

      // Minimum 1 wound if not undamaging
      if (!undamaging)
        totalWoundLoss = totalWoundLoss <= 0 ? 1 : totalWoundLoss
      else
        totalWoundLoss = totalWoundLoss <= 0 ? 0 : totalWoundLoss


      try {
        if (opposeData.attackerTestResult.weapon.attackType == "melee")
        {
          if ((weaponProperties.qualities.concat(weaponProperties.flaws)).every(p => [game.i18n.localize("PROPERTY.Pummel") , game.i18n.localize("PROPERTY.Slow") , game.i18n.localize("PROPERTY.Damaging")].includes(p)))
            soundContext.outcome = "warhammer" // special sound for warhammer :^)
          else if (AP.used)
          {
            soundContext.item.type = "armour"
            if (applyAP && totalWoundLoss <= 1)
              soundContext.outcome = "blocked"
            else if (applyAP)
              soundContext.outcome = "normal"
            if (impenetrable)
              soundContext.outcome = "impenetrable"
            if (hack)
              soundContext.outcome = "hack"
          }
          else 
          {
            soundContext.item.type = "hit"
            soundContext.outcome = "normal"
            if (impale || penetrating)
            {
              soundContext.outcome = "normal_slash"
            }
          }
        }
      }
      catch (e) {console.log("wfrp3 | Sound Context Error: " + e)} // Ignore sound errors
    }
    else updateMsg += ")"

    newWounds -= totalWoundLoss

    WFRP_Audio.PlayContextAudio(soundContext)

    // If damage taken reduces wounds to 0, show Critical
    if (newWounds <= 0 && !impenetrable)
    {
      //WFRP_Audio.PlayContextAudio(opposeData.attackerTestResult.weapon, {"type": "hit", "equip": "crit"})
      let critAmnt = game.settings.get("wfrp3", "dangerousCritsMod")
      if(game.settings.get("wfrp3", "dangerousCrits") && critAmnt && (Math.abs(newWounds) - actor.data.data.characteristics.t.bonus) > 0)
      {
          let critModifier = (Math.abs(newWounds) - actor.data.data.characteristics.t.bonus) * critAmnt;
          updateMsg += `<br><a class ="table-click critical-roll" data-modifier=${critModifier} data-table = "crit${opposeData.hitloc.value}" ><i class='fas fa-list'></i> ${game.i18n.localize("Critical")} +${critModifier}</a>`
      }
      else if (Math.abs(newWounds) < actor.data.data.characteristics.t.bonus )
        updateMsg += `<br><a class ="table-click critical-roll" data-modifier="-20" data-table = "crit${opposeData.hitloc.value}" ><i class='fas fa-list'></i> ${game.i18n.localize("Critical")} (-20)</a>`
      else 
        updateMsg += `<br><a class ="table-click critical-roll" data-table = "crit${opposeData.hitloc.value}" ><i class='fas fa-list'></i> ${game.i18n.localize("Critical")}</a>`
    }
    else if (impenetrable)
      updateMsg += `<br>${game.i18n.localize("PROPERTY.Impenetrable")} - ${game.i18n.localize("CHAT.CriticalsNullified")}`

    if (newWounds <= 0)
      newWounds = 0; // Do not go below 0 wounds


    updateMsg +="</span>"
    updateMsg = updateMsg.replace("@TOTAL", totalWoundLoss)

    // Update actor wound value
    actor.update({"data.status.wounds.value" : newWounds})
    return updateMsg;
  }


  

  _replaceData(formula) {
    let dataRgx = new RegExp(/@([a-z.0-9]+)/gi);
    return formula.replace(dataRgx, (match, term) => {
      let value = getProperty(this.data, term);
      return value ? String(value).trim() : "0";
    });
  }

  /**
   * This helper can be used to prepare cardOptions to reroll/edit a test card
   * It uses the informations of the roll located in the message entry
   * from game.messages
   * @param {Object} message 
   * @returns {Object} cardOptions
   */
  preparePostRollAction(message)
  {
    //recreate the initial (virgin) cardOptions object
    //add a flag for reroll limit
    let data = message.data.flags.data;
    let cardOptions = {
      flags: {img:message.data.flags.img},
      rollMode:data.rollMode,
      sound:message.data.sound,
      speaker:message.data.speaker,
      template:data.template,
      title:data.title.replace(` - ${game.i18n.localize("Opposed")}`,""),
      user:message.data.user
    };
    if(data.attackerMessage)
      cardOptions.attackerMessage = data.attackerMessage;
    if(data.defenderMessage)
      cardOptions.defenderMessage = data.defenderMessage;
    if(data.unopposedStartMessage)
      cardOptions.unopposedStartMessage = data.unopposedStartMessage;
    return cardOptions;
  }
}

// Assign the actor class to the CONFIG
CONFIG.Actor.entityClass = Actorwfrp3;

// Treat the custom default token as a true default token
// If you change the actor image from the default token, it will automatically set the same image to be the token image
Hooks.on("preUpdateActor", (data, updatedData) =>{
  if (data.data.token.img == "systems/wfrp3/tokens/unknown.png" && updatedData.img)
  {
    updatedData["token.img"] = updatedData.img;
    data.data.token.img = updatedData.img;
  }
})