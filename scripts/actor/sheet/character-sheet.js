/**
 * Provides the specific interaction handlers for Character Sheets.
 *
 * ActorSheetwfrp3Character are assigned to character type actors, and the specific interactions
 * character type actors need are defined here, specifically for careers and spending exp.
 * 
 */
class ActorSheetwfrp3Character extends ActorSheetwfrp3
{
  static get defaultOptions()
  {
    const options = super.defaultOptions;
    mergeObject(options,
    {
      classes: options.classes.concat(["wfrp3", "actor", "character-sheet"]),
      width: 610,
      height: 740,
    });
    return options;
  }


  /**
   * Get the correct HTML template path to use for rendering this particular sheet
   * @type {String}
   */
  get template()
  {
    if (!game.user.isGM && this.actor.limited) return "systems/wfrp3/templates/actors/actor-limited.html";
    return "systems/wfrp3/templates/actors/actor-sheet.html";

  }


  /* --------------------------------------------------------------------------------------------------------- */
  /* ------------------------------------ Event Listeners and Handlers --------------------------------------- */
  /* --------------------------------------------------------------------------------------------------------- */
  /**
   * This list of event handlers is focused on character interactions, such has spending exp and handling careers.
   * 
   *
  /* --------------------------------------------------------------------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html)
  {
    super.activateListeners(html);

    // Career toggle click (current or complete)
    html.find('.career-toggle').click(async ev =>
    {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      let type = $(ev.currentTarget).attr("toggle-type")
      let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      item.data[type].value = !item.data[type].value; // Toggle the value

      // "Current" is the toggle that actually means something, so needs more processing
      if (type == "current")
      {
        let availableCharacteristics = item.data.characteristics
        let characteristics = this.actor.data.data.characteristics;

        // If current was toggled on
        if (item.data.current.value)
        {
          // Assign characteristics to be available or not based on the current career
          for (let char in characteristics)
          {
            characteristics[char].career = false;
            if (availableCharacteristics.includes(char))
              characteristics[char].career = true;
          }
          this.actor.update({"data.details.status.value" : wfrp3.statusTiers[item.data.status.tier] + " " + item.data.status.standing})
        }
        else
        {
          for (let char in characteristics)
          {
            characteristics[char].career = false;
          }
          this.actor.update({"data.details.status.value" : ""})
        }
        this.actor.update({"data.characteristics": characteristics})
      }

      // Only one career can be current - make all other careers not current
      if (type == "current" && item.data.current.value == true)
      {
        let updateCareers = duplicate(this.actor.data.items.filter(c => c.type == "career" && c._id != item._id))
        updateCareers.map(x => x.data.current.value = false)
        await this.actor.updateEmbeddedEntity("OwnedItem", updateCareers)
      }
      this.actor.updateEmbeddedEntity("OwnedItem", item);
    });

    // Grayed-out skill click - prompt to add the skill
    html.find(".untrained-skill").mousedown(async ev =>
    {
      let skill = await WFRP_Utility.findSkill(event.target.text);

      // Right click - show sheet
      if (ev.button == 2)
      {
        skill.sheet.render(true);
      }
      else
      {
        try
        {
          new Dialog(
          {
            title: game.i18n.localize("SHEET.AddSkillTitle"),
            content: `<p>${game.i18n.localize("SHEET.AddSkillPrompt")}</p>`,
            buttons:
            {
              yes:
              {
                label: game.i18n.localize("Yes"),
                callback: dlg =>
                {
                  this.actor.createEmbeddedEntity("OwnedItem", skill.data);
                }
              },
              cancel:
              {
                label: game.i18n.localize("Cancel"),
                callback: dlg =>
                {
                  return
                }
              },
            },
            default: 'yes'
          }).render(true);
        }
        catch
        {
          console.error(error)
          ui.notifications.error(error)
        }
      }
    })

    // Grayed-out talent click - prompt to add the talent
    html.find(".untrained-talent").mousedown(async ev =>
    {
      let talent = await WFRP_Utility.findTalent(event.target.text);

      // Right click - show sheet
      if (ev.button == 2)
      {
        talent.sheet.render(true);
      }

      else
      {
        try
        {
          new Dialog(
          {
            title: game.i18n.localize("SHEET.AddTalentTitle"),
            content: `<p>${game.i18n.localize("SHEET.AddTalentPrompt")}</p>`,
            buttons:
            {
              yes:
              {
                label: game.i18n.localize("Yes"),
                callback: dlg =>
                {
                  this.actor.createEmbeddedEntity("OwnedItem", talent.data);
                  this.actor.update( // Subtract experience if added
                    {
                      "data.details.experience.spent": this.actor.data.data.details.experience.spent + 100
                    })
                }
              },
              yesNoExp:
              {
                label: game.i18n.localize("Free"),
                callback: dlg =>{ this.actor.createEmbeddedEntity("OwnedItem", talent.data); }
              },
              cancel:
              {
                label: game.i18n.localize("Cancel"),
                callback: dlg =>{ return }
              },
            },
            default: 'yes'
          }).render(true);
        }
        catch
        {
          console.error(error)
          ui.notifications(error)
        }
      }
    });    
  }
}

// Register Character Sheet
Actors.registerSheet("wfrp3", ActorSheetwfrp3Character,
{
  types: ["character"],
  makeDefault: true
});