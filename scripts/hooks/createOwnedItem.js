/**
 * Applies various logic depending on actor type and created items
 * 
 * Criticals - apply wound values
 * 
 * Armour, weapons, and wearables - automatically set to worn for non-characters
 * Talents, traits - apply characteristic bonuses if appropriate.
 * 
 * This file also contains deleteOwnedItem, which undoes the talent/trait bonuses
 */
Hooks.on("createOwnedItem", (actor, item) => {
  try {
    // If critical, subtract wounds value from actor's
    if (item.type == "critical")
    {
      let newWounds;
      if (item.data.wounds.value.toLowerCase() == "death")
        newWounds = 0;
      newWounds = actor.data.data.status.wounds.value - Number(item.data.wounds.value)
      if (newWounds < 0) newWounds = 0; 

      actor.update({"data.status.wounds.value" : newWounds});

      ui.notifications.notify(`${item.data.wounds.value} ${game.i18n.localize("CHAT.CriticalWoundsApplied")} ${actor.name}`)
    }
  }
  catch (error)
  {
    console.error(game.i18n.localize("Error.CriticalWound") + ": " + error) //continue as normal if exception
  } 
})

// If deleting a talent or trait, if that talent or trait gives a bonus, remove that bonus.
Hooks.on("deleteOwnedItem", (actor, item) => {

})
